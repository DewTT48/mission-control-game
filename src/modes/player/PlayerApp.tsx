import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { applyEvent } from "../../engine/events";
import { getAllocatedEffort, getAvailableHours, getBudgetBreakdown, getDependencyPlanIssues, getEffectiveEffort, getSummary, getTaskPlannedFinishDay, getTaskPlanStatus, getUnmetDependencies, getUsedHours, getVendorSupportedOpenTasks } from "../../engine/calculations";
import { exportTeamState, importTeamState, loadTeamState, saveTeamState } from "../../app/storage";
import { events } from "../../scenarios/innovation-day/scenario";
import type { Decision, Task, TaskPriority, TeamGameState } from "../../types/game";
import { Badge, Bilingual, CapacityBar, Field, Panel, PixelButton, SaveStatus } from "../../components/ui";
import { Modal } from "../../components/Modal";
import { BudgetPanel, PlanningNav, type UpdateTeamState } from "./PlanningBudget";
import { PlanReview } from "./PlanReview";

const tabs = ["MISSION", "TEAM", "CHAOS", "SPONSOR", "GOAL & SCOPE", "PRIORITY", "PLAN", "MARKET", "CONTROL", "EVENTS", "DECISIONS", "FINAL"];
const zones = [["must", "MUST DO / ต้องทำ"], ["should", "SHOULD DO / ควรทำ"], ["could", "COULD DO / ทำเมื่อมีทรัพยากร"], ["drop", "DROP / ตัดออกจากขอบเขต"]] as const;
const priorityOrder = { must: 0, should: 1, could: 2, unassigned: 3, drop: 4 } as const;
const planStatusLabels = { ready: "READY / พร้อม", waiting: "WAITING / รองานก่อนหน้า", planned: "PLANNED / วางแผนครบ", at_risk: "AT RISK / ควรทบทวน", done: "DONE / เสร็จแล้ว", dropped: "DROPPED / ตัดออก", unavailable: "UNAVAILABLE" } as const;
const statuses = ["not_started", "in_progress", "done", "at_risk", "delayed", "dropped"] as const;

export default function PlayerApp() {
  const navigate = useNavigate();
  const [state, setState] = useState<TeamGameState>(loadTeamState);
  const [tab, setTab] = useState(0);
  const [modal, setModal] = useState<string>();
  useEffect(() => saveTeamState(state), [state]);
  const update: UpdateTeamState = (fn) => setState((previous) => { const next = structuredClone(previous); fn(next); next.updatedAt = new Date().toISOString(); return next; });
  const budget = getBudgetBreakdown(state);
  const summary = getSummary(state);
  const canAdvance = tab !== 7 || state.planLocked;
  const advance = () => { if (!canAdvance) return; update((next) => { next.currentPhase = Math.max(next.currentPhase, Math.min(tab + 1, 11)); }); setTab(Math.min(tab + 1, 11)); };

  return <div className="app-shell">
    <header className="topbar"><button className="brand" onClick={() => navigate("/")}>MISSION CONTROL</button><span>TEAM: {state.teamName || "—"}</span><SaveStatus timestamp={state.updatedAt} /></header>
    <aside className="side-nav">{tabs.map((name, index) => <button key={name} className={tab === index ? "active" : ""} disabled={index > state.currentPhase + 1} onClick={() => setTab(index)}><span>{String(index + 1).padStart(2, "0")}</span>{name}</button>)}</aside>
    <main className="workspace">
      {tab >= 5 && tab <= 7 && <PlanningNav current={tab} maxTab={state.currentPhase + 1} goTo={setTab} />}
      {tab === 0 && <Mission state={state} update={update} />}
      {tab === 1 && <Team state={state} />}
      {tab === 2 && <Chaos state={state} update={update} />}
      {tab === 3 && <Sponsor state={state} update={update} />}
      {tab === 4 && <Goal state={state} update={update} />}
      {tab === 5 && <Priority state={state} update={update} />}
      {tab === 6 && <Plan state={state} update={update} />}
      {tab === 7 && <Market state={state} update={update} goTo={setTab} />}
      {tab === 8 && <Control state={state} update={update} summary={summary} />}
      {tab === 9 && <EventInbox state={state} setState={setState} setModal={setModal} />}
      {tab === 10 && <Decisions state={state} update={update} />}
      {tab === 11 && <Final state={state} update={update} />}
      {tab < 11 && <div className="next-row"><PixelButton onClick={advance} disabled={!canAdvance}>{tab === 7 && !state.planLocked ? "ยืนยันแผนก่อนเข้าสู่ CONTROL" : "NEXT / ไปต่อ →"}</PixelButton></div>}
    </main>
    <footer className={`hud ${budget.overBudget ? "hud-over" : ""}`}>{state.currentPhase >= 6 ? <><span>DAY {state.currentDay} · ROUND {state.currentRound}</span><span>วงเงิน {state.budgetCeiling.toLocaleString()} · ตามแผน {budget.plannedSpend.toLocaleString()} · {budget.overBudget ? `เกิน ${Math.abs(budget.remaining).toLocaleString()}` : `คงเหลือ ${budget.remaining.toLocaleString()}`}</span></> : <><span>SCENARIO 01 · INNOVATION DAY</span><span>BUDGET CEILING {state.budgetCeiling.toLocaleString()}</span></>}</footer>
    {modal && <Modal title={modal} onClose={() => setModal(undefined)}><p>บันทึกผลของเหตุการณ์แล้ว</p></Modal>}
  </div>;
}

function Mission({ state, update }: { state: TeamGameState; update: UpdateTeamState }) {
  return <><h1>MISSION / ภารกิจ</h1><Panel title="SCENARIO 01 — INNOVATION DAY"><div className="mission-brief"><strong>ส่งมอบ Innovation Day ภายใน 10 วันทำการ</strong><p>ผู้เข้าร่วมประมาณ 150 คน · ผู้บริหารระดับสูงเข้าร่วม · งบสูงสุด 120,000 บาท · งานจัด Day 10</p><p>Your team must deliver Innovation Day within 10 working days.</p></div><Field label="INSERT TEAM NAME / ชื่อทีม"><input value={state.teamName} onChange={(event) => update((next) => { next.teamName = event.target.value; })} /></Field></Panel></>;
}

function Team({ state }: { state: TeamGameState }) {
  return <><h1>YOUR TEAM / ทีมของคุณ</h1><div className="card-grid">{state.resources.filter((resource) => resource.kind === "internal").map((resource, index) => <Panel key={resource.id}><div className={`avatar a${index}`}>{resource.name[0]}</div><h2>{resource.name}</h2><p>{resource.skills.join(" · ")}</p><CapacityBar used={0} available={6} /></Panel>)}</div></>;
}

function Chaos({ state, update }: { state: TeamGameState; update: UpdateTeamState }) {
  return <><h1>CHAOS PLANNING</h1><div className="three-grid">{([['tasks', 'WHAT SHOULD WE DO? / เราควรทำอะไร?'], ['owners', 'WHO MIGHT DO IT? / ใครน่าจะทำ?'], ['unknowns', 'WHAT DO WE NEED TO KNOW? / เรายังต้องรู้อะไร?']] as const).map(([key, label]) => <Field key={key} label={label}><textarea rows={10} value={state.chaos[key]} onChange={(event) => update((next) => { next.chaos[key] = event.target.value; })} /></Field>)}</div></>;
}

function Sponsor({ state, update }: { state: TeamGameState; update: UpdateTeamState }) {
  const [question, setQuestion] = useState(""); const [answer, setAnswer] = useState(""); const [kind, setKind] = useState<"fact" | "assumption" | "unknown">("unknown");
  const save = () => { if (!question.trim() || !answer.trim() || !state.questionTokensRemaining) return; update((next) => { next.sponsorQA.push({ id: crypto.randomUUID(), question, answer, factOrAssumption: kind }); next.questionTokensRemaining--; }); setQuestion(""); setAnswer(""); };
  return <><h1>ASK SPONSOR</h1><div className="coins" aria-label={`${state.questionTokensRemaining} of 5 question tokens remaining`}><span className="coin-label">QUESTION TOKENS</span><div className="coin-row">{Array.from({ length: 5 }, (_, index) => { const available = index < state.questionTokensRemaining; return <span className={`question-coin ${available ? "on" : "off"}`} title={available ? "Available question token" : "Used question token"} key={index}>{available ? "Q" : "×"}</span>; })}</div><strong>{state.questionTokensRemaining}/5</strong></div><Panel><Field label="QUESTION / คำถาม"><textarea value={question} onChange={(event) => setQuestion(event.target.value)} /></Field><p className="callout">กรุณาถาม Facilitator โดยตรง</p><Field label="SPONSOR ANSWER / คำตอบ"><textarea value={answer} onChange={(event) => setAnswer(event.target.value)} /></Field><Field label="FACT OR ASSUMPTION?"><select value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}><option value="unknown">Unknown</option><option value="fact">Fact / ข้อมูลจริง</option><option value="assumption">Assumption / สมมติฐาน</option></select></Field><PixelButton onClick={save} disabled={!question.trim() || !answer.trim() || !state.questionTokensRemaining}>SAVE Q&A / บันทึก (−1 TOKEN)</PixelButton></Panel>{state.sponsorQA.map((item) => <Panel key={item.id} title={item.factOrAssumption.toUpperCase()}><strong>Q: {item.question}</strong><p>A: {item.answer}</p></Panel>)}</>;
}

function Goal({ state, update }: { state: TeamGameState; update: UpdateTeamState }) {
  const labels = { goal: "Mission Goal / เป้าหมาย", inScope: "In Scope / ในขอบเขต", outOfScope: "Out of Scope / นอกขอบเขต", deliverables: "Deliverables / สิ่งส่งมอบ", successCriteria: "Success Criteria / เกณฑ์ความสำเร็จ", stakeholders: "Stakeholders / ผู้เกี่ยวข้อง", constraints: "Constraints / ข้อจำกัด", assumptions: "Assumptions / สมมติฐาน" } as const;
  return <><h1>GOAL & SCOPE</h1><div className="two-grid">{Object.entries(labels).map(([key, label]) => <Field key={key} label={label}><textarea value={state.missionDefinition[key as keyof typeof labels]} onChange={(event) => update((next) => { next.missionDefinition[key as keyof typeof labels] = event.target.value; })} /></Field>)}</div><Panel title="MISSION APPROVAL / การอนุมัติ"><select value={state.missionApproval.status} onChange={(event) => update((next) => { if (event.target.value === "revise") next.missionApproval.reworkCount++; next.missionApproval.status = event.target.value as typeof next.missionApproval.status; })}><option value="not_requested">Not requested</option><option value="approved">Approved / อนุมัติ</option><option value="conditional">Approved with condition</option><option value="revise">Revise / กลับไปแก้</option></select><textarea placeholder="เงื่อนไขหรือหมายเหตุ" value={state.missionApproval.notes} onChange={(event) => update((next) => { next.missionApproval.notes = event.target.value; })} /></Panel></>;
}

const applyTaskPriority = (task: Task, priority: TaskPriority) => {
  task.priority = priority;
  if (priority === "drop") {
    task.status = "dropped";
    task.budgetStatus = "excluded";
  } else if (task.status === "dropped") {
    task.status = "not_started";
    task.budgetStatus = task.cost > 0 ? "undecided" : "included";
  }
};

function Priority({ state, update }: { state: TeamGameState; update: UpdateTeamState }) {
  const moveTask = (taskId: string, priority: TaskPriority) => update((next) => {
    const task = next.tasks.find((item) => item.id === taskId);
    if (task) {
      applyTaskPriority(task, priority);
      if (priority === "drop") next.allocations = next.allocations.filter((allocation) => allocation.taskId !== taskId);
    }
    next.planLocked = false;
  });
  return <>
    <h1>PRIORITY BATTLE</h1>
    <div className="mechanic-note"><strong>Priority บอกความสำคัญ ไม่ได้กำหนดวันทำงานหรือวิธีจ้าง</strong><span>DUE BY เป็นเส้นตาย ส่วนวันเสร็จจริงจะคำนวณจาก Allocation ในหน้า Schedule</span></div>
    <BudgetPanel state={state} update={update} />
    <div className="priority-board">{zones.map(([zone, label]) => <Panel key={zone} title={label}>
      {state.tasks.filter((task) => task.priority === zone).map((task) => <TaskMini key={task.id} task={task} update={update} />)}
      <select aria-label={`Add task to ${label}`} value="" onChange={(event) => moveTask(event.target.value, zone)}>
        <option value="">+ ADD TASK</option>
        {state.tasks.filter((task) => task.priority !== zone).map((task) => <option key={task.id} value={task.id}>{task.id} · {task.title.th} · {task.effortHours}H · Due By D{task.dueDay}</option>)}
      </select>
    </Panel>)}</div>
    <Panel title="UNASSIGNED / ยังไม่เลือก Priority">{state.tasks.filter((task) => task.priority === "unassigned").map((task) => <TaskMini key={task.id} task={task} update={update} />)}</Panel>
  </>;
}

function TaskMini({ task, update }: { task: Task; update: UpdateTeamState }) {
  const setTask = (fn: (task: Task) => void) => update((next) => { const target = next.tasks.find((item) => item.id === task.id); if (target) fn(target); next.planLocked = false; });
  return <article className="task-card">
    <strong>{task.id} · {task.title.th}</strong><small>{task.title.en}</small>
    <div className="task-facts"><span>EFFORT {task.effortHours}H</span><span>DUE BY D{task.dueDay}</span><span>COST ฿{task.cost.toLocaleString()}</span></div>
    <p className="task-skills">SKILLS: {task.preferredSkills.join(", ")}</p>
    <p className="task-deps">DEPENDENCIES: {task.dependencies.length ? task.dependencies.join(", ") : "ไม่มี — ทำคู่ขนานกับงานอื่นได้"}</p>
    {task.cost > 0 && task.priority !== "drop" && <Field label="นำค่าใช้จ่ายนี้เข้าแผนหรือไม่"><select value={task.budgetStatus} onChange={(event) => setTask((target) => { target.budgetStatus = event.target.value as Task["budgetStatus"]; })}><option value="undecided">ยังไม่ตัดสินใจ</option><option value="included">รวมในแผน</option><option value="excluded">ไม่นำมาคิดในแผน</option></select></Field>}
    <select aria-label={`Priority for ${task.id}`} value={task.priority} onChange={(event) => update((next) => { const target = next.tasks.find((item) => item.id === task.id); if (!target) return; const priority = event.target.value as TaskPriority; applyTaskPriority(target, priority); if (priority === "drop") next.allocations = next.allocations.filter((allocation) => allocation.taskId !== task.id); next.planLocked = false; })}>
      <option value="unassigned">ยังไม่เลือก Priority</option>{zones.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
    </select>
    {(task.priority === "must" || task.priority === "drop") && <input placeholder={task.priority === "must" ? "ทำไมงานนี้จึงเป็น Must Do?" : "เหตุผลที่ตัดออกจากขอบเขต"} value={task.priorityReason} onChange={(event) => setTask((target) => { target.priorityReason = event.target.value; })} />}
  </article>;
}

function Plan({ state, update }: { state: TeamGameState; update: UpdateTeamState }) {
  const [taskId, setTaskId] = useState("T01"); const [resourceId, setResourceId] = useState("may"); const [day, setDay] = useState(1); const [hours, setHours] = useState(1);
  const plannableTasks = state.tasks.filter((item) => item.priority !== "drop" && item.status !== "dropped").sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority] || a.dueDay - b.dueDay);
  const task = plannableTasks.find((item) => item.id === taskId) ?? plannableTasks[0] ?? state.tasks[0]; const resource = state.resources.find((item) => item.id === resourceId) ?? state.resources[0];
  const required = getEffectiveEffort(state, task.id); const allocated = getAllocatedEffort(state, task.id); const remaining = Math.max(required - allocated, 0); const used = getUsedHours(state, resource.id, day); const available = getAvailableHours(state, resource.id, day); const skillMatch = task.preferredSkills.includes("Mixed") || task.preferredSkills.some((skill) => resource.skills.includes(skill));
  const plannedFinish = getTaskPlannedFinishDay(state, task.id); const planStatus = getTaskPlanStatus(state, task.id); const dependencyIssues = getDependencyPlanIssues(state, task.id, day);
  const add = () => { if (!hours || hours < .5) return; update((next) => { next.allocations.push({ id: crypto.randomUUID(), taskId, resourceId, day, hours, source: "internal" }); next.planLocked = false; }); setHours(0); };
  return <>
    <h1>RESOURCE & SCHEDULE PLAN</h1>
    <div className="mechanic-note"><strong>Planned Finish คำนวณจากวันที่ Allocation สะสมครบ Effort</strong><span>งานที่ไม่มี Dependency ทำคู่ขนานกันได้ ส่วนงานที่รองานอื่นจะตรวจจากแผนจริง ไม่ใช้ Due By เป็นวันเสร็จ</span></div>
    <BudgetPanel state={state} update={update} />
    <Panel title="ADD ALLOCATION / จัดสรรชั่วโมง"><div className="allocation-form">
      <select value={task.id} onChange={(event) => setTaskId(event.target.value)}>{plannableTasks.map((item) => <option key={item.id} value={item.id}>[{item.priority.toUpperCase()}] {item.id} · {item.title.th} · {getEffectiveEffort(state, item.id)}H · {planStatusLabels[getTaskPlanStatus(state, item.id)]}</option>)}</select>
      <select value={resourceId} onChange={(event) => setResourceId(event.target.value)}>{state.resources.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.skills.join("/")}</option>)}</select>
      <select value={day} onChange={(event) => setDay(+event.target.value)}>{Array.from({ length: 10 }, (_, index) => <option key={index} value={index + 1}>Day {index + 1}</option>)}</select>
      <input aria-label="จำนวนชั่วโมง" type="number" min="0" step="0.5" value={hours} onChange={(event) => setHours(+event.target.value)} />
      <PixelButton onClick={add} disabled={hours < .5}>ALLOCATE / จัดสรร</PixelButton>
    </div></Panel>
    <div className="planning-context">
      <Panel title="SELECTED TASK / งานที่เลือก"><div className="task-heading-row"><h3>{task.id} · <Bilingual {...task.title} /></h3><Badge tone={planStatus === "planned" || planStatus === "done" ? "green" : planStatus === "at_risk" ? "orange" : planStatus === "waiting" ? "purple" : "yellow"}>{planStatusLabels[planStatus]}</Badge></div>
        <div className="context-metrics"><span>ต้องใช้ <strong>{required}H</strong></span><span>จัดสรรแล้ว <strong>{allocated}H</strong></span><span>เหลือ <strong>{remaining}H</strong></span><span>Planned Finish <strong>{plannedFinish ? `D${plannedFinish}` : "—"}</strong></span><span>Due By <strong>D{task.dueDay}</strong></span></div>
        <p>PRIORITY: {task.priority.toUpperCase()}</p><p>SKILLS: {task.preferredSkills.join(", ")}</p><p>DEPENDENCIES: {task.dependencies.length ? task.dependencies.join(", ") : "ไม่มี — ทำคู่ขนานได้"}</p>
        {task.cost > 0 && <Badge tone={task.budgetStatus === "included" ? "green" : task.budgetStatus === "excluded" ? "muted" : "orange"}>BUDGET: {task.budgetStatus === "included" ? "รวมในแผน" : task.budgetStatus === "excluded" ? "ไม่นำมาคิด" : "ยังไม่ตัดสินใจ"}</Badge>}
        {dependencyIssues.map((issue) => <p className="dependency-warning" key={issue.dependencyId}><strong>{issue.dependencyId}</strong>: {issue.kind === "timing" ? `วางแผนเสร็จ D${issue.plannedFinishDay} งานนี้จึงเริ่มได้เร็วสุด D${issue.earliestStartDay}` : issue.kind === "dropped" ? "งานต้นทางถูกตัดออกจากขอบเขต" : `ยังจัดสรรไม่ครบ ${issue.allocated}/${issue.required}H`}</p>)}
        {day > task.dueDay && <p className="form-warning">วันที่เลือกช้ากว่า Due By ของ Task นี้</p>}
        {plannedFinish !== null && plannedFinish > task.dueDay && <p className="form-warning">แผนปัจจุบันเสร็จ D{plannedFinish} ซึ่งช้ากว่า Due By D{task.dueDay}</p>}
        {allocated > required && <p className="form-warning">จัดสรรเกิน Effort ที่ต้องใช้ {allocated - required} ชั่วโมง</p>}
      </Panel>
      <Panel title="SELECTED RESOURCE / คนที่เลือก"><h3>{resource.name}</h3><p>SKILLS: {resource.skills.join(", ")}</p><CapacityBar used={used} available={available} /><p>Day {day}: ใช้แล้ว {used}H · เหลือ {Math.max(available - used, 0)}H</p>{!skillMatch && <p className="form-warning">Skill ไม่ตรงกับงานโดยตรง แต่ยังสามารถมอบหมายได้</p>}{used > available && <p className="form-warning">ชั่วโมงที่ Allocate แล้วเกิน Capacity {used - available} ชั่วโมง</p>}</Panel>
    </div>
    <div className="schedule"><div />{Array.from({ length: 10 }, (_, index) => <strong key={index}>D{index + 1}</strong>)}{state.resources.map((item) => <div className="schedule-row" key={item.id}><strong><span>{item.name}</span><small>{item.skills.slice(0, 2).join("/")}</small></strong>{Array.from({ length: 10 }, (_, index) => { const date = index + 1; return <CapacityBar key={date} used={getUsedHours(state, item.id, date)} available={getAvailableHours(state, item.id, date)} />; })}</div>)}</div>
    <Panel title="ALLOCATIONS / ชั่วโมงที่จัดสรร">{state.allocations.length === 0 && <p>ยังไม่มีการจัดสรรชั่วโมง</p>}{state.allocations.map((allocation) => { const allocatedTask = state.tasks.find((item) => item.id === allocation.taskId); const allocatedResource = state.resources.find((item) => item.id === allocation.resourceId); return <div className="list-row" key={allocation.id}><span><strong>{allocation.taskId}</strong> {allocatedTask?.title.th} · {allocatedResource?.name} · D{allocation.day} · {allocation.hours}H</span><PixelButton variant="ghost" onClick={() => update((next) => { next.allocations = next.allocations.filter((item) => item.id !== allocation.id); next.planLocked = false; })}>REMOVE / ลบ</PixelButton></div>; })}</Panel>
  </>;
}

function Market({ state, update, goTo }: { state: TeamGameState; update: UpdateTeamState; goTo: (tab: number) => void }) {
  const changeVendor = (vendorId: string, action: "add" | "remove") => update((next) => { const vendor = next.vendors.find((item) => item.id === vendorId); if (!vendor) return; vendor.planStatus = action === "add" ? "planned" : "available"; next.planLocked = false; if (vendorId === "V06") next.networkRisk = action === "remove" && next.appliedEventCodes.includes("E01"); if (vendorId === "V12" && next.cateringCutoffDay) next.postCutoffIncreaseLimit = action === "add" ? .3 : .1; });
  const vendorCards = state.vendors.filter((vendor) => vendor.unlocked).map((vendor) => ({ vendor, openTasks: getVendorSupportedOpenTasks(state, vendor) }))
    .sort((a, b) => b.openTasks.length - a.openTasks.length || a.vendor.id.localeCompare(b.vendor.id));
  const recommendedCount = vendorCards.filter(({ vendor, openTasks }) => vendor.planStatus === "available" && openTasks.length > 0).length;
  return <>
    <h1>VENDOR MARKETPLACE</h1>
    <div className="mechanic-note"><strong>Vendor ใช้เติม Skill หรือ Capacity gap ที่พบจาก Schedule</strong><span>ระบบแนะนำจาก Task ที่ยังจัดสรรไม่ครบ แต่ผู้เล่นยังเป็นผู้ตัดสินใจว่าจะจ้างหรือปรับแผนภายใน</span></div>
    <BudgetPanel state={state} update={update} />
    <div className="vendor-recommendation-summary"><strong>RECOMMENDED FOR YOUR PLAN / แนะนำสำหรับแผนนี้</strong><span>{recommendedCount} Vendor ที่ตรงกับ Task ซึ่งยังมีชั่วโมงคงเหลือ</span></div>
    <PlanReview state={state} update={update} />
    <div className="card-grid vendor-grid">{vendorCards.map(({ vendor, openTasks }) => <Panel key={vendor.id} title={`${vendor.id} · ${vendor.category}`} className={openTasks.length ? "vendor-recommended" : ""}>
      <div className="vendor-title-row"><h2><Bilingual {...vendor.name} /></h2>{openTasks.length > 0 && <Badge tone="purple">RECOMMENDED</Badge>}</div>
      <strong className="vendor-price">฿{vendor.cost.toLocaleString()}</strong><p>{vendor.benefit.th}</p><small>COORDINATION: {vendor.coordination}</small>
      {openTasks.length > 0 ? <div className="vendor-task-match"><strong>ช่วย Task ที่ยังวางแผนไม่ครบ</strong><span>{openTasks.slice(0, 4).map((task) => `${task.id} ${task.priority === "must" ? "· MUST" : ""}`).join(" · ")}</span></div> : <p className="vendor-no-match">ยังไม่พบ Task gap ที่ตรงกับ Vendor นี้ในแผนปัจจุบัน</p>}
      <div className="vendor-action">{vendor.planStatus === "available" && <PixelButton onClick={() => changeVendor(vendor.id, "add")}>ADD TO PLAN / เพิ่มในแผน</PixelButton>}{vendor.planStatus === "planned" && <><Badge tone="yellow">IN PLAN / อยู่ในแผน</Badge><PixelButton variant="ghost" onClick={() => changeVendor(vendor.id, "remove")}>REMOVE / นำออก</PixelButton></>}{vendor.planStatus === "committed" && <><Badge tone="green">COMMITTED / ยืนยันจ้างแล้ว</Badge><p className="committed-note">หากต้องการยกเลิก ให้บันทึกเหตุผลและข้อเสนอใน Decision Request</p><PixelButton variant="ghost" onClick={() => goTo(10)}>ไปที่ DECISION REQUEST</PixelButton></>}</div>
    </Panel>)}</div>
  </>;
}

function Control({ state, update, summary }: { state: TeamGameState; update: UpdateTeamState; summary: ReturnType<typeof getSummary> }) {
  const budget = getBudgetBreakdown(state);
  return <><h1>MISSION CONTROL</h1><BudgetPanel state={state} update={update} /><div className="stats">{Object.entries(summary).map(([key, value]) => <Panel key={key}><strong>{value}</strong><span>{key}</span></Panel>)}<Panel><strong className={budget.overBudget ? "warning" : ""}>{Math.abs(budget.remaining).toLocaleString()}</strong><span>{budget.overBudget ? "Over Budget" : "Budget Remaining"}</span></Panel></div><Field label="MISSION STATUS"><select value={state.missionStatus} onChange={(event) => update((next) => { next.missionStatus = event.target.value as typeof next.missionStatus; })}><option value="on_track">ON TRACK</option><option value="at_risk">AT RISK</option><option value="critical">CRITICAL</option></select></Field>{state.tasks.map((task) => { const unmet = getUnmetDependencies(state, task.id); const effort = getEffectiveEffort(state, task.id); const allocated = getAllocatedEffort(state, task.id); return <article className="tracking-row" key={task.id}><strong>{task.id}</strong><span><Bilingual {...task.title} /></span><span>{allocated}/{effort}H · DUE D{task.dueDay}</span>{unmet.length > 0 && <Badge tone="orange">DEPENDENCY: {unmet.join(", ")}</Badge>}<select value={task.status} onChange={(event) => update((next) => { const target = next.tasks.find((item) => item.id === task.id)!; target.status = event.target.value as typeof task.status; if (target.status === "dropped") target.budgetStatus = "excluded"; next.planLocked = false; })}>{statuses.map((status) => <option key={status}>{status}</option>)}</select><input placeholder="Issue / ประเด็น" value={task.issue} onChange={(event) => update((next) => { next.tasks.find((item) => item.id === task.id)!.issue = event.target.value; })} /><input placeholder="Next action" value={task.nextAction} onChange={(event) => update((next) => { next.tasks.find((item) => item.id === task.id)!.nextAction = event.target.value; })} /></article>; })}</>;
}

function EventInbox({ state, setState, setModal }: { state: TeamGameState; setState: React.Dispatch<React.SetStateAction<TeamGameState>>; setModal: (value: string) => void }) {
  const [code, setCode] = useState(""); const [message, setMessage] = useState("");
  const submit = () => { const result = applyEvent(state, code); if (result.error) { setMessage(result.error === "invalid" ? "ไม่พบรหัสเหตุการณ์" : "ใช้เหตุการณ์นี้แล้ว"); return; } setState(result.state); const event = events.find((item) => item.code === code.toUpperCase()); setModal(`${event?.code} — ${event?.title.th} / ${event?.title.en}`); setMessage(""); setCode(""); };
  return <><h1>EVENT INBOX / รับเหตุการณ์</h1><Panel><div className="event-entry"><input placeholder="E03" value={code} maxLength={3} onChange={(event) => setCode(event.target.value.toUpperCase())} /><PixelButton onClick={submit}>RECEIVE EVENT / รับเหตุการณ์</PixelButton></div>{message && <p className="warning">{message}</p>}</Panel>{state.appliedEventCodes.map((eventCode) => { const event = events.find((item) => item.code === eventCode)!; return <Panel key={eventCode} title={`${eventCode} · ${event.title.th} / ${event.title.en}`}><p>{event.announcement.th}</p><p>{event.announcement.en}</p><Badge tone="purple">{event.type.toUpperCase()}</Badge></Panel>; })}</>;
}

function Decisions({ state, update }: { state: TeamGameState; update: UpdateTeamState }) {
  const empty = { situation: "", recommendation: "", impact: "", decisionNeeded: "", sponsorResponse: "", notes: "" }; const [form, setForm] = useState(empty);
  const save = () => { if (!form.situation) return; update((next) => next.decisions.push({ ...form, id: crypto.randomUUID(), day: next.currentDay, createdAt: new Date().toISOString() } as Decision)); setForm(empty); };
  return <><h1>DECISION REQUEST / ขอการตัดสินใจ</h1><Panel><div className="two-grid">{Object.keys(empty).map((key) => <Field key={key} label={key.replace(/[A-Z]/g, (match) => ` ${match}`).toUpperCase()}><textarea value={form[key as keyof typeof form]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} /></Field>)}</div><PixelButton onClick={save}>REQUEST DECISION / บันทึก</PixelButton></Panel>{state.decisions.map((decision) => <Panel key={decision.id} title={`DAY ${decision.day} · ${decision.sponsorResponse || "PENDING"}`}><strong>{decision.situation}</strong><p>RECOMMENDATION: {decision.recommendation}</p></Panel>)}</>;
}

function Final({ state, update }: { state: TeamGameState; update: UpdateTeamState }) {
  const labels = { missionResult: "Mission Result / ผลภารกิจ", delivered: "Delivered / ส่งมอบแล้ว", notDelivered: "Not Delivered / ยังไม่ส่งมอบ", biggestDecision: "Biggest Decision", biggestRisk: "Biggest Risk", doDifferently: "What We Would Do Differently" } as const; const [error, setError] = useState("");
  return <><h1>FINAL MISSION REVIEW</h1><BudgetPanel state={state} update={update} /><Panel>{Object.entries(labels).map(([key, label]) => <Field key={key} label={label}><textarea disabled={state.finalReview.locked} value={state.finalReview[key as keyof typeof labels] as string} onChange={(event) => update((next) => { (next.finalReview[key as keyof typeof labels] as string) = event.target.value; })} /></Field>)}<div className="button-row"><PixelButton disabled={state.finalReview.locked} onClick={() => update((next) => { next.finalReview.locked = true; })}>LOCK FINAL REVIEW / ยืนยัน</PixelButton><PixelButton variant="secondary" onClick={() => exportTeamState(state)}>EXPORT JSON</PixelButton><label className="pixel-button ghost">IMPORT JSON<input hidden type="file" accept="application/json" onChange={async (event) => { try { const file = event.target.files?.[0]; if (file) { const imported = await importTeamState(file); update((next) => Object.assign(next, imported)); } } catch { setError("ไฟล์ไม่ถูกต้อง"); } }} /></label></div>{error && <p className="warning">{error}</p>}</Panel></>;
}
