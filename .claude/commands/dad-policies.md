---
description: DAD Phase 4b, define who can do what
---
Run DAD Phase 4b (policies).

Read `dad/rules.md` first and follow it.

1. For every root field in `dad/contracts/schema.graphql`, write one entry in `dad/domain/policies.yaml` following `schemas/policies.schema.json`: `action`, the roles from domain.md that are allowed, a `scope` when a role only sees its own records, and the `NotAuthorized` error.
2. Use design annotations about roles as the first source; ask me about every operation where the allowed roles are not stated anywhere. Do not default to "everyone".
3. Run `node scripts/dad-check.mjs` until it passes.
4. End by asking the domain expert and the security owner to sign off.
