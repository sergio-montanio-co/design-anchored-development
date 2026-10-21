# DAD agent rules

Load this file at the start of every DAD phase. Project-specific rules go at the end.

## Core rules

1. **Never guess.** Ambiguity becomes an entry in `design/open-questions.md`, never an assumption in code.
2. **Stay in your phase.** Each phase reads its declared inputs and writes only its declared outputs (see the phase table below).
3. **Upstream first.** A change needed downstream (a new field in a client) is made in the earliest artifact that owns it (`domain/domain.md`), then propagated.
4. **Domain language only.** Names come from the glossary in `domain/domain.md`. No screen names in the domain or the schema.
5. **Every rule has an ID.** Business rules exist only in `domain/invariants.yaml` (`INV-*`), permissions only in `domain/policies.yaml` (`POL-*`). Code and tests reference them by ID.
6. **Every error is in the schema.** No server returns, and no client handles, an error type `contracts/schema.graphql` does not declare.
7. **Stop at checkpoints.** Do not start the next phase until the human checkpoint for the current one is recorded in the checkpoint log below.

## Phases

| Phase | Reads | Writes | Human checkpoint |
| --- | --- | --- | --- |
| 0 Design conventions | – | design file | Designer completes `design/checklist.md`; Figma lint passes |
| 1 Design extraction | design file | `design/inventory.md`, `design/open-questions.md` | All questions answered or deferred |
| 2 Domain model | inventory, answered questions | `domain/domain.md` | Domain expert validates |
| 3 GraphQL contract | domain, inventory | `contracts/schema.graphql`, `contracts/operations/**` | Engineer reviews types, naming, nullability |
| 4 Invariants | domain, schema, design annotations | `domain/invariants.yaml`, schema error types | Domain expert signs off |
| 4b Policies | domain (actors), schema | `domain/policies.yaml` | Domain expert + security owner sign off |
| 5 Backend | schema, invariants, policies | `apps/api/**` | Code review + green suite |
| 6 Clients | schema, invariants, policies, client design | `apps/<client>/**` | Review against design + run against API |

## GraphQL conventions

- Types use domain entity names (`Loan`); mutations use domain verbs (`approveLoan`).
- Every mutation returns a result union: `<Verb><Entity>Result = <Entity> | <ErrorType> | ...`.
- Every error type implements `interface Error { code: String! message: String! }`.
- A field is nullable only when `domain.md` says it can be absent.
- Lists that can grow use cursor pagination (`<Entity>Connection`).

## Test conventions

- One test per rule, named with its ID first: `it('INV-LOAN-003: ...')`, `it('POL-LOAN-002: ...')`.
- `node scripts/dad-check.mjs` must pass before a phase is closed.

## Checkpoint log

| Date | Phase | Approved by | Notes |
| --- | --- | --- | --- |
| | | | |

## Project-specific rules

<!-- Stack, naming conventions, testing framework, anything else the agent must follow. -->
