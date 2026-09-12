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
- `CONFIRMED`: Synology NAS is the planned always-available integration/test runtime while GitHub remains the source of truth.
- `CONFIRMED`: the initial NAS runtime will use Docker Compose; Kubernetes is a later second deployment target.
- `CONFIRMED`: core capabilities must be exposed through one canonical REST/SSE API and usable from both `sapctl` CLI and a browser GUI.
- `PLANNED`: Phase 0.5 NAS shared runtime, PostgreSQL, `/api/v1`, version metadata, CLI health and minimal GUI.
- `PLANNED`: bounded NAS deployment/test onboarding through the private `device-control` bridge or another reviewed owner-controlled path.
- `PLANNED`: OpenAI Agents API adapter and minimal session/event E2E on the NAS.
- `PLANNED`: PostgreSQL business/security metadata store.
- `PLANNED`: JWT/OIDC, RBAC, Tool Policy and Human Approval.
- `PLANNED`: OpenTelemetry, Prometheus and Grafana.
- `PLANNED`: Incident Investigation Agent and sample service.
- `PLANNED`: Redis, k6, Kubernetes, Kafka and Security Review Agent in later phases.

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

Phase 0.5 - NAS shared runtime + CLI/GUI baseline.

Goal:

```text
reviewed Git commit
 -> Synology Docker Compose
 -> FastAPI /api/v1 health + version
 -> sapctl health
 -> browser dashboard/system status
 -> deterministic curl/AI smoke test
```

Done criteria:

```text
same NAS runtime is reachable through API, CLI and GUI
runtime reports the exact deployed Git SHA
PostgreSQL lab state persists across app restart
GitHub remains the source of truth
no secret is committed or returned to clients
untrusted public PR code is not executed on the NAS self-hosted runner
```

## Following milestone

Phase 1 - Agents API minimal E2E on NAS.

Before implementing provider-specific behavior, verify the current official OpenAI Agents API documentation and encode the external API behind a dedicated adapter with contract tests.

Phase 1 is complete only when one managed Agent session can be created and observed through both CLI and GUI against the shared NAS runtime.
