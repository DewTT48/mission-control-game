import { resources, tasks, vendors } from "../scenarios/innovation-day/scenario";
import type { FacilitatorState, TeamGameState } from "../types/game";

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export const createInitialTeamState = (): TeamGameState => ({
  scenarioId: "innovation-day",
  version: 2,
  teamName: "",
  currentPhase: 0,
  currentDay: 1,
  currentRound: 1,
  chaos: { tasks: "", owners: "", unknowns: "" },
  questionTokensRemaining: 5,
  sponsorQA: [],
  missionDefinition: { goal: "", inScope: "", outOfScope: "", deliverables: "", successCriteria: "", stakeholders: "", constraints: "", assumptions: "" },
  missionApproval: { status: "not_requested", notes: "", reworkCount: 0 },
  tasks: clone(tasks),
  resources: clone(resources),
  allocations: [],
  vendors: clone(vendors),
  appliedEventCodes: [],
  eventNotes: {},
  decisions: [],
  budgetCeiling: 120000,
  expectedAttendance: 150,
  networkRisk: false,
  vendorDiscounts: {},
  planLocked: false,
  budgetRationale: "",
  missionStatus: "on_track",
  finalReview: { missionResult: "", delivered: "", notDelivered: "", biggestDecision: "", biggestRisk: "", doDifferently: "", locked: false },
  updatedAt: new Date().toISOString(),
});

export const createInitialFacilitatorState = (): FacilitatorState => ({
  version: 2,
  currentPhase: 0,
  timerSeconds: 0,
  favoriteDebriefs: [],
  teams: [],
  updatedAt: new Date().toISOString(),
});
