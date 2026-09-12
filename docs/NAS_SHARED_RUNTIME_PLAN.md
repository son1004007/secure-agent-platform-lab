# NAS Shared Runtime Plan

## Goal

Use the Synology NAS as the always-available integration and test runtime while keeping GitHub as the source of truth.

The platform must be usable through all of these surfaces:

```text
Human browser GUI
CLI client
REST/SSE API
AI/automation test client
```

All clients use the same FastAPI control-plane API. Business, security and policy logic must not be duplicated in the GUI or CLI.

The **product goal and UI remain changeable**. Before expanding the NAS backend, the current service hypothesis is first expressed as a complete static HTML publishing prototype, reviewed, and then translated into an API contract for the accepted slice. See `PRODUCT_PROTOTYPE_PLAN.md`.

## Runtime topology

```text
GitHub
  -> source of truth / CI
  -> reviewed main commit
        |
        v
Synology NAS
  -> Docker Compose integration runtime
       |-- api: FastAPI control plane
       |-- web: lightweight GUI served by the platform
       |-- postgres: durable lab metadata
       |-- redis: later, when required
       |-- kafka: later, when required
       |-- observability stack: later phase

Clients
  |-- Browser -> GUI -> same API
  |-- sapctl CLI -> same API
  |-- curl/http client -> same API
  |-- AI test runner -> same API or bounded device-control test commands
```

Kubernetes is not required for the first NAS runtime. Docker Compose is used first so the service can be exercised continuously while Kubernetes is learned and introduced later as a separate deployment target.

## Source of truth and deployment boundary

- GitHub remains the source of truth for code, tests and public documentation.
- The NAS is an integration/runtime environment, not an editing source of truth.
- Normal public-repository CI remains on GitHub-hosted runners.
- Untrusted public PR code must never run automatically on the Synology self-hosted runner.
- NAS deployment must use an owner-controlled path such as explicit/manual deployment or a reviewed device-control bridge.
- Deployment must identify and record the exact Git commit being tested.
- Application secrets remain outside Git and outside browser responses.

## Access model

### Browser GUI

The implemented GUI should stay intentionally small and backend-focused unless the accepted prototype demonstrates a need for more frontend complexity.

The static prototype may include a wider set of screens to make the finished service understandable before implementation:

```text
/dashboard
/sessions
/sessions/new
/sessions/{id}
/approvals
/incidents
/security-review
/system
```

The prototype is static and uses mock/sample data. After review, only accepted capabilities become real API/GUI work.

Use server-rendered HTML with lightweight JavaScript or HTMX first unless a separate SPA becomes justified. Frontend complexity is not a portfolio goal.

### CLI

Provide a repository-owned CLI named `sapctl`.

Candidate commands, finalized after prototype/API review:

```text
sapctl system status
sapctl session create --message "..."
sapctl session list
sapctl session show <id>
sapctl session watch <id>
sapctl approval list
sapctl approval approve <id>
sapctl approval reject <id>
```

The CLI must call the HTTP API. It must not read the PostgreSQL database directly or bypass authorization/policy rules.

### API

The API is versioned, but specific endpoints are frozen only after the corresponding prototype actions are accepted.

Candidate mapping:

```text
GET  /api/v1/system/summary
GET  /api/v1/sessions
POST /api/v1/sessions
GET  /api/v1/sessions/{id}
GET  /api/v1/sessions/{id}/events
GET  /api/v1/approvals
POST /api/v1/approvals/{id}/decision
```

Use SSE for one-way session/event streaming unless a verified requirement for WebSocket appears.

### AI and other chat/test clients

Other AI agents must be able to verify the platform without receiving unrestricted NAS shell or production credentials.

Preferred paths:

1. call documented HTTP endpoints with a bounded test identity;
2. execute repository-provided smoke/contract commands through the reviewed device-control bridge;
3. inspect GitHub evidence and runtime status rather than receiving direct filesystem/database access.

The public API and CLI are therefore also test interfaces for other AI systems.

## Authentication and exposure stages

### Stage A - private integration

Before real authentication is implemented:

- bind only to a private/LAN or otherwise explicitly controlled path;
- do not expose the service broadly to the public Internet;
- use development-only identities/configuration;
- prohibit mutating Agent tools.

### Stage B - authenticated shared testing

After JWT/OIDC and RBAC are implemented:

- allow named human and test identities;
- separate human, AI-reviewer and automation roles where useful;
- record audit events for session creation, tool calls and approvals;
- keep provider credentials server-side only.

### Stage C - hardened external access

External access is considered only after:

- authenticated HTTPS ingress;
- rate limiting;
- RBAC and Tool Policy;
- audit logging;
- secret-management review;
- negative authorization tests;
- rollback and recovery procedure.

## Revised implementation sequence

### Phase 0 - Baseline

Status: complete.

### Phase 0.25 - Product definition and HTML publishing prototype

Goal: make the intended finished service understandable before expanding backend/runtime code.

Tasks:

- create static HTML/CSS/JS prototype under `prototype/`
- represent Dashboard, Sessions, Session Detail, Approvals, Incidents, Security Review and System Status
- support desktop and mobile layouts
- use realistic but clearly marked mock/sample data
- review the primary user flow and whether Incident Investigation remains the best first scenario
- confirm or revise the current product hypothesis
- remove unnecessary screens/actions before backend work
- map accepted screen actions to a draft API contract

Done when:

```text
prototype opens without backend services
service purpose and main user flow are understandable
prototype is usable on desktop and mobile
screen/function review is recorded
product hypothesis is confirmed or revised
accepted actions are mapped to a draft API contract
```

### Phase 0.5 - NAS shared runtime and client surfaces

Goal: implement only the accepted product slice and make later phases continuously usable/testable on the NAS.

Tasks:

- add Docker Compose integration stack for NAS
- add deployment/run scripts that use generic configuration, not private addresses
- add PostgreSQL container and persistent lab volume
- implement the accepted `/api/v1` contract baseline
- implement the initial `sapctl` commands mapped to that contract
- convert the accepted static prototype into the first real browser GUI
- add smoke test script usable by humans and AI runners
- define exact commit/version endpoint
- document safe NAS secret injection
- onboard a bounded Synology workspace/deployment path through `device-control` before remote write/deploy automation is enabled

Done when:

```text
one reviewed Git commit is deployed on NAS
browser, CLI and HTTP clients reach the same accepted capability slice
runtime reports the exact deployed commit
no secret is stored in Git or returned to clients
```

### Phase 1 - Agents API minimal E2E on NAS

- OpenAI adapter behind interface
- session creation endpoint
- prompt/input submission
- normalized Agent event model
- SSE event stream
- CLI session create/watch
- GUI session create/detail/event stream
- contract tests with fake provider
- one bounded live E2E from the NAS using server-side `OPENAI_API_KEY`

Done when the same Agent session can be created and observed from CLI and GUI.

### Phase 2 - Shared authentication and policy

- JWT/OIDC
- user/role/workspace model
- CLI login/token handling
- GUI login/session
- Tool Policy: ALLOW / DENY / APPROVAL_REQUIRED
- Human Approval in API, CLI and GUI
- Audit Log

Done when CLI and GUI enforce the same authorization decisions.

### Phase 3 - Observability on the NAS

- OpenTelemetry
- Prometheus
- Grafana
- API/Agent/Tool metrics
- trace correlation ID visible in CLI and GUI
- operational dashboard links from GUI

### Phase 4 - Incident Investigation Agent

If the prototype review still confirms it as the primary scenario:

- sample service deployed alongside the platform
- controlled fault injection
- read-only log/metric/deployment tools
- GUI and CLI launch/observe incident investigation
- incident report evidence

### Phase 5 - Reliability and performance

- Redis only when rate limit/idempotency/lock requirements are demonstrated
- k6 load testing against NAS test runtime
- baseline and improved P95/P99/error metrics
- recovery and restart drills

### Phase 6 - Kubernetes second deployment target

The NAS Compose runtime stays available as the stable shared test system.

A Kubernetes environment is introduced separately to prove:

- Deployment / Service / Ingress
- ConfigMap / Secret
- Readiness / Liveness
- requests / limits
- rolling update / rollback
- Namespace / RBAC / NetworkPolicy
- HPA where justified

The same API, CLI and GUI contract must work against both Compose and Kubernetes targets.

### Phase 7 - Event architecture

Kafka is added only after asynchronous consumers, replay or backlog handling is required.

### Phase 8 - Security Review Agent

Add repository/container/Kubernetes security review with approval-gated mutation when the product flow and evidence justify it.

## Interface parity rule

Every accepted user-facing capability gets one canonical API operation first, then CLI and GUI clients share it.

```text
accepted prototype action
  -> API contract
  -> CLI client
  -> GUI implementation
```

A feature is not complete when it exists only in the GUI or only in the CLI.

## Testing strategy

Each implemented deployment should support four levels of testing.

```text
1. CI unit/contract tests
2. Docker image/Compose validation
3. NAS smoke/E2E through HTTP
4. Human/AI exploratory test through CLI and GUI
```

Phase 0.25 additionally requires static prototype review before runtime tests begin.

AI-oriented smoke commands must be deterministic and bounded. They should return machine-readable JSON where possible and avoid interactive prompts by default.

## Evidence to retain

- static HTML prototype and review record
- product hypothesis confirmation/revision decision
- accepted screen-to-API mapping
- exact deployed Git SHA
- CI run
- Compose validation
- NAS health/version smoke output
- CLI smoke output
- GUI screenshot after sanitized public review
- Agents API live E2E result
- authorization negative tests
- load-test reports
- incident-drill reports

## Non-goals

- treating the initial product hypothesis as immutable
- writing backend features before the relevant user flow is understood
- using the NAS working tree as the primary code-editing source
- exposing an unrestricted shell to GUI/CLI/AI clients
- publicly exposing an unauthenticated Agent control plane
- running untrusted pull-request code on the NAS self-hosted runner
- implementing separate business logic in CLI and GUI
