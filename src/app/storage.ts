import { STORAGE_KEYS } from "./config";
import { createInitialFacilitatorState, createInitialTeamState } from "../engine/state";
import type { FacilitatorState, TeamGameState } from "../types/game";

type LegacyVendor = TeamGameState["vendors"][number] & { hired?: boolean };
type LegacyTask = TeamGameState["tasks"][number] & { priorityZone?: "unassigned" | "do_first" | "plan_next" | "delegate_outsource" | "defer_drop" };

const migratePriority = (task: LegacyTask): TeamGameState["tasks"][number]["priority"] => {
  if (task.priority) return task.priority;
  if (task.status === "dropped") return "drop";
  if (task.priorityZone === "do_first") return "must";
  if (task.priorityZone === "plan_next" || task.priorityZone === "delegate_outsource") return "should";
  if (task.priorityZone === "defer_drop") return "could";
  return "unassigned";
};

export function normalizeTeamState(saved: TeamGameState): TeamGameState {
  const initial = createInitialTeamState();
  return {
    ...initial,
    ...saved,
    missionDefinition: { ...initial.missionDefinition, ...saved.missionDefinition },
    missionApproval: { ...initial.missionApproval, ...saved.missionApproval },
    finalReview: { ...initial.finalReview, ...saved.finalReview },
    tasks: (saved.tasks as LegacyTask[]).map((task) => ({
      ...task,
      priority: migratePriority(task),
      budgetStatus: task.budgetStatus ?? (task.cost === 0 ? "included" : task.status === "dropped" ? "excluded" : "included"),
    })),
    resources: saved.resources ?? initial.resources,
    allocations: saved.allocations ?? [],
    vendors: (saved.vendors as LegacyVendor[]).map((vendor) => ({
      ...vendor,
      planStatus: vendor.planStatus ?? (vendor.hired ? "committed" : "available"),
      supportsTaskIds: vendor.supportsTaskIds ?? initial.vendors.find((candidate) => candidate.id === vendor.id)?.supportsTaskIds ?? [],
    })),
    planLocked: saved.planLocked ?? false,
    budgetRationale: saved.budgetRationale ?? "",
  };
}

function safeLoad<T>(key: string, fallback: () => T, validate: (value: unknown) => value is T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback();
    const parsed: unknown = JSON.parse(raw);
    return validate(parsed) ? parsed : fallback();
  } catch {
    return fallback();
  }
}

const isTeamState = (value: unknown): value is TeamGameState => {
  const item = value as Partial<TeamGameState> | null;
  return !!item && item.version === 2 && item.scenarioId === "innovation-day" && Array.isArray(item.tasks);
};

const isFacilitatorState = (value: unknown): value is FacilitatorState => {
  const item = value as Partial<FacilitatorState> | null;
  return !!item && item.version === 2 && Array.isArray(item.teams);
};

export const loadTeamState = () => normalizeTeamState(safeLoad(STORAGE_KEYS.player, createInitialTeamState, isTeamState));
export const loadFacilitatorState = () => safeLoad(STORAGE_KEYS.facilitator, createInitialFacilitatorState, isFacilitatorState);
export const saveTeamState = (state: TeamGameState) => localStorage.setItem(STORAGE_KEYS.player, JSON.stringify({ ...state, updatedAt: new Date().toISOString() }));
export const saveFacilitatorState = (state: FacilitatorState) => localStorage.setItem(STORAGE_KEYS.facilitator, JSON.stringify({ ...state, updatedAt: new Date().toISOString() }));
export const hasSavedTeam = () => localStorage.getItem(STORAGE_KEYS.player) !== null;
export const resetTeamState = () => localStorage.removeItem(STORAGE_KEYS.player);

export const exportTeamState = (state: TeamGameState) => {
  const safeName = state.teamName.trim().toLowerCase().replace(/[^a-z0-9ก-๙]+/g, "-") || "team";
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `mission-control-${safeName}-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const importTeamState = async (file: File): Promise<TeamGameState> => {
  const parsed: unknown = JSON.parse(await file.text());
  if (!isTeamState(parsed)) throw new Error("INVALID_STATE");
  return normalizeTeamState(parsed);
};
