---
description: DAD Phase 3, generate the GraphQL schema and per-screen operations
---
Run DAD Phase 3 (GraphQL contract).

Read `dad/rules.md` first and follow its GraphQL conventions.

1. Stop if the Phase 2 checkpoint is not recorded in `dad/rules.md`.
2. Generate or update `dad/contracts/schema.graphql` from `dad/domain/domain.md`: types named after entities, enums from state machines, nullability from required/optional, cursor pagination for growing lists.
3. Every mutation uses a domain verb and returns a result union. For now each union holds the entity plus `NotAuthorized`; Phase 4 adds the business error types.
4. Coverage check: for each screen in `dad/design/inventory.md`, write one operation file under `dad/contracts/operations/<client>/<Screen>.graphql` that fetches exactly what the screen shows.
5. Run `node scripts/dad-check.mjs`. A screen whose operation does not validate is reported to me, not patched with a screen-specific field.
6. End with a short summary of types, queries and mutations, and ask an engineer to review.
