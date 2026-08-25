# คู่มือ Facilitator — Mission Control Game

> เอกสารสำหรับผู้ดำเนินเกมเท่านั้น มี Sponsor Source of Truth, Event Guide และเกณฑ์ให้คะแนน ไม่ควรส่งให้ผู้เล่นก่อนจบกิจกรรม

## 1. บทบาทของ Facilitator

Facilitator ไม่ใช่ผู้เล่นแทนทีมและไม่ใช่ระบบเฉลย หน้าที่หลักคือ:

- จัดจังหวะและรักษาเวลา
- รับบท Sponsor และตอบจาก Source of Truth เดียวกัน
- อนุมัติ Mission และพิจารณา Decision Request
- เลือก Event ให้เหมาะกับพฤติกรรมของทีม
- สังเกตวิธีคิด ไม่ใช่เพียงความสวยของแผน
- ตั้งคำถามให้ทีมเห็นผลกระทบและ Trade-off
- ให้คะแนนจากหลักฐาน
- เชื่อมประสบการณ์ในเกมกับการทำงานจริงผ่าน Debrief

หลักสำคัญ:

> ให้ทีมเป็นเจ้าของการตัดสินใจ Facilitator ควบคุมเงื่อนไขและตั้งคำถาม แต่ไม่ควรแก้แผนให้ทีม

## 2. สิ่งที่เกมต้องการให้ผู้เล่นเรียนรู้

วงจรการทำงานของเกมคือ:

`Clarify → Define → Prioritize → Plan → Allocate → Execute → Track → Communicate → Adapt`

วงจรการเรียนรู้คือ:

`Experience → Debrief → Concept → Replay/Apply`

ผู้เล่นควรได้สัมผัสว่า:

- เริ่มวางแผนก่อนเข้าใจ Outcome ทำให้ทีมทำงานมากแต่ตัดสินใจยาก
- Assumption ที่ไม่ถูกเปิดเผยจะกลายเป็น Scope, Budget หรือ Schedule Risk
- Priority มีความหมายก็ต่อเมื่อเปลี่ยนการใช้คน เวลา และเงิน
- Plan ต้องแสดง Capacity, Dependency, Deadline และ Buffer
- ข้อมูลใหม่ต้องนำไปสู่ Replan ไม่ใช่เพียงรับทราบ
- Status ที่ดีพูดถึง Risk, Impact, Action และ Need
- Escalation ที่ดีมาพร้อมข้อเสนอ ไม่โยนปัญหาให้ Sponsor

## 3. เตรียมการก่อนวันเล่น

## 3.1 อุปกรณ์

- ผู้เล่น 4–6 คนต่อทีม
- Player หนึ่งหน้าจอต่อทีม
- Facilitator Console หนึ่งหน้าจอสำหรับผู้ดำเนินเกม
- จอ Projector หรือช่องทางประกาศเวลาและ Event Code
- กระดาษหรือ Whiteboard สำหรับ Debrief หากต้องการ

## 3.2 ทดสอบระบบ

ก่อนเริ่มอย่างน้อย 15–30 นาที:

1. เปิดเว็บไซต์ใน Browser ที่จะใช้จริง
2. เข้า Player และทดลองบันทึกชื่อทีม
3. เข้า Facilitator ด้วย PIN
4. ทดสอบ Start, Pause และ Reset Timer
5. ทดสอบ Sponsor Notes, Approval, Event Code และ Score
6. ทดสอบ Export/Import JSON
7. Reset ข้อมูลทดสอบก่อนผู้เล่นเข้า

PIN ตั้งต้นของระบบคือ `1995` และเป็นเพียง Local Gate ไม่ใช่ระบบ Authentication สำหรับข้อมูลอ่อนไหว หากใช้เว็บไซต์สาธารณะควรเปลี่ยนค่าใน `src/app/config.ts` ก่อนกิจกรรม

## 3.3 การเปิดสองหน้าต่าง

เปิด Player และ Facilitator คนละหน้าต่างหรือคนละ Browser ได้ แต่ต้องเข้าใจว่า:

- สถานะ Player กับ Facilitator แยกกัน
- ไม่มี Backend และไม่มี Real-time Sync
- Facilitator ต้องพูดคำตอบ/ผลอนุมัติ แล้วผู้เล่นบันทึกในฝั่ง Player
- Add Team Record ใน Facilitator เป็นสมุดบันทึกของ Facilitator ไม่ได้สร้างหรือเชื่อมทีมใน Player
- หากใช้หลายทีมบนเครื่องเดียว ให้แยก Browser Profile หรืออุปกรณ์เพื่อไม่ให้ Player ใช้ Local Storage ชุดเดียวกัน

## 3.4 การออกจาก Facilitator

- **Lock / ล็อกหน้าจอ** ล้าง Session การเข้าถึงและกลับไปหน้าใส่ PIN
- **Exit / ออกจากโหมดวิทยากร** ล้าง Session และกลับหน้าแรก
- Notes และข้อมูล Facilitator ที่บันทึกไว้ยังคงอยู่ใน Local Storage

## 4. โครงสร้าง Facilitator Console

| หน้า | ใช้ทำอะไร | สิ่งที่ควรบันทึก |
|---|---|---|
| Run | เลือก Phase และควบคุม Timer | จังหวะการเล่นและสิ่งที่ต้องสังเกต |
| Sponsor | ดู Source of Truth และบันทึกคำถาม | คำถามที่ทีมใช้และ Assumption สำคัญ |
| Approval | ตัดสิน Mission/Decision Gate | Approved, Conditional หรือ Revise พร้อมเงื่อนไข |
| Events | เลือก Event และดู Facilitator Guide | เหตุผลที่เลือก สิ่งที่เห็น และผลตอบสนอง |
| Status | บันทึก Status Review | Risk, Impact, Action และ Need ของแต่ละทีม |
| Score | ให้คะแนน 5 ด้าน | Evidence ประกอบคะแนน ไม่ใช่คะแนนลอย ๆ |
| Debrief | ใช้คำถามและ Concept สรุปบทเรียน | Insight และพฤติกรรมที่จะนำไปใช้จริง |

## 5. วิธีใช้ Run Controller

1. เลือก Current Phase ให้ตรงกับกิจกรรม
2. ตั้งเวลาตาม Run Sheet หรือเวลาที่ปรับใช้
3. กด Start
4. กด Pause เมื่อต้องหยุดอธิบายหรือรับคำถาม
5. Reset เมื่อต้องเริ่มจับเวลาใหม่

Timer ไม่ควรเป็นเพียงนาฬิกา ให้ใช้สร้างจังหวะ เช่น:

- แจ้งเมื่อเหลือครึ่งเวลา
- แจ้งเมื่อเหลือ 2 นาทีให้ทีมสรุป Decision
- เมื่อหมดเวลาให้หยุดการแก้หน้าจอ แล้วถามเหตุผลก่อน

## 6. Run Sheet แนะนำสำหรับคลาส 6 ชั่วโมง

| เวลา | ช่วง | การดำเนินการ |
|---|---|---|
| 09:00–09:15 | Opening + Team Setup | อธิบาย Mission และตั้งทีม |
| 09:15–09:30 | Chaos Planning | ให้ทีมวางแผนจากข้อมูลตั้งต้น ห้าม Coach |
| 09:30–10:00 | Chaos Debrief | ถาม Success, Scope, Facts และ Assumptions |
| 10:00–10:25 | Ask Sponsor | ให้ทีมใช้ 5 Question Tokens |
| 10:25–10:45 | Define Mission | ทีมกรอก Goal & Scope |
| 10:45–11:00 | Mission Approval Gate | Pitch 60 วินาทีต่อทีม |
| 11:00–11:35 | Priority Battle | เปิด Task Pool และให้จัด Priority |
| 11:35–12:15 | Priority Debrief + Concept | เชื่อม Priority กับ Impact/Dependency |
| 12:15–13:15 | Break | พักกลางวัน |
| 13:15–13:30 | Resource Rules | สอนเฉพาะกฎ Capacity, Split, Vendor และ Overload |
| 13:30–14:15 | Build Resource & Schedule | ทีม Allocate คน วัน ชั่วโมง Vendor และ Budget |
| 14:15–14:30 | Plan Review Gate | Pitch 90 วินาทีต่อทีม |
| 14:30–14:45 | Round 1: D1–D3 | Event ความกดดันต่ำถ้าจำเป็น |
| 14:45–15:00 | Round 2: D4–D5 | Event ด้าน Risk หรือ Capacity |
| 15:00–15:15 | Round 3: D6–D7 | Event ด้าน Critical Path/Outcome |
| 15:15–15:30 | Round 4: D8–D10 | Event ความกดดันสูงหนึ่งเหตุการณ์ |
| 15:30–15:45 | Final Mission Review | ทีมสรุปผลและ Decision สำคัญ |
| 15:45–16:00 | After Action Review | Debrief และ Transfer to Work |

หากมีหลายทีม ให้ขยายเวลา Gate หรือสุ่มฟังบางทีมในแต่ละรอบแล้วหมุนเวียน เพื่อไม่ให้ Simulation หยุดนานเกินไป

## 7. Opening Script

ข้อความเปิดที่แนะนำ:

> วันนี้ผมจะไม่เริ่มจากการสอนวิธีวางแผน พวกคุณจะได้รับโครงการหนึ่งและต้องบริหารให้รอดภายใต้ข้อมูล เวลา คน และเงินที่จำกัด ระบบจะช่วยให้เห็นผลของการตัดสินใจ แต่คำตอบยังเป็นความรับผิดชอบของทีม

ย้ำกับผู้เล่น:

- เกมวัดวิธีคิด ไม่ได้วัดว่าใครกดระบบเร็วที่สุด
- พูดเหตุผลทุกครั้งที่ตัดสินใจเรื่อง Priority, Allocation, Vendor และ Budget
- ข้อมูลใหม่สามารถทำให้คำตอบเดิมไม่เหมาะสมได้
- ผู้เล่นสามารถกลับไปแก้หน้าก่อนหน้าได้
- Over Budget หรือ At Risk ไม่ใช่ความล้มเหลวทันที แต่ต้องมองเห็น อธิบาย และจัดการ

อย่าเปิดเผย:

- Sponsor Source of Truth ทั้งชุด
- จำนวนขั้นต่ำหรือตัวชี้วัดที่ทีมยังไม่ได้ถามพบ
- Event ที่จะใช้
- Facilitator classification ของ Task
- Rubric คะแนนโดยละเอียดก่อนการเล่น หากต้องการสังเกตพฤติกรรมตามธรรมชาติ

## 8. การดำเนินแต่ละช่วง

## 8.1 Chaos Planning

คำสั่ง:

> คุณมีเวลา 15 นาที วางแผนว่าจะทำอย่างไรให้งานนี้สำเร็จจากข้อมูลที่มีอยู่ตอนนี้

สิ่งที่ต้องสังเกต:

- รีบสร้าง Activity หรือ Solution ทันทีหรือไม่
- พูดถึง Success Measure หรือไม่
- Assumption ใดถูกพูดเหมือนเป็น Fact
- แจกงานตามตำแหน่งหรือความสะดวกก่อนเข้าใจ Scope หรือไม่
- ใครมีอิทธิพลต่อการตัดสินใจและเสียงใครหายไป

ห้าม Coach ในช่วงนี้ ให้เก็บตัวอย่างประโยคจริงไว้ใช้ Debrief

คำถาม Debrief:

- Success ของโครงการนี้คืออะไร?
- จำนวนผู้เข้าร่วมที่เห็นเป็น Target, Forecast หรือ Minimum?
- อะไรอยู่ใน Scope?
- รู้อะไรจริง และ Assume อะไร?
- ถ้าต้องตัดงานหนึ่งอย่าง ทีมใช้เกณฑ์อะไร?

Teaching bridge:

> Understand work before planning work.

## 8.2 Ask Sponsor

ทีมมี 5 Tokens ให้ทีมเป็นผู้คิดคำถามเอง ไม่แจก Question List สำเร็จรูป

วิธีตอบ:

- ตอบตาม Source of Truth เท่านั้น
- ตอบตรงคำถาม ไม่ให้ข้อมูลที่ทีมยังไม่ได้ถามโดยไม่จำเป็น
- ถ้าคำถามกว้าง ให้ตอบเท่าที่ถามหรือขอให้ทีมเจาะจง
- ถ้าทีมถาม “ควรเลือก Task ไหน” ให้สะท้อนกลับไปที่ Outcome/Constraint ไม่จัด Priority ให้
- ถ้าข้อมูลไม่มีใน Source of Truth ให้ตอบว่า Unknown หรือให้ทีมเสนอ Assumption เพื่อขออนุมัติ

บันทึก:

- ทีมใช้ Token กับคำถามที่เปลี่ยน Decision หรือไม่
- ทีมถาม Preference ก่อน Requirement หรือไม่
- ทีมบันทึก Fact/Assumption ถูกหรือไม่

## 8.3 Mission Approval Gate

ให้ทีม Pitch ไม่เกิน 60 วินาที ครอบคลุม:

- Goal
- Success Measures
- Must-have / Nice-to-have
- Constraints
- Facts และ Assumptions สำคัญ

ตรวจ 6 ประเด็น:

1. Goal เป็น Outcome ไม่ใช่ Activity
2. Success วัดได้
3. Scope มีขอบเขต
4. Stakeholder สำคัญถูกมองเห็น
5. Constraint หลักถูกสะท้อน
6. Fact กับ Assumption ไม่ปนกัน

ผลอนุมัติ:

- **Approved** ใช้ตัดสินใจและวางแผนได้
- **Conditional** ใช้ต่อได้แต่ต้องแก้เงื่อนไขที่ระบุ
- **Revise** ยังคลุมเครือจนเสี่ยงต่อแผน

อย่าเขียน Goal ให้ทีม ควรใช้คำถาม เช่น:

- “ประโยคนี้บอกได้อย่างไรว่าสำเร็จแล้ว?”
- “ถ้างบลด สิ่งใดใน Goal ต้องได้รับการปกป้อง?”
- “คำไหนในประโยคนี้ยังวัดไม่ได้?”

## 8.4 Priority Battle

ให้ทีมจัด Must, Should, Could, Drop และอธิบาย Top 5

ย้ำว่า Priority เป็น Input ให้การวางแผน ไม่ใช่การล็อกวันหรือ Vendor อัตโนมัติ

สิ่งที่ต้องสังเกต:

- ทุกงานถูกตั้งเป็น Must หรือไม่
- ทีมใช้ Urgency อย่างเดียวหรือมอง Impact, Dependency และ Risk
- Optional ที่ดูน่าสนใจเบียด Critical work หรือไม่
- Delegate ถูกใช้กับงานที่ซื้อ Capacity/Skill ได้จริงหรือไม่
- Priority เปลี่ยนพฤติกรรมใน Plan หรือเป็นเพียงป้าย

คำถาม:

- อะไร Urgent แต่ Impact ต่ำ?
- งานใดไม่ด่วนแต่ถ้าช้าจะกระทบหลายงาน?
- ถ้าคนหลักหายหนึ่งวัน Must ใดได้รับผลก่อน?
- ถ้าลดงบ 20% ทีมจะรักษาอะไร?

## 8.5 Resource & Schedule Planning

สอนเพียงกฎที่จำเป็น:

- คนละ 6 ชั่วโมงต่อวัน
- แบ่ง Task ข้ามคนและข้ามวันได้
- ทักษะเป็น Guidance ไม่ใช่ Hard Lock
- Vendor ซื้อ Capacity, Capability, Risk Reduction หรือ Flexibility
- Over Capacity ทำได้ใน Draft แต่เป็นความเสี่ยงที่ต้องแก้หรืออธิบาย
- Planned Finish เกิดเมื่อชั่วโมงสะสมของ Task ครบ
- Successor เริ่มวันเดียวกับที่ Dependency เสร็จได้

Same-day Handoff ช่วยสะท้อนงานเช้า–บ่าย แม้ระบบวางแผนในระดับวัน ให้ทีมอธิบายลำดับภายในวันหากเป็น Critical Path

อย่าแก้แผนให้ทีม ใช้คำถาม:

- “งานนี้ต้องเสร็จก่อนอะไร?”
- “คนนี้เหลือ Buffer เท่าไร?”
- “ถ้าความเสี่ยงเกิดขึ้น Day 5 คุณจะย้ายอะไร?”
- “Vendor นี้ซื้อ Value อะไร?”
- “Priority ที่ตั้งไว้สะท้อนใน Allocation ตรงไหน?”

## 8.6 Plan Review Gate

ให้ทีม Pitch 90 วินาที:

- Critical Tasks
- Bottleneck
- Dependency สำคัญ
- Planned Spend และ Remaining/Over
- ความเสี่ยงใหญ่ที่สุด
- Contingency

Checklist Facilitator:

- Must มี Owner และชั่วโมงครบหรือไม่
- Planned Finish เทียบ Due By เป็นอย่างไร
- Dependency ใช้จากแผนจริงหรือเพียงตามวันที่บนการ์ด
- Capacity เกิน 6 ชั่วโมงหรือแน่นจนไม่มี Buffer หรือไม่
- Vendor แก้ Bottleneck จริงหรือเป็นการซื้อเพราะเห็นตัวเลือก
- Package Budget รองรับ Outcome/Attendance ที่ทีมรับปากหรือไม่
- ทีมมีแผนสำรองหรือไม่
- Trade-off ถูกพูดอย่างชัดเจนหรือไม่

## 8.7 Simulation และ Status Review

ในแต่ละรอบ:

1. ประกาศช่วงวันของ Simulation
2. ให้ทีมอัปเดต Task Status ตามแผนและข้อมูลที่มี
3. เลือก Event ตามวัตถุประสงค์ ไม่จำเป็นต้องใช้ทุก Event
4. ส่ง Event Code ให้ทีมกรอกใน Event Inbox
5. ให้เวลาทีมอ่าน หยุดคิด และ Replan
6. ขอ Status Update จากบางทีม

Status Update ควรมี:

- Status
- Top Issue
- Impact
- Action
- Need

ถ้าทีมรายงานแต่ Activity ให้ขัดจังหวะอย่างสุภาพ:

> ผมยังไม่ต้องการรายการสิ่งที่ทำครับ ตอนนี้ Mission มีความเสี่ยงอะไร ผลกระทบคืออะไร และทีมต้องการอะไร?

## 8.8 Decision Request

พิจารณาคำขอจาก:

- Situation ชัดหรือไม่
- Recommendation มีหรือไม่
- Impact ครบเรื่องเวลา เงิน Scope คุณภาพ และ Risk หรือไม่
- มี Alternative และ Trade-off หรือไม่
- ต้องการ Decision อะไร ภายในเมื่อใด

คุณอาจตอบ:

- Approved
- Approved with condition
- Request revision
- Declined พร้อมเหตุผลตาม Sponsor priorities

อย่าอนุมัติทุกคำขอเพียงเพื่อให้เกมเดินต่อ การปฏิเสธอย่างมีเหตุผลช่วยให้ทีมเรียนรู้เรื่อง Constraint และ Replan

## 9. Sponsor Source of Truth

ใช้ข้อมูลนี้เป็นคำตอบมาตรฐาน ห้ามเปลี่ยนคำตอบระหว่างทีมโดยไม่มีเหตุผลด้านการออกแบบกิจกรรม

| หัวข้อ | ข้อเท็จจริง |
|---|---|
| Purpose | สร้าง Employee Engagement เรื่อง Innovation และได้แนวคิดที่นำไปต่อยอดได้ |
| Date | Day 10 เปลี่ยนไม่ได้ |
| Forecast | คาดผู้เข้าร่วม Onsite 150 คน |
| Minimum Outcome | ผู้เข้าร่วม Onsite อย่างน้อย 130 คน |
| Remote | ถ่ายทอดสดไป 3 สาขา และไม่นับรวมในขั้นต่ำ 130 คน |
| Satisfaction | อย่างน้อย 80% |
| Ideas | ได้ Usable Innovation Ideas อย่างน้อย 20 แนวคิด |
| Venue | ห้องประชุมใหญ่สำนักงานใหญ่ ความจุประมาณ 220 คน |
| CEO | กล่าวเปิด 15 นาที |
| CEO Approval | Content ที่อ้างถึง CEO ต้องอนุมัติภายใน Day 5 |
| Parallel Work | Registration และ Invitation ทั่วไปทำก่อนได้ แต่ CEO-specific content ต้องรอ Approval |
| Livestream | เป็น Requirement สำหรับ 3 สาขา |
| Workshop | เป็น Core Experience และต้องสร้าง Usable Ideas |
| Budget | วงเงินเริ่มต้น 120,000 บาท ก่อน Event ใด ๆ |
| Food | ต้องมี Vegetarian option |
| Nice-to-have | Photo booth, Gifts และการตกแต่งเพิ่มเติม |
| Critical Experience | CEO opening, Workshop, Livestream และประสบการณ์ที่ใช้งานได้ |

สรุป Success Definition ภายในสำหรับ Facilitator:

- ส่งมอบ Day 10
- ไม่เกินวงเงินที่มีผลอยู่ในขณะนั้น หรือมี Approval รองรับ
- Onsite อย่างน้อย 130 คน
- Satisfaction อย่างน้อย 80%
- Usable Ideas อย่างน้อย 20

## 10. Task, Priority และ Dependency ที่ควรเฝ้าดู

### Critical Task ตามข้อมูลผู้ออกแบบ

T01, T03, T04, T05, T06, T08, T09, T11, T15 และ T17

ข้อมูลนี้เป็น Reference ให้ Facilitator ไม่ควรบอกทีมตรง ๆ ทีมต้องใช้ Goal และ Sponsor facts เพื่อหาเหตุผลเอง

### Dependency สำคัญ

- T03 → T04
- T05 → T06 → T16
- T01 → T08 → T09
- T01 + T08 → T09
- T11 → T12
- T07 → T13
- T02 + T04 + T11 → T15
- T04 + T09 + T15 → T17
- T08 → T18

### วิธีตีความ Same-day Handoff

- Dependency เสร็จ D3 และ Successor เริ่ม D3: อนุญาต
- Dependency เสร็จก่อน Due Date: Successor เริ่มตาม Planned Finish จริงได้
- Dependency ยังเหลือชั่วโมง: ยังไม่ถือว่าเสร็จ
- Allocation ครบแต่มี Rework Event: ต้องคำนวณ Effort และ Finish ใหม่

ถ้าทีมใช้ Same-day Handoff ในงาน Critical ให้ถามว่า:

- งานต้นทางเสร็จช่วงใดของวัน?
- ใครรับมอบและมี Capacity จริงหรือไม่?
- Quality Check หรือ Approval ใช้เวลาหรือไม่?
- ถ้าส่งต่อไม่ทันวันนั้น มี Buffer ที่ไหน?

## 11. Budget Facilitation Guide

## 11.1 วิธีอ่านตัวเลข

- **Limit** วงเงินปัจจุบัน
- **Task Cost** Package ของ Task ที่ Included
- **Vendor Cost** Vendor ใน Plan หรือ Committed
- **Planned** Task Cost + Vendor Cost หลัง Discount
- **Remaining/Over** ส่วนต่างจาก Limit

Planned ไม่ใช่ Actual Cost ที่จ่ายจริง เพราะเกมอยู่ในช่วงวางแผนและจำลองการควบคุมโครงการ การใช้คำว่า Planned ช่วยไม่ให้ผู้เล่นเข้าใจว่าเงินถูกจ่ายทันทีตั้งแต่เลือก

## 11.2 Budget Packages

| Task | Package และราคา | ประเด็น Facilitator |
|---|---|---|
| T10 Catering | 210 คน 58,000 / 150 คน 42,000 / Lean 130 คน 34,000 / Minimum 130 คน 28,000 | ตรวจ Attendance Capacity, Food Requirement และ Satisfaction Risk |
| T12 Workshop Materials | 210 คน 16,000 / 150 คน 12,000 / Lean 150 คน 8,000 / Minimum 130 คน 4,000 | ตรวจผลต่อ Workshop Flow และ Capacity |
| T13 Stage & Backdrop | Full 18,000 / Lean 12,000 / Minimum 6,000 | Optional; ลดภาพลักษณ์ได้ก่อน Mission Outcome |
| T14 Production Coordination | Full 15,000 / Lean 10,000 / Minimum 5,000 | Package ต่ำย้ายภาระกลับทีมและเพิ่ม Delivery Risk |
| T19 Photo Booth | Full 12,000 / Lean 6,000 | Nice-to-have |
| T20 Gifts | Full 15,000 / Lean 8,000 / Minimum 5,000 | Minimum เปลี่ยนเป็นรางวัลเฉพาะกิจกรรม |

## 11.3 เมื่อทีมเกินงบ

อย่าบอกให้ตัด Task ทันที ให้ถามตามลำดับ:

1. Gap เท่าไร?
2. Package ใดลดได้โดยยังรักษา Core Outcome?
3. Vendor ใดซ้ำซ้อนกับ Internal Capacity?
4. Optional Scope ใดมี Value ต่ำสุด?
5. ถ้ายังเกิน ทีมมี Recommendation อะไรให้ Sponsor?

คำเตือนภาษาไทยที่ทีมเห็นควรนำไปสู่การกระทำ เช่น ลดระดับ Package, เปลี่ยน Vendor, ตัด Optional Scope หรือส่ง Decision Request

## 11.4 การยกเลิก Vendor

- ก่อน Commit: ผู้เล่นสามารถ Remove from Plan ได้
- หลัง Commit: ถือว่าเกิด Commitment แล้ว ให้ใช้ Decision Request เพื่อบันทึกเหตุผล Switching/Cancel และ Impact

เป้าหมายไม่ใช่สร้างขั้นตอนเอกสาร แต่ทำให้ผู้เล่นเห็น Cost of Change หลัง Commitment

## 12. Event Strategy

ระบบมี 12 Events แบ่งเป็น:

- **Core 8:** E01, E02, E03, E04, E05, E07, E08, E09
- **Extension 4:** E06, E10, E11, E12

ไม่จำเป็นต้องใช้ Core ทั้ง 8 เหตุการณ์ในการเล่นครั้งเดียว แนะนำ 4–5 เหตุการณ์ต่อรอบ 6 ชั่วโมง เพื่อให้ทีมมีเวลาวิเคราะห์และ Replan จริง

แนวทางเลือก:

| รอบ | ตัวเลือกแนะนำ | จุดประสงค์ |
|---|---|---|
| D1–D3 | E07 หรือ E08 | ทดสอบการมอง Opportunity และ Bottleneck |
| D4–D5 | E01 หรือ E05 | ทดสอบ Risk/Resource Resilience |
| D6–D7 | E02 และอาจ E09 | ทดสอบ Critical Path และ Outcome Tracking |
| D8–D10 | E03 หรือ E04 | ทดสอบ Reprioritization ภายใต้แรงกดดันสูง |

อย่าใช้ E03 และ E04 พร้อมกันหากทีมยังใหม่หรือมี Cognitive Load สูง เพราะทั้ง Budget และ Attendance จะเปลี่ยนหลาย Workstream พร้อมกัน

## 13. Event Guide รายเหตุการณ์

## E01 — Network Capacity Problem

- **Deck/Timing:** Core, D4–D5
- **ผลในระบบ:** ตั้ง Network Risk, ทำให้ T09 At Risk และเปิด V06/V07
- **ใช้เพื่อ:** ทดสอบ Risk Response และ Contingency
- **ควรใช้เมื่อ:** ทีมพึ่ง Ton หรือ Streaming Path เดียว
- **หลีกเลี่ยงเมื่อ:** ทีมกำลังมี Network Crisis ซ้ำอยู่แล้ว
- **คาดหวัง:** ตรวจ T09/T18, หา Root Cause, Owner, Backup และเลือก Avoid/Reduce/Transfer/Accept อย่างมีเหตุผล
- **อย่าคาดหวัง:** ซื้อ Vendor แพงที่สุดโดยอัตโนมัติ
- **คำถาม:** “ถ้า Streaming ล้ม Mission ยังสำเร็จได้หรือไม่?” “ใครเป็นเจ้าของความเสี่ยง?”
- **Debrief:** ทีมแก้อาการหรือแก้ความเสี่ยงต่อ Mission?

## E02 — CEO Rehearsal Moved

- **Deck/Timing:** Core, D6–D7
- **ผลในระบบ:** Due By ของ T17 เปลี่ยนจาก D9 เป็น D7
- **ใช้เพื่อ:** ทดสอบ Change Impact และ Critical Path
- **ควรใช้เมื่อ:** ทีมวาง T04, T09, T15 และ T17 แล้ว
- **คาดหวัง:** ย้อนดูงานต้นทางทั้งหมด ปรับลำดับ/Capacity และสื่อสารผลกระทบ
- **สัญญาณอ่อน:** ทีมลากเฉพาะ T17 มา D7 โดยไม่ตรวจว่างานต้นทางเสร็จหรือไม่
- **คำถาม:** “อะไรต้องพร้อมก่อนซ้อม?” “ส่วนใดทำคู่ขนานได้?” “ต้อง Escalate อะไรเดี๋ยวนี้?”
- **Debrief:** ทีมเห็น Downstream Impact หรือไม่?

## E03 — Budget Reduction

- **Deck/Timing:** Core, D8–D10
- **ผลในระบบ:** Limit ลดจาก 120,000 เป็น 95,000 บาท และเปิด Budget Panel ให้ปรับ Package
- **ใช้เพื่อ:** ทดสอบ Cost–Scope–Quality Trade-off
- **ควรใช้เมื่อ:** ทีมเลือก Package และ Vendor แล้ว
- **หลีกเลี่ยงเมื่อ:** ทีมยังไม่มี Budget Plan หรือกำลัง Overload จาก E04
- **คาดหวัง:** คำนวณ Gap, ลด Package ที่กระทบ Outcome ต่ำ, ทบทวน Vendor/Optional Scope และ Escalate หากจำเป็น
- **สัญญาณอ่อน:** ตัดทุกงานเท่ากัน หรือลดเป็น Minimum โดยไม่ตรวจ Attendance/Quality
- **คำถาม:** “ต้องลดอีกเท่าไร?” “จะปกป้อง Outcome ใด?” “ผลกระทบที่ยอมรับคืออะไร?”
- **Debrief:** ทีมลด Cost โดยรักษา Outcome อย่างไร?

## E04 — Attendance Increase

- **Deck/Timing:** Core, D8–D10
- **ผลในระบบ:** Forecast เพิ่มเป็น 210 และเตือน Package ที่ Capacity ไม่พอ
- **ใช้เพื่อ:** ทดสอบ Cross-workstream Impact และ Scalable Planning
- **ควรใช้เมื่อ:** ทีมมี Catering และ Workshop Materials ในแผน
- **หลีกเลี่ยงเมื่อ:** ต้องการลดความซับซ้อนหรือเพิ่งใช้ E03
- **คาดหวัง:** ตรวจ Venue, Registration, Communication, Catering, Materials, Staffing และ Safety พร้อมแยก Forecast จาก Minimum Commitment
- **สัญญาณอ่อน:** เปลี่ยนแค่อาหารโดยไม่ดู Registration หรือ Workshop
- **คำถาม:** “210 คือ Forecast หรือ Commitment?” “อะไรต้องเปลี่ยนทันที และอะไรควรรอข้อมูล?”
- **Debrief:** Change หนึ่งเรื่องกระทบกี่ส่วนของแผน?

## E05 — Ton Unavailable

- **Deck/Timing:** Core, D4–D5
- **ผลในระบบ:** Capacity ของ Ton ใน D5 เหลือ 0
- **ใช้เพื่อ:** ทดสอบ Resource Resilience และ Single Point of Failure
- **ควรใช้เมื่อ:** Ton มีงานสำคัญในหรือใกล้ D5
- **หลีกเลี่ยงเมื่อ:** Ton ไม่มี Allocation ที่เกี่ยวข้อง
- **คาดหวัง:** ระบุงานกระทบ ตรวจ Skill Coverage หา Backup Owner/Vendor หรือ Re-sequence
- **สัญญาณอ่อน:** ย้ายงานให้คนว่างโดยไม่ตรวจ Skill และ Capacity
- **คำถาม:** “ใครแทนได้จริง?” “การย้ายสร้าง Bottleneck ใหม่ที่ไหน?”
- **Debrief:** แผนมี Single Point of Failure หรือไม่?

## E06 — Production Vendor Delay

- **Deck/Timing:** Extension, D6–D8
- **ผลในระบบ:** T13 Delayed สองวัน และเปิด V11
- **ใช้เพื่อ:** ทดสอบ Supplier Risk และ Recovery Option
- **ควรใช้เมื่อ:** T13 ยังอยู่ใน Scope
- **ห้ามใช้เมื่อ:** ทีม Drop T13 แล้ว เพราะเหตุการณ์จะไม่เชื่อมกับ Decision จริง
- **คาดหวัง:** เปรียบเทียบ Wait, Expedite, Switch, Descope และ Accept รวม Switching Cost
- **คำถาม:** “ต้นทุนของการรอเทียบกับการเปลี่ยน Vendor?” “Minimum Viable Stage คืออะไร?”
- **Debrief:** ทีมเห็นทางเลือกอื่นนอกจากรอ Vendor เดิมหรือไม่?

## E07 — Streaming Vendor Offer

- **Deck/Timing:** Core, D1–D3
- **ผลในระบบ:** เปิด V05 และลดราคาจาก 18,000 เป็น 15,000 บาท
- **ใช้เพื่อ:** ทดสอบ Opportunity Evaluation และ Opportunity Cost
- **ควรใช้เมื่อ:** ทีมยังตัดสินใจเรื่อง Streaming Capacity
- **หลีกเลี่ยงเมื่อ:** V05 Commit แล้ว
- **คาดหวัง:** เทียบ Internal Capacity, Network Risk, Budget และ Alternative
- **สัญญาณอ่อน:** ซื้อเพราะคำว่า “ลดราคา” โดยไม่ระบุ Bottleneck/Risk
- **คำถาม:** “ถ้าไม่มีส่วนลด ยังซื้อไหม?” “ซื้อแล้วลดความเสี่ยงอะไรที่วัดได้?”
- **Debrief:** 15,000 บาทซื้อ Capacity และ Risk Reduction คุ้มหรือไม่?

## E08 — Extra Internal Support

- **Deck/Timing:** Core, D1–D3
- **ผลในระบบ:** เพิ่ม Resource ชั่วคราวด้าน Corporate Communication 6 ชั่วโมงใน D6
- **ใช้เพื่อ:** ทดสอบการใช้ Capacity ตาม Value
- **ควรใช้เมื่อ:** ทีมมี Communication/Content Bottleneck
- **หลีกเลี่ยงเมื่อ:** ไม่มีงาน Skill ตรงหรือ D6 ไม่ช่วยลำดับงาน
- **คาดหวัง:** ใช้ทรัพยากรกับงานที่ลด Critical-path Pressure หรือปกป้อง Outcome
- **สัญญาณอ่อน:** กระจายงานให้คนเพิ่มเพียงเพราะมีคนว่าง
- **คำถาม:** “6 ชั่วโมงนี้ทำให้งานใดเสร็จเร็วขึ้นจริง?”
- **Debrief:** Capacity เพิ่มมี Value ตรง Bottleneck หรือไม่?

## E09 — Registration Behind Target

- **Deck/Timing:** Core, D6
- **ผลในระบบ:** Confirmed Onsite 92 คน เทียบ Minimum 130 และแสดง Gap 38
- **ใช้เพื่อ:** ทดสอบ Outcome Tracking และ Corrective Action
- **ควรใช้เมื่อ:** ทีมส่ง Invitation แล้ว
- **หลีกเลี่ยงเมื่อ:** ยังไม่มีโอกาสทำ T06
- **คาดหวัง:** วิเคราะห์ Conversion, Audience, Message และ Channel แล้วกำหนด Recovery Action, Owner, Metric
- **สัญญาณอ่อน:** บอกว่า “ส่ง Reminder เพิ่ม” โดยไม่วิเคราะห์สาเหตุหรือเป้าตัวเลข
- **คำถาม:** “ต้องเพิ่มอีกกี่คนภายในกี่วัน?” “Action ใดเปลี่ยน Outcome ได้มากที่สุด?”
- **Debrief:** ทีม Track Activity หรือ Outcome?

## E10 — Catering Cut-off

- **Deck/Timing:** Extension, D7
- **ผลในระบบ:** Final Headcount D7; เพิ่มภายหลังได้ 10% หรือ 30% หากมี V12
- **ใช้เพื่อ:** ทดสอบ Decision under Uncertainty และ Value of Flexibility
- **ควรใช้เมื่อ:** Attendance ยังไม่แน่นอนและทีมเลือก Catering แล้ว
- **หลีกเลี่ยงเมื่อ:** Catering ไม่อยู่ใน Scope
- **คาดหวัง:** ระบุ Headcount Assumption, Buffer, Contingency และ Decision Owner
- **คำถาม:** “ทีม Commit ตัวเลขใดและเพราะอะไร?” “Flexibility 6,000 บาทคุ้มกับความไม่แน่นอนหรือไม่?”
- **Debrief:** ต้องมีข้อมูลอะไรจึง Commit Resource ได้อย่างมีเหตุผล?

## E11 — CEO Content Revision

- **Deck/Timing:** Extension, D6–D8
- **ผลในระบบ:** T03 เพิ่ม Effort 3 ชั่วโมง และ T04 กลับมา At Risk/ต้องทบทวน
- **ใช้เพื่อ:** ทดสอบ Rework Cost และ Change Control
- **ควรใช้เมื่อ:** T03/T04 ถูกวางแผนหรือเสร็จแล้ว
- **หลีกเลี่ยงเมื่อ:** สายงาน CEO Content ยังไม่เริ่ม
- **คาดหวัง:** Reopen Work, Allocate 3 ชั่วโมง, ตรวจ T04→T15→T17 และ Escalate หาก Deadline เสี่ยง
- **สัญญาณอ่อน:** เพิ่ม 3 ชั่วโมงให้ T03 แล้วไม่ตรวจงานปลายทาง
- **คำถาม:** “Rework นี้เลื่อนงานใด?” “ควรเจรจาขอบเขตการแก้หรือไม่?”
- **Debrief:** ทีมแก้เฉพาะงานที่ถูกส่งกลับหรือทั้งสายงาน?

## E12 — Early Artwork Deadline

- **Deck/Timing:** Extension, D5–D6
- **ผลในระบบ:** Due By ของ T13 เปลี่ยนเป็น D6
- **ใช้เพื่อ:** ทดสอบ Lead Time, External Dependency และ Schedule Buffer
- **ควรใช้เมื่อ:** T13 ยังอยู่ใน Scope และ T07→T13 มีแผนแล้ว
- **ห้ามใช้เมื่อ:** ทีม Drop T13 แล้ว
- **คาดหวัง:** Re-sequence T07→T13, ลด Scope/Quality หรือใช้ V10
- **สัญญาณอ่อน:** ใส่ Over Capacity เพื่อเร่งโดยไม่ตรวจทางเลือก
- **คำถาม:** “Buffer เดิมหายไปเท่าไร?” “Minimum Artwork ที่ส่งทันคืออะไร?”
- **Debrief:** ทีมเผื่อ Buffer ให้ External Dependency เพียงพอหรือไม่?

## 14. วิธีบันทึกทีมใน Facilitator

ปุ่ม **Add Team Record** ใช้สร้างพื้นที่จดบันทึกของแต่ละทีมใน Console เช่น:

- ชื่อทีม
- Mission approval และเงื่อนไข
- Sponsor questions ที่ใช้
- Status Review
- Decision Request
- Evidence สำหรับคะแนน

ปุ่มนี้ไม่ได้เพิ่มสมาชิก ไม่สร้าง Player Session และไม่เปิดดูข้อมูลภายในของ Player ทีมจึงต้อง Pitch หรือแสดงหน้าจอให้ Facilitator ตรวจ

แนะนำให้ตั้งชื่อ Team Record ให้ตรงกับชื่อใน Player เพื่อลดความสับสน

## 15. Scoring Rubric — 100 คะแนน

ให้คะแนน 5 ด้าน ด้านละ 20 คะแนน พร้อม Evidence สั้น ๆ

## 15.1 Goal & Scope Clarity

- **17–20:** Goal วัดผลได้ Scope ชัด Success ครบ และแยก Facts/Assumptions
- **13–16:** ภาพรวมชัดแต่มีช่องว่างเล็กน้อย
- **9–12:** เน้น Activity มากกว่า Outcome หรือ Success ยังคลุมเครือ
- **0–8:** Goal ใช้นำทาง Decision ไม่ได้

หลักฐานที่มองหา: Goal statement, Success measures, Scope choices, Q&A classification

## 15.2 Prioritization Quality

- **17–20:** ใช้ Impact, Deadline, Dependency และ Risk อย่างสอดคล้อง
- **13–16:** Priority สมเหตุผลแต่ยังมี Urgency Bias บางส่วน
- **9–12:** ตามเสียงดังหรืองานเร่ง โดยไม่เชื่อม Outcome
- **0–8:** ทุกอย่างสำคัญเท่ากันหรือไม่มีเหตุผล

หลักฐานที่มองหา: Top 5 rationale, สิ่งที่ Drop, การเปลี่ยน Priority หลัง Event

## 15.3 Resource & Schedule Realism

- **17–20:** Capacity สมจริง Dependency ถูก มี Trade-off และ Buffer
- **13–16:** แผนใช้ได้แต่มี Overload หรือ Buffer อ่อนบางจุด
- **9–12:** มี Collision/Dependency Conflict หรือ Finish ที่ไม่น่าเป็นไปได้
- **0–8:** ไม่สน Constraint หลัก

หลักฐานที่มองหา: Allocation, Planned Finish, Bottleneck, Vendor rationale, same-day handoff explanation

## 15.4 Tracking & Communication

- **17–20:** พบ Risk เร็ว สื่อสารกระชับ และ Escalate ถูกเรื่อง
- **13–16:** สื่อสารดีแต่บางครั้งยัง Activity-heavy
- **9–12:** รายงาน Task มากกว่า Outcome/Risk
- **0–8:** ปัญหาถูกสื่อสารเมื่อสายเกินไปหรือไม่มี Owner

หลักฐานที่มองหา: Status updates, Risk owner, Impact, Decision requests

## 15.5 Adaptation & Replanning

- **17–20:** Reprioritize/Reallocate อย่างมีเหตุผลและรักษา Outcome
- **13–16:** ปรับได้แต่ยังพยายามรักษาทุกอย่างมากเกินไป
- **9–12:** แก้เฉพาะจุด ไม่เห็นผลกระทบทั้งระบบ
- **0–8:** ยึดแผนเดิมแม้เงื่อนไขเปลี่ยน

หลักฐานที่มองหา: Team response ต่อ Event, Package change, dependency replan, trade-off

## 15.6 Operational Result แยกจาก Learning Score

บันทึกผลการส่งมอบแยกเป็น:

- Delivered
- Delivered at Risk
- Not Delivered

อย่าใช้ Operational Result กลบ Learning Score ทีมที่เจอ Event หนักอาจส่งมอบ At Risk แต่แสดงทักษะการวางแผนและสื่อสารระดับสูงได้

## 16. Debrief Guide

ใช้ลำดับ 4 ขั้นเพื่อไม่ให้ Debrief กลายเป็นการบรรยายของ Facilitator

### 1. Experience — เกิดอะไรขึ้น

- ตอนเริ่ม ทีมทำอะไรก่อน?
- จุดใดทำให้ทีมเริ่มรู้ว่าแผนมีปัญหา?
- Decision ใดใช้เวลาถกเถียงมากที่สุด?

### 2. Reflection — เพราะอะไร

- Assumption ใดส่งผลมากที่สุด?
- ใครหรือ Task ใดกลายเป็น Bottleneck?
- ทำไมบางงานถูกจัด Must?
- ตอน Event มา ทีมปกป้องอะไรไว้ก่อน?

### 3. Concept — หลักคิดคืออะไร

เชื่อมสิ่งที่เกิดกับ:

- Outcome before activity
- Facts versus assumptions
- Critical path and dependencies
- Capacity and bottlenecks
- Cost–scope–quality trade-offs
- Activity versus outcome metrics
- Risk ownership and escalation
- Replanning under change

### 4. Transfer — จะนำไปใช้อย่างไร

- ในงานจริง คุณมี “Question Token” เรื่องใดที่ควรถามก่อนเริ่ม?
- Project ปัจจุบันมี Single Point of Failure ตรงไหน?
- Status Report ครั้งหน้าจะเปลี่ยนจาก Activity เป็น Outcome/Risk อย่างไร?
- ถ้างบถูกลด คุณจะทบทวน Package หรือ Scope ด้วยหลักอะไร?
- พรุ่งนี้เช้าจะเปลี่ยนพฤติกรรมหนึ่งอย่างอะไร?

## 17. Debrief ตามเหตุการณ์ที่เห็น

### ทีมทำทุกอย่างเป็น Must

ถาม:

- เมื่อ Capacity ไม่พอ ทีมเลือกอะไรเป็นอย่างแรก?
- ถ้าทุกอย่าง Must คำว่า Must ยังช่วยตัดสินใจหรือไม่?

Concept: Priority คือการยอมรับว่าไม่ใช่ทุกอย่างได้รับทรัพยากรเท่ากัน

### ทีมวางคนเต็มทุกวัน

ถาม:

- ตอน Event มา ทีมเอา Capacity จากไหน?
- การใช้ทรัพยากร 100% ต่างจากการส่งมอบเร็วอย่างไร?

Concept: Utilization สูงสุดอาจลด Flow และ Resilience

### ทีมซื้อ Vendor จำนวนมาก

ถาม:

- Vendor ใดแก้ Bottleneck จริง?
- ค่า Coordination ถูกนับหรือไม่?
- ถ้าตัด Vendor หนึ่งราย Mission กระทบอย่างไร?

Concept: External capacity มีราคา Integration และ Coordination

### ทีมลด Budget โดยตัด Task ทันที

ถาม:

- Package ที่เล็กลงยังรักษา Outcome ได้หรือไม่?
- Optional Scope ใดมีต้นทุนต่อ Value สูง?

Concept: Cost reduction เริ่มจาก Value Design ก่อน Cancellation

### ทีมรายงาน Activity

ถาม:

- Activity นี้ทำให้ Success Measure เปลี่ยนเท่าไร?
- Risk ใดที่ Sponsor ต้องรู้วันนี้?

Concept: Management information ต้องสนับสนุน Decision

### ทีมยึด Due Date บนการ์ด

ถาม:

- Due Date คือวันเริ่มหรือวันสุดท้าย?
- ถ้างานต้นทางเสร็จเร็ว งานถัดไปเริ่มเมื่อไร?

Concept: Schedule ใช้ Actual Planned Finish และ Dependency ไม่ใช่ Fix Date อย่างเดียว

## 18. ตัวอย่างบทสนทนา Facilitator

### เมื่อทีมถามให้ Sponsor จัด Priority

ผู้เล่น: “Task ไหนสำคัญที่สุดครับ?”

Facilitator:

> ผมบอก Requirement และ Outcome ที่ต้องปกป้องได้ แต่การเปลี่ยนสิ่งนั้นให้เป็น Priority เป็นหน้าที่ของทีม คุณอยากทราบ Outcome หรือ Constraint เรื่องใดเพื่อใช้ตัดสินใจ?

### เมื่อทีมบอกว่าแผนไม่เกิน Capacity แต่ระบบเตือน

Facilitator:

> ลองแยกตัวเลขที่ Allocate แล้วออกจากชั่วโมงที่กำลังจะเพิ่ม ตรวจวันและคนเดียวกันก่อน หากหลัง Allocate ยังไม่เกิน 6 ชั่วโมง ให้ตรวจ Event หรือ Allocation ซ้ำ แล้วบันทึก Evidence เพื่อรายงานข้อผิดพลาด

### เมื่อทีมเริ่ม Successor วันเดียวกับ Dependency จบ

Facilitator:

> ระบบอนุญาต Same-day Handoff ครับ ขอให้ทีมอธิบายลำดับเช้า–บ่าย ผู้รับมอบ และ Buffer หากงานต้นทางส่งช้า

### เมื่อทีมเกินงบ

Facilitator:

> Gap เท่าไรครับ รายการใดลดระดับได้โดยไม่ทำให้ Success หลักเสีย และหากยังไม่พอ ทีมแนะนำให้ Sponsor ตัดสินใจอะไร?

### เมื่อทีมได้รับ Event แล้วไม่เปลี่ยนแผน

Facilitator:

> ข้อมูลใหม่นี้เปลี่ยน Assumption, Constraint หรือ Risk ใด? ถ้า Allocation เดิมยังเหมาะสม ขอให้ทีมอธิบายหลักฐานที่รองรับ

## 19. Troubleshooting ระหว่างคลาส

### ผู้เล่น Refresh แล้วข้อมูลไม่หาย

เป็นพฤติกรรมปกติ เพราะระบบ Auto-save ลง Local Storage

### Player และ Facilitator ไม่เห็นข้อมูลกัน

เป็นพฤติกรรมปกติของระบบปัจจุบัน ไม่มี Real-time Sync ให้ใช้ Pitch, อ่านคำตอบ และบันทึกฝั่งของตน

### Add Team แล้ว Player ไม่เพิ่ม

Add Team Record เป็นพื้นที่ Notes ของ Facilitator เท่านั้น

### Event Code ไม่ทำงาน

- ตรวจตัวพิมพ์และช่องว่าง
- ใช้ Code ที่มีอยู่ใน Event Console
- ตรวจว่า Event ถูกใช้ไปแล้วหรือไม่
- Refresh หลังแน่ใจว่าข้อมูล Player ถูกบันทึก

### Task ขึ้น At Risk แม้ชั่วโมงครบ

ตรวจ:

- Planned Finish > Due By หรือไม่
- Dependency เสร็จก่อน/วันเดียวกับ Start จริงหรือไม่
- Event เปลี่ยน Effort หรือ Due Date หรือไม่
- Status ถูกเปลี่ยนโดย Event หรือไม่

### Capacity เตือนผิดจากที่เห็น

- ช่องชั่วโมงก่อนกดเป็น Preview
- หลัง Allocate ช่องต้อง Reset เป็น 0
- Capacity จริงนับ Allocation ที่บันทึกแล้วเท่านั้น
- ตรวจ Allocation ซ้ำของคนและวันเดียวกัน

### งบไม่ตรงกับผลบวกที่ทีมคิด

ตรวจ:

- Task ใด Included/Excluded/Undecided
- Package ที่เลือกของแต่ละ Task
- Vendor อยู่ใน Plan หรือ Committed
- Event Discount หรือ Budget Limit ใหม่
- ผลกระทบ Event ที่เพิ่มต้นทุนหรือเปลี่ยนเงื่อนไข

## 20. Checklist Facilitator

### ก่อนเริ่ม

- [ ] ทดสอบ Player และ Facilitator
- [ ] Reset ข้อมูลทดสอบ
- [ ] Timer พร้อม
- [ ] Sponsor Source of Truth พร้อม
- [ ] เลือก Event หลัก 4–5 เหตุการณ์และ Event สำรอง
- [ ] วางแผนเวลา Gate และ Debrief
- [ ] เปลี่ยน PIN หากใช้ในบริบทสาธารณะ

### ระหว่างเล่น

- [ ] ไม่เฉลย Priority หรือ Plan
- [ ] ตอบ Sponsor สม่ำเสมอทุกทีม
- [ ] เก็บคำพูด/พฤติกรรมจริงเป็น Evidence
- [ ] เลือก Event ตาม Learning Need
- [ ] ให้เวลาทีม Replan หลัง Event
- [ ] ถาม Outcome, Risk, Impact และ Need
- [ ] บันทึกคะแนนพร้อมเหตุผล

### ก่อนจบ

- [ ] บันทึก Operational Result แยกจากคะแนน
- [ ] Debrief จาก Experience ของทีม
- [ ] เชื่อมกับ Concept อย่างกระชับ
- [ ] ให้ผู้เล่นระบุพฤติกรรมที่จะนำไปใช้จริง
- [ ] ให้ทีม Export หากต้องเก็บหลักฐาน

## 21. หลักปฏิบัติสุดท้าย

- ความเงียบสั้น ๆ หลังตั้งคำถามมีคุณค่า อย่ารีบเฉลย
- ใช้ Event เพื่อเปิดพฤติกรรม ไม่ใช่เพื่อทำให้ทีมแพ้
- เลือกแรงกดดันให้พอดีกับระดับผู้เรียน
- ให้คะแนนจาก Decision และ Evidence ไม่ใช่ความมั่นใจในการนำเสนอ
- ถ้าระบบกับเหตุผลทาง Project Management ขัดกัน ให้บันทึกกรณีและใช้ Debrief อย่างโปร่งใส
- เป้าหมายของ Facilitator คือช่วยให้ทีมเห็นระบบการทำงานของตนเอง และนำหลักคิดกลับไปใช้ได้ในวันถัดไป

