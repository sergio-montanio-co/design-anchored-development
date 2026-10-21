# Design inventory · Loans example

Phase 1 output for a small lending app: a borrower sees their loans and pays; an operations analyst approves and disburses.

**Source:** illustrative design, web client
**Generated:** 2026-10-21

---

## Screen: MyLoans

**Purpose:** a borrower sees all their loans and the balance of each.

### Dynamic fields

| Field | Maps to | Example | Notes |
| --- | --- | --- | --- |
| Loan amount | `@Loan.principal` | $12,500.00 MXN | |
| Balance | `@Loan.pendingBalance` | $4,380.50 MXN | |
| Status badge | `@Loan.status` | Disbursed | variants: requested, approved, rejected, disbursed, liquidated |
| Next due date | `@Installment.dueDate` | Oct 30, 2026 | first unpaid installment |

### States shown

- [x] Empty ("You have no loans yet")
- [x] Loading
- [x] Error
- Entity states: all five `Loan.status` variants

### Actions

| Action | Trigger | Leads to | Condition (annotation) |
| --- | --- | --- | --- |
| Open loan | tap row | LoanDetail | |
| Request loan | button | RequestLoan | |

### Annotated rules

- "Only the signed-in borrower's loans appear here" (frame MyLoans / default)

---

## Screen: LoanDetail

**Purpose:** a borrower sees the installments of one loan and pays.

### Dynamic fields

| Field | Maps to | Example | Notes |
| --- | --- | --- | --- |
| Installment number | `@Installment.number` | 3 of 12 | |
| Installment amount | `@Installment.amount` | $1,095.13 MXN | |
| Due date | `@Installment.dueDate` | Oct 30, 2026 | |
| Paid badge | `@Installment.paidAt` | Paid Oct 2 | empty when unpaid |

### Actions

| Action | Trigger | Leads to | Condition (annotation) |
| --- | --- | --- | --- |
| Pay now | button | PaymentConfirm | "Only when the loan is disbursed" |
| Liquidate | button | LiquidationConfirm | "Visible only when balance is 0" |

### Annotated rules

- "Pay now: amount cannot exceed pending balance" (frame PaymentConfirm / error)
- "Liquidate: visible only when balance is 0" (frame LoanDetail / disbursed-paid)

### Open questions

- Q-001

---

## Screen: OpsQueue (back office)

**Purpose:** an operations analyst reviews requested loans.

### Actions

| Action | Trigger | Leads to | Condition (annotation) |
| --- | --- | --- | --- |
| Approve | button | toast | "Ops analysts and managers only" |
| Reject | button | reason dialog | "Reason required" |
| Disburse | button | toast | "Managers only" |
