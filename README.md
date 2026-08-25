# MISSION CONTROL

A bilingual Thai/English, human-facilitated project-planning game. Scenario 01 asks teams to deliver an **Innovation Day** in ten working days while managing scope, priorities, capacity, dependencies, vendors, budget, risks, and change.

This is one static application with two entry modes:

- **Player Mode** — the team's digital playmat, planner, task board, marketplace, tracker, event inbox, and decision log.
- **Facilitator Mode** — sponsor facts, approval guidance, event control, status review, scoring, and debrief tools. The default classroom PIN is configured in `src/app/config.ts`.

The app deliberately has no backend, accounts, realtime synchronization, random events, or AI judgement. The facilitator remains the Sponsor, Approver, Stakeholder, Crisis Controller, Reviewer, and Coach.

คู่มือภาษาไทยฉบับละเอียด:

- [คู่มือผู้เล่น](docs/player-guide-th.md)
- [คู่มือ Facilitator](docs/facilitator-guide-th.md)
- [หน้ารวมคู่มือ](docs/gameplay-guide-th.md)

## Quick start

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. Player progress and facilitator notes are saved separately in browser `localStorage`; the facilitator unlock lasts only for the current browser session.

## Commands

```bash
npm run dev      # development server
npm test         # engine tests
npm run build    # TypeScript check + static production build
npm run preview  # preview dist/
```

## GitHub Pages

The app uses `HashRouter` and Vite's relative asset base, so refreshes and nested routes work in a Pages subdirectory. Push to `main`, enable **Settings → Pages → Source: GitHub Actions**, and the included workflow publishes `dist/`.

## Architecture

- `src/engine/` — reusable state, capacity, effort, budget, dependency, and event mechanics.
- `src/scenarios/innovation-day/` — Scenario 01 tasks, resources, vendors, events, and Sponsor facts.
- `src/modes/player/` and `src/modes/facilitator/` — the two views of the same application.
- `src/app/` — routes, PIN session guard, configuration, and browser persistence.

To add a future scenario, define a new scenario package containing its mission, resources, Sponsor facts, tasks, dependencies, vendors, and events. Keep reusable calculations in `src/engine/`.

## Classroom preparation

Before class, change `FACILITATOR_PIN` if needed, run the complete QA playtest in the specification, and test projector legibility at 1280×720. The PIN is a casual classroom barrier, not secure authentication; this is a public static build.
