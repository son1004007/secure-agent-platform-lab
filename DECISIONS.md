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
