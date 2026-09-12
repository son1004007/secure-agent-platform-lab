# Secure Agent Platform Lab

OpenAI Agents API를 기반으로 AI Agent의 인증, 권한, Tool 통제, Human Approval, 감사로그, 관측성, 장애 대응, 성능 검증과 Kubernetes 배포를 단계적으로 구현하는 공개 실습 프로젝트입니다.

이 저장소의 목적은 실제 상용 운영 경험을 과장하는 것이 아니라, Production 환경에서 필요한 설계와 운영 문제를 재현하고 검증 가능한 코드와 문서로 남기는 것입니다.

## Why this project

주요 보완 목표는 다음과 같습니다.

- FastAPI 기반 AI Backend 설계와 구현
- OIDC/JWT, RBAC, Tool Policy, Human Approval을 통한 Security-aware Agent Platform
- OpenTelemetry, Prometheus, Grafana를 통한 Observability
- k6 기반 부하 테스트와 병목 분석
- 의도적인 Incident Drill과 복구 절차 검증
- Redis/Kafka를 실제 문제 해결에 필요한 시점에 도입
- Docker에서 Kubernetes로 확장하며 배포, Probe, Rollback, RBAC, NetworkPolicy 검증
- Synology NAS를 상시 통합/테스트 런타임으로 사용해 사람과 AI가 반복 검증 가능한 서비스 운영 경험 축적

## Usage surfaces

플랫폼 기능은 하나의 FastAPI API를 기준으로 노출합니다.

```text
REST / SSE API
   |-- sapctl CLI
   |-- Browser GUI
   |-- curl / automation
   `-- bounded AI test client
```

CLI와 GUI에 별도 비즈니스 로직을 만들지 않습니다. 기능은 `API first -> CLI -> GUI` 순서로 구현하며, 사용자 기능은 CLI와 GUI 양쪽에서 사용할 수 있어야 완료로 봅니다.

## Development and test runtime

GitHub는 코드와 테스트의 Source of Truth이고, Synology NAS는 상시 사용할 수 있는 integration/test runtime으로 사용합니다.

```text
GitHub
  -> CI / reviewed main commit
  -> owner-controlled NAS deployment
        |
        v
Synology NAS / Docker Compose
  |-- FastAPI
  |-- Browser GUI
  |-- PostgreSQL
  `-- later: Redis / Kafka / Observability
        ^
        |
Browser / sapctl / curl / AI test client
```

초기 NAS 런타임은 Docker Compose로 구성합니다. Kubernetes는 플랫폼 기능이 충분히 검증된 뒤 두 번째 deployment target으로 추가하며, NAS Compose 환경은 계속 상시 테스트 환경으로 유지합니다.

자세한 계획은 `docs/NAS_SHARED_RUNTIME_PLAN.md`를 참조합니다.

## Target architecture

```text
Web / CLI / API Client
        |
        v
FastAPI Control Plane
  |-- Identity / RBAC / Policy
  |-- Human Approval
  |-- Audit
  |-- Rate Limit / Idempotency
  |
  +--> OpenAI Agents API
          |-- Agent Session
          |-- Tools / MCP
          |-- Execution Environment
          |-- Subagents

Platform state
  |-- PostgreSQL
  |-- Redis
  |-- Kafka (later phase)

Observability
  |-- OpenTelemetry
  |-- Prometheus
  |-- Grafana
```

Responsibility boundary:

```text
OpenAI Agents API
= Agent execution state, harness, managed session and tool orchestration

This platform
= Identity, authorization, policy, approval, audit,
  observability, reliability, deployment and incident response
```

## Primary demo

첫 번째 실제 시나리오는 `Incident Investigation Agent`입니다.

```text
사용자 요청
-> FastAPI
-> OpenAI Agents API
-> 읽기 전용 Metrics / Logs / Deployment Tool
-> 장애 원인 분석
-> 대응안 반환
```

위험 작업은 자동 수행하지 않고 정책에 따라 통제합니다.

```text
read_metrics    ALLOW
read_logs       ALLOW
read_git_diff   ALLOW
change_code     APPROVAL_REQUIRED
deploy          APPROVAL_REQUIRED
read_secret     DENY
delete_data     DENY
```

## Roadmap

### Phase 0 - Baseline

- [x] Public repository
- [x] FastAPI project skeleton
- [x] pytest / lint / type check
- [x] Docker image
- [x] GitHub Actions CI
- [x] `.env.example` and secret-safety baseline
- [x] architecture / security docs

### Phase 0.5 - NAS shared runtime + CLI/GUI baseline

- [ ] Synology Docker Compose integration runtime
- [ ] PostgreSQL persistent lab state
- [ ] `/api/v1` route baseline and version endpoint
- [ ] `sapctl health` CLI
- [ ] minimal browser dashboard/system status GUI
- [ ] deterministic HTTP smoke test for human/AI test clients
- [ ] exact deployed Git SHA exposed as non-secret runtime metadata
- [ ] safe NAS secret injection and deployment procedure
- [ ] bounded Synology deployment/test path onboarding through `device-control`

### Phase 1 - Agents API minimal E2E on NAS

- [ ] FastAPI -> Agents API session creation
- [ ] prompt/turn execution
- [ ] normalized event streaming
- [ ] local session ID <-> OpenAI session ID mapping
- [ ] timeout/error handling
- [ ] contract and unit tests
- [ ] `sapctl session create/show/watch`
- [ ] GUI session create/detail/event stream
- [ ] one bounded live NAS E2E with server-side OpenAI credential

### Phase 2 - Security control plane

- [ ] JWT/OIDC
- [ ] User / Role / Workspace
- [ ] Tool Policy: ALLOW / DENY / APPROVAL_REQUIRED
- [ ] Human Approval through API / CLI / GUI
- [ ] Audit Log

### Phase 3 - Observability

- [ ] OpenTelemetry
- [ ] Prometheus
- [ ] Grafana
- [ ] API / Agent / Tool metrics and traces
- [ ] trace/correlation evidence available from CLI and GUI

### Phase 4 - Incident Investigation Agent

- [ ] Sample service
- [ ] fault injection endpoint/profile
- [ ] read-only metrics/log/deployment tools
- [ ] incident investigation flow
- [ ] CLI/GUI launch and observation
- [ ] incident report template

### Phase 5 - Reliability and performance

- [ ] Redis for rate limiting, idempotency and locks
- [ ] k6 load tests against the NAS integration runtime
- [ ] P95/P99, error rate, tool latency, agent completion metrics
- [ ] bottleneck analysis and before/after evidence

### Phase 6 - Kubernetes second deployment target

- [ ] Deployment / Service / Ingress
- [ ] ConfigMap / Secret
- [ ] Readiness / Liveness Probe
- [ ] Requests / Limits
- [ ] Rolling update / rollback
- [ ] Namespace / RBAC / NetworkPolicy
- [ ] HPA where justified
- [ ] same API / CLI / GUI contract against Compose and Kubernetes

### Phase 7 - Event architecture

- [ ] Normalize agent events
- [ ] Kafka producer/consumer
- [ ] audit/analytics/notification consumer separation
- [ ] backlog and replay drill

### Phase 8 - Security Review Agent

- [ ] dependency review
- [ ] Dockerfile review
- [ ] Kubernetes manifest review
- [ ] auth/authz configuration review
- [ ] secret exposure checks
- [ ] approval-gated code changes

## Evidence-first principle

기능 추가 자체보다 아래 증거를 남기는 것을 완료 기준으로 사용합니다.

- `docs/ARCHITECTURE.md`
- `docs/NAS_SHARED_RUNTIME_PLAN.md`
- `docs/SECURITY.md`
- `docs/DEPLOYMENT.md`
- `docs/OBSERVABILITY.md`
- `docs/LOAD_TEST_REPORT.md`
- `docs/RUNBOOK.md`
- `docs/INCIDENT_REPORTS/`
- `adr/`

## Scope guardrails

- 실제 상용 운영 경험으로 표현하지 않습니다.
- OpenAI API 동작은 구현 시점의 공식 문서를 기준으로 검증합니다.
- Agent가 임의로 Secret을 읽거나 위험한 작업을 실행하도록 만들지 않습니다.
- Kubernetes, Kafka, Redis는 기술 목록을 늘리기 위해 넣지 않고 실제 문제와 검증 시나리오가 생길 때 도입합니다.
- 공개 저장소에는 API key, token, 내부 주소, 계정정보 등 민감정보를 저장하지 않습니다.
- 인증 구현 전 NAS 서비스는 공개 인터넷에 광범위하게 노출하지 않습니다.
- public PR/untrusted code를 Synology self-hosted runner에서 자동 실행하지 않습니다.

## Status

`Phase 0 - Baseline` 완료. 다음 목표는 `Phase 0.5 - NAS shared runtime + CLI/GUI baseline`, 이후 `Phase 1 - Agents API minimal E2E on NAS`입니다.
