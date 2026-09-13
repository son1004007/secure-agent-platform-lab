# Static HTML Prototype

This directory contains the Phase 0.25 product prototype.

The current review entrypoint is:

```text
prototype/index.html
  -> redirects to agent-control-plane-v2.html
```

The v2 prototype reflects the clarified product goal:

> A control plane for operating multiple AI Agents: selecting an Agent, sending a request, observing Run state and Tool calls, enforcing permissions/policies, approving high-impact actions, and reviewing results/observability.

It uses mock/static data only and does not require FastAPI, OpenAI, PostgreSQL or the NAS runtime.

## Main flow

```text
Dashboard
 -> Agents
 -> choose Agent
 -> send request
 -> Run Detail
 -> Tool Calls / Result
 -> Approval when required
```

Top-level product areas in v2:

- Dashboard
- Agents
- Runs
- Approvals
- Tools & Policies
- Observability
- System

Incident Investigation, Security Review, Code Review and Ops Assistant are represented as Agent types/use cases rather than top-level products.

## Key UX decision

`Agent Detail` contains the missing core action from v1: a user can select a specific Agent and directly submit a request.

The same action must later map to one canonical API and to the CLI, for example:

```text
Web GUI -> POST /api/v1/agents/{agent_id}/runs
sapctl  -> sapctl agent run <agent> --message "..."
```

The exact API is not frozen yet. It will be finalized after the owner reviews this prototype.

## Review notes

- All metrics, runs, findings and identifiers are mock/sample values.
- `Run Agent`, Approve and Reject interactions only modify the static prototype state.
- The UI shows observable actions, Tool calls, evidence/state and concise results rather than hidden chain-of-thought.
- Desktop and mobile layouts are included.
- Legacy v1 multi-page HTML files remain only as prior design evidence; the v2 single-page prototype is authoritative for the current product review.
