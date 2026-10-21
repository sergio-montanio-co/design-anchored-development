---
description: DAD Phase 4, propose invariants and feed error types back into the schema
---
Run DAD Phase 4 (invariants).

Read `dad/rules.md` first and follow it.

1. Propose invariants in `dad/domain/invariants.yaml` from three sources: structural rules implied by the schema and domain (ranges, formats, required fields), every state machine in `domain.md` (one rule per forbidden or conditional transition), and every annotated rule in the inventory.
2. Each entry follows `schemas/invariants.schema.json`, gets a new stable ID (`INV-<ENTITY>-<NNN>`, never reuse one), a plain-language `rule`, an error `code` and `graphql_type`, valid and invalid examples, and a `source`.
3. Feedback loop: for every new `graphql_type`, add the type (implementing `Error`, with useful context fields) to `schema.graphql` and to the result union of each mutation that can trigger it.
4. Run `node scripts/dad-check.mjs` until it passes.
5. List the business rules you could NOT infer and ask me for them: limits, deadlines, cross-entity rules, anything that lives in people's heads.
6. End by asking a domain expert to sign off.
