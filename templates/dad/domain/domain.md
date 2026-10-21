# Domain model

Phase 2 output and the hub of DAD. Business language only: no screens, no endpoints, no storage details.

**Validated by:** <!-- domain expert, date -->

## Actors and roles

| Role | Who they are |
| --- | --- |
| | |

## Entities

### <Entity>

<!-- One sentence: what this is in business terms. -->

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | UUID | yes | |

**Relationships:** <!-- Entity A has many Entity B -->

**State machine:** <!-- only if the entity has a status -->

```text
state_a → state_b → state_c
state_a → state_d
```

## Value types

| Type | Definition |
| --- | --- |
| Money | Decimal amount + ISO 4217 currency |

## Glossary

- **Term:** definition everyone uses, in code and in conversation.
