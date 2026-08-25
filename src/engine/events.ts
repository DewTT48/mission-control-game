import { events } from "../scenarios/innovation-day/scenario";
import type { TeamGameState } from "../types/game";
import { isVendorActive } from "./calculations";

export const applyEvent = (source: TeamGameState, rawCode: string): { state: TeamGameState; error?: "invalid" | "duplicate" } => {
  const code = rawCode.trim().toUpperCase();
  const event = events.find((item) => item.code === code);
  if (!event) return { state: source, error: "invalid" };
  if (source.appliedEventCodes.includes(code)) return { state: source, error: "duplicate" };

  const state: TeamGameState = JSON.parse(JSON.stringify(source)) as TeamGameState;
  state.appliedEventCodes.push(code);
  const task = (id: string) => state.tasks.find((item) => item.id === id);
  const unlock = (...ids: string[]) => state.vendors.forEach((v) => { if (ids.includes(v.id)) v.unlocked = true; });

  if (code === "E01") { state.networkRisk = true; const t09 = task("T09"); if (t09?.status !== "done") t09!.status = "at_risk"; unlock("V06", "V07"); }
  if (code === "E02") { const t17 = task("T17"); if (t17) t17.dueDay = 7; }
  if (code === "E03") state.budgetCeiling = 95000;
  if (code === "E04") state.expectedAttendance = 210;
  if (code === "E05") { const ton = state.resources.find((r) => r.id === "ton"); if (ton) ton.capacityOverrides = { ...ton.capacityOverrides, 5: 0 }; }
  if (code === "E06") { const t13 = task("T13"); if (t13 && t13.status !== "dropped" && t13.status !== "done") t13.status = "delayed"; unlock("V11"); }
  if (code === "E07") { unlock("V05"); state.vendorDiscounts.V05 = 3000; }
  if (code === "E08" && !state.resources.some((r) => r.id === "corp-comms")) state.resources.push({ id: "corp-comms", name: "Corp Comms Support", skills: ["Communication", "Content", "General Support"], dailyCapacity: 0, capacityOverrides: { 6: 6 }, kind: "temporary" });
  if (code === "E09") state.confirmedAttendance = 92;
  if (code === "E10") { state.cateringCutoffDay = 7; state.postCutoffIncreaseLimit = isVendorActive(state, "V12") ? 0.3 : 0.1; }
  if (code === "E11") {
    const t03 = task("T03"); const t04 = task("T04");
    if (t03 && t03.status !== "dropped") { t03.effectiveEffortHours = Math.max(t03.effectiveEffortHours ?? t03.effortHours, t03.effortHours + 3); if (t03.status === "done") t03.status = "in_progress"; }
    if (t04 && t04.status !== "dropped") t04.status = "at_risk";
  }
  if (code === "E12") { const t13 = task("T13"); if (t13 && t13.status !== "dropped") t13.dueDay = Math.min(t13.dueDay, 6); }
  state.updatedAt = new Date().toISOString();
  return { state };
};
