---
description: DAD Phase 2, build the domain model from the inventory
---
Run DAD Phase 2 (domain model).

Read `dad/rules.md` first and follow it.

1. Stop if any question in `dad/design/open-questions.md` has status `open`; list them.
2. From `dad/design/inventory.md` and the answered questions, write or update `dad/domain/domain.md` using its template: actors and roles, entities with fields and types, relationships, state machines, value types and a glossary.
3. Use business language only. No screen names, no endpoints, no tables.
4. Every `@Entity.field` in the inventory must map to a field in the domain; list any that do not.
5. Mark each field as required or optional on purpose: this decides nullability in the schema.
6. Do not write the schema yet. End by asking a domain expert to validate the model, and remind me to record it in the checkpoint log.
