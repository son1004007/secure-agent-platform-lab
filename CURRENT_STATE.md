# Current State

Last reviewed: 2026-09-13

## Status

- `CONFIRMED`: Public repository exists at `son1004007/secure-agent-platform-lab`.
- `IMPLEMENTED`: README defines the production-like lab scope and phased roadmap.
- `IMPLEMENTED`: FastAPI baseline with `/health` endpoint.
- `IMPLEMENTED`: pytest baseline.
- `IMPLEMENTED`: Ruff and mypy configuration.
- `IMPLEMENTED`: non-root Docker image baseline.
- `IMPLEMENTED`: GitHub Actions CI for lint, type check, tests and Docker build.
- `IMPLEMENTED`: public secret-safety baseline with `.env.example` and `.gitignore`.
- `IMPLEMENTED`: initial architecture and security documentation.
- `CONFIRMED`: Phase 0 implementation commit `8c8156e6a589872ea37c59b63baed5ccb469935c` passed GitHub Actions run `34691384005`; Ruff, mypy, pytest and Docker build all succeeded.
- `CONFIRMED`: the current product goal is a changeable working hypothesis, not an immutable contract.
- `CONFIRMED`: product work now follows `HTML publishing prototype -> screen/function review -> API design -> backend implementation -> CLI/GUI integration -> NAS runtime verification`.
- `CONFIRMED`: Synology NAS is the planned always-available integration/test runtime while GitHub remains the source of truth.
- `CONFIRMED`: the initial NAS runtime will use Docker Compose; Kubernetes is a later second deployment target.
- `CONFIRMED`: accepted user-facing capabilities must ultimately use one canonical REST/SSE API and be usable from both `sapctl` CLI and a browser GUI.
- `IMPLEMENTED`: Phase 0.25 static HTML publishing prototype under `prototype/`.
- `IMPLEMENTED`: prototype includes Dashboard, Sessions, New Agent Task, Session Detail, Approvals, Incident Drills, Security Review and System Status screens.
- `IMPLEMENTED`: shared responsive CSS and lightweight JavaScript provide desktop/mobile layouts, navigation, sample task flow and non-operative approval interactions.
- `IMPLEMENTED`: all prototype incidents, metrics, findings and identifiers are explicitly mock/sample data; no backend, provider credential or NAS runtime is required.
- `PENDING_REVIEW`: owner screen/function review, product-hypothesis confirmation/revision and accepted action list.
- `PLANNED`: draft `/api/v1` contract only after owner prototype review.
- `PLANNED`: Phase 0.5 NAS shared runtime, PostgreSQL, accepted `/api/v1` contract, CLI and GUI baseline after prototype review.
- `PLANNED`: bounded NAS deployment/test onboarding through the private `device-control` bridge or another reviewed owner-controlled path.
- `PLANNED`: OpenAI Agents API adapter and minimal session/event E2E on the NAS.
- `PLANNED`: JWT/OIDC, RBAC, Tool Policy and Human Approval.
- `PLANNED`: OpenTelemetry, Prometheus and Grafana.
- `PLANNED`: Incident Investigation Agent and sample service if the prototype review confirms it as the primary scenario.
- `PLANNED`: Redis, k6, Kubernetes, Kafka and Security Review Agent in later phases when justified by a real requirement.

## Completed milestone

Phase 0 - Baseline: `COMPLETE`.

Verified criteria:

```text
FastAPI baseline exists
/health contract test passes
ruff passes
mypy passes
pytest passes
Docker image builds
GitHub Actions provides public verification evidence
```

## Current milestone

Phase 0.25 - Product definition + HTML publishing prototype: `IMPLEMENTED, OWNER REVIEW PENDING`.

Prototype files:

```text
prototype/index.html
prototype/sessions.html
prototype/session-new.html
prototype/session-detail.html
prototype/approvals.html
prototype/incidents.html
prototype/security-review.html
prototype/system.html
prototype/assets/css/app.css
prototype/assets/js/app.js
prototype/README.md
```

Current review flow:

```text
open prototype
 -> inspect Dashboard and Session Detail first
 -> walk New Task -> Session Detail -> Approval
 -> inspect Incident / Security / System screens
 -> review desktop and mobile usability
 -> remove/add/reorder capabilities
 -> confirm or revise current service goal
 -> only then draft the accepted API contract
```

Remaining Phase 0.25 done criteria:

```text
owner reviews the prototype
current service purpose is understandable from the UI
screen/function review is recorded
product hypothesis is explicitly confirmed or revised
accepted UI actions are mapped to a draft API contract
```

## Following milestone

Phase 0.5 - NAS shared runtime + API/CLI/GUI baseline.

Only the accepted prototype slice should drive the next API and backend implementation. The NAS then becomes the shared runtime for human, CLI and bounded AI testing.

## Later milestone

Phase 1 - Agents API minimal E2E on NAS.

Before implementing provider-specific behavior, verify the current official OpenAI Agents API documentation and encode the external API behind a dedicated adapter with contract tests.

Phase 1 is complete only when one managed Agent session can be created and observed through both CLI and GUI against the shared NAS runtime.
