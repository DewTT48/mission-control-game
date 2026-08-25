import { Badge, Panel, PixelButton } from "../../components/ui";
import { getPlanReview } from "../../engine/calculations";
import { canCommitPlan, commitPlan } from "../../engine/planning";
import type { TeamGameState } from "../../types/game";
import type { UpdateTeamState } from "./PlanningBudget";

export function PlanReview({ state, update }: { state: TeamGameState; update: UpdateTeamState }) {
  const review = getPlanReview(state);
  const canCommit = canCommitPlan(state);
  const pendingVendors = state.vendors.filter((vendor) => vendor.planStatus === "planned").length;

  const lockPlan = () => {
    if (!canCommit) return;
    const issueMessage = review.issueCount > 0
      ? `แผนยังมีประเด็นที่ควรทบทวน ${review.issueCount} รายการ ต้องการยืนยันแผนและรับความเสี่ยงเหล่านี้หรือไม่?`
      : "แผนผ่านการตรวจเบื้องต้น ต้องการยืนยันแผนและ Commit Vendor หรือไม่?";
    if (!window.confirm(issueMessage)) return;
    update((next) => { commitPlan(next); });
  };

  return <Panel title="PLAN REVIEW / ตรวจสอบแผนก่อนยืนยัน" className="plan-review">
    <div className="review-metrics">
      <div className={review.mustUnplanned.length ? "review-warn" : "review-ok"}><strong>{review.mustUnplanned.length}</strong><span>Must Do ยังไม่ครบ</span></div>
      <div className={review.dependencyConflicts.length ? "review-warn" : "review-ok"}><strong>{review.dependencyConflicts.length}</strong><span>Dependency Conflict</span></div>
      <div className={review.overCapacity.length ? "review-warn" : "review-ok"}><strong>{review.overCapacity.length}</strong><span>เกิน Capacity</span></div>
      <div className={review.plannedLate.length ? "review-warn" : "review-ok"}><strong>{review.plannedLate.length}</strong><span>เสร็จเกิน Due By</span></div>
      <div className={review.overAllocated.length ? "review-warn" : "review-ok"}><strong>{review.overAllocated.length}</strong><span>จัดสรรเกิน Effort</span></div>
      <div className={review.attendanceGaps.length ? "review-warn" : "review-ok"}><strong>{review.attendanceGaps.length}</strong><span>Package ต่ำกว่า Forecast</span></div>
      <div className={review.unassignedPriority.length ? "review-warn" : "review-ok"}><strong>{review.unassignedPriority.length}</strong><span>ยังไม่เลือก Priority</span></div>
    </div>

    {review.issueCount === 0
      ? <p className="review-clear">✓ ไม่พบความขัดแย้งสำคัญในแผนปัจจุบัน</p>
      : <details className="review-details" open>
        <summary>ดูประเด็นที่ควรทบทวน {review.issueCount} รายการ</summary>
        {review.mustUnplanned.map((task) => <p key={`must-${task.id}`}><strong>{task.id}</strong> เป็น Must Do แต่ยังจัดสรรชั่วโมงไม่ครบ</p>)}
        {review.unassignedPriority.map((task) => <p key={`priority-${task.id}`}><strong>{task.id}</strong> ยังไม่ได้เลือก Priority</p>)}
        {review.dependencyConflicts.map(({ task, issue }) => <p key={`dep-${task.id}-${issue.dependencyId}`}><strong>{task.id}</strong> ขัดกับ {issue.dependencyId}: {issue.kind === "timing" ? `เริ่มได้เร็วสุด D${issue.earliestStartDay}` : issue.kind === "dropped" ? "งานต้นทางถูกตัดออก" : `งานต้นทางจัดสรร ${issue.allocated}/${issue.required}H`}</p>)}
        {review.plannedLate.map((task) => <p key={`late-${task.id}`}><strong>{task.id}</strong> วางแผนเสร็จหลัง Due By D{task.dueDay}</p>)}
        {review.overAllocated.map((task) => <p key={`over-task-${task.id}`}><strong>{task.id}</strong> จัดสรรชั่วโมงเกิน Effort ที่ต้องใช้</p>)}
        {review.attendanceGaps.map(({ task, option }) => <p key={`attendance-${task.id}`}><strong>{task.id}</strong> Package ปัจจุบันรองรับ {option.attendanceCapacity} คน ต่ำกว่า Forecast</p>)}
        {review.overCapacity.map(({ resource, day, used, available }) => <p key={`capacity-${resource.id}-${day}`}><strong>{resource.name} D{day}</strong> ใช้ {used}/{available}H</p>)}
      </details>}

    <div className="commit-plan-row">
      <div>{state.planLocked ? <Badge tone="green">✓ PLAN COMMITTED / ยืนยันแผนแล้ว</Badge> : <Badge tone={review.issueCount ? "yellow" : "green"}>PLAN DRAFT / แผนฉบับร่าง</Badge>}<small>{pendingVendors > 0 ? ` มี Vendor รอ Commit ${pendingVendors} รายการ` : ""}</small></div>
      <PixelButton onClick={lockPlan} disabled={!canCommit || (state.planLocked && pendingVendors === 0)}>LOCK PLAN & COMMIT / ยืนยันแผนและ Vendor</PixelButton>
    </div>
    {!canCommit && <p className="form-warning">แผนเกินวงเงิน กรุณาบันทึกเหตุผลและแนวทางจัดการงบเกินก่อนยืนยัน</p>}
  </Panel>;
}
