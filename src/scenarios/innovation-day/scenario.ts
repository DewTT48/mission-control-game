import type { GameEvent, Resource, Task, Vendor } from "../../types/game";

const task = (id: string, th: string, en: string, effortHours: number, skills: string[], dueDay: number, cost: number, dependencies: string[], facilitatorClassification: Task["facilitatorClassification"]): Task => ({
  id, title: { th, en }, effortHours, preferredSkills: skills, dueDay, cost, dependencies,
  facilitatorClassification, status: "not_started", priorityZone: "unassigned", priorityReason: "", issue: "", nextAction: "",
});

export const resources: Resource[] = [
  { id: "may", name: "May", skills: ["Project", "Coordination", "Facilitation"], dailyCapacity: 6, kind: "internal" },
  { id: "bank", name: "Bank", skills: ["Design", "Media", "Content"], dailyCapacity: 6, kind: "internal" },
  { id: "ton", name: "Ton", skills: ["IT", "Streaming", "Data"], dailyCapacity: 6, kind: "internal" },
  { id: "fon", name: "Fon", skills: ["Admin", "Procurement", "Logistics"], dailyCapacity: 6, kind: "internal" },
  { id: "ploy", name: "Ploy", skills: ["Communication", "Registration", "Content"], dailyCapacity: 6, kind: "internal" },
];

export const tasks: Task[] = [
  task("T01", "ยืนยันสถานที่จัดงาน", "Confirm Venue", 4, ["Admin", "Coordination"], 2, 0, [], "critical"),
  task("T02", "จัดทำกำหนดการหลักของงาน", "Develop Event Agenda", 6, ["Project", "Communication"], 4, 0, [], "supporting"),
  task("T03", "จัดทำร่างเนื้อหาสำหรับ CEO", "Prepare CEO Content Brief", 6, ["Project", "Content"], 3, 0, [], "critical"),
  task("T04", "ขออนุมัติเนื้อหาจาก CEO Office", "Secure CEO Content Approval", 2, ["Coordination"], 5, 0, ["T03"], "critical"),
  task("T05", "จัดทำระบบลงทะเบียน", "Set Up Registration", 6, ["Registration", "Admin"], 3, 0, [], "critical"),
  task("T06", "ส่งคำเชิญผู้เข้าร่วม", "Send Participant Invitations", 5, ["Communication"], 4, 0, ["T05"], "critical"),
  task("T07", "ออกแบบ Key Visual และ Poster", "Create Key Visual & Poster", 8, ["Design", "Media"], 4, 0, [], "supporting"),
  task("T08", "จัดทำแผนถ่ายทอดสด", "Design Livestream Plan", 8, ["IT", "Streaming"], 4, 0, ["T01"], "critical"),
  task("T09", "ทดสอบ Network และระบบ Streaming", "Conduct Network & Streaming Test", 6, ["IT", "Streaming"], 6, 0, ["T01", "T08"], "critical"),
  task("T10", "ยืนยันอาหารและเครื่องดื่ม", "Confirm Catering", 5, ["Admin", "Procurement"], 6, 42000, [], "supporting"),
  task("T11", "ออกแบบ Innovation Workshop", "Design Innovation Workshop", 8, ["Project", "Facilitation"], 5, 0, [], "critical"),
  task("T12", "จัดเตรียมอุปกรณ์ Workshop", "Produce Workshop Materials", 6, ["Design", "Admin"], 8, 12000, ["T11"], "supporting"),
  task("T13", "จัดเตรียมเวทีและ Backdrop", "Prepare Stage & Backdrop", 6, ["Design", "Logistics"], 8, 18000, ["T07"], "optional"),
  task("T14", "ประสานงาน Production", "Coordinate Production Setup", 5, ["Coordination", "Logistics"], 8, 15000, ["T01"], "supporting"),
  task("T15", "จัดทำ Run of Show", "Create Run of Show", 6, ["Project", "Coordination"], 7, 0, ["T02", "T04", "T11"], "critical"),
  task("T16", "ส่ง Reminder ผู้เข้าร่วม", "Send Participant Reminder", 3, ["Communication"], 9, 0, ["T06"], "supporting"),
  task("T17", "ซ้อมใหญ่", "Full Rehearsal", 12, ["Mixed"], 9, 0, ["T04", "T09", "T15"], "critical"),
  task("T18", "จัดทำแผนสำรอง Streaming", "Create Streaming Backup Plan", 5, ["IT", "Streaming"], 8, 0, ["T08"], "supporting"),
  task("T19", "จัด Photo Booth", "Arrange Photo Booth", 6, ["Design", "Admin"], 9, 12000, [], "optional"),
  task("T20", "จัดเตรียมของที่ระลึก", "Arrange Participant Gifts", 4, ["Admin", "Procurement"], 8, 15000, [], "optional"),
];

const vendor = (id: string, th: string, en: string, category: string, cost: number, benefit: string, coordination: string, availability: Vendor["availability"]): Vendor => ({
  id, name: { th, en }, category, cost, benefit: { th: benefit, en: benefit }, coordination, availability,
  unlocked: availability !== "situational", hired: false,
});

export const vendors: Vendor[] = [
  vendor("V01", "สตูดิโอออกแบบ", "Design Studio", "Communication", 10000, "Design/Media 12 vendor-hours", "Bank/May 2h", "planning"),
  vendor("V02", "ทีมสนับสนุนงานอีเวนต์", "Event Support Crew", "Capacity", 8000, "12h during D7–D10", "1h", "later_planning"),
  vendor("V03", "ทีมช่วยลงทะเบียนชั่วคราว", "Temporary Registration Staff", "Capacity", 6000, "8h during D8–D10", "1h", "later_planning"),
  vendor("V04", "ทีม Runner หน้างาน", "Event Runner Service", "Delivery", 5000, "6h during D6–D10", "1h", "later_planning"),
  vendor("V05", "แพ็กเกจถ่ายทอดสด", "Streaming Production Package", "Technology", 18000, "Streaming 12h + Backup Encoder", "Ton 3h", "planning"),
  vendor("V06", "อัปเกรด Internet", "Internet Upgrade", "Technology", 12000, "Resolve network capacity risk", "None", "situational"),
  vendor("V07", "ชุดอุปกรณ์ AV สำรอง", "AV Backup Kit", "Technology", 8000, "AV backup protection", "None", "situational"),
  vendor("V08", "ระบบลงทะเบียนสำเร็จรูป", "Registration Platform Pro", "Technology", 7000, "T05 effort 6h → 2h", "Included", "planning"),
  vendor("V09", "บริการช่วยสื่อสาร", "Communication Support Package", "Communication", 9000, "Communication 10 vendor-hours", "Ploy 2h", "planning"),
  vendor("V10", "บริการผลิตงานด่วน", "Express Print & Production", "Production", 8000, "Reduce lead time by 1 day", "None", "later_planning"),
  vendor("V11", "ผู้ผลิตสำรอง", "Backup Production Vendor", "Production", 14000, "Transfer delayed production", "+5,000 switching cost", "situational"),
  vendor("V12", "แพ็กเกจอาหารแบบยืดหยุ่น", "Flexible Catering Contract", "Flexibility", 6000, "Post-cutoff increase up to 30%", "Buy before D6", "later_planning"),
  vendor("V13", "ทีมสนับสนุน Workshop", "Workshop Facilitation Support", "Capacity", 9000, "Facilitation 8 vendor-hours", "May 1h", "planning"),
  vendor("V14", "ทีมถ่ายภาพและวิดีโอ", "Photo & Video Crew", "Production", 12000, "E11 effort becomes 2h review", "1h", "later_planning"),
  vendor("V15", "ผู้ช่วยโครงการอิสระ", "Generalist Freelancer", "Capacity", 7000, "General 10h during D2–D9", "1h", "planning"),
  vendor("V16", "ผู้ประสานงานภายนอก", "Project Coordination Service", "Capacity", 9000, "Coordination 10 vendor-hours", "May 1h", "planning"),
];

const event = (code: string, th: string, en: string, type: GameEvent["type"], difficulty: GameEvent["difficulty"], timing: string, announcementTh: string, announcementEn: string, effect: string, notice: string, debrief: string): GameEvent => ({
  code, title: { th, en }, type, difficulty, timing, announcement: { th: announcementTh, en: announcementEn },
  effect: { th: effect, en: effect }, notice: { th: notice, en: notice }, debrief: { th: debrief, en: debrief },
});

export const events: GameEvent[] = [
  event("E01", "Network รองรับไม่พอ", "Network Capacity Problem", "problem", "medium", "D4–D5", "Network ห้องประชุมยังไม่รองรับ Live Streaming อย่างเสถียร", "The venue network cannot support a stable livestream.", "Network risk; unlock V06/V07; T09 at risk", "แก้ความเสี่ยงต่อ Mission ไม่ใช่แค่อาการ", "ทีมแก้ที่อาการ หรือแก้ที่ความเสี่ยงต่อ Mission?"),
  event("E02", "CEO เปลี่ยนวันซ้อม", "CEO Rehearsal Moved", "change", "high", "D6–D7", "CEO ซ้อมได้เฉพาะ Day 7", "The CEO can rehearse only on Day 7.", "T17 due D9 → D7", "ตรวจ T04 + T09 + T15", "ทีมเห็น Dependency ที่กระทบตามมาหรือไม่?"),
  event("E03", "งบประมาณลดลง", "Budget Reduction", "change", "high", "D8–D10", "งบสูงสุดลดเหลือ 95,000 บาท", "The budget ceiling is reduced to THB 95,000.", "Budget ceiling → 95,000", "ตัดสิ่ง Impact ต่ำ ไม่ใช่สิ่งแพงที่สุดเสมอไป", "ตัดสิ่งที่แพงที่สุด หรือตัดสิ่งที่ Impact ต่ำที่สุด?"),
  event("E04", "ผู้เข้าร่วมอาจเพิ่มขึ้น", "Attendance Forecast Increase", "change", "high", "D8–D10", "ผู้เข้าร่วม onsite อาจถึง 210 คน", "Onsite attendance may reach 210.", "Expected attendance → 210", "ทบทวน Venue/Catering/Materials/Staffing", "Change หนึ่งเรื่องกระทบกี่ส่วนของ Plan?"),
  event("E05", "Ton ไม่สามารถทำงานได้", "Ton Unavailable", "problem", "medium", "D4–D5", "Ton ไม่สามารถทำงาน Day 5 ได้", "Ton is unavailable on Day 5.", "Ton D5 capacity → 0h", "หา allocation conflict และ single point of failure", "Plan มี Single Point of Failure หรือไม่?"),
  event("E06", "Production Vendor ส่งงานช้า", "Production Vendor Delay", "problem", "medium", "D6–D8", "งาน Stage/Backdrop ช้า 2 วัน", "Stage/backdrop delivery is delayed by two days.", "T13 delayed; unlock V11", "พิจารณาทางเลือกนอกจากรอ", "ทีมมีทางเลือกอะไรบ้างนอกจากรอ Vendor เดิม?"),
  event("E07", "ข้อเสนอ Streaming Vendor", "Streaming Vendor Offer", "opportunity", "low", "D1–D3", "Vendor เสนอแพ็กเกจ Streaming 18,000 บาท", "A vendor offers the streaming package for THB 18,000.", "Highlight/unlock V05", "เทียบ Capacity และ Risk reduction", "เงิน 18,000 บาทคุ้มกับ Capacity และ Risk Reduction หรือไม่?"),
  event("E08", "ได้คนช่วยชั่วคราว", "Extra Internal Support", "opportunity", "low", "D1–D3", "Corporate Communication ช่วยได้ 6h ใน Day 6", "Corporate Communication can help for 6h on Day 6.", "Add Corp Comms Support resource", "ใช้กับ bottleneck ที่แท้จริง", "Capacity นี้มี Value กับ Bottleneck จริงหรือไม่?"),
  event("E09", "ยอดลงทะเบียนต่ำกว่าเป้า", "Registration Behind Target", "problem", "medium", "D6", "ผู้ยืนยัน onsite เพียง 92 คน", "Only 92 onsite participants are confirmed.", "Confirmed attendance → 92", "Track Outcome ไม่ใช่แค่ Activity", "ทีม Track Activity หรือ Track Outcome?"),
  event("E10", "Catering ปิดยอด", "Catering Cut-off", "problem", "medium", "D7", "ต้อง Final Headcount ใน Day 7", "Final catering headcount is due on Day 7.", "Cut-off D7; +10% or +30% with V12", "ตัดสินใจจากข้อมูลที่ต้องรู้", "ข้อมูลอะไรต้องรู้ก่อน Commit Resource?"),
  event("E11", "ขอ Highlight Video เพิ่ม", "Executive Highlight Video", "change", "high", "D8–D10", "CEO Office ขอ Highlight Video ส่ง Day 11", "CEO Office requests a highlight video by Day 11.", "Add T21 (10h; 2h with V14)", "Accept, negotiate, reject, or outsource", "Requirement ใหม่ทุกอันจำเป็นต้องตอบ Yes หรือไม่?"),
  event("E12", "Deadline Artwork เร็วขึ้น", "Early Artwork Deadline", "change", "medium", "D5–D6", "Final Artwork ต้องส่งไม่เกิน Day 6", "Final artwork must be submitted by Day 6.", "T13 artwork milestone D6; highlight V10", "ตรวจ Buffer ของ External Dependency", "ทีมเผื่อ Buffer แค่ไหน?"),
];

export const sponsorFacts = [
  ["Purpose / เป้าหมาย", "สร้าง employee engagement เรื่อง innovation และแนวคิดที่ต่อยอดได้"],
  ["Success / ความสำเร็จ", "Day 10, งบไม่เกินเพดาน, onsite ≥130, satisfaction ≥80%, usable ideas ≥20"],
  ["Attendance", "150 คือ forecast; 130 onsite คือ minimum; remote 3 สาขาไม่นับใน 130"],
  ["CEO", "กล่าวเปิด 15 นาที; content ที่อ้างถึง CEO ต้องอนุมัติภายใน Day 5"],
  ["Venue", "ห้องประชุมใหญ่สำนักงานใหญ่ ความจุประมาณ 220 คน"],
  ["Livestream", "ต้องถ่ายทอดสดไป 3 สาขา"],
  ["Workshop", "เป็นกิจกรรมหลักและต้องสร้างอย่างน้อย 20 usable ideas"],
  ["Food", "ต้องมี Vegetarian option"],
  ["Nice-to-have", "Photo booth, gifts และการตกแต่งเพิ่มเติม"],
];
