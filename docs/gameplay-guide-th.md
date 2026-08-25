# คู่มือการเล่น MISSION CONTROL

## 1. เกมนี้คืออะไร

MISSION CONTROL เป็นเกมฝึกการวางแผนและบริหารงานแบบทีม ผู้เล่นต้องจัดงาน Innovation Day ภายใน 10 วันทำการ ภายใต้งบประมาณและทรัพยากรที่จำกัด ระหว่างเกม Facilitator จะให้ข้อมูล อนุมัติแผน และปล่อยเหตุการณ์ที่ทำให้ทีมต้องปรับแผน

เว็บทำหน้าที่เป็นกระดานเกม เครื่องคำนวณทรัพยากร ตลาด Vendor และบันทึกการตัดสินใจ แต่ไม่ได้สอนหรือตัดสินแทน Facilitator

## 2. การเตรียมทดลองด้วยเครื่องเดียว

เปิดเกมที่ `https://dewtt48.github.io/mission-control-game/` สองหน้าต่าง:

1. หน้าต่างแรกเลือก `PLAYER MODE / โหมดผู้เล่น`
2. หน้าต่างที่สองเลือก `FACILITATOR MODE / โหมดวิทยากร`
3. กรอก PIN เริ่มต้น `1995` ในหน้าต่าง Facilitator
4. วางสองหน้าต่างข้างกัน หรือใช้คนละจอ

Player และ Facilitator ไม่ sync กันอัตโนมัติ การส่งคำถาม คำอนุมัติ และ Event Code ทำด้วยการพูดคุยเหมือนในห้องเรียนจริง

ข้อมูล Player และ Facilitator แยกกันใน browser storage จึงเปิดพร้อมกันได้ อย่างไรก็ตาม Player สองหน้าต่างบน browser/profile เดียวกันจะใช้ข้อมูลทีมชุดเดียวกัน ถ้าจะจำลองหลายทีม ให้ใช้คนละ browser profile, Incognito แยก session หรือคนละอุปกรณ์

## 3. ความแตกต่างระหว่าง LOCK และ EXIT

- `LOCK / ล็อกหน้าจอ` ล้างสิทธิ์ Facilitator ของหน้าต่างนั้นและกลับไปหน้า PIN เหมาะเมื่อเดินออกจากเครื่องชั่วคราว
- `EXIT / ออกจากโหมดวิทยากร` ล้างสิทธิ์และกลับหน้าแรก
- ทั้งสองปุ่มไม่ลบโน้ต คะแนน หรือรายชื่อทีมของ Facilitator
- การปิด browser session จะทำให้ต้องกรอก PIN ใหม่
- สิทธิ์ PIN ใช้ `sessionStorage` จึงแยกตามหน้าต่างหลัก การล็อกหน้าต่างหนึ่งไม่ควรหยุด Player Mode

## 4. บทบาทของผู้เล่น

ทีมแนะนำ 4–6 คน ใช้อุปกรณ์หนึ่งเครื่องร่วมกัน ควรแบ่งหน้าที่ในทีม เช่น คนควบคุมหน้าจอ คนจับเวลา คนตรวจงบ และคนรายงาน Sponsor แต่ทุกการตัดสินใจควรคุยร่วมกัน

เป้าหมายที่ทีมทราบตอนเริ่ม:

- จัด Innovation Day ใน Day 10 ซึ่งเลื่อนไม่ได้
- คาดว่ามีผู้เข้าร่วมประมาณ 150 คน
- มีผู้บริหารระดับสูงเข้าร่วม
- งบเริ่มต้นไม่เกิน 120,000 บาท

ข้อมูลตอนเริ่มไม่ครบโดยตั้งใจ ทีมต้องใช้ Sponsor Questions เพื่อแยก “ข้อเท็จจริง” จาก “สมมติฐาน”

## 5. วิธีเล่นฝั่ง Player ทีละหน้า

### 5.1 MISSION

อ่าน Mission Brief และตั้งชื่อทีม ข้อมูลทั้งหมดบันทึกอัตโนมัติในเครื่อง

### 5.2 TEAM

ทำความรู้จักสมาชิก May, Bank, Ton, Fon และ Ploy ทุกคนมีเวลาทำโครงการ 6 ชั่วโมงต่อวัน Skill เป็นคำแนะนำ ไม่ใช่ข้อห้าม

### 5.3 CHAOS

วางแผนรอบแรกจากข้อมูลที่มี โดยตอบสามคำถาม:

- เราควรทำอะไร
- ใครน่าจะทำ
- เรายังต้องรู้อะไร

ช่วงนี้ยังไม่มี Task Pool และ Resource Planner จุดประสงค์คือให้เห็น assumption และช่องว่างของการวางแผนก่อนเรียน framework

### 5.4 SPONSOR

ทีมมี Question Tokens 5 เหรียญ ขั้นตอนต่อหนึ่งคำถาม:

1. พิมพ์คำถาม
2. กดขอถามและพูดคำถามกับ Facilitator
3. Facilitator ตอบจาก Sponsor Source of Truth
4. บันทึกคำตอบ
5. ระบุว่าเป็น Fact, Assumption หรือ Unknown

คำถามที่ดีควรช่วยให้รู้ Goal, Success Criteria, Scope, Constraint, Stakeholder หรือ Dependency ไม่ควรเสีย token ถามว่า “ควรทำงานไหนก่อน” เพราะ Facilitator จะไม่จัด Priority ให้

### 5.5 GOAL & SCOPE

กรอก Goal, In/Out of Scope, Deliverables, Success Criteria, Stakeholders, Constraints และ Assumptions แล้วนำเสนอ Facilitator ภายใน 60 วินาที ผลอนุมัติมี Approved, Approved with condition หรือ Revise

### 5.6 PRIORITY

จัดงาน T01–T20 ลงสี่ระดับความสำคัญ:

- MUST DO: จำเป็นต่อ Mission และต้องมีแผนรองรับ
- SHOULD DO: สำคัญ แต่ยังปรับวิธีหรือจังหวะได้
- COULD DO: ทำเมื่อยังมีงบและทรัพยากร
- DROP: ตัดออกจากขอบเขต พร้อมบันทึกเหตุผล

Priority บอกความสำคัญ ไม่ได้กำหนดวันทำงานหรือบังคับว่าจะต้องทำเองหรือจ้าง Vendor ระบบจะใช้ Priority ช่วยเรียง Task และเตือนเมื่อ Must Do ยังวางแผนไม่ครบ ส่วน Vendor จะถูกแนะนำภายหลังจาก Skill หรือ Capacity gap ที่พบใน Schedule

อย่าจัดจากความรู้สึกว่า “งานนี้ดูด่วน” เพียงอย่างเดียว ให้ดู Outcome, due date, dependency และ risk

`DUE BY D4` หมายถึงงานควรเสร็จไม่เกิน Day 4 ไม่ได้หมายความว่าต้องเริ่มทำใน Day 4 ทีมยังเป็นผู้เลือกวันทำงาน คน และจำนวนชั่วโมงเอง

สำหรับ Task ที่มีค่าใช้จ่าย ให้เลือกว่า `ยังไม่ตัดสินใจ`, `รวมในแผน` หรือ `ไม่นำมาคิดในแผน` ระบบจะนับเฉพาะรายการที่เลือก `รวมในแผน` ทำให้เกมใหม่ไม่เริ่มต้นด้วยยอด 114,000 บาทโดยอัตโนมัติ

### 5.7 PLAN

สร้าง Allocation โดยเลือก Task, คน, Day และจำนวนชั่วโมง รองรับครึ่งชั่วโมง งานหนึ่งแบ่งหลายวันหรือหลายคนได้ และคนหนึ่งรับหลายงานในวันเดียวได้

เมื่อเลือก Task ระบบจะแสดง Effort ที่ต้องใช้ จัดสรรแล้ว เหลืออีกกี่ชั่วโมง Due By, Skills และ Dependencies เมื่อเลือกคน ระบบจะแสดง Skills และ Capacity ของวันนั้น จึงไม่จำเป็นต้องย้อนกลับหน้า Team หรือ Priority เพื่อจำข้อมูล

`PLANNED FINISH` คำนวณจากวันแรกที่ Allocation สะสมครบ Effort จริง ไม่ได้คัดลอกจาก Due By เช่น T03 ต้องใช้ 6H และถูกจัดสรร D1 3H + D2 3H ระบบจะถือว่า Planned Finish คือ D2 แม้ Due By จะเป็น D3

งานที่ไม่มี Dependency ต่อกันทำคู่ขนานได้ งานที่มี Dependency จะถูกตรวจจาก Planned Finish ของงานต้นทาง หากงานต้นทางเสร็จจริงและถูกเปลี่ยนสถานะเป็น Done ระบบจะถือว่า Dependency พร้อมทันที การย้ายหรือลบ Allocation จะทำให้ระบบตรวจความขัดแย้งใหม่อัตโนมัติ

สถานะในหน้า Schedule มี READY, WAITING, PLANNED และ AT RISK เพื่อบอกความพร้อมของแผนโดยไม่จัดตารางแทนผู้เล่น ผู้เล่นยังสามารถวางงานที่มี Conflict ไว้ชั่วคราวเพื่อทดลองแผนได้ แต่ต้องทบทวนก่อน Lock Plan

- 0–4h: Available
- มากกว่า 4–6h: Busy
- มากกว่า 6h: Over Capacity

ระบบเตือนแต่ไม่ห้าม over capacity เพราะทีมต้องเป็นผู้ยอมรับหรือแก้ trade-off เอง

### 5.8 MARKET

เลือก Vendor เพื่อซื้อ capacity, technology, delivery speed, risk reduction หรือ flexibility ระบบจะแสดง Vendor ที่ตรงกับ Task ซึ่งยังจัดสรรไม่ครบไว้ก่อน พร้อมระบุ Task ที่ Vendor ช่วยได้ ปุ่ม `ADD TO PLAN` จะเพิ่ม Vendor เข้า Planned Spend และสามารถ `REMOVE` ได้ในช่วงร่างแผน

ก่อน Lock Plan ส่วน Plan Review จะสรุป Must Do ที่ยังไม่ครบ, Dependency Conflict, Over Capacity, Planned Finish ที่เกิน Due By และ Task ที่ยังไม่เลือก Priority ประเด็นเหล่านี้ใช้ช่วยทบทวน ไม่ใช่เฉลยคำตอบของเกม ทีมยังสามารถยืนยันแผนที่มีความเสี่ยงและรับผิดชอบเหตุผลของตนได้

เมื่อพร้อมและผ่านการทบทวนแผน ให้กด `LOCK PLAN & COMMIT` หลังจากนั้น Vendor จะเปลี่ยนเป็น `COMMITTED` หากต้องการยกเลิกต้องบันทึกเหตุผล ผลกระทบ และข้อเสนอผ่าน Decision Request

Budget Panel แสดงวงเงิน ค่า Task ค่า Vendor Planned Spend และยอดคงเหลือหรือยอดเกินวงเงิน ถ้าเกินงบ ระบบยังอนุญาตให้วางแผนต่อ แต่ต้องบันทึกเหตุผลและแนวทางจัดการก่อน Commit Plan

### 5.9 CONTROL

อัปเดตสถานะงานเป็น Not Started, In Progress, Done, At Risk, Delayed หรือ Dropped พร้อม Issue และ Next Action ระบบแสดง effort coverage, dependency ที่ยังไม่พร้อม และภาพรวมงบประมาณ

การจัดชั่วโมงครบไม่ได้ทำให้งาน Done อัตโนมัติ ทีมต้องยืนยันสถานะเอง

### 5.10 EVENTS

Facilitator ประกาศรหัส เช่น `E03` ทีมกรอกรหัสใน Event Inbox ระบบจะแสดงเหตุการณ์และใช้ผลเชิงกลไก เช่น ลดเพดานงบ เปลี่ยน deadline หรือทำให้ capacity เป็นศูนย์ รหัสเดิมใช้ซ้ำไม่ได้

หลังรับ Event ทีมควรถามว่า:

- อะไรในแผนเปลี่ยน
- งานและ dependency ใดได้รับผลกระทบ
- ต้อง reprioritize/reallocate อะไร
- ต้องขอการตัดสินใจหรือไม่

### 5.11 DECISIONS

เมื่อจำเป็นต้อง escalate ให้บันทึก Situation, Recommendation, Impact และ Decision Needed แล้วนำเสนอ Facilitator หลักสำคัญคือ “เสนอทางเลือกหรือคำแนะนำไปพร้อมกับปัญหา”

### 5.12 FINAL

สรุป Mission Result, สิ่งที่ส่งมอบ/ไม่ส่งมอบ, การตัดสินใจและความเสี่ยงใหญ่ที่สุด รวมถึงสิ่งที่จะทำต่างออกไป สามารถล็อกผลและ Export JSON สำรองข้อมูลได้

## 6. วิธีดำเนินเกมฝั่ง Facilitator

### 6.1 RUN

เลือก phase ปัจจุบันและใช้ timer คุมเวลา Facilitator สังเกต reasoning ของทีม ไม่รีบแก้แผนให้

### 6.2 SPONSOR

ใช้ช่องค้นหาเปิด Sponsor Source of Truth ตอบเฉพาะสิ่งที่ทีมถาม คำถามที่มีคุณภาพสูงควรได้คำตอบชัดเจน แต่ไม่บอกว่า Task ไหนควรเป็น Priority

ข้อเท็จจริงสำคัญที่ทีมอาจค้นพบ:

- 150 คือ forecast แต่ minimum success คือ 130 onsite
- Satisfaction อย่างน้อย 80%
- อย่างน้อย 20 usable innovation ideas
- CEO content ต้องอนุมัติภายใน Day 5
- Livestream ไป 3 สาขาเป็นข้อกำหนด
- Workshop เป็น core activity และต้องมี vegetarian option

### 6.3 APPROVAL

เพิ่มแฟ้มทีมด้วย `ADD TEAM RECORD / เพิ่มทีมสำหรับบันทึกผล` แล้วใช้ Mission Approval และ Plan Review checklists บันทึก verdict หรือเงื่อนไข ปุ่มนี้สร้างเฉพาะแฟ้มโน้ตฝั่ง Facilitator และไม่ได้เชื่อมข้อมูลจาก Player อย่าเขียน Goal หรือ rebuild plan แทนทีม ให้ระบุสิ่งที่ขาดหรือคลุมเครือ

### 6.4 EVENTS

เลือก Event ตามระดับแรงกดดันของห้อง ไม่สุ่มและไม่จำเป็นต้องใช้ทุก Event อ่าน announcement แล้วบอกรหัสให้ทีมกรอก ตัวอย่างลำดับทดลอง:

- D1–D3: E07 หรือ E08
- D4–D5: E01 หรือ E05
- D6–D7: E02 หรือ E09
- D8–D10: E03 หรือ E04

ถ้าทีมล้นมืออยู่แล้ว ไม่ควรปล่อย Event แรงสองเหตุการณ์พร้อมกัน

### 6.5 STATUS

ให้ทีมรายงานภายใน 60 วินาทีเฉพาะ Status, Top Issue, Impact, Action และ Need ถ้าทีมเล่ารายการกิจกรรมทั้งหมด ให้พากลับมาที่ความเสี่ยงต่อ Mission

### 6.6 SCORE

ให้คะแนนห้าด้าน ด้านละ 20 คะแนน: Goal & Scope, Prioritization, Resource & Schedule, Tracking & Communication และ Adaptation & Replanning คะแนนนี้เป็น qualitative judgement ของ Facilitator ไม่ใช่คะแนนที่ระบบคำนวณอัตโนมัติ

### 6.7 DEBRIEF

ใช้คำถามถอดบทเรียนเพื่อให้ผู้เล่นอธิบายเหตุผล เชื่อมประสบการณ์ในเกมกลับสู่งานจริง หลีกเลี่ยงการเฉลย “แผนที่ถูกต้องเพียงแผนเดียว”

## 7. ลำดับทดลองสั้นด้วยตนเอง

1. เปิด Player และตั้งชื่อ Team Alpha
2. เปิด Facilitator อีกหน้าต่างและเข้า PIN
3. ฝั่ง Player ถาม Sponsor เรื่อง Success Criteria แล้วบันทึกคำตอบ
4. กรอก Goal & Scope และบันทึก Approved
5. จัด Priority งานสำคัญ
6. ทดลองจัด Bank 3h + 3h ใน D3 แล้วเพิ่มอีก 2h เพื่อดู 8/6H warning
7. จ้าง Vendor หนึ่งรายและดูงบเปลี่ยน
8. Facilitator เลือก E03; Player กรอก E03 และดูเพดานงบเหลือ 95,000
9. ทดลอง E05 แล้วดู Ton D5 เหลือ capacity 0h
10. อัปเดตงานและทำ Decision Request
11. บันทึก Score และ Final Review
12. กด LOCK และเข้าใหม่ เพื่อตรวจว่าโน้ต/คะแนนยังอยู่

## 8. ข้อมูลที่บันทึกและการ Reset

- Player progress อยู่ใน `localStorage` และคงอยู่หลัง refresh/ปิด browser
- Facilitator notes/scores อยู่คนละ storage key และไม่ถูกลบเมื่อ Lock/Exit
- Facilitator authentication อยู่ใน `sessionStorage`
- `RESET LOCAL DATA` หน้าแรกลบเฉพาะ Player state หลังยืนยัน
- ถ้าต้องการจำลองทีมใหม่โดยไม่ลบ Team Alpha ให้ใช้ browser profile หรืออุปกรณ์อื่น
