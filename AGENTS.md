# AGENTS.md

## Global AI Control

Before substantive work, when GitHub access is available, read `son1004007/ai-agent-workflow-playbook/CONTROL.md`, then return here.

This repository is the source of truth for `secure-agent-platform-lab` implementation, security boundaries, architecture decisions and verification evidence.

## Purpose

Build a public production-like lab that demonstrates secure and observable AI Agent platform engineering with FastAPI, OpenAI Agents API, security policy, incident response, performance testing and Kubernetes.

Do not describe lab results as real customer production experience.

## Read order

1. `README.md`
2. `CURRENT_STATE.md`
3. `DECISIONS.md`
4. `CONSTRAINTS.md`
5. `docs/ARCHITECTURE.md`
6. `docs/SECURITY.md`
7. relevant source and tests

## Rules

- Verify current OpenAI API behavior against official OpenAI documentation before implementing provider-specific behavior.
- Never commit API keys, tokens, private endpoints, credentials or private infrastructure details.
- Keep OpenAI-specific integration behind a dedicated adapter boundary.
- Keep identity, authorization, policy, approval and audit as platform-owned concerns.
- High-impact operations such as code mutation, deployment, secret access or destructive data changes must be approval-gated or denied.
- Prefer read-only tools for the first vertical slice.
- Do not add Redis, Kafka, Kubernetes or other infrastructure only to increase the technology list. Add them when a concrete reliability, scaling or architecture requirement exists.
- Every claimed capability requires source, test, runtime or benchmark evidence.
- Incident exercises must be labelled `Incident Drill`, not production incidents.
- Update `CURRENT_STATE.md` and durable decisions in the same change when implementation state or architecture materially changes.
- Keep changes small, reviewable and independently testable.

## Verification

For behavior changes, run as applicable:

```text
ruff check .
mypy src
pytest
docker build
```

Later phases must add contract, load, security, Kubernetes and incident-drill verification rather than replacing these baseline checks.
