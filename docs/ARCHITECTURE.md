# Architecture

## Goal

Build a production-like lab for secure and observable AI Agent platform engineering that remains continuously usable while it is being implemented.

The platform is exposed through one canonical FastAPI API and multiple clients:

```text
Browser GUI
CLI (`sapctl`)
curl / automation
AI test client
      |
      v
REST / SSE API
      |
      v
FastAPI Control Plane
```

Business logic, authorization and policy live behind the API. Clients do not access PostgreSQL directly and do not duplicate security rules.

## Runtime model

GitHub is the source of truth. The Synology NAS is the shared integration/test runtime.

```text
GitHub
  |-- source
  |-- hosted CI
  `-- reviewed main commit
          |
          v
Synology NAS
  `-- Docker Compose
       |-- FastAPI API + lightweight GUI
       |-- PostgreSQL
       |-- later Redis
       |-- later Kafka
       `-- later observability components
          ^
          |
  Browser / sapctl / curl / bounded AI tests
```

The NAS Compose runtime is established early so every later capability can be used and tested continuously.

Kubernetes is introduced later as a second deployment target. The same API/CLI/GUI contract must continue to work against both deployment environments.

## First vertical slices

### Phase 0.5

```text
Browser / sapctl / curl
 -> /api/v1/health + version
 -> FastAPI on NAS
 -> exact deployed Git SHA
```

### Phase 1

```text
Browser / sapctl
 -> FastAPI Control Plane
 -> OpenAI Agents API adapter
 -> managed Agent session
 -> normalized events
 -> SSE
 -> same event stream rendered in CLI and GUI
```

Read-only tools are added only after this session/event path is verified.

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
- client/API contract
- observability
- reliability and deployment
- incident response

Client-owned concerns:

- GUI rendering and user interaction
- CLI argument parsing and output formatting

Clients must not own authorization, policy or business state.

## Interface contract

The application API is versioned from the beginning.

```text
/api/v1/health
/api/v1/version
/api/v1/sessions
/api/v1/sessions/{id}
/api/v1/sessions/{id}/events
/api/v1/approvals            # later
```

Use REST for commands/state queries and SSE for one-way event streaming unless a later verified requirement justifies WebSocket.

### CLI

`sapctl` is a thin HTTP client.

```text
sapctl health
sapctl session create
sapctl session list
sapctl session show
sapctl session watch
```

Automation-oriented commands should offer machine-readable output.

### GUI

The initial GUI is intentionally lightweight:

```text
/dashboard
/sessions
/sessions/{id}
/approvals    # later
/system
```

Prefer server-rendered HTML with lightweight JavaScript/HTMX before introducing SPA complexity.

## Deployment and trust boundary

Normal public-repository CI stays on GitHub-hosted runners.

NAS deployment is owner-controlled and must not execute arbitrary public/fork PR code on a privileged Synology runner. A reviewed deployment path may later use the private `device-control` bridge or a manual GitHub Environment workflow.

Every runtime must expose non-secret build metadata including the deployed Git SHA so test results can be tied to source evidence.

## Baseline package layout

```text
src/secure_agent_platform/
  main.py
  api/
  cli/                         # sapctl
  web/                         # lightweight GUI
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

Deployment files evolve under a separate infrastructure boundary:

```text
infra/
  compose/
  kubernetes/                 # later
```

## Evolution rule

Architecture complexity must follow a demonstrated requirement.

- PostgreSQL is added with the NAS shared runtime for durable platform/business metadata.
- Redis is added for rate limiting, idempotency, locks or justified short-lived state.
- Kafka is added when asynchronous event consumers need isolation, replay or backlog handling.
- Kubernetes is introduced after the Compose-based platform is testable, observable and useful through API/CLI/GUI.

Each material decision should be recorded in `DECISIONS.md` or an ADR.
