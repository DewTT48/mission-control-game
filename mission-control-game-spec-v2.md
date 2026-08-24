# MISSION CONTROL
## Game + Product Specification v2.0
### Scenario 01: Innovation Day

**Purpose:** Codex-ready implementation specification for a hybrid team learning game on planning and work management.

**Primary delivery target:** Static web app deployable to GitHub Pages.

**Play model:** 1 team = 1 device. Facilitator remains the human Game Master / Sponsor / Stakeholder / Approver / Crisis Controller. The web app replaces cards, playmats, worksheets, calculators, and tracking boards. It must not replace human facilitation.

---

# 0. Product Decisions — LOCKED FOR MVP

These decisions are intentional and should not be changed by the implementation agent unless explicitly requested.

1. Build **one web application, one codebase, and one deployment with two entry modes**:
   - `PLAYER MODE / โหมดผู้เล่น`
   - `FACILITATOR MODE / โหมดวิทยากร`
2. Do **not** build two separate systems or repositories. Both modes share the same design system, scenario data, engine utilities, and deployment.
3. No user accounts and no backend login system.
4. Facilitator Mode is protected by a simple **4-digit numeric PIN gate**. Default MVP PIN: `1995`. Keep the PIN in one clearly named configuration constant so it is easy to change before deployment.
5. The Facilitator PIN is a classroom access barrier, **not security-grade authentication**. Because the app is a public static GitHub Pages build, a technically skilled user may inspect source/build files. Do not add a backend merely to hide the PIN.
6. Successful Facilitator unlock is stored in browser `sessionStorage`, not `localStorage`. Closing the browser/session should require the PIN again.
7. Direct navigation to a Facilitator route must redirect to the PIN gate unless the current browser session is unlocked.
8. Never put the PIN in the URL, query string, hash, visible page source text, or browser history.
9. No database.
10. No realtime multiplayer.
11. No server requirement.
12. Persist Player/Team progress with browser `localStorage`.
13. Persist Facilitator notes/scores with separate browser `localStorage`.
14. Add JSON export/import as a safety feature if practical.
15. Must work as a static build on GitHub Pages.
16. Facilitator controls all Sponsor answers, approvals, status reviews, and Events.
17. Events are **never random in MVP**.
18. Facilitator releases Events by announcing an **Event Code** such as `E03`.
19. Team enters the Event Code in Player Mode; the app then reveals the event and applies its mechanical state changes.
20. Teams can ask open-ended Sponsor questions. The app never auto-answers Sponsor questions.
21. The game is collaborative within each team. Competition/leaderboards are optional and not required for MVP.
22. Main training scenario is `Innovation Day`, but app architecture must separate the **Universal Game Engine** from **Scenario Data** so future scenarios can be added without rewriting the engine.
23. Tasks and Priority labels must be bilingual Thai/English. Main navigation and critical buttons should also be bilingual.
24. Internal resource planning uses **person-hours**, not “one person = one task per day.”
25. Each internal team member has **6 project-hours per day** for this scenario.
26. A person may split capacity across multiple tasks in the same day.
27. A task may be split across multiple days and/or multiple people.
28. Working outside preferred skills is allowed.
29. Skill multipliers, fatigue, salary cost, complex overtime, AI, and automatic qualitative judgement are out of MVP scope.

---

# 1. Learning Architecture

The Universal Game Engine follows this loop:

`CLARIFY -> DEFINE -> PRIORITIZE -> PLAN -> ALLOCATE -> EXECUTE -> TRACK -> COMMUNICATE -> ADAPT`

The web app should make this loop visible throughout the experience.

The game is designed so participants experience a problem first, reflect on it, receive a framework from the facilitator, and then immediately use that framework.

Recommended learning rhythm:

`EXPERIENCE -> DEBRIEF -> CONCEPT -> REPLAY / APPLY`

Do not redesign the app into a self-paced e-learning course. Human discussion is part of the product.

---

# 2. Game Roles

## 2.1 Team Players

Recommended team size: **4–6 people**.

A team shares one device. One person may operate the app, but decisions should be discussed by the group.

Team responsibilities:

- Clarify the Mission.
- Ask high-value Sponsor questions.
- Define Goal, Scope, Deliverables, Success Criteria, Stakeholders, Constraints, and Assumptions.
- Prioritize work.
- Allocate people, time, budget, and vendors.
- Build and update a schedule.
- Track work.
- Report status.
- Escalate decisions.
- Respond to changes, problems, and opportunities.
- Replan without losing sight of the Mission.

## 2.2 Facilitator

The Facilitator changes roles during play.

### Role A — Game Master

- Controls pace.
- Announces phases.
- Starts/stops rounds.
- Releases Events.
- Adjusts difficulty based on the room.

### Role B — Sponsor

- Answers participant questions using the Sponsor Source of Truth.
- Rewards good questions with useful information.
- Does not solve prioritization for the team.

### Role C — Approver

- Reviews Mission Definition.
- Reviews Plan.
- Approves, approves with conditions, or asks for revision.

### Role D — Stakeholder

May temporarily act as:

- CEO Office
- IT Manager
- Finance
- Vendor
- Corporate Communication
- Production Partner

### Role E — Project Reviewer

Runs 60-second Status Reviews.

### Role F — Crisis Controller

Selects Change / Problem / Opportunity Events based on the readiness and pressure level of the room.

### Role G — Coach / Debriefer

Asks questions that expose reasoning. Avoid giving “the correct answer” during play unless necessary to move the learning forward.

---

# 3. Visual Design System — 90s 8-Bit Arcade

## 3.1 Visual Direction

Target feeling:

- 1990s arcade cabinet UI
- 8-bit / early 16-bit game interface
- Dark navy game screen
- Pixel borders
- Chunky status bars
- Hard shadows
- Bright arcade accents
- Simple iconography
- Clear data hierarchy
- Fun but still usable for a professional training room

Avoid:

- Modern glassmorphism
- Soft blurred shadows
- Pastel SaaS dashboard look
- Heavy gradients
- Overly animated casino aesthetics
- Tiny low-contrast text

## 3.2 Color Palette

Use the following as CSS tokens. Slight tuning is acceptable only for accessibility contrast.

```css
:root {
  --navy-950: #061426;
  --navy-900: #081B33;
  --navy-800: #102A4A;

  --arcade-yellow: #FFD84A;
  --arcade-green: #42E695;
  --arcade-orange: #FF8A3D;
  --arcade-blue: #3DA9FC;
  --arcade-purple: #A875FF;

  --text-main: #F5F7FA;
  --text-muted: #B8C6D9;
  --panel-line: #31506F;
  --panel-dark: #0C2039;
}
```

### Color meaning

- **Navy:** background, frames, primary surface.
- **Yellow:** current phase, selected state, attention, question tokens.
- **Green:** complete, approved, on track.
- **Orange:** warning, at risk, over capacity, important alerts.
- **Blue:** in progress, information, technical systems.
- **Purple:** delayed, special event, stakeholder/decision states.

Do not require red in the core palette. Critical states can use Orange + flashing border/pixel icon rather than introducing a seventh brand accent.

## 3.3 Typography

Use a dual-font strategy.

### English arcade display font

**Press Start 2P**

Use only for:

- Logo
- Major English headings
- Big counters
- Event codes
- Game phase titles
- Buttons with very short English text

Do not use it for paragraphs.

### Thai + bilingual UI font

**Chakra Petch**

Use for:

- Thai text
- Bilingual task names
- Body copy
- Forms
- Tables
- Long buttons
- Resource planner
- Facilitator notes

Recommended weights:

- 400 body
- 500 controls
- 600 subheads
- 700 critical labels

### Fallback stack

```css
--font-arcade: "Press Start 2P", monospace;
--font-ui: "Chakra Petch", "Noto Sans Thai", system-ui, sans-serif;
```

If the arcade font fails to load, functionality and layout must remain usable.

## 3.4 Pixel UI Rules

- Use a base spacing grid of **4px**.
- Prefer border widths of 2px or 4px.
- Border radius: mostly `0`, `2px`, or `4px`; avoid large rounded cards.
- Pixel-style hard shadows, e.g. `4px 4px 0`.
- Buttons should look pressable like arcade controls.
- Button active state should visually “move down/right” by 2–4px.
- Use simple CSS pixel patterns instead of heavy image assets.
- Optional subtle CRT scanline overlay must be under 5% opacity and easy to disable.
- Animations should be short, under 250ms for most UI.
- Respect `prefers-reduced-motion`.
- Never flash rapidly.

## 3.5 Pixel Icons

Use CSS/simple SVG icons or a small open icon set rendered in pixel style.

Suggested icon metaphors:

- Goal: target
- Sponsor: crown / speech bubble
- Task: clipboard
- Priority: arrow / flame
- Resource: character sprite
- Capacity: battery / energy bar
- Budget: coin
- Vendor: shop
- Issue: warning triangle
- Event: exclamation / lightning
- Decision: branching arrows
- Approved: check
- Replan: rotate arrow

Avoid realistic illustrations. Keep icons simple and game-like.

---

# 4. Information Architecture

## 4.1 Landing Screen

Title:

`MISSION CONTROL`

Subtitle:

`PLAN. PRIORITIZE. DELIVER.`

Thai helper text:

`เกมจำลองการวางแผนและบริหารงาน`

Actions:

- `PLAYER MODE / โหมดผู้เล่น`
- `FACILITATOR MODE / โหมดวิทยากร`
- `RESUME MISSION / เล่นต่อ` when saved Player state exists
- `RESET LOCAL DATA / ล้างข้อมูลเครื่องนี้`

Scenario badge:

`SCENARIO 01 — INNOVATION DAY`

## 4.2 Player Mode Main Navigation

The Player Mode should feel like one evolving digital playmat, not disconnected web pages.

Suggested sections:

1. `MISSION / ภารกิจ`
2. `TEAM / ทีม`
3. `SPONSOR / ผู้ว่าจ้าง`
4. `GOAL & SCOPE / เป้าหมายและขอบเขต`
5. `PRIORITY / ลำดับความสำคัญ`
6. `PLAN / แผนและทรัพยากร`
7. `MARKET / VENDOR`
8. `CONTROL / ติดตามงาน`
9. `DECISIONS / การตัดสินใจ`
10. `FINAL / สรุปภารกิจ`

Future phases should appear visually locked until the relevant phase is reached. Because there is no server sync, a simple facilitator instruction gate is sufficient for MVP.

## 4.3 Facilitator Mode Main Navigation

1. `RUN / ดำเนินเกม`
2. `SPONSOR / ข้อมูล Sponsor`
3. `APPROVAL / จุดอนุมัติ`
4. `EVENTS / เหตุการณ์`
5. `STATUS / รายงานสถานะ`
6. `SCORE / ประเมิน`
7. `DEBRIEF / ถอดบทเรียน`

## 4.4 Facilitator PIN Gate — LOCKED FOR MVP

Facilitator Mode must not open directly from the landing screen. Selecting `FACILITATOR MODE / โหมดวิทยากร` opens a Game Master access screen first.

### Default access

- PIN format: **4 numeric digits only**
- Default MVP PIN: **`1995`**
- Implementation should keep this in a single configuration constant such as `FACILITATOR_PIN` so the owner can change it quickly before deployment.
- Do not build username/password accounts.

### Access screen copy

```text
GAME MASTER ACCESS
เข้าสู่โหมดวิทยากร

ENTER 4-DIGIT PIN
กรอกรหัส PIN 4 หลัก

[ _ _ _ _ ]

[ ENTER CONTROL ROOM / เข้าห้องควบคุม ]
[ BACK / กลับ ]
```

Use a numeric input optimized for desktop/tablet. A simple optional on-screen 0–9 arcade keypad is acceptable, but a normal numeric field is sufficient for P0.

### Correct PIN behavior

1. Validate against the configured PIN.
2. Set `mission-control:facilitator-auth:v2 = true` in `sessionStorage`.
3. Navigate to the Facilitator Game Master Console.
4. Keep the session unlocked during refresh/navigation in the same browser session.

### Incorrect PIN behavior

Show an arcade-style error without exposing any hints:

```text
ACCESS DENIED
PIN ไม่ถูกต้อง

TRY AGAIN / ลองอีกครั้ง
```

Do not show the correct PIN, partial-match hints, or place the PIN in console logs. A lockout/cooldown is **not required** for MVP because classroom reliability is more important than brute-force resistance.

### Route guard behavior

Any direct attempt to open a Facilitator route must check `sessionStorage`. If not unlocked, redirect to the Facilitator PIN Gate.

Recommended routes for GitHub Pages using `HashRouter`:

```text
/#/
/#/player
/#/facilitator-access
/#/facilitator
```

`/#/facilitator` must never render Sponsor secrets or Event guidance before the session guard passes.

### Logout / Lock control

Facilitator Console should include:

`LOCK GAME MASTER / ล็อกโหมดวิทยากร`

This removes the facilitator auth key from `sessionStorage` and returns to the PIN Gate. Facilitator notes/scores in `localStorage` must remain intact.

### Security expectation

This PIN is intentionally a **casual access barrier** for a facilitated classroom, not real authentication. The public static app may expose compiled scenario data to technically skilled users. Do not introduce backend/authentication complexity into MVP solely to hide the PIN.

---

# 5. Scenario 01 — Innovation Day

## 5.1 Mission Brief — Team Visible

### Thai

บริษัทของคุณได้รับมอบหมายให้จัด **Innovation Day** ภายใน **10 วันทำการ**

ข้อมูลเบื้องต้น:

- คาดว่าจะมีผู้เข้าร่วมประมาณ **150 คน**
- มีผู้บริหารระดับสูงเข้าร่วม
- งบประมาณสูงสุด **120,000 บาท**
- งานต้องจัดขึ้นใน **Day 10**

ภารกิจของทีมคือวางแผนและบริหารโครงการให้สามารถส่งมอบได้สำเร็จภายใต้ข้อจำกัดที่กำหนด

### English

Your team has been assigned to deliver an **Innovation Day** within **10 working days**.

Initial information:

- Expected attendance is approximately **150 people**.
- Senior executives will participate.
- Maximum project budget is **THB 120,000**.
- The event must happen on **Day 10**.

Your mission is to plan and manage the project so it can be delivered successfully within the given constraints.

Important: this information is intentionally incomplete.

---

# 6. Team Roster — Visible From Start

Players know the team before the Chaos planning round.

Do not show the full resource planner during Chaos. Show only names, strengths, and available project capacity so players can form initial assumptions.

| Member | Preferred Skills | Capacity |
|---|---|---:|
| **May** | Project, Coordination, Facilitation | 6h/day |
| **Bank** | Design, Media, Content | 6h/day |
| **Ton** | IT, Streaming, Data | 6h/day |
| **Fon** | Admin, Procurement, Logistics | 6h/day |
| **Ploy** | Communication, Registration, Content | 6h/day |

Rules:

- Preferred Skill is guidance, not a hard restriction.
- Any person may work outside preferred skills.
- Each person has 6 project-hours per day.
- Hours reset each project day.
- Over-capacity is allowed but warned.

---

# 7. Sponsor Source of Truth — Facilitator Only

These facts are canonical for Scenario 01.

| Topic | Secret Fact |
|---|---|
| Purpose | Build employee engagement around innovation and generate ideas that can be developed further. |
| Event Date | Day 10. |
| Date Flexibility | Date cannot move. |
| Expected Attendance | Approximately 150 onsite participants. |
| Minimum Attendance | At least **130 onsite participants**. |
| Remote Audience | Live audience from 3 branches; remote audience does not count toward the 130 onsite minimum. |
| Satisfaction | Target at least **80%**. |
| Innovation Output | At least **20 usable Innovation Ideas**. |
| Venue | Main conference hall at headquarters. |
| Venue Capacity | Approximately 220 people. |
| CEO | Gives a 15-minute opening session. |
| CEO Content | CEO talking points/content that refers to the CEO requires CEO Office approval. |
| CEO Approval Deadline | Approval should be secured by **Day 5**. |
| Registration | Registration can open before CEO Content approval. |
| Invitations | General event information may be sent before CEO Content approval. |
| Livestream | Livestream to 3 branches is required. |
| Workshop | Innovation Workshop is a core activity. |
| Budget Ceiling | THB 120,000 at start. |
| Dietary | Vegetarian option is required. |
| Nice-to-have | Photo booth, gifts, decorative enhancements. |
| Critical Experience | CEO Session + Workshop + Livestream + usable participant experience. |
| Success Summary | Day 10, budget <= ceiling, >=130 onsite, >=80% satisfaction, >=20 usable ideas. |

Important distinction:

- `150` = expected attendance / forecast.
- `130` = minimum acceptable success criterion.

---

# 8. Sponsor Question Mechanic

## 8.1 Tokens

Each team receives **5 Question Tokens**.

Display as five arcade coins.

Example:

`QUESTION TOKENS: ● ● ● ● ●`

Each saved Sponsor question consumes one token.

## 8.2 Interaction

Team App fields:

- `QUESTION / คำถาม`
- button `REQUEST SPONSOR / ขอถาม Sponsor`

After pressing:

> Please ask the Facilitator directly. / กรุณาถาม Facilitator โดยตรง

Team then records:

- `SPONSOR ANSWER / คำตอบจาก Sponsor`
- `FACT OR ASSUMPTION? / ข้อมูลจริงหรือสมมติฐาน`

Saving consumes 1 token.

The app must never auto-answer the Sponsor question.

## 8.3 Sponsor Answer Guide

### If asked about the purpose

Answer:

> เป้าหมายหลักคือทำให้พนักงานมีส่วนร่วมกับเรื่อง Innovation และสร้างแนวคิดที่องค์กรสามารถนำไปต่อยอดได้

### If asked how success is measured

A strong question earns a strong answer:

> อย่างน้อย 130 คน onsite, Satisfaction อย่างน้อย 80% และต้องได้ Innovation Ideas อย่างน้อย 20 แนวคิดที่สามารถนำไปต่อยอดได้

### If asked whether 150 is the minimum

> 150 คือจำนวนที่คาดว่าจะเข้าร่วม ส่วนขั้นต่ำที่ถือว่ายอมรับได้คือ 130 คน onsite

### If asked about deadline

> งานจัดใน Day 10 และวันจัดเปลี่ยนไม่ได้

### If asked about CEO

> CEO จะกล่าวเปิดประมาณ 15 นาที และเนื้อหาสำหรับ CEO ต้องได้รับการอนุมัติจาก CEO Office ภายใน Day 5

### If asked whether invitations can go before CEO approval

> ได้ ข้อมูลทั่วไปและ Registration สามารถออกก่อนได้ แต่ CEO talking points หรือข้อความที่อ้างถึง CEO ต้องผ่าน Approval

### If asked about venue

> ห้องประชุมใหญ่สำนักงานใหญ่ รองรับประมาณ 220 คน

### If asked about technology / remote audience

> ต้อง Live Streaming ไปอีก 3 สาขา

### If asked about workshop

> Workshop เป็นกิจกรรมหลัก และต้องช่วยให้เกิด Innovation Ideas อย่างน้อย 20 แนวคิด

### If asked about budget

> Budget Ceiling คือ 120,000 บาท ต้องไม่เกิน

### If asked about food

> ต้องมี Vegetarian Option

### If asked “what tasks are most important?”

Do not solve Priority for them.

Suggested answer:

> ผมให้ Requirement และ Outcome ได้ แต่ทีมต้องเสนอเองว่าอะไรจำเป็นต่อการทำให้ Outcome เกิดขึ้น

---

# 9. Game Phase Flow

## PHASE 0 — Brief & Team Setup

Team sees Mission + Team Roster.

No detailed planning tool yet.

## PHASE 1 — Chaos Planning

Goal: expose assumptions and weak planning behavior before teaching the framework.

Duration: 15 minutes.

Team gets a simple scratchpad:

- `WHAT SHOULD WE DO? / เราควรทำอะไร?`
- `WHO MIGHT DO IT? / ใครน่าจะทำ?`
- `WHAT DO WE NEED TO KNOW? / เรายังต้องรู้อะไร?`

No detailed hours grid.

No Task Pool.

No Vendor Market.

Facilitator does not correct them.

### Chaos Debrief Questions

- Success คืออะไร?
- 150 คนคือ Target หรือ Minimum?
- อะไรอยู่ใน Scope?
- ใครมีสิทธิ์ Approve หรือเปลี่ยน Requirement?
- ตอนเริ่มวางแผน ทีมใช้ “ข้อมูลจริง” หรือ “สมมติฐาน”?

Learning message:

`UNDERSTAND THE WORK BEFORE PLANNING THE WORK.`

## PHASE 2 — Ask Sponsor + Define Mission

Unlock Sponsor Questions.

Then unlock Mission Definition fields:

- Mission Goal / เป้าหมายภารกิจ
- In Scope / อยู่ในขอบเขต
- Out of Scope / นอกขอบเขต
- Key Deliverables / สิ่งที่ต้องส่งมอบ
- Success Criteria / เกณฑ์ความสำเร็จ
- Stakeholders / ผู้เกี่ยวข้อง
- Constraints / ข้อจำกัด
- Assumptions / สมมติฐาน

## GATE 1 — Mission Approval

Team presses:

`REQUEST MISSION APPROVAL / ขออนุมัติภารกิจ`

Team pitches to Facilitator in 60 seconds.

Facilitator verdict:

- `APPROVED / อนุมัติ`
- `APPROVED WITH CONDITION / อนุมัติแบบมีเงื่อนไข`
- `REVISE / กลับไปแก้`

Because there is no sync, the team records the Facilitator verdict in its own app.

Track `reworkCount` for debrief only; do not automatically deduct score.

## PHASE 3 — Priority Battle

Unlock full Task Pool.

Team places tasks in four bilingual Priority Zones.

### Priority Zones

#### ทำก่อน / DO FIRST

งานที่หากไม่ทำตอนนี้ จะกระทบ Deadline, Dependency, Risk หรือ Mission อย่างมีนัยสำคัญ

#### วางแผนทำถัดไป / PLAN NEXT

งานสำคัญที่ยังสามารถกำหนดเวลาและลำดับได้อย่างเหมาะสม

#### มอบหมายหรือจ้างภายนอก / DELEGATE / OUTSOURCE

งานที่ต้องเกิดขึ้น แต่ไม่จำเป็นต้องใช้ Capacity หลักของทีม

#### เลื่อนหรือตัดออก / DEFER / DROP

งานที่ Impact ต่ำ หรือสามารถเสียสละได้เมื่อข้อจำกัดเปลี่ยน

For the five tasks ranked highest, require:

`WHY IS THIS A PRIORITY? / ทำไมงานนี้จึงสำคัญ?`

## PHASE 4 — Resource + Schedule Planning

Unlock:

- Day 1–Day 10 planner
- Resource allocations
- Capacity bars
- Budget projection
- Vendor Marketplace
- Dependency warnings

## GATE 2 — Plan Review

Team presses:

`REQUEST PLAN REVIEW / ขอทบทวนแผน`

90-second pitch:

1. Critical tasks
2. Bottleneck resource
3. Important dependency
4. Projected budget
5. Biggest current risk
6. Buffer / contingency

Facilitator gives feedback but does not rebuild the plan.

## PHASE 5 — Mission Control Simulation

Use four facilitator-controlled rounds.

- Round 1: D1–D3
- Round 2: D4–D5
- Round 3: D6–D7
- Round 4: D8–D10

Teams update tasks, hours, issues, decisions, vendors, and budget.

Facilitator releases Events through Event Codes.

## PHASE 6 — Final Mission Review

Team prepares:

- Mission Status
- Delivered
- Not Delivered
- Projected/Actual Budget
- Biggest Decision
- Biggest Risk
- What We Would Do Differently

Facilitator assesses using the rubric.

---

# 10. Final Task Pool — Bilingual

Implementation rule: store titles as separate `th` and `en` fields.

## T01

**ยืนยันสถานที่จัดงาน / Confirm Venue**

- Effort: 4h
- Preferred Skill: `Admin`, `Coordination`
- Due: D2
- Cost: 0
- Dependency: none
- Facilitator classification: Critical
- Description TH: ยืนยันสถานที่ ความจุ เงื่อนไขการใช้งาน และเวลาที่สามารถเข้าพื้นที่ได้
- Description EN: Confirm venue, capacity, usage conditions, and access window.

## T02

**จัดทำกำหนดการหลักของงาน / Develop Event Agenda**

- Effort: 6h
- Preferred Skill: `Project`, `Communication`
- Due: D4
- Cost: 0
- Dependency: none
- Classification: Supporting
- Description TH: กำหนดโครงกิจกรรม ลำดับช่วงสำคัญ และเวลาหลักของงาน
- Description EN: Build the event flow, major sessions, and timing structure.

## T03

**จัดทำร่างเนื้อหาสำหรับ CEO / Prepare CEO Content Brief**

- Effort: 6h
- Preferred Skill: `Project`, `Content`
- Due: D3
- Cost: 0
- Dependency: none
- Classification: Critical

## T04

**ขออนุมัติเนื้อหาจาก CEO Office / Secure CEO Content Approval**

- Effort: 2h
- Preferred Skill: `Coordination`
- Due: **D5**
- Cost: 0
- Dependency: T03
- Classification: Critical

## T05

**จัดทำระบบลงทะเบียน / Set Up Registration**

- Effort: 6h
- Preferred Skill: `Registration`, `Admin`
- Due: D3
- Cost: 0
- Dependency: none
- Classification: Critical

## T06

**ส่งคำเชิญผู้เข้าร่วม / Send Participant Invitations**

- Effort: 5h
- Preferred Skill: `Communication`
- Due: D4
- Cost: 0
- Dependency: T05
- Classification: Critical

## T07

**ออกแบบ Key Visual และ Poster / Create Key Visual & Poster**

- Effort: 8h
- Preferred Skill: `Design`, `Media`
- Due: D4
- Cost: 0
- Dependency: none
- Classification: Supporting

## T08

**จัดทำแผนถ่ายทอดสด / Design Livestream Plan**

- Effort: 8h
- Preferred Skill: `IT`, `Streaming`
- Due: D4
- Cost: 0
- Dependency: T01
- Classification: Critical

## T09

**ทดสอบ Network และระบบ Streaming / Conduct Network & Streaming Test**

- Effort: 6h
- Preferred Skill: `IT`, `Streaming`
- Due: D6
- Cost: 0
- Dependency: T01, T08
- Classification: Critical

## T10

**ยืนยันอาหารและเครื่องดื่ม / Confirm Catering**

- Effort: 5h
- Preferred Skill: `Admin`, `Procurement`
- Due: D6
- Cost: 42,000
- Dependency: none
- Classification: Supporting
- Note: Must support Vegetarian option.

## T11

**ออกแบบ Innovation Workshop / Design Innovation Workshop**

- Effort: 8h
- Preferred Skill: `Project`, `Facilitation`
- Due: D5
- Cost: 0
- Dependency: none
- Classification: Critical

## T12

**จัดเตรียมอุปกรณ์ Workshop / Produce Workshop Materials**

- Effort: 6h
- Preferred Skill: `Design`, `Admin`
- Due: D8
- Cost: 12,000
- Dependency: T11
- Classification: Supporting

## T13

**จัดเตรียมเวทีและ Backdrop / Prepare Stage & Backdrop**

- Effort: 6h
- Preferred Skill: `Design`, `Logistics`
- Due: D8
- Cost: 18,000
- Dependency: T07
- Classification: Optional / partially supporting

## T14

**ประสานงาน Production / Coordinate Production Setup**

- Effort: 5h
- Preferred Skill: `Coordination`, `Logistics`
- Due: D8
- Cost: 15,000
- Dependency: T01
- Classification: Supporting

## T15

**จัดทำ Run of Show / Create Run of Show**

- Effort: 6h
- Preferred Skill: `Project`, `Coordination`
- Due: D7
- Cost: 0
- Dependency: T02, T04, T11
- Classification: Critical

## T16

**ส่ง Reminder ผู้เข้าร่วม / Send Participant Reminder**

- Effort: 3h
- Preferred Skill: `Communication`
- Due: D9
- Cost: 0
- Dependency: T06
- Classification: Supporting

## T17

**ซ้อมใหญ่ / Full Rehearsal**

- Effort: 12 person-hours
- Preferred Skill: `Mixed`
- Due: D9 initially
- Cost: 0
- Dependency: T04, T09, T15
- Classification: Critical
- Note: Event E02 may move this deadline to D7.

## T18

**จัดทำแผนสำรอง Streaming / Create Streaming Backup Plan**

- Effort: 5h
- Preferred Skill: `IT`, `Streaming`
- Due: D8
- Cost: 0
- Dependency: T08
- Classification: Supporting

## T19

**จัด Photo Booth / Arrange Photo Booth**

- Effort: 6h
- Preferred Skill: `Design`, `Admin`
- Due: D9
- Cost: 12,000
- Dependency: none
- Classification: Optional

## T20

**จัดเตรียมของที่ระลึก / Arrange Participant Gifts**

- Effort: 4h
- Preferred Skill: `Admin`, `Procurement`
- Due: D8
- Cost: 15,000
- Dependency: none
- Classification: Optional

---

# 11. Resource Planning Rules

## 11.1 Internal Capacity

Every internal person has 6 project-hours per day.

For resource `r` on day `d`:

`usedHours(r,d) = SUM(all allocations for resource r on day d)`

Status:

- `0–4h`: Available
- `>4h–6h`: Busy
- `>6h`: Over Capacity

Do not block over-capacity. Show warning:

`OVER CAPACITY +2H / ใช้ Capacity เกิน 2 ชม.`

## 11.2 Allocation Model

Each allocation record:

```ts
{
  id: string,
  taskId: string,
  resourceId: string,
  day: number,
  hours: number,
  source: "internal" | "vendor"
}
```

A person can have multiple allocations on one day.

A task can have multiple allocations across people and days.

## 11.3 Task Progress

Basic mechanical progress:

`allocatedEffort = sum(internal allocated hours + eligible outsourced/vendor hours)`

`progressRatio = min(allocatedEffort / effectiveTaskEffort, 1)`

Do not automatically mark a task Done just because enough hours were allocated. The team should still explicitly set status to Done. However the UI may show:

`EFFORT COVERED: 100%`

and allow a quick `MARK DONE` action.

## 11.4 Skills

Skills are tags only in MVP.

No productivity multiplier.

No penalty for assigning a non-preferred person.

UI should show a subtle warning or question icon:

`NON-PREFERRED SKILL / นอก Skill ที่ถนัด`

This is advisory only.

## 11.5 Task Status Values

Always show bilingual labels.

- `Not Started / ยังไม่เริ่ม`
- `In Progress / กำลังทำ`
- `Done / เสร็จ`
- `At Risk / มีความเสี่ยง`
- `Delayed / ล่าช้า`
- `Dropped / ตัดออก`

Suggested colors:

- Not Started: muted navy/gray
- In Progress: Blue
- Done: Green
- At Risk: Orange
- Delayed: Purple
- Dropped: muted outline

---

# 12. Budget Rules

Initial ceiling:

`THB 120,000`

Internal staff time has no monetary cost in MVP.

Standard task costs and hired vendor costs contribute to `projectedSpend`.

Recommended simple budget calculation:

`projectedSpend = sum(cost of all non-dropped cost-bearing tasks) + sum(cost of hired vendors) + event cost adjustments`

This is intentionally a projected planning budget rather than detailed accounting.

Display:

- Budget Ceiling
- Projected Spend
- Remaining Buffer

Warnings:

- >= 90% ceiling: Yellow warning
- > ceiling: Orange critical warning

If Event E03 is applied:

`budgetCeiling = 95,000`

Do not delete existing commitments. The team must replan.

---

# 13. Vendor Marketplace — Final MVP Pool

Vendor decisions are designed to create trade-offs between money, internal capacity, time, visibility, risk, and flexibility.

Do not open all vendors at once.

## Availability Groups

### Available From Start of Resource Planning

- V01 Design Studio
- V05 Streaming Production Package
- V08 Registration Platform Pro
- V09 Communication Support Package
- V13 Workshop Facilitation Support
- V15 Generalist Freelancer
- V16 Project Coordination Service

### Additional Planning Options

- V02 Event Support Crew
- V03 Temporary Registration Staff
- V04 Event Runner Service
- V10 Express Print & Production
- V12 Flexible Catering Contract
- V14 Photo & Video Crew

### Situational / Event Response

- V06 Internet Upgrade
- V07 AV Backup Kit
- V11 Backup Production Vendor

## V01 — Design Studio / สตูดิโอออกแบบ

- Cost: THB 10,000
- Benefit: up to 12 vendor-hours for eligible Design/Media work
- Internal coordination required: 2h total by Bank or May
- Skills: `Design`, `Media`
- Availability: Resource Planning onward
- Teaching point: delegation still requires coordination.

## V02 — Event Support Crew / ทีมสนับสนุนงานอีเวนต์

- Cost: THB 8,000
- Capacity: 12 vendor-hours total
- Window: D7–D10 only
- Skills: `Admin`, `Logistics`, `Coordination`
- Internal coordination: 1h
- Teaching point: late-stage flexible capacity.

## V03 — Temporary Registration Staff / ทีมช่วยลงทะเบียนชั่วคราว

- Cost: THB 6,000
- Capacity: 8 vendor-hours total
- Window: D8–D10
- Skills: `Registration`, `Communication`, `Admin`
- Internal coordination: 1h

## V04 — Event Runner Service / ทีม Runner หน้างาน

- Cost: THB 5,000
- Capacity: 6 vendor-hours total
- Window: D6–D10
- Skills: `Logistics`, `Admin`, `Coordination`
- Internal coordination: 1h

## V05 — Streaming Production Package / แพ็กเกจถ่ายทอดสด

- Cost: THB 18,000
- Capacity: up to 12 vendor-hours for eligible Streaming work
- Internal coordination: Ton 3h total
- Benefit: Technical Operator + Backup Encoder
- Skills: `IT`, `Streaming`
- Helps with: T08, T09, T18
- Does **not automatically solve insufficient venue internet** unless paired with V06 or otherwise resolved.

## V06 — Internet Upgrade / อัปเกรด Internet

- Cost: THB 12,000
- No capacity added
- Effect: resolves the Network Capacity Problem state from E01
- Does not replace Streaming planning, testing, or staffing.
- Availability: only after E01 or Facilitator unlock.

## V07 — AV Backup Kit / ชุดอุปกรณ์ AV สำรอง

- Cost: THB 8,000
- No capacity added
- Adds `avBackupProtection = true`
- May reduce one equipment-related technical incident from Critical to At Risk at Facilitator discretion.
- Does not solve network bandwidth.

## V08 — Registration Platform Pro / ระบบลงทะเบียนสำเร็จรูป

- Cost: THB 7,000
- T05 effective effort changes from 6h -> 2h
- Adds Registration Dashboard capability
- Makes attendance/registration tracking more visible
- Internal setup/coordination is included in the 2h effective effort
- Teaching point: tools can buy visibility, not only time.

## V09 — Communication Support Package / บริการช่วยสื่อสารและประชาสัมพันธ์

- Cost: THB 9,000
- Capacity: up to 10 vendor-hours for eligible communication work
- Internal coordination: Ploy 2h total
- Skills: `Communication`, `Content`
- Eligible examples: invitations, reminders, basic event communication
- Excludes CEO strategic content approval work.

## V10 — Express Print & Production / บริการผลิตงานด่วน

- Cost: THB 8,000
- Choose one eligible physical deliverable
- Reduce required production lead time by 1 project day
- Does not create final artwork; design must still be completed.
- Eligible examples: T12, T13, signage-related outputs

## V11 — Backup Production Vendor / ผู้ผลิตสำรอง

- Cost: THB 14,000
- Availability: after Production Vendor Delay or Facilitator unlock
- Allows team to transfer a delayed physical production deliverable
- New maximum delivery delay becomes 1 day
- Existing sunk cost penalty: THB 5,000 when switching due to E06
- Teaching point: switching suppliers has a cost.

## V12 — Flexible Catering Contract / แพ็กเกจอาหารแบบยืดหยุ่น

- Premium Cost: +THB 6,000 on top of catering
- Normal post-cutoff headcount increase: +10%
- With V12: up to +30%
- Must be purchased before D6 unless Facilitator approves exception
- Teaching point: buying flexibility/options before uncertainty resolves.

## V13 — Workshop Facilitation Support / ทีมสนับสนุนการดำเนิน Workshop

- Cost: THB 9,000
- Capacity: 8 vendor-hours total
- Skills: `Facilitation`, `Workshop`, `General Support`
- Helps delivery/execution but does not replace T11 Workshop Design
- Internal coordination: May 1h

## V14 — Photo & Video Crew / ทีมถ่ายภาพและวิดีโอ

- Cost: THB 12,000
- Supports event photography
- If E11 Executive Highlight Video occurs, effective internal effort for the new video task changes from 10h -> 2h Content Review
- Internal coordination: 1h
- Teaching point: risk bet / optional readiness.

## V15 — Generalist Freelancer / ผู้ช่วยโครงการอิสระ

- Cost: THB 7,000
- Capacity: 10 vendor-hours total
- Skill: `General`
- Cannot replace specialist IT/Streaming work, CEO approval, or high-level design approval
- Window: D2–D9
- Internal coordination: 1h
- Teaching point: flexibility vs specialization.

## V16 — Project Coordination Service / ผู้ประสานงานโครงการภายนอก

- Cost: THB 9,000
- Capacity: 10 vendor-hours total
- Skills: `Coordination`, `Logistics`, `Documentation`
- Good for follow-up, scheduling, vendor coordination, logistics
- Cannot own CEO strategy/content decisions or Workshop Design
- Internal coordination: May 1h
- Teaching point: protect the internal project bottleneck.

## Vendor Commitment UX

Button:

`HIRE / จ้าง`

Confirmation modal:

> ยืนยันการจ้าง Vendor นี้หรือไม่? งบประมาณจะถูกเพิ่มเข้า Projected Spend ทันที
>
> Confirm this vendor commitment? The cost will be added to Projected Spend immediately.

Buttons:

- `CONFIRM / ยืนยัน`
- `CANCEL / ยกเลิก`

After hire:

`COMMITTED / จ้างแล้ว`

Do not provide a casual Undo button. If cancellation is needed, team should use Decision Request and record the Facilitator decision.

---

# 14. Dependency Rules

If a task has dependencies that are not Done, show:

`DEPENDENCY NOT READY / งานก่อนหน้ายังไม่พร้อม`

Do not hard-block planning. Teams may choose overlapping work intentionally, but the warning remains.

Primary dependencies:

- T04 <- T03
- T06 <- T05
- T08 <- T01
- T09 <- T01 + T08
- T12 <- T11
- T13 <- T07
- T14 <- T01
- T15 <- T02 + T04 + T11
- T16 <- T06
- T17 <- T04 + T09 + T15
- T18 <- T08

---

# 15. Events — Facilitator Controlled, Never Random

## 15.1 Event Code Mechanic

Facilitator chooses an Event in Facilitator Mode.

Facilitator announces it verbally and gives the Event Code, e.g.:

`EVENT E03`

Team enters code into:

`EVENT INBOX / รับเหตุการณ์`

Field:

`ENTER EVENT CODE / ใส่รหัสเหตุการณ์`

After successful code:

- Reveal full bilingual event card.
- Apply defined mechanical state changes.
- Add event to Event Log.
- Ask team to record response/decision.

The Team App must not list unreleased events.

## 15.2 Event Types

- `CHANGE / การเปลี่ยนแปลง`
- `PROBLEM / ปัญหา`
- `OPPORTUNITY / โอกาส`

## E01 — Network Capacity Problem / Network รองรับไม่พอ

Type: Problem

Suggested timing: D4–D5

Facilitator announcement:

> IT แจ้งผลเบื้องต้นว่า Network ของห้องประชุมยังไม่สามารถรองรับการ Live Streaming ไป 3 สาขาได้อย่างเสถียร

EN:

> IT reports that the venue network cannot yet support a stable livestream to all three branches.

Mechanical effect:

- Set `networkRisk = true`
- Mark T09 At Risk if not Done
- Unlock V06 and V07

Good teams may:

- Clarify root cause
- Hire vendor
- Buy internet upgrade
- Create backup
- Reallocate Ton

Debrief:

> ทีมแก้ที่อาการ หรือแก้ที่ความเสี่ยงต่อ Mission?

## E02 — CEO Rehearsal Moved / CEO เปลี่ยนวันซ้อม

Type: Change

Announcement:

> CEO Office แจ้งว่า CEO สามารถซ้อมได้เฉพาะ Day 7 แทน Day 9

Effect:

- T17 due changes D9 -> D7
- Recalculate due warnings

Good teams notice dependencies T04 + T09 + T15.

Debrief:

> เมื่อ Milestone หนึ่งขยับ ทีมมองเห็น Dependency ที่กระทบตามมาหรือไม่?

## E03 — Budget Reduction / งบประมาณลดลง

Type: Change

Announcement:

> ผู้บริหารขอปรับงบสูงสุดจาก 120,000 บาท เหลือ 95,000 บาท โดย Outcome หลักยังเหมือนเดิม

Effect:

- Budget ceiling 120,000 -> 95,000

Debrief:

> คุณตัดสิ่งที่แพงที่สุด หรือตัดสิ่งที่ Impact ต่ำที่สุด?

## E04 — Attendance Forecast Increase / ผู้เข้าร่วมอาจเพิ่มขึ้น

Type: Change

Announcement:

> ยอดความสนใจสูงกว่าคาด ปัจจุบันมีแนวโน้มว่าผู้เข้าร่วม onsite อาจถึง 210 คน

Effect:

- `expectedAttendance = 210`

Prompt impacts:

- Venue
- Catering
- Materials
- Registration
- Staffing

Debrief:

> Change หนึ่งเรื่องกระทบกี่ส่วนของ Plan?

## E05 — Ton Unavailable / Ton ไม่สามารถทำงานได้

Type: Problem

Announcement:

> Ton แจ้งว่า Day 5 ไม่สามารถทำงานในโครงการได้เลย

Effect:

- Ton D5 capacity = 0h
- Existing D5 Ton allocations become conflicts

Debrief:

> Plan ของทีมมี Single Point of Failure หรือไม่?

## E06 — Production Vendor Delay / Production Vendor ส่งงานช้า

Type: Problem

Announcement:

> Production Vendor แจ้งว่างาน Stage / Backdrop จะส่งช้ากว่าแผน 2 วัน

Effect:

- Add +2 day delay to T13 delivery expectation if T13 is active
- Unlock V11

Debrief:

> ทีมมีทางเลือกอะไรบ้างนอกจากรอ Vendor เดิม?

## E07 — Streaming Vendor Offer / ข้อเสนอ Streaming Vendor

Type: Opportunity

Announcement:

> Streaming Vendor เสนอ Package 18,000 บาท ลดภาระ Internal IT ได้สูงสุด 12 ชั่วโมง และมี Backup Encoder

Effect:

- Highlight/unlock V05 if not already visible
- Optional offer expiry: end of current round

Debrief:

> เงิน 18,000 บาทซื้อ Capacity และ Risk Reduction คุ้มหรือไม่?

## E08 — Extra Internal Support / ได้คนช่วยชั่วคราว

Type: Opportunity

Announcement:

> ทีม Corporate Communication สามารถช่วยได้ 6 ชั่วโมงใน Day 6 แต่ต้องตอบภายในรอบนี้

Effect:

Create temporary resource:

- Name: `Corp Comms Support`
- D6 capacity: 6h
- Skills: `Communication`, `Content`, `General Support`

Debrief:

> Capacity เพิ่มนี้มี Value กับ Bottleneck ของทีมจริงหรือไม่?

## E09 — Registration Behind Target / ยอดลงทะเบียนต่ำกว่าเป้า

Type: Problem

Announcement:

> สิ้น Day 6 มีผู้ยืนยันเข้าร่วม onsite เพียง 92 คน

Effect:

- `confirmedAttendance = 92`
- Attendance metric flagged At Risk if team has recorded minimum 130 in its Success Criteria

Debrief:

> ทีม Track Activity หรือ Track Outcome?

## E10 — Catering Cut-off / Catering ปิดยอด

Type: Problem

Announcement:

> Catering แจ้งว่าต้อง Final Headcount ภายใน Day 7 หลังจากนั้นสามารถเพิ่มได้ไม่เกิน 10%

Effect:

- Set `cateringCutoffDay = 7`
- `postCutoffIncreaseLimit = 0.10`
- If V12 active: set limit to 0.30

Debrief:

> ข้อมูลอะไรที่ต้องรู้ก่อนตัดสินใจ Commit Resource?

## E11 — Executive Highlight Video / ขอ Highlight Video เพิ่ม

Type: Change

Announcement:

> CEO Office ขอเพิ่ม Executive Highlight Video หลังงาน และต้องส่งภายใน Day 11

Effect:

Add new task T21:

**จัดทำ Executive Highlight Video / Produce Executive Highlight Video**

- Effort: 10h
- Preferred Skill: `Media`, `Content`
- Due: D11
- Cost: 0
- If V14 active, effective internal effort = 2h Content Review

Team may:

- Accept
- Negotiate
- Reject with reason
- Outsource

Debrief:

> Requirement ใหม่ทุกอันจำเป็นต้องตอบ Yes หรือไม่?

## E12 — Early Artwork Deadline / Deadline Artwork เร็วขึ้น

Type: Change / Problem

Announcement:

> Production Vendor แจ้งว่า Final Artwork ต้องส่งไม่เกิน Day 6 ไม่เช่นนั้นไม่สามารถรับประกันการติดตั้งได้

Effect:

- If T13 active, set artwork milestone D6
- Highlight V10

Debrief:

> ทีมเผื่อ Buffer ให้ External Dependency แค่ไหน?

---

# 16. Decision Request Mechanic

Teams can escalate to the Facilitator at any time after Mission Approval.

Team App form:

- `SITUATION / สถานการณ์`
- `RECOMMENDATION / ข้อเสนอของทีม`
- `IMPACT / ผลกระทบ`
- `DECISION NEEDED / สิ่งที่ต้องการให้ตัดสินใจ`

Button:

`REQUEST DECISION / ขอการตัดสินใจ`

Team verbally presents the request.

Then records Facilitator response:

- `APPROVED / อนุมัติ`
- `NEED MORE INFO / ขอข้อมูลเพิ่ม`
- `NOT APPROVED / ไม่อนุมัติ`
- `OTHER / อื่นๆ`

Decision Log record:

```ts
{
  id: string,
  day: number,
  situation: string,
  recommendation: string,
  impact: string,
  decisionNeeded: string,
  sponsorResponse: string,
  notes: string,
  createdAt: string
}
```

Key learning principle:

`ESCALATE WITH A RECOMMENDATION, NOT ONLY A PROBLEM.`

---

# 17. Mission Approval Checklist — Facilitator

Team gets 60 seconds.

Facilitator checks:

- [ ] Goal: Is the outcome clear?
- [ ] Deliverables: Are the key outputs identifiable?
- [ ] Success: Are there measurable criteria?
- [ ] Scope: Does the team know what is in/out?
- [ ] Stakeholders: Are important actors recognized?
- [ ] Constraints: Date/budget/resources considered?
- [ ] Assumptions: Can the team separate facts from assumptions?

Verdict:

- Approved
- Approved with Condition
- Revise

Suggested Facilitator behavior:

Do not rewrite the team Goal. State what is missing or ambiguous.

---

# 18. Plan Review Checklist — Facilitator

90-second team pitch:

1. What are your Critical Tasks?
2. Which resource is your current bottleneck?
3. Which dependency worries you most?
4. What is your projected spend and remaining budget buffer?
5. What is your biggest risk?
6. Where is your buffer / contingency?

Checklist:

- [ ] Critical tasks have owners
- [ ] Deadlines are plausible
- [ ] Dependencies are visible
- [ ] Over-capacity is recognized
- [ ] Budget is within ceiling or trade-off is explicitly recognized
- [ ] At least one contingency exists
- [ ] Team can explain a meaningful trade-off

---

# 19. Status Review Script — Facilitator

Each selected team gets **60 seconds**.

They must report only:

## 1. STATUS / สถานะ

- ON TRACK
- AT RISK
- CRITICAL

## 2. TOP ISSUE / ปัญหาหลัก

What is the most important issue right now?

## 3. IMPACT / ผลกระทบ

What happens if it is not resolved?

## 4. ACTION / สิ่งที่กำลังทำ

What is the team doing?

## 5. NEED / สิ่งที่ต้องการ

Does the team need a decision, resource, or information?

Suggested Facilitator interruption if team lists every activity:

> ผมไม่ต้องการ Activity Report ครับ ผมต้องการรู้ว่าตอนนี้ Mission มีความเสี่ยงอะไร

---

# 20. Tracking Board

Each Task should display:

- Task ID
- Bilingual task title
- Status
- Due Day
- Allocated effort / required effort
- Owners / resource allocations
- Projected cost
- Dependencies
- Issue
- Next Action
- Priority Zone

Fields:

- `ISSUE / ประเด็น`
- `NEXT ACTION / สิ่งที่จะทำต่อ`

Dashboard filters:

- All
- Critical due soon
- At Risk
- Delayed
- Done
- Dropped

Show summary counters:

- Done
- In Progress
- At Risk
- Delayed
- Over Capacity Resources
- Budget Remaining

---

# 21. Player Mode Screen Specifications

## Screen T01 — Mission Brief

Components:

- Scenario title
- Mission text
- Initial facts
- Day 10 objective
- Start button

Arcade treatment:

- “INSERT TEAM NAME” input
- Start button styled like arcade Start button

Button:

`START MISSION / เริ่มภารกิจ`

## Screen T02 — Your Team

Show five character cards:

- May
- Bank
- Ton
- Fon
- Ploy

Each card:

- Name
- Pixel avatar generated with CSS blocks or simple SVG
- Skill tags
- `6H/DAY ENERGY` bar

No detailed allocation yet.

## Screen T03 — Chaos Planning

Large scratchpad cards:

- What should we do?
- Who might do it?
- What do we still need to know?

Auto-save text.

No Task Pool.

## Screen T04 — Ask Sponsor

- Five coin tokens
- Question input
- Ask Sponsor button
- Answer input
- Fact/Assumption selector
- Previous Q&A log

## Screen T05 — Goal & Scope

Use structured editable panels.

Fields:

- Goal
- In Scope
- Out of Scope
- Deliverables list
- Success Criteria list
- Stakeholders list
- Constraints list
- Assumptions list

Button:

`REQUEST APPROVAL / ขออนุมัติ`

Then record verdict.

## Screen T06 — Priority Board

Four columns / zones.

Desktop: 4-column board.

Tablet/small width: stacked zones.

Tasks can be moved by drag/drop if stable. If drag/drop increases build risk, implement reliable dropdown/buttons instead.

Do not make drag/drop a release blocker.

Each Task card shows:

- ID
- Bilingual title
- Effort
- Due
- Skill tags
- Cost
- Dependency indicator

For top five tasks, show required priority reason field.

## Screen T07 — Resource & Schedule Planner

Core MVP interaction.

Recommended layout:

Left:

- Resource roster
- Daily capacity bar

Center:

- Day 1–Day 10 grid

Right / drawer:

- Selected task details
- Add allocation
- Vendor option
- Issues/warnings

Allocation form:

- Task
- Resource
- Day
- Hours

Allow decimal hours in 0.5h increments.

Examples:

- 1.0
- 1.5
- 2.0
- 3.0

Capacity calculation updates immediately.

Warnings:

- Over Capacity
- Dependency not ready
- Due date risk
- Non-preferred skill

## Screen T08 — Vendor Marketplace

Cards grouped by:

- Capacity
- Technology
- Communication
- Production
- Flexibility
- Delivery

Each card:

- ID
- Bilingual name
- Cost
- Benefit
- Internal coordination requirement
- Availability window
- Hire button

Hidden situational vendors remain hidden until unlocked.

## Screen T09 — Mission Control Dashboard

Header:

- Current Simulation Round
- Current Day range
- Budget
- Overall team-selected status

Widgets:

- Task Status
- Resource Capacity
- Budget
- Key Issues
- Event Inbox
- Decision Request

Team selects current mission status:

- On Track
- At Risk
- Critical

## Screen T10 — Event Inbox

Input:

`EVENT CODE`

On valid code:

Show event in full-screen/pixel modal.

Require acknowledgement:

`EVENT RECEIVED / รับทราบเหตุการณ์`

Then ask:

`WHAT CHANGES? / อะไรต้องเปลี่ยน?`

Optional note field.

## Screen T11 — Decision Log

Chronological list of:

- Decisions
- Sponsor approvals
- Event responses

## Screen T12 — Final Mission Review

Fields:

- Mission Status
- Delivered
- Not Delivered
- Projected/Actual Spend
- Biggest Decision
- Biggest Risk
- What We Would Do Differently

Button:

`LOCK FINAL REVIEW / ยืนยันสรุปภารกิจ`

Optional:

`EXPORT TEAM RESULT / ส่งออกผลทีม`

---

# 22. Facilitator Mode Screen Specifications

## Screen F01 — Run Console

Show:

- Current Phase
- Suggested time block
- Large timer
- “What teams should be doing now”
- “What facilitator should watch for”
- Next debrief prompt

Timer is local-only.

Buttons:

- Start
- Pause
- Reset

No automatic phase sync required.

## Screen F02 — Sponsor Console

Two panels:

Left:

- Sponsor Source of Truth

Right:

- Question Answer Guide
- Common traps
- “Do not reveal Priority” reminder

Fast search/filter by keyword:

- success
- attendance
- CEO
- venue
- budget
- streaming
- workshop
- catering

## Screen F03 — Approval Console

Tabs:

- Mission Approval
- Plan Review

Provide checklists and a notes field per team.

Team names can be added manually in Facilitator Mode.

No sync with Player Mode required.

## Screen F04 — Event Control

Grid of Event Cards.

Filters:

- Type
- Difficulty
- Suggested timing

Each card shows:

- Event Code
- Bilingual title
- Type
- Difficulty
- Suggested timing
- Facilitator announcement
- Mechanical effect
- What good teams may notice
- Debrief question

Buttons:

- `SHOW ON PROJECTOR` — optional full-screen event card on facilitator device
- `COPY EVENT CODE`

No action should automatically push to teams.

## Screen F05 — Status Review

Show 5-part status script.

Allow quick notes by team:

- Status
- Top Issue
- Quality of Impact thinking
- Action quality
- Need/Escalation quality

## Screen F06 — Score

Per-team sliders/number inputs:

- Goal & Scope /20
- Prioritization /20
- Resource & Schedule /20
- Tracking & Communication /20
- Adaptation & Replanning /20

Total /100.

Provide rubric descriptions inline.

## Screen F07 — Debrief

Organize questions by:

- Goal
- Priority
- Resource
- Tracking
- Change
- Communication
- Transfer to real work

Allow Facilitator to favorite questions.

---

# 23. Scoring Rubric

Qualitative score is Facilitator-owned.

## Goal & Scope — 20

### 17–20

Goal measurable; scope clear; success criteria strong; facts and assumptions separated.

### 13–16

Mostly clear; a few gaps.

### 9–12

Goal exists but is activity-focused rather than outcome-focused.

### 0–8

Goal/scope cannot meaningfully guide decisions.

## Prioritization — 20

### 17–20

Uses impact, deadline, dependency, and risk to prioritize.

### 13–16

Mostly sensible, with some urgency bias.

### 9–12

Often reacts to urgent/noisy work rather than Mission impact.

### 0–8

Everything is treated as a priority.

## Resource & Schedule — 20

### 17–20

Capacity realistic; dependencies considered; clear trade-offs and buffer.

### 13–16

Usable plan with some overload or weak buffer.

### 9–12

Multiple collisions or implausible timing.

### 0–8

Schedule ignores real constraints.

## Tracking & Communication — 20

### 17–20

Finds risk early; reports concisely; escalates the right issues.

### 13–16

Good tracking; communication occasionally too activity-heavy.

### 9–12

Reports tasks more than outcomes/risks.

### 0–8

Problems are seen too late.

## Adaptation & Replanning — 20

### 17–20

Reprioritizes and reallocates logically as conditions change.

### 13–16

Adapts but sometimes tries to preserve too much of the original plan.

### 9–12

Mostly reacts to local symptoms.

### 0–8

Keeps the original plan even after major conditions change.

---

# 24. Mission Result

Keep operational result separate from learning score.

Facilitator can assign:

- `DELIVERED / ส่งมอบได้`
- `DELIVERED AT RISK / ส่งมอบได้แต่มีความเสี่ยง`
- `NOT DELIVERED / ส่งมอบไม่สำเร็จ`

App can provide evidence but should not automatically make qualitative judgement.

Evidence panel may show:

- Critical task status
- Budget vs ceiling
- Outstanding high-risk tasks
- Over-capacity days
- Known attendance metric
- Key unresolved issues

---

# 25. Facilitator Run Sheet — 6-Hour Class

## 09:00–09:15 — Opening + Team Setup

Facilitator line:

> วันนี้ผมจะไม่เริ่มจากการสอนวิธีวางแผนครับ วันนี้พวกคุณจะได้รับงานหนึ่งงาน และต้องบริหารมันให้รอด

Show Mission Brief and Team Roster.

## 09:15–09:30 — Chaos Planning

Instruction:

> คุณมีเวลา 15 นาที วางแผนว่าจะทำอย่างไรให้งานนี้สำเร็จจากข้อมูลที่คุณมีอยู่ตอนนี้

Facilitator watches for:

- Immediate task creation
- Hidden assumptions
- Weak success definition
- Premature role assignment

Do not coach.

## 09:30–10:00 — Chaos Debrief

Questions:

- Success คืออะไร?
- 150 คนคือ Target หรือ Minimum?
- อะไรอยู่ใน Scope?
- รู้อะไรจริง / Assume อะไร?

Teaching bridge:

`UNDERSTAND WORK BEFORE PLANNING WORK.`

## 10:00–10:25 — Ask Sponsor

5 Question Tokens.

Teams formulate their own questions.

Facilitator answers using Source of Truth.

## 10:25–10:45 — Define Mission

Teams fill Goal & Scope.

## 10:45–11:00 — Mission Approval Gate

60-second pitch/team.

## 11:00–11:35 — Priority Battle

Reveal Task Pool.

Teams sort tasks and justify Top 5.

## 11:35–12:15 — Priority Debrief + Concept

Questions:

- อะไร Urgent แต่ Impact ต่ำ?
- อะไรไม่ด่วน แต่ถ้าช้าจะกระทบหลายงาน?
- ถ้าทุกอย่างเป็น Priority จะเกิดอะไร?

## 13:15–13:30 — Resource Rules

Teach only:

- 6h/person/day
- Split allowed
- Multiple people allowed
- Vendor can buy capacity/risk/flexibility
- Over Capacity is allowed but risky

## 13:30–14:15 — Build Resource & Schedule

Teams allocate hours, tasks, vendors, and budget.

Facilitator asks questions, does not fix the plan.

## 14:15–14:30 — Plan Review Gate

90 seconds/team.

## 14:30–14:45 — Simulation Round 1: D1–D3

Update tasks.

Optional low-pressure event:

- E07
- E08

Status Review 1–2 teams.

## 14:45–15:00 — Simulation Round 2: D4–D5

Recommended:

- E01 OR E05

Teams replan.

## 15:00–15:15 — Simulation Round 3: D6–D7

Recommended:

- E02
- E09

Use both only if room can handle it.

Status Review.

## 15:15–15:30 — Simulation Round 4: D8–D10

High-pressure option:

- E03 OR E04

Do not use both if teams are already overloaded.

## 15:30–15:45 — Final Mission Review

Teams summarize.

## 15:45–16:00 — After Action Review

Questions:

- ตอน Goal ไม่ชัด เกิดอะไรขึ้น?
- Resource ตัวไหนเป็น Bottleneck?
- ทีมรู้ว่า Plan มีปัญหาเมื่อไหร่?
- Change ไหนทำให้ต้อง Reprioritize จริง?
- มีอะไรที่ควร Escalate เร็วกว่านี้?
- พรุ่งนี้เช้า คุณจะเปลี่ยนพฤติกรรมการวางแผนของตัวเองเรื่องอะไรหนึ่งอย่าง?

---

# 26. Suggested React / TypeScript Architecture

Recommended stack for speed and maintainability:

- React
- TypeScript
- Vite
- CSS Modules or a simple global token + component CSS system
- No backend
- React Router with `HashRouter` is recommended for reliable GitHub Pages routing and direct refresh behavior
- Native HTML5 `localStorage` for game data
- Native HTML5 `sessionStorage` for Facilitator PIN unlock state

Suggested project structure:

```text
mission-control/
├── public/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── routes.tsx
│   │   ├── storage.ts
│   │   ├── auth.ts
│   │   └── config.ts
│   ├── components/
│   │   ├── PixelButton/
│   │   ├── PixelPanel/
│   │   ├── StatusBadge/
│   │   ├── CapacityBar/
│   │   ├── TaskCard/
│   │   ├── VendorCard/
│   │   ├── EventCard/
│   │   └── ArcadeModal/
│   ├── modes/
│   │   ├── player/
│   │   └── facilitator/
│   │       ├── FacilitatorAccess.tsx
│   │       ├── FacilitatorGuard.tsx
│   │       └── FacilitatorConsole.tsx
│   ├── engine/
│   │   ├── capacity.ts
│   │   ├── budget.ts
│   │   ├── dependencies.ts
│   │   ├── events.ts
│   │   └── scenario.ts
│   ├── scenarios/
│   │   └── innovation-day/
│   │       ├── scenario.ts
│   │       ├── tasks.ts
│   │       ├── resources.ts
│   │       ├── vendors.ts
│   │       ├── events.ts
│   │       └── sponsor.ts
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── arcade.css
│   │   └── globals.css
│   └── types/
│       └── game.ts
├── README.md
└── package.json
```

Important architecture principles:

`ONE APP = PLAYER MODE + FACILITATOR MODE`

`ENGINE != SCENARIO DATA`

- Player and Facilitator modes share the same codebase, components, style tokens, scenario modules, and deployment.
- They do not require realtime state synchronization in MVP; human facilitation is the bridge between devices.
- Facilitator routes are protected by the local 4-digit PIN session gate.
- Do not hard-code “Innovation Day” behavior in reusable calculation functions unless truly scenario-specific.

---

# 27. Core TypeScript Data Shapes

These are suggested, not mandatory exact syntax.

```ts
export type LocalizedText = {
  th: string;
  en: string;
};

export type SkillTag =
  | "Project"
  | "Coordination"
  | "Facilitation"
  | "Design"
  | "Media"
  | "Content"
  | "IT"
  | "Streaming"
  | "Data"
  | "Admin"
  | "Procurement"
  | "Logistics"
  | "Communication"
  | "Registration"
  | "General"
  | "General Support"
  | "Mixed";

export type Resource = {
  id: string;
  name: string;
  skills: SkillTag[];
  dailyCapacity: number;
  capacityOverrides?: Record<number, number>;
  kind: "internal" | "temporary" | "vendor";
};

export type TaskStatus =
  | "not_started"
  | "in_progress"
  | "done"
  | "at_risk"
  | "delayed"
  | "dropped";

export type PriorityZone =
  | "do_first"
  | "plan_next"
  | "delegate_outsource"
  | "defer_drop";

export type Task = {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  effortHours: number;
  effectiveEffortHours?: number;
  preferredSkills: SkillTag[];
  dueDay: number;
  cost: number;
  dependencies: string[];
  facilitatorClassification: "critical" | "supporting" | "optional";
  status: TaskStatus;
  priorityZone?: PriorityZone;
  priorityReason?: string;
  issue?: string;
  nextAction?: string;
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
  description: LocalizedText;
  availability: "planning" | "later_planning" | "situational";
  unlocked: boolean;
  hired: boolean;
  coordinationHours?: number;
  window?: { startDay: number; endDay: number };
  totalCapacityHours?: number;
  skills?: SkillTag[];
  effectType:
    | "capacity"
    | "task_effort_modifier"
    | "risk_flag"
    | "lead_time"
    | "flexibility"
    | "custom";
  effectConfig: Record<string, unknown>;
};

export type GameEvent = {
  id: string;
  code: string;
  title: LocalizedText;
  type: "change" | "problem" | "opportunity";
  difficulty: "low" | "medium" | "high";
  suggestedTiming: string;
  facilitatorAnnouncement: LocalizedText;
  teamText: LocalizedText;
  debriefQuestion: LocalizedText;
  applied: boolean;
  effectType: string;
  effectConfig: Record<string, unknown>;
};
```

---

# 28. Team Game State

Suggested shape:

```ts
export type TeamGameState = {
  scenarioId: "innovation-day";
  version: 1;
  teamName: string;
  currentPhase: string;
  currentDay: number;
  currentRound: number;

  questionTokensRemaining: number;
  sponsorQA: Array<{
    question: string;
    answer: string;
    factOrAssumption: "fact" | "assumption" | "unknown";
  }>;

  missionDefinition: {
    goal: string;
    inScope: string[];
    outOfScope: string[];
    deliverables: string[];
    successCriteria: string[];
    stakeholders: string[];
    constraints: string[];
    assumptions: string[];
  };

  missionApproval: {
    status: "not_requested" | "approved" | "conditional" | "revise";
    notes: string;
    reworkCount: number;
  };

  tasks: Task[];
  resources: Resource[];
  allocations: Allocation[];
  vendors: Vendor[];
  appliedEventCodes: string[];
  decisions: unknown[];

  budgetCeiling: number;
  expectedAttendance: number;
  confirmedAttendance?: number;

  missionStatus: "on_track" | "at_risk" | "critical";

  finalReview?: {
    missionResult?: string;
    delivered: string;
    notDelivered: string;
    biggestDecision: string;
    biggestRisk: string;
    doDifferently: string;
  };
};
```

---

# 29. Browser Storage Keys

Use versioned keys and keep Player data separate from Facilitator data.

## localStorage — persistent game data

```text
mission-control:player:v2
mission-control:facilitator:v2
mission-control:settings:v2
```

## sessionStorage — temporary Facilitator unlock only

```text
mission-control:facilitator-auth:v2
```

Rules:

- Player mission progress survives refresh/browser reopen through `localStorage`.
- Facilitator notes/scores survive refresh/browser reopen through `localStorage`.
- Facilitator PIN unlock does **not** survive a closed browser session.
- `LOCK GAME MASTER` removes only the `sessionStorage` auth key; it must not erase facilitator notes or scores.
- If state schema changes, include migration or reset safely.
- Autosave after meaningful changes.
- Add a visible `Saved locally / บันทึกในเครื่องแล้ว` status indicator.

Recommended config:

```ts
export const FACILITATOR_PIN = "1995";
```

Keep this value in one location so the project owner can change it without searching through components. Do not put it in route strings or UI content.

---

# 30. Export / Import

If achievable without destabilizing MVP, add:

## Team Export

Export current TeamGameState as JSON.

Filename example:

```text
mission-control-team-alpha-2026-08-24.json
```

## Import

Allow restoring a previously exported state.

Validate scenario/version before load.

Do not require this feature for basic play if schedule is tight.

---

# 31. Core Calculation Functions

## Capacity

```ts
getUsedHours(resourceId, day)
getAvailableHours(resourceId, day)
getCapacityStatus(resourceId, day)
```

Capacity override must support E05:

```ts
capacityOverrides[5] = 0
```

## Task Effort

```ts
getAllocatedEffort(taskId)
getEffectiveEffort(taskId)
getEffortCoverage(taskId)
```

Vendor task-effort modifiers must be composable but simple.

## Budget

```ts
getProjectedTaskCost()
getVendorCost()
getEventCostAdjustments()
getProjectedSpend()
getBudgetRemaining()
```

## Dependencies

```ts
getUnmetDependencies(taskId)
hasDependencyRisk(taskId)
```

## Deadline

```ts
isOverdue(taskId, currentDay)
isDueSoon(taskId, currentDay)
```

---

# 32. Bilingual Content Convention

For static content use:

```ts
{
  th: "ยืนยันสถานที่จัดงาน",
  en: "Confirm Venue"
}
```

Display default:

`ยืนยันสถานที่จัดงาน / Confirm Venue`

For narrow UI:

- Thai first line
- English second line smaller

Example:

```text
ยืนยันสถานที่จัดงาน
CONFIRM VENUE
```

Do not machine-translate user-entered free text.

---

# 33. Arcade Component Behaviors

## Pixel Button

States:

- default
- hover
- pressed
- disabled
- attention

Pressed state should shift 2px down/right and reduce shadow.

## Pixel Panel

- Navy surface
- 2–4px pixel border
- optional top label strip
- no large rounded corners

## Status Badge

Use icon + text + color; do not rely on color alone.

## Capacity Bar

Segmented 6-block energy bar where each block represents ~1 hour.

Allow half-hour display with partial block or text overlay.

Examples:

`BANK D3 [■■■■■■] 6/6H`

Over capacity:

`BANK D3 [■■■■■■] 8/6H +2H!`

## Token Display

Sponsor question tokens should resemble arcade coins.

## Budget Display

Large arcade-style counter:

`BUDGET 120,000`

Then smaller:

`PROJECTED 87,000 | BUFFER 33,000`

---

# 34. Accessibility and Classroom Reliability

Must-have:

- Thai text readable at projector distance.
- Minimum body font ~16px on laptop layout.
- Important status labels 18px+.
- High contrast.
- No color-only status communication.
- Keyboard-accessible core actions.
- Forms must have visible labels.
- Confirmation before reset.
- Autosave.
- No dependency on live backend.
- App remains usable if decorative font fails.
- Layout should work at 1280x720 and common laptop sizes.
- Tablet landscape support desirable.
- Phone layout is not a priority for the team play experience.

---

# 35. MVP Acceptance Criteria

## App startup and mode selection

- [ ] Static build runs locally and on GitHub Pages.
- [ ] One landing page allows Player Mode or Facilitator Mode; this is one app, not two systems.
- [ ] Player Mode can start without PIN.
- [ ] Facilitator Mode opens a 4-digit numeric PIN gate before any secret content is rendered.
- [ ] Default configured MVP PIN is `1995` and is stored in one easy-to-change config constant.
- [ ] Correct PIN unlocks Facilitator Mode for the current browser session.
- [ ] Incorrect PIN shows a friendly bilingual access-denied state without hints.
- [ ] Direct navigation to the Facilitator route redirects to the PIN gate when session auth is absent.
- [ ] Refreshing an unlocked Facilitator screen remains unlocked during the same browser session.
- [ ] `LOCK GAME MASTER` clears session auth and returns to the PIN gate without deleting facilitator notes/scores.
- [ ] Closing the browser/session requires entering the PIN again.
- [ ] PIN never appears in the URL/query/hash or normal UI after authentication.
- [ ] Scenario 01 loads correctly.

## Visual system

- [ ] Navy background is dominant.
- [ ] Yellow, Green, Orange, Blue, Purple accents are used consistently.
- [ ] UI visibly evokes 90s/8-bit arcade style.
- [ ] Press Start 2P is used only for short English arcade-display text.
- [ ] Chakra Petch is used for Thai and long-form UI.

## Player Mode

- [ ] Mission Brief works.
- [ ] Team Roster shows May, Bank, Ton, Fon, Ploy.
- [ ] Chaos scratchpad saves.
- [ ] Sponsor has 5 free-text question tokens.
- [ ] Goal & Scope form saves.
- [ ] Mission Approval result can be recorded.
- [ ] 20 bilingual tasks are present.
- [ ] Priority Board has 4 bilingual zones.
- [ ] Top 5 priority reasons can be captured.
- [ ] Resource planner supports multiple allocations per person/day.
- [ ] Resource planner supports task split across days/people.
- [ ] Capacity warnings work above 6h/day.
- [ ] Vendor Marketplace includes V01–V16.
- [ ] Vendor cost affects projected budget.
- [ ] Event Code entry applies E01–E12 effects.
- [ ] Decision Requests can be recorded.
- [ ] Tracking statuses work.
- [ ] Final Mission Review saves.
- [ ] State survives browser refresh.

## Facilitator Mode

- [ ] Run Console exists.
- [ ] Sponsor Source of Truth is easy to search/read.
- [ ] Mission Approval checklist exists.
- [ ] Plan Review checklist exists.
- [ ] Events E01–E12 are available with codes and guidance.
- [ ] Status Review script exists.
- [ ] Scoring rubric supports 5 dimensions x20.
- [ ] Debrief questions are available.

## No unwanted complexity

- [ ] No user-account/login backend; the only access gate is the simple local Facilitator PIN.
- [ ] No backend.
- [ ] No realtime sync.
- [ ] No random events.
- [ ] No AI sponsor.
- [ ] No skill multiplier.
- [ ] No automated qualitative judgement.

---

# 36. Build Priority for Codex

If time is limited, build in this exact order.

## P0 — Must Work Tomorrow

1. App shell + arcade design tokens
2. Landing mode choice: Player / Facilitator
3. Facilitator 4-digit PIN Gate + guarded Facilitator route + `sessionStorage` unlock
4. Player Mission + Roster
5. Sponsor Questions
6. Goal & Scope
7. Task Pool + Priority
8. Resource allocation with 6h/day capacity calculation
9. Vendor Marketplace basic hire/cost effects
10. Mission Control task status
11. Event Code system E01–E12
12. Facilitator Sponsor Console
13. Facilitator Event Console
14. Player/Facilitator `localStorage` persistence
15. `LOCK GAME MASTER` action that clears Facilitator session unlock only

## P1 — Strongly Desired

14. Mission Approval checklist
15. Plan Review checklist
16. Decision Request + Log
17. Budget warnings
18. Facilitator Score rubric
19. Debrief screen
20. Final Mission Review

## P2 — Only If Time Remains

21. Drag/drop
22. JSON export/import
23. Full-screen projector Event presentation
24. Extra animation/CRT effects
25. Scenario loader for multiple future scenarios

Do not sacrifice P0 reliability for P2 polish.

---

# 37. Explicit Non-Goals for v2

Do not implement now:

- Multiplayer networking
- WebSocket
- Backend authentication / user-account system
- Cloud save
- Team-to-Facilitator live sync
- AI-generated sponsor responses
- AI scoring
- Random Event generator
- Complex critical-path algorithm
- Full Gantt system
- Salary calculation
- Skill productivity multipliers
- Fatigue simulation
- Complex overtime economics
- Detailed procurement workflow
- CMS
- Admin accounts
- Leaderboard server

---

# 38. Future Scenario Architecture

The engine should eventually allow:

```text
scenarios/
├── innovation-day/
├── service-launch/
├── process-improvement/
├── customer-delivery/
└── campaign-launch/
```

A scenario package should define:

- Mission
- Resources
- Sponsor Facts
- Tasks
- Dependencies
- Vendors
- Events
- Rubric adjustments if necessary

Do not build all future scenarios now.

---

# 39. README Guidance for the Public GitHub Repository

Recommended README sections:

1. What is Mission Control?
2. Learning purpose
3. How hybrid facilitation works
4. Quick Start
5. Player Mode
6. Facilitator Mode
7. Scenario 01 — Innovation Day
8. Running locally
9. Deploying to GitHub Pages
10. How to add a future scenario
11. Contributing
12. License

Avoid presenting the app as a fully autonomous game. Clearly state that it is designed to be facilitated by a human.

---

# 40. Suggested First Prompt to Codex

You may paste the following together with this specification:

> Build the MVP described in `mission-control-game-spec-v2.md` as **one React + TypeScript + Vite static web application with two modes**: Player Mode and Facilitator Mode. It must deploy reliably to GitHub Pages, preferably using `HashRouter`. Treat every item marked LOCKED, P0, or Acceptance Criteria as authoritative. Do not split the modes into separate apps or repositories. Do not add a backend, user accounts, realtime sync, random events, or AI features. Facilitator Mode must be protected by the specified simple **4-digit numeric PIN gate**, with default PIN `1995` kept in one easy-to-change config constant; successful unlock must use `sessionStorage`, and direct Facilitator routes must be guarded. This PIN is only a classroom access barrier, not security-grade authentication. Separate reusable game-engine logic from the Innovation Day scenario data. Prioritize reliability and classroom usability over animation. Use the specified Navy/Yellow/Green/Orange/Blue/Purple 90s 8-bit arcade design system, Press Start 2P for short English display text, and Chakra Petch for Thai/bilingual UI. Implement `localStorage` persistence for game state and `sessionStorage` for Facilitator auth. After implementation, run the build, fix TypeScript/build errors, and provide concise run/deploy instructions.

---

# 41. QA Playtest Checklist Before Class

Run one complete test as Team Alpha.

- [ ] Refresh browser after Sponsor questions; answers remain.
- [ ] Refresh after resource planning; allocations remain.
- [ ] Assign Bank 3h + 3h on same day; shows 6/6.
- [ ] Add another 2h; warning shows 8/6 +2h.
- [ ] Split one 10h task across multiple days; totals correctly.
- [ ] Split one task across multiple people; totals correctly.
- [ ] Hire Design Studio; budget changes.
- [ ] Apply E03; budget ceiling changes to 95,000.
- [ ] Apply E05; Ton D5 becomes 0h and existing allocation conflicts.
- [ ] Apply E02; rehearsal due date changes to D7.
- [ ] Apply E11; T21 is created.
- [ ] Reload; events remain applied only once.
- [ ] Invalid event code gives friendly message.
- [ ] Reset requires confirmation.
- [ ] Facilitator button opens PIN Gate, not Sponsor secrets.
- [ ] Enter wrong PIN; access remains blocked and no secret data is displayed.
- [ ] Enter `1995`; Facilitator Console opens.
- [ ] Refresh while unlocked; Facilitator Console remains available in the same session.
- [ ] Use `LOCK GAME MASTER`; Facilitator route becomes blocked again and notes/scores remain saved.
- [ ] Close/reopen browser session; PIN is required again.
- [ ] Type direct Facilitator URL without session auth; app redirects to PIN Gate.
- [ ] Facilitator Source of Truth is readable quickly.
- [ ] Projector full-screen view is legible at 1280x720.
- [ ] Thai text is not clipped.
- [ ] App still works if font loading is temporarily unavailable.

---

# 42. Final Design Principle

The digital product is **not the teacher**.

It is the team’s:

- digital playmat
- task deck
- vendor marketplace
- resource calculator
- budget board
- tracking board
- decision log
- event receiver

The Facilitator remains the human:

- Sponsor
- Approver
- Stakeholder
- Crisis Controller
- Reviewer
- Coach
- Debriefer

The learning happens in the conversation around the screen, not only on the screen.

**MISSION CONTROL should make good project-management thinking visible.**
