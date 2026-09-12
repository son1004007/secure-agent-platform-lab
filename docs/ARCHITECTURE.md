# Architecture

## Goal

Build a production-like lab for secure and observable AI Agent platform engineering.

The first vertical slice intentionally stays small:

```text
Client
 -> FastAPI Control Plane
 -> OpenAI Agents API adapter (Phase 1)
 -> Read-only tools (later)
```

## Responsibility boundary

OpenAI-managed concerns:

- agent execution harness
- managed session lifecycle
- provider-specific agent behavior verified against current official documentation

Platform-owned concerns:

- identity and authorization
- workspace and tool policy
- human approval
- audit
- business metadata
- observability
- reliability and deployment
- incident response

## Baseline package layout

```text
src/secure_agent_platform/
  main.py
  api/
```

Later phases add explicit packages for:

```text
agents/
security/
policies/
approvals/
audit/
integrations/openai_agents/
events/
observability/
```

## Evolution rule

Architecture complexity must follow a demonstrated requirement.

- PostgreSQL is added when durable platform/business state is required.
- Redis is added for rate limiting, idempotency, locks or justified short-lived state.
- Kafka is added when asynchronous event consumers need isolation, replay or backlog handling.
- Kubernetes is introduced after the containerized baseline is testable and observable.

Each material decision should be recorded in `DECISIONS.md` or an ADR.
