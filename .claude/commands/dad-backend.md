---
description: DAD Phase 5, generate the backend tests first, then the implementation
---
Run DAD Phase 5 (backend and tests) in `apps/api`.

Read `dad/rules.md` first, including the project stack.

1. Generate resolver types from `dad/contracts/schema.graphql` (GraphQL Code Generator or the stack's equivalent).
2. Write one failing test per entry in `invariants.yaml` and `policies.yaml`, each named with its ID first, using the entry's valid and invalid examples.
3. Write contract tests: every mutation returns only members of its result union, and every error carries `code` and `message`.
4. Implement resolvers, domain logic and persistence until every test passes. Business rules live in the domain layer, never in resolvers; policies are checked before the domain logic runs.
5. Run `node scripts/dad-check.mjs --tests apps/api` and the test suite.
6. End with a coverage table by rule ID.
