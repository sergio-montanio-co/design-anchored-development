# Loans example

A small lending app taken through DAD Phases 1 to 5. A borrower requests, pays and liquidates loans; operations staff approve, reject and disburse.

| Phase | Artifact |
| --- | --- |
| 1 | [inventory](dad/design/inventory.md), [open questions](dad/design/open-questions.md) (both answered) |
| 2 | [domain model](dad/domain/domain.md) with the Loan state machine |
| 3 | [schema](dad/contracts/schema.graphql), [web operations](dad/contracts/operations/web) |
| 4 | [6 invariants](dad/domain/invariants.yaml) and their error types in the schema |
| 4b | [7 policies](dad/domain/policies.yaml) |
| 5 | [rule-ID tests](apps/api/test/rules.test.ts) (todos, implementation next) |

Things to notice:

- `Q-001` found a design mistake (a "Pay now" button on approved loans) before any code existed; it became `INV-LOAN-002`.
- Every mutation returns a result union, and every error type in it comes from an invariant or a policy.
- `npm run check:example` cross-checks all of the above, including that each rule ID has a test.

Next: implement `apps/api`, then a web client and a mobile client generated from the same schema.
