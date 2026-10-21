# Domain model · Loans example

**Validated by:** Operations lead, 2026-10-21

## Actors and roles

| Role | Who they are |
| --- | --- |
| borrower | A person who requests and repays loans |
| ops_analyst | Operations staff who review loan requests |
| ops_manager | Operations staff who can also release money |

## Entities

### Loan

A sum lent to a Borrower, repaid in Installments.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | UUID | yes | |
| borrowerId | UUID | yes | → Borrower |
| principal | Money | yes | MXN, 2 decimals, 1,000.00 to 200,000.00 |
| pendingBalance | Money | yes | derived: sum of unpaid installment amounts |
| status | LoanStatus | yes | see state machine |
| rejectionReason | String | no | present only when status = rejected |
| createdAt | DateTime | yes | |

**Relationships:** a Loan has many Installments; a Loan has many Payments.

**State machine:**

```text
requested → approved → disbursed → liquidated
requested → rejected
```

`rejected` and `liquidated` are final (Q-002).

### Installment

One scheduled part of a Loan's repayment.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | UUID | yes | |
| loanId | UUID | yes | → Loan |
| number | Int | yes | 1..n |
| amount | Money | yes | |
| dueDate | Date | yes | |
| paidAt | DateTime | no | absent while unpaid |

### Payment

Money received from the Borrower against a Loan.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | UUID | yes | |
| loanId | UUID | yes | → Loan |
| amount | Money | yes | |
| receivedAt | DateTime | yes | |

## Value types

| Type | Definition |
| --- | --- |
| Money | Decimal amount with 2 decimals + ISO 4217 currency (MXN only in v1) |

## Glossary

- **Disbursed:** the money has been sent to the borrower; repayment starts.
- **Liquidated:** fully repaid, no pending balance.
- **Pending balance:** the sum of unpaid installment amounts.
