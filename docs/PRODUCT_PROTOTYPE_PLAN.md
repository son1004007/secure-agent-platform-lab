# Product Prototype Plan

## Purpose

The current product goal is intentionally **provisional**. It is a working hypothesis used to drive design and implementation, not an immutable product contract.

Current hypothesis:

> A NAS-hosted Secure Agent Platform that lets a human or bounded AI client ask Agents to investigate incidents and review security, observe evidence and progress, and explicitly approve high-impact actions through the same API exposed to Web GUI and CLI clients.

This goal may change when the HTML prototype, user flow, API design, implementation evidence, or actual usage shows a better direction.

The project must preserve the engineering learning goals even when the service shape changes:

- AI Backend and Agent integration
- identity, authorization, policy and Human Approval
- observability and incident response
- performance and reliability evidence
- Docker/NAS runtime and later Kubernetes
- CLI, GUI and machine-usable API parity

## Development order

Backend coding does not lead the next product slice. The sequence is:

```text
1. complete static HTML publishing prototype
2. review and fix screens / user flows / capabilities
3. freeze the next API contract only for that accepted slice
4. implement API and domain behavior
5. connect CLI and GUI to the same API
6. deploy to NAS and test through human / CLI / AI clients
7. revise the product hypothesis when evidence justifies it
```

The prototype is therefore a product/design artifact, not decoration added after the backend is complete.

## Prototype scope

Create a realistic static publishing prototype under `prototype/` before Phase 0.5 backend expansion.

Planned pages:

```text
prototype/
  index.html              # dashboard / entry
  sessions.html           # Agent task/session list
  session-new.html        # create an Agent task
  session-detail.html     # progress, evidence, findings, recommended action
  approvals.html          # approval queue
  incidents.html          # incident investigations / drill history
  security-review.html    # repository/security review concept
  system.html             # runtime, provider and dependency status
  assets/
    css/
    js/
```

The prototype should look and behave like a finished service where practical, while using only static/mock data. It must not require a real OpenAI key, database or NAS runtime.

## Current service story to visualize

### 1. Dashboard

Show the user what the service is for within a few seconds:

- platform health
- running/completed Agent tasks
- incidents under investigation
- approval requests
- recent findings
- primary actions: start investigation, start security review

### 2. New Agent task

The user can select a task type and enter a request such as:

```text
최근 30분 동안 API 5xx가 증가한 원인을 조사하고 대응안을 정리해줘.
```

Initial task types:

- Incident Investigation
- Security Review

### 3. Session detail

The key product screen. It should show:

- request and status
- timeline / Agent steps
- evidence inspected
- intermediate and final findings
- metrics or summarized signals
- recommended action
- whether approval is required
- trace/session identifiers useful for CLI/API parity

Example lifecycle:

```text
Metrics analysis       COMPLETE
Log analysis           COMPLETE
Deployment analysis    COMPLETE
Dependency analysis    RUNNING

Finding
DB connection pool exhaustion suspected

Recommended action
Restart application

Approval required
[Approve] [Reject]
```

### 4. Approval queue

Make Human Approval visible as a first-class product capability rather than an implementation detail.

Each approval item should answer:

- what Agent requested the action;
- what action will run;
- why it is requested;
- what evidence supports it;
- risk level;
- approve/reject decision and audit state.

### 5. Incident history

Distinguish public lab `Incident Drill` records from real production incidents.

Show:

- scenario
- detection
- analysis
- recovery recommendation
- user decision
- verification result

### 6. Security Review

Visualize a second service use case without requiring it to be implemented immediately.

Possible checks:

- dependency risk
- Dockerfile review
- Kubernetes manifest review
- auth/authz configuration
- secret exposure risk
- excessive tool permissions

## Design principles

- Desktop and mobile layouts are both required because the owner will often inspect the service from a phone.
- Prefer a practical operations-console layout over a generic chat UI.
- Agent reasoning/internal chain-of-thought is not displayed. Show actions, evidence, tool results, status and concise findings instead.
- Approval state and security boundaries must be visually obvious.
- Avoid invented production numbers. Prototype metrics must be clearly marked sample/mock data.
- Do not expose private NAS addresses, customer information, credentials or internal infrastructure details.
- Keep the first UI technically simple enough to later implement as server-rendered HTML plus lightweight JavaScript/HTMX unless a later decision justifies a SPA.

## Screen and capability review gate

Backend/API design does not proceed until the prototype is reviewed against these questions:

1. Can a new viewer explain the service after seeing the dashboard and session detail page?
2. Is the primary user action obvious?
3. Does the interface distinguish investigation from mutation?
4. Is Human Approval understandable without architecture knowledge?
5. Can the same actions be represented cleanly in a CLI?
6. Are there screens or fields that do not support a real user decision?
7. Is the Incident Investigation Agent still the best primary scenario?
8. Should the current product hypothesis be changed before API design?

The answers are recorded as a small product decision note or ADR.

## API design follows the accepted prototype

After the screen/function review, map each accepted user action to one canonical API operation.

Example only, not frozen yet:

```text
Dashboard status       -> GET  /api/v1/system/summary
List sessions          -> GET  /api/v1/sessions
Create session         -> POST /api/v1/sessions
Session detail         -> GET  /api/v1/sessions/{id}
Watch events           -> GET  /api/v1/sessions/{id}/events
List approvals         -> GET  /api/v1/approvals
Approve/reject         -> POST /api/v1/approvals/{id}/decision
```

Do not implement endpoints merely because they appear in this example. Finalize them only after the prototype/function review.

## CLI parity after API design

The CLI maps to the same accepted operations:

```text
sapctl system status
sapctl session list
sapctl session create --message "..."
sapctl session show <id>
sapctl session watch <id>
sapctl approval list
sapctl approval approve <id>
sapctl approval reject <id>
```

No CLI-only business logic and no GUI-only business logic.

## Phase order

```text
Phase 0     Baseline                         COMPLETE
Phase 0.25  Product definition + HTML prototype
Phase 0.5   NAS shared runtime + API/CLI/GUI baseline
Phase 1     Agents API minimal E2E on NAS
Phase 2     Authentication / policy / approval
Phase 3     Observability
Phase 4     Incident Investigation Agent
Phase 5     Reliability / performance
Phase 6     Kubernetes second deployment target
Phase 7     Event architecture
Phase 8     Security Review Agent
```

## Phase 0.25 done criteria

```text
static HTML prototype exists and can be opened without backend services
desktop and mobile layouts are usable
Dashboard, Sessions, Session Detail, Approvals, Incidents, Security Review and System are represented
primary end-to-end user flow is visually understandable
mock/sample data is identified as such
screen/function review is recorded
current product hypothesis is confirmed or revised
accepted screen actions are mapped to a draft API contract
no backend feature implementation is started merely to support an unreviewed screen
```
