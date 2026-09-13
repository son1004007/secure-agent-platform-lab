# Current State

Last reviewed: 2026-09-13

## Status

- `CONFIRMED`: Public repository exists at `son1004007/secure-agent-platform-lab`.
- `IMPLEMENTED`: Phase 0 FastAPI/pytest/Ruff/mypy/non-root Docker/GitHub Actions baseline.
- `CONFIRMED`: Phase 0 implementation commit `8c8156e6a589872ea37c59b63baed5ccb469935c` passed GitHub Actions run `34691384005`.
- `CONFIRMED`: product work follows `HTML prototype -> screen/function review -> API design -> backend implementation -> CLI/GUI integration -> NAS runtime verification`.
- `CONFIRMED`: the product goal is a changeable working hypothesis, not an immutable contract.
- `CONFIRMED`: clarified current hypothesis is an **AI Agent Control Plane** for managing multiple Agents, their requests/runs, Tool permissions, approvals, states, results and observability.
- `CONFIRMED`: Incident Investigation and Security Review are Agent types/use cases, not the overall product itself.
- `IMPLEMENTED`: agent-centric HTML prototype v2 at `prototype/agent-control-plane-v2.html`.
- `IMPLEMENTED`: `prototype/index.html` redirects to v2 so the current review entrypoint is unambiguous.
- `IMPLEMENTED`: v2 adds the missing core UX: `Agents -> Agent Detail -> direct request -> Run Detail -> Tool Calls/Result -> Approval`.
- `IMPLEMENTED`: top-level v2 areas are Dashboard, Agents, Runs, Approvals, Tools & Policies, Observability and System.
- `IMPLEMENTED`: v2 supports desktop/mobile layout and static interactions for Agent selection/request, Run navigation and approval/reject state.
- `IMPLEMENTED`: all prototype metrics, findings, Runs and identifiers are explicitly mock/sample data and no real Agent API is called.
- `CONFIRMED`: Synology NAS remains the planned always-available integration/test runtime while GitHub remains the source of truth.
- `CONFIRMED`: the initial NAS runtime will use Docker Compose; Kubernetes remains a later second deployment target.
- `CONFIRMED`: accepted user-facing capabilities must ultimately use one canonical REST/SSE API and be usable from both `sapctl` CLI and browser GUI.
- `PENDING_REVIEW`: owner review of v2 product structure, request flow, Agent types, Tool/Policy visibility and approval UX.
- `PLANNED`: draft `/api/v1` contract only after v2 owner review.
- `PLANNED`: Phase 0.5 NAS shared runtime, PostgreSQL, accepted API contract, CLI and real GUI baseline after review.
- `PLANNED`: OpenAI Agents API adapter and minimal live E2E on the NAS after the accepted control-plane slice exists.
- `PLANNED`: JWT/OIDC, RBAC, Tool Policy, Human Approval, OpenTelemetry, Prometheus and Grafana in later phases.

## Completed milestone

Phase 0 - Baseline: `COMPLETE`.

## Current milestone

Phase 0.25 - Product definition + HTML publishing prototype: `V2 IMPLEMENTED, OWNER REVIEW PENDING`.

Current authoritative prototype:

```text
prototype/index.html
  -> prototype/agent-control-plane-v2.html
```

Primary review flow:

```text
Dashboard
 -> Agents
 -> select Agent
 -> type a direct request
 -> Run Agent
 -> Run Detail
 -> inspect Tool Calls / Result
 -> Approval when required
```

Review questions:

```text
1. Does this now look like a platform for operating multiple AI Agents?
2. Is choosing an Agent and asking it to do work obvious?
3. Are Runs distinct enough from Agents?
4. Are Tool permissions and approval boundaries understandable?
5. Are the top-level areas appropriate: Agents / Runs / Approvals / Tools & Policies / Observability / System?
6. Which Agent types are actually useful for the first implementation?
7. Which fields/screens should be removed or added before API design?
```

Remaining Phase 0.25 done criteria:

```text
owner reviews v2
product hypothesis is confirmed or revised again
accepted Agent/Run/Tool/Approval actions are listed
accepted actions are mapped to draft API + sapctl commands
Phase 0.5 implementation scope is updated from that evidence
```

## Following milestone

Phase 0.5 - NAS shared runtime + API/CLI/GUI baseline.

Only the accepted v2 control-plane slice should drive backend work.

## Later milestone

Phase 1 - OpenAI Agents API minimal E2E on NAS.

Provider-specific behavior must remain behind an adapter and be verified against current official OpenAI documentation before implementation.
