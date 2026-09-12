# AGENTS.md

## Global AI Control

Before substantive work, when GitHub access is available, read `son1004007/ai-agent-workflow-playbook/CONTROL.md`, then return here.

This repository is the source of truth for `secure-agent-platform-lab` implementation, security boundaries, architecture decisions and verification evidence.

## Purpose

Build a public production-like lab that demonstrates secure and observable AI Agent platform engineering with FastAPI, OpenAI Agents API, security policy, incident response, performance testing and Kubernetes.

The Synology NAS is the planned shared integration/test runtime so humans and bounded AI test clients can exercise the system continuously through API, CLI and GUI while implementation progresses.

The current product definition is a **changeable working hypothesis**. Before expanding a user-facing product slice, prefer `static HTML publishing prototype -> screen/function review -> API design -> backend implementation -> CLI/GUI integration -> NAS verification`.

Do not describe lab results as real customer production experience.

## Read order

1. `README.md`
2. `CURRENT_STATE.md`
3. `DECISIONS.md`
4. `CONSTRAINTS.md`
5. `docs/PRODUCT_PROTOTYPE_PLAN.md`
6. `docs/ARCHITECTURE.md`
7. `docs/NAS_SHARED_RUNTIME_PLAN.md`
8. `docs/SECURITY.md`
9. relevant source and tests

## Rules

- Verify current OpenAI API behavior against official OpenAI documentation before implementing provider-specific behavior.
- Never commit API keys, tokens, private endpoints, credentials or private infrastructure details.
- Keep OpenAI-specific integration behind a dedicated adapter boundary.
- Keep identity, authorization, policy, approval and audit as platform-owned concerns.
- High-impact operations such as code mutation, deployment, secret access or destructive data changes must be approval-gated or denied.
- Prefer read-only tools for the first vertical slice.
- Do not add Redis, Kafka, Kubernetes or other infrastructure only to increase the technology list. Add them when a concrete reliability, scaling or architecture requirement exists.
- Do not treat the current service concept, screen list, API list or Incident Investigation scenario as immutable; revise them when prototype/user/runtime evidence supports a better design.
- For a new user-facing product slice, create/review the static HTML prototype before freezing the API contract or expanding backend code.
- Every claimed capability requires source, test, runtime or benchmark evidence.
- Incident exercises must be labelled `Incident Drill`, not production incidents.
- Update `CURRENT_STATE.md` and durable decisions in the same change when implementation state or architecture materially changes.
- Keep changes small, reviewable and independently testable.

## NAS and client rules

- GitHub is the source of truth; the NAS is a deployment/integration runtime.
- The initial NAS deployment uses Docker Compose. Do not block shared testing on Kubernetes.
- After a product slice is accepted, REST/SSE is the canonical application contract for that slice.
- Map accepted prototype actions to API operations first, then expose the same behavior through `sapctl` CLI and the browser GUI.
- CLI and GUI must not bypass API authorization, read the application DB directly or maintain conflicting business logic.
- Core user-facing capabilities are incomplete until the required API, CLI and GUI paths are verified.
- Prefer deterministic machine-readable CLI/smoke output so other AI systems can test the runtime safely.
- Before JWT/OIDC/RBAC exist, do not broadly expose the NAS service to the public Internet.
- Do not run untrusted public/fork PR code automatically on the Synology self-hosted runner.
- NAS remote deployment or AI runtime access must follow the reviewed private `device-control` trust boundary rather than introducing unrestricted SSH/shell interfaces here.

## Verification

For behavior changes, run as applicable:

```text
ruff check .
mypy src
pytest
docker build
```

Prototype changes require desktop/mobile visual review plus a recorded screen/function review before API freeze.

NAS-facing changes later also require, as applicable:

```text
Docker Compose config validation
NAS API smoke
sapctl smoke
browser GUI smoke
exact deployed Git SHA verification
```

Later phases must add contract, load, security, Kubernetes and incident-drill verification rather than replacing these baseline checks.
