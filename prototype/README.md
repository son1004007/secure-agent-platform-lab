# Static HTML Prototype

This directory is the Phase 0.25 product/publishing prototype for Secure Agent Platform Lab.

It intentionally uses static/mock data and does not require FastAPI, OpenAI, PostgreSQL or the NAS runtime.

## Start

Open `index.html` directly in a browser, or serve this directory with any static HTTP server.

```bash
cd prototype
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/
```

## Main flow

```text
Dashboard
 -> New Agent Task
 -> Session Detail
 -> Approval
 -> Incident Drill / System evidence
```

Pages:

- `index.html`: Dashboard and service explanation
- `sessions.html`: Agent task history
- `session-new.html`: create task UX
- `session-detail.html`: investigation progress, evidence, finding and recommended action
- `approvals.html`: Human Approval UX
- `incidents.html`: Incident Drill history
- `security-review.html`: second service scenario concept
- `system.html`: runtime/version/dependency status

## Review notes

- All metrics, incidents, findings and identifiers are mock/sample values.
- Approval buttons only change the static page state. They never run commands.
- The UI intentionally exposes Agent actions/evidence/findings rather than hidden chain-of-thought.
- Desktop and mobile layouts are supported by `assets/css/app.css`.
- The next step is owner review of service understanding, screens, actions and priorities. API design must follow that review rather than precede it.
