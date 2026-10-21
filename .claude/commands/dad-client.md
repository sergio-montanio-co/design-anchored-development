---
description: DAD Phase 6, generate a client (web, mobile, admin) from the shared contract
argument-hint: <client name, e.g. web or mobile> <its design link>
---
Run DAD Phase 6 for the client: $ARGUMENTS

Read `dad/rules.md` first, including the project stack for this client.

1. Run Phase 1 on this client's design into a client-specific section of `dad/design/inventory.md`, then diff it against `dad/domain/domain.md`. If the design needs data or actions the domain lacks, stop and list the gaps: they go upstream first.
2. Write one operation per screen under `dad/contracts/operations/<client>/` and validate with `node scripts/dad-check.mjs`.
3. Generate typed operations and hooks from the schema and those operations.
4. Generate the rules layer from `invariants.yaml` (client-side validation where `frontend: ux_only`), from `policies.yaml` (hide or disable actions the viewer's role cannot run) and an error-type to message map covering every error in the schema.
5. Build the screens following this client's design. The server remains the real check for every rule.
6. Run the client against the mock or real API and list any screen that could not be completed.
