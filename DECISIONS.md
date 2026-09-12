# Decisions

## D-001: Production-like lab, not production claim

Status: CONFIRMED

The repository exists to produce verifiable engineering evidence by reproducing production concerns in a public lab. Results must not be described as real customer production operation.

## D-002: FastAPI control plane

Status: CONFIRMED

FastAPI is the application/control-plane framework because it aligns with the maintainer's existing Python/FastAPI experience and the target AI Backend roles.

## D-003: OpenAI integration behind an adapter

Status: CONFIRMED

OpenAI Agents API integration will live behind a dedicated boundary. Controllers, policy code and business state must not depend directly on provider SDK details.

## D-004: Platform owns security and governance state

Status: CONFIRMED

Identity, authorization, Tool Policy, Human Approval, audit and business metadata remain platform responsibilities even when agent execution/session management is delegated to a managed agent API.

## D-005: Read-only first vertical slice

Status: CONFIRMED

The first Agent scenario will prefer read-only observability/repository tools. Mutation and deployment are introduced only with explicit approval gates and tests.

## D-006: Complexity follows evidence

Status: CONFIRMED

Redis, Kafka and Kubernetes are added only when a concrete requirement and measurable verification scenario exists. Technology-list expansion is not a design goal.

## D-007: Synology NAS is the shared integration runtime

Status: CONFIRMED

GitHub remains the source of truth, while the Synology NAS becomes the always-available integration and test runtime used during implementation.

The first NAS deployment uses Docker Compose. Kubernetes is introduced later as a second deployment target rather than blocking early shared testing.

Rationale:

- humans and AI agents need a stable endpoint they can repeatedly exercise while the project evolves;
- continuous deployment/testing evidence is more valuable than waiting until the Kubernetes phase;
- the NAS already provides a controlled personal runtime suitable for production-like lab validation;
- Compose keeps early operational complexity bounded while preserving a path to Kubernetes later.

## D-008: One canonical API, multiple clients

Status: CONFIRMED

REST/SSE under the FastAPI control plane is the canonical application contract.

The browser GUI, `sapctl` CLI, curl/automation and bounded AI test clients must all use the same API and security/policy path. No client may bypass authorization by reading the database directly or duplicating business logic.

Implementation order is:

```text
API first
  -> CLI
  -> GUI
```

A user-facing capability is not considered complete when it exists only in the CLI or only in the GUI.

## D-009: Lightweight GUI before SPA complexity

Status: CONFIRMED

The first browser UI will be server-rendered or use lightweight JavaScript/HTMX unless a verified product requirement justifies a separate SPA.

The portfolio focus is Backend, Agent Architecture, Security, Observability and Operations rather than frontend framework complexity.

## D-010: Public CI and NAS deployment use separate trust boundaries

Status: CONFIRMED

Normal tests for this public repository run on GitHub-hosted CI. Untrusted public pull-request code must not automatically execute on the Synology self-hosted runner.

NAS deployment/testing uses an owner-controlled reviewed path, such as an explicit deployment workflow or the existing private `device-control` bridge. The deployed commit SHA must be observable as runtime evidence.
