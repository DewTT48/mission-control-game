export type LocalizedText = { th: string; en: string };
export type TaskStatus = "not_started" | "in_progress" | "done" | "at_risk" | "delayed" | "dropped";
export type PriorityZone = "unassigned" | "do_first" | "plan_next" | "delegate_outsource" | "defer_drop";
export type MissionStatus = "on_track" | "at_risk" | "critical";
export type TaskBudgetStatus = "undecided" | "included" | "excluded";
export type VendorPlanStatus = "available" | "planned" | "committed";

export type Resource = {
  id: string;
  name: string;
  skills: string[];
  dailyCapacity: number;
  capacityOverrides?: Record<number, number>;
  kind: "internal" | "temporary" | "vendor";
};

export type Task = {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  effortHours: number;
  effectiveEffortHours?: number;
  preferredSkills: string[];
  dueDay: number;
  cost: number;
  dependencies: string[];
  facilitatorClassification: "critical" | "supporting" | "optional";
  status: TaskStatus;
  priorityZone: PriorityZone;
  priorityReason: string;
  issue: string;
  nextAction: string;
  budgetStatus: TaskBudgetStatus;
};

export type Allocation = {
  id: string;
  taskId: string;
  resourceId: string;
  day: number;
  hours: number;
  source: "internal" | "vendor";
};

export type Vendor = {
  id: string;
  name: LocalizedText;
  category: string;
  cost: number;
  benefit: LocalizedText;
  coordination: string;
  availability: "planning" | "later_planning" | "situational";
  unlocked: boolean;
  planStatus: VendorPlanStatus;
};

export type GameEvent = {
  code: string;
  title: LocalizedText;
  type: "change" | "problem" | "opportunity";
  difficulty: "low" | "medium" | "high";
  timing: string;
  announcement: LocalizedText;
  effect: LocalizedText;
  notice: LocalizedText;
  debrief: LocalizedText;
};

export type SponsorQA = {
  id: string;
  question: string;
  answer: string;
  factOrAssumption: "fact" | "assumption" | "unknown";
};

export type Decision = {
  id: string;
  day: number;
  situation: string;
  recommendation: string;
  impact: string;
  decisionNeeded: string;
  sponsorResponse: string;
  notes: string;
  createdAt: string;
};

export type MissionDefinition = {
  goal: string;
  inScope: string;
  outOfScope: string;
  deliverables: string;
  successCriteria: string;
  stakeholders: string;
  constraints: string;
  assumptions: string;
};

export type TeamGameState = {
  scenarioId: "innovation-day";
  version: 2;
  teamName: string;
  currentPhase: number;
  currentDay: number;
  currentRound: number;
  chaos: { tasks: string; owners: string; unknowns: string };
  questionTokensRemaining: number;
  sponsorQA: SponsorQA[];
  missionDefinition: MissionDefinition;
  missionApproval: { status: "not_requested" | "approved" | "conditional" | "revise"; notes: string; reworkCount: number };
  tasks: Task[];
  resources: Resource[];
  allocations: Allocation[];
  vendors: Vendor[];
  appliedEventCodes: string[];
  eventNotes: Record<string, string>;
  decisions: Decision[];
  budgetCeiling: number;
  expectedAttendance: number;
  confirmedAttendance?: number;
  networkRisk: boolean;
  planLocked: boolean;
  budgetRationale: string;
  cateringCutoffDay?: number;
  postCutoffIncreaseLimit?: number;
  missionStatus: MissionStatus;
  finalReview: { missionResult: string; delivered: string; notDelivered: string; biggestDecision: string; biggestRisk: string; doDifferently: string; locked: boolean };
  updatedAt: string;
};

export type FacilitatorTeam = {
  id: string;
  name: string;
  notes: string;
  approvalNotes: string;
  planNotes: string;
  scores: Record<string, number>;
};

export type FacilitatorState = {
  version: 2;
  currentPhase: number;
  timerSeconds: number;
  favoriteDebriefs: string[];
  teams: FacilitatorTeam[];
  updatedAt: string;
};
