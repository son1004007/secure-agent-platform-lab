# Constraints

These constraints are mandatory unless explicitly superseded by a documented decision.

## Security

- No real secrets in Git, tests, logs, screenshots or documentation.
- No unrestricted shell exposed as an Agent tool.
- No provider credentials returned to clients.
- Secret access is denied by default.
- Destructive data changes and deployment are denied or approval-gated.
- Public examples must not contain customer/internal infrastructure data.

## Architecture

- OpenAI/provider-specific code stays behind a dedicated adapter.
- Platform-owned identity, policy, approval and audit must remain independent of provider SDKs.
- Managed Agent state must not be blindly duplicated into PostgreSQL; persist only business/security metadata required by this platform.
- New infrastructure components require a documented use case and verification plan.

## Delivery

- Phase 0 must be verified by CI before being considered complete.
- Phase 1 must prove the minimal Agents API E2E before adding Redis, Kafka or Kubernetes.
- Tests and documentation must change with behavior.
- Incident scenarios are labelled drills and remain reproducible.

## External API behavior

OpenAI product/API behavior can change. Verify implementation-relevant behavior against current official OpenAI documentation before coding or updating architecture assumptions.
