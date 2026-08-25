import type { TaskPriority, TeamGameState, Vendor } from "../types/game";

const priorityRank: Record<TaskPriority, number> = { must: 0, should: 1, could: 2, unassigned: 3, drop: 4 };

export const isVendorActive = (state: TeamGameState, vendorId: string) =>
  state.vendors.some((vendor) => vendor.id === vendorId && vendor.planStatus !== "available");

export const getUsedHours = (state: TeamGameState, resourceId: string, day: number) =>
  state.allocations.filter((a) => a.resourceId === resourceId && a.day === day).reduce((sum, a) => sum + a.hours, 0);

export const getAvailableHours = (state: TeamGameState, resourceId: string, day: number) => {
  const resource = state.resources.find((r) => r.id === resourceId);
  if (!resource) return 0;
  return resource.capacityOverrides?.[day] ?? resource.dailyCapacity;
};

export const getCapacityStatus = (state: TeamGameState, resourceId: string, day: number) => {
  const used = getUsedHours(state, resourceId, day);
  const available = getAvailableHours(state, resourceId, day);
  return used > available ? "over" : used > 4 ? "busy" : "available";
};

export const getAllocatedEffort = (state: TeamGameState, taskId: string) =>
  state.allocations.filter((a) => a.taskId === taskId).reduce((sum, a) => sum + a.hours, 0);

export const getEffectiveEffort = (state: TeamGameState, taskId: string) => {
  const task = state.tasks.find((t) => t.id === taskId);
  if (!task) return 0;
  if (taskId === "T05" && isVendorActive(state, "V08")) return 2;
  if (taskId === "T21" && isVendorActive(state, "V14")) return 2;
  return task.effectiveEffortHours ?? task.effortHours;
};

export const getTaskPlannedStartDay = (state: TeamGameState, taskId: string) => {
  const days = state.allocations.filter((allocation) => allocation.taskId === taskId).map((allocation) => allocation.day);
  return days.length ? Math.min(...days) : null;
};

export const getTaskPlannedFinishDay = (state: TeamGameState, taskId: string) => {
  const required = getEffectiveEffort(state, taskId);
  if (required <= 0) return null;
  const hoursByDay = new Map<number, number>();
  state.allocations.filter((allocation) => allocation.taskId === taskId).forEach((allocation) => {
    hoursByDay.set(allocation.day, (hoursByDay.get(allocation.day) ?? 0) + allocation.hours);
  });
  let accumulated = 0;
  for (const [day, hours] of [...hoursByDay.entries()].sort(([a], [b]) => a - b)) {
    accumulated += hours;
    if (accumulated >= required) return day;
  }
  return null;
};

export type DependencyPlanIssue = {
  dependencyId: string;
  kind: "incomplete" | "timing" | "dropped";
  plannedFinishDay: number | null;
  earliestStartDay: number | null;
  allocated: number;
  required: number;
};

export const getDependencyPlanIssues = (state: TeamGameState, taskId: string, startDay = getTaskPlannedStartDay(state, taskId)) => {
  const task = state.tasks.find((candidate) => candidate.id === taskId);
  if (!task || task.status === "done") return [];
  return task.dependencies.flatMap<DependencyPlanIssue>((dependencyId) => {
    const dependency = state.tasks.find((candidate) => candidate.id === dependencyId);
    if (!dependency || dependency.status === "done") return [];
    const required = getEffectiveEffort(state, dependencyId);
    const allocated = getAllocatedEffort(state, dependencyId);
    const plannedFinishDay = getTaskPlannedFinishDay(state, dependencyId);
    if (dependency.status === "dropped" || dependency.priority === "drop") {
      return [{ dependencyId, kind: "dropped", plannedFinishDay, earliestStartDay: null, allocated, required }];
    }
    if (plannedFinishDay === null) {
      return [{ dependencyId, kind: "incomplete", plannedFinishDay, earliestStartDay: null, allocated, required }];
    }
    if (startDay !== null && plannedFinishDay >= startDay) {
      return [{ dependencyId, kind: "timing", plannedFinishDay, earliestStartDay: plannedFinishDay + 1, allocated, required }];
    }
    return [];
  });
};

export const getTaskPlanStatus = (state: TeamGameState, taskId: string) => {
  const task = state.tasks.find((candidate) => candidate.id === taskId);
  if (!task) return "unavailable" as const;
  if (task.status === "done") return "done" as const;
  if (task.status === "dropped" || task.priority === "drop") return "dropped" as const;
  const allocated = getAllocatedEffort(state, taskId);
  const required = getEffectiveEffort(state, taskId);
  const finish = getTaskPlannedFinishDay(state, taskId);
  const dependencyIssues = getDependencyPlanIssues(state, taskId);
  if (dependencyIssues.length && allocated === 0) return "waiting" as const;
  if (dependencyIssues.length || (finish !== null && finish > task.dueDay) || (allocated > 0 && allocated < required)) return "at_risk" as const;
  if (finish !== null) return "planned" as const;
  return "ready" as const;
};

export const getVendorSupportedOpenTasks = (state: TeamGameState, vendor: Vendor) => vendor.supportsTaskIds
  .map((taskId) => state.tasks.find((task) => task.id === taskId))
  .filter((task): task is TeamGameState["tasks"][number] => !!task && task.status !== "done" && task.status !== "dropped" && task.priority !== "drop" && task.priority !== "unassigned" && getAllocatedEffort(state, task.id) < getEffectiveEffort(state, task.id))
  .sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority] || a.dueDay - b.dueDay);

export const getPlanReview = (state: TeamGameState) => {
  const activeTasks = state.tasks.filter((task) => task.status !== "dropped" && task.priority !== "drop");
  const mustUnplanned = activeTasks.filter((task) => task.priority === "must" && getAllocatedEffort(state, task.id) < getEffectiveEffort(state, task.id));
  const unassignedPriority = activeTasks.filter((task) => task.priority === "unassigned");
  const dependencyConflicts = activeTasks.flatMap((task) => {
    const startDay = getTaskPlannedStartDay(state, task.id);
    if (startDay === null) return [];
    return getDependencyPlanIssues(state, task.id, startDay).map((issue) => ({ task, issue }));
  });
  const plannedLate = activeTasks.filter((task) => {
    const finish = getTaskPlannedFinishDay(state, task.id);
    return finish !== null && finish > task.dueDay;
  });
  const overAllocated = activeTasks.filter((task) => getAllocatedEffort(state, task.id) > getEffectiveEffort(state, task.id));
  const overCapacity = state.resources.flatMap((resource) => Array.from({ length: 10 }, (_, index) => index + 1)
    .filter((day) => getUsedHours(state, resource.id, day) > getAvailableHours(state, resource.id, day))
    .map((day) => ({ resource, day, used: getUsedHours(state, resource.id, day), available: getAvailableHours(state, resource.id, day) })));
  const issueCount = mustUnplanned.length + unassignedPriority.length + dependencyConflicts.length + plannedLate.length + overAllocated.length + overCapacity.length;
  return { mustUnplanned, unassignedPriority, dependencyConflicts, plannedLate, overAllocated, overCapacity, issueCount };
};

export const getBudgetBreakdown = (state: TeamGameState) => {
  const taskItems = state.tasks.filter((task) => task.status !== "dropped" && task.budgetStatus === "included" && task.cost > 0);
  const vendorItems = state.vendors.filter((vendor) => vendor.planStatus !== "available");
  const taskCost = taskItems.reduce((sum, task) => sum + task.cost, 0);
  const vendorCost = vendorItems.reduce((sum, vendor) => sum + vendor.cost, 0);
  const eventAdjustments = 0;
  const plannedSpend = taskCost + vendorCost + eventAdjustments;
  const remaining = state.budgetCeiling - plannedSpend;
  return { taskItems, vendorItems, taskCost, vendorCost, eventAdjustments, plannedSpend, remaining, overBudget: remaining < 0 };
};

export const getPlannedSpend = (state: TeamGameState) => getBudgetBreakdown(state).plannedSpend;
export const getProjectedSpend = getPlannedSpend;

export const getUnmetDependencies = (state: TeamGameState, taskId: string) => {
  const task = state.tasks.find((t) => t.id === taskId);
  return (task?.dependencies ?? []).filter((id) => state.tasks.find((candidate) => candidate.id === id)?.status !== "done");
};

export const getSummary = (state: TeamGameState) => ({
  done: state.tasks.filter((t) => t.status === "done").length,
  inProgress: state.tasks.filter((t) => t.status === "in_progress").length,
  atRisk: state.tasks.filter((t) => t.status === "at_risk").length,
  delayed: state.tasks.filter((t) => t.status === "delayed").length,
  overCapacity: state.resources.reduce((total, r) => total + Array.from({ length: 10 }, (_, index) => index + 1).filter((day) => getCapacityStatus(state, r.id, day) === "over").length, 0),
});
