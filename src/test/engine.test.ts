import { describe, expect, it } from "vitest";
import { createInitialTeamState } from "../engine/state";
import { applyEvent } from "../engine/events";
import { getCapacityStatus, getEffectiveEffort, getProjectedSpend, getUsedHours } from "../engine/calculations";

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
    expect(getProjectedSpend(state)).toBe(114000);
    state.vendors.find((v) => v.id === "V01")!.hired = true;
    expect(getProjectedSpend(state)).toBe(124000);
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
    state.vendors.find((v) => v.id === "V14")!.hired = true;
    expect(getEffectiveEffort(state, "T21")).toBe(2);
  });
});
