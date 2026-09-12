# Constraints

These constraints are mandatory unless explicitly superseded by a documented decision.

## Security

- No real secrets in Git, tests, logs, screenshots or documentation.
- No unrestricted shell exposed as an Agent tool.
- No provider credentials returned to clients.
- Secret access is denied by default.
- Destructive data changes and deployment are denied or approval-gated.
- Public examples must not contain customer/internal infrastructure data.
- Before JWT/OIDC and authorization are implemented, the NAS service must remain on a private or otherwise explicitly controlled access path and must not be broadly exposed to the public Internet.
- Public pull requests and other untrusted code must not automatically execute on the Synology self-hosted runner.

## Architecture

- OpenAI/provider-specific code stays behind a dedicated adapter.
- Platform-owned identity, policy, approval and audit must remain independent of provider SDKs.
- Managed Agent state must not be blindly duplicated into PostgreSQL; persist only business/security metadata required by this platform.
- New infrastructure components require a documented use case and verification plan.
- REST/SSE is the canonical application contract. CLI and GUI must consume the same API rather than bypassing it.
- CLI and GUI must not read application databases directly.
- User-facing behavior must not be implemented separately with conflicting logic in CLI and GUI.
- The first NAS runtime uses Docker Compose; Kubernetes remains a later independent deployment target.

## NAS runtime

- GitHub remains the source of truth. The NAS runtime is an integration/deployment target, not the authoritative edit source.
- Every NAS deployment must be attributable to an exact Git commit.
- NAS secrets and provider credentials remain outside the public repository.
- Remote AI testing must use bounded HTTP/CLI tests or the reviewed private device-control bridge, not unrestricted NAS shell access.
- Do not add the public repository to a privileged self-hosted execution path without reviewing trust boundaries for public/fork PRs.

## Interface parity

- Implement canonical API behavior first, then expose it through `sapctl` and the browser GUI.
- A core user-facing feature is complete only when API behavior is tested and both required client surfaces can use it, unless a decision explicitly marks the feature client-specific.
- CLI commands intended for automation should support non-interactive, machine-readable output where practical.

## Delivery

- Phase 0 must be verified by CI before being considered complete.
- Phase 0.5 must establish the NAS shared runtime plus CLI/GUI baseline before relying on the NAS for later live E2E tests.
- Phase 1 must prove the minimal Agents API E2E before adding Redis, Kafka or Kubernetes.
- Tests and documentation must change with behavior.
- Incident scenarios are labelled drills and remain reproducible.

## External API behavior

OpenAI product/API behavior can change. Verify implementation-relevant behavior against current official OpenAI documentation before coding or updating architecture assumptions.
