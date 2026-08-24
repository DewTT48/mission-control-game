import { getBudgetBreakdown } from "./calculations";
import type { TeamGameState } from "../types/game";

export const canCommitPlan = (state: TeamGameState) => {
  const budget = getBudgetBreakdown(state);
  return !budget.overBudget || state.budgetRationale.trim().length > 0;
};

export const commitPlan = (state: TeamGameState) => {
  if (!canCommitPlan(state)) return false;
  state.vendors.forEach((vendor) => {
    if (vendor.planStatus === "planned") vendor.planStatus = "committed";
  });
  state.planLocked = true;
  return true;
};
