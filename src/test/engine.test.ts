import { describe, expect, it } from "vitest";
import { createInitialTeamState } from "../engine/state";
import { applyEvent } from "../engine/events";
import { getBudgetBreakdown, getCapacityStatus, getEffectiveEffort, getPlannedSpend, getUsedHours } from "../engine/calculations";
import { normalizeTeamState } from "../app/storage";
import type { TeamGameState } from "../types/game";
import { canCommitPlan, commitPlan } from "../engine/planning";

describe("Mission Control engine", () => {
  it("adds multiple allocations and warns above 6h", () => {
    const state = createInitialTeamState();
    state.allocations = [
      { id: "1", taskId: "T01", resourceId: "bank", day: 3, hours: 3, source: "internal" },
      { id: "2", taskId: "T07", resourceId: "bank", day: 3, hours: 3, source: "internal" },
    ];
    expect(getUsedHours(state, "bank", 3)).toBe(6);
    expect(getCapacityStatus(state, "bank", 3)).toBe("busy");
    state.allocations.push({ id: "3", taskId: "T13", resourceId: "bank", day: 3, hours: 2, source: "internal" });
    expect(getUsedHours(state, "bank", 3)).toBe(8);
    expect(getCapacityStatus(state, "bank", 3)).toBe("over");
  });

  it("calculates task and vendor budget", () => {
    const state = createInitialTeamState();
    expect(getPlannedSpend(state)).toBe(0);
    state.tasks.find((task) => task.id === "T10")!.budgetStatus = "included";
    expect(getPlannedSpend(state)).toBe(42000);
    state.vendors.find((vendor) => vendor.id === "V01")!.planStatus = "planned";
    expect(getPlannedSpend(state)).toBe(52000);
    expect(getBudgetBreakdown(state).remaining).toBe(68000);
  });

  it("applies event mechanics once", () => {
    let state = createInitialTeamState();
    state = applyEvent(state, "E03").state;
    expect(state.budgetCeiling).toBe(95000);
    expect(applyEvent(state, "E03").error).toBe("duplicate");
    state = applyEvent(state, "E05").state;
    expect(state.resources.find((r) => r.id === "ton")?.capacityOverrides?.[5]).toBe(0);
    state = applyEvent(state, "E02").state;
    expect(state.tasks.find((t) => t.id === "T17")?.dueDay).toBe(7);
    state = applyEvent(state, "E11").state;
    expect(state.tasks.filter((t) => t.id === "T21")).toHaveLength(1);
    state.vendors.find((v) => v.id === "V14")!.planStatus = "planned";
    expect(getEffectiveEffort(state, "T21")).toBe(2);
  });

  it("migrates legacy task costs and hired vendors", () => {
    const legacy = createInitialTeamState() as TeamGameState & { planLocked?: boolean; budgetRationale?: string };
    legacy.tasks.forEach((task) => { delete (task as Partial<typeof task>).budgetStatus; });
    const legacyVendor = legacy.vendors.find((vendor) => vendor.id === "V01") as typeof legacy.vendors[number] & { hired?: boolean };
    delete (legacyVendor as Partial<typeof legacyVendor>).planStatus;
    legacyVendor.hired = true;
    const migrated = normalizeTeamState(legacy);
    expect(migrated.tasks.find((task) => task.id === "T10")?.budgetStatus).toBe("included");
    expect(migrated.vendors.find((vendor) => vendor.id === "V01")?.planStatus).toBe("committed");
  });

  it("requires a Thai rationale before committing an over-budget plan", () => {
    const state = createInitialTeamState();
    state.tasks.filter((task) => task.cost > 0).forEach((task) => { task.budgetStatus = "included"; });
    state.vendors.find((vendor) => vendor.id === "V01")!.planStatus = "planned";
    expect(getPlannedSpend(state)).toBe(124000);
    expect(canCommitPlan(state)).toBe(false);
    expect(commitPlan(state)).toBe(false);
    state.budgetRationale = "ทีมเสนอให้ลดขอบเขตงาน Optional และขออนุมัติส่วนต่าง";
    expect(canCommitPlan(state)).toBe(true);
    expect(commitPlan(state)).toBe(true);
    expect(state.planLocked).toBe(true);
    expect(state.vendors.find((vendor) => vendor.id === "V01")?.planStatus).toBe("committed");
  });
});
