import type { TeamGameState } from "../types/game";

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
  if (taskId === "T05" && state.vendors.some((v) => v.id === "V08" && v.hired)) return 2;
  if (taskId === "T21" && state.vendors.some((v) => v.id === "V14" && v.hired)) return 2;
  return task.effectiveEffortHours ?? task.effortHours;
};

export const getProjectedSpend = (state: TeamGameState) => {
  const taskCost = state.tasks.filter((t) => t.status !== "dropped").reduce((sum, t) => sum + t.cost, 0);
  const vendorCost = state.vendors.filter((v) => v.hired).reduce((sum, v) => sum + v.cost, 0);
  return taskCost + vendorCost;
};

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
