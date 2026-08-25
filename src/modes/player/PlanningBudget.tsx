import { getBudgetBreakdown } from "../../engine/calculations";
import type { TeamGameState } from "../../types/game";
import { Field, Panel } from "../../components/ui";

export type UpdateTeamState = (fn: (state: TeamGameState) => void) => void;

export function BudgetPanel({ state, update }: { state: TeamGameState; update: UpdateTeamState }) {
  const budget = getBudgetBreakdown(state);

  return <Panel title="BUDGET PLAN / แผนงบประมาณ" className="budget-panel">
    <div className="budget-metrics">
      <div><span>วงเงิน / LIMIT</span><strong>฿{state.budgetCeiling.toLocaleString()}</strong></div>
      <div><span>ค่า Task</span><strong>฿{budget.taskCost.toLocaleString()}</strong></div>
      <div><span>ค่า Vendor</span><strong>฿{budget.vendorCost.toLocaleString()}</strong></div>
      <div><span>ตามแผน / PLANNED</span><strong>฿{budget.plannedSpend.toLocaleString()}</strong></div>
      <div className={budget.overBudget ? "budget-over" : "budget-ok"}><span>{budget.overBudget ? "เกินวงเงิน / OVER" : "คงเหลือ / REMAINING"}</span><strong>฿{Math.abs(budget.remaining).toLocaleString()}</strong></div>
    </div>

    {budget.overBudget && <div className="budget-warning" role="alert">
      <strong>แผนปัจจุบันเกินวงเงินที่ได้รับอนุมัติ {Math.abs(budget.remaining).toLocaleString()} บาท</strong>
      <span>ทบทวนขอบเขต นำรายการออกจากแผน เปลี่ยน Vendor หรือส่ง Decision Request พร้อมข้อเสนอของทีม</span>
    </div>}

    {budget.overBudget && <Field label="เหตุผลและแนวทางจัดการงบเกิน / BUDGET RATIONALE">
      <textarea rows={3} value={state.budgetRationale} placeholder="อธิบายเหตุผล ผลกระทบ และสิ่งที่ทีมเสนอให้ตัดสินใจ..." onChange={(event) => update((next) => { next.budgetRationale = event.target.value; })} />
    </Field>}

    <details className="budget-details">
      <summary>ดูรายละเอียดค่าใช้จ่าย / VIEW BREAKDOWN</summary>
      <div className="budget-columns">
        <div><h4>TASK COSTS</h4>{budget.taskItems.length === 0 ? <p>ยังไม่มี Task ที่เลือกเข้าแผน</p> : budget.taskItems.map((task) => <p key={task.id}><span>{task.id} · {task.title.th}</span><strong>฿{task.cost.toLocaleString()}</strong></p>)}</div>
        <div><h4>VENDOR COSTS</h4>{budget.vendorItems.length === 0 ? <p>ยังไม่มี Vendor ในแผน</p> : budget.vendorItems.map((vendor) => <p key={vendor.id}><span>{vendor.id} · {vendor.name.th} <small>({vendor.planStatus === "committed" ? "Commit แล้ว" : "อยู่ในแผน"})</small></span><strong>฿{vendor.cost.toLocaleString()}</strong></p>)}</div>
      </div>
    </details>

  </Panel>;
}

export function PlanningNav({ current, maxTab, goTo }: { current: number; maxTab: number; goTo: (tab: number) => void }) {
  return <nav className="planning-nav" aria-label="Planning workspace">
    <span>PLANNING WORKSPACE</span>
    <button className={current === 5 ? "active" : ""} onClick={() => goTo(5)}>1. PRIORITIZE</button>
    <button className={current === 6 ? "active" : ""} disabled={maxTab < 6} onClick={() => goTo(6)}>2. SCHEDULE</button>
    <button className={current === 7 ? "active" : ""} disabled={maxTab < 7} onClick={() => goTo(7)}>3. SOURCE / VENDOR</button>
  </nav>;
}
