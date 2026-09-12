# Security

## Security goals

This lab treats AI Agent execution as a privileged capability that must be constrained by explicit identity, policy, approval and audit boundaries.

## Baseline rules

- Never commit real API keys, tokens, credentials or private endpoints.
- Browser/client code must never receive provider secrets.
- The first vertical slice is read-only beyond normal application state.
- Secret access and destructive operations are denied by default.
- Code mutation and deployment will require explicit approval when introduced.
- Workspace identifiers must map to server-controlled resources; arbitrary filesystem paths are not accepted as a security model.
- Provider-specific execution remains behind an adapter so policy code is not coupled to one SDK.

## Planned policy model

```text
read_metrics    ALLOW
read_logs       ALLOW
read_git_diff   ALLOW
change_code     APPROVAL_REQUIRED
deploy          APPROVAL_REQUIRED
read_secret     DENY
delete_data     DENY
```

## Public repository hygiene

Before every release or public example, verify that no source, test fixture, log, screenshot or documentation contains:

- API keys or tokens
- personal or customer data
- internal hostnames/IP addresses
- private repository paths
- authentication artifacts
- production incident details that are not safe to disclose

## Later verification

Security evidence should include, where applicable:

- authorization tests
- policy decision tests
- approval-gate tests
- secret scanning
- dependency/container scanning
- Kubernetes RBAC and NetworkPolicy tests
- threat model and abuse cases
