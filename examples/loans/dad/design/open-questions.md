# Open questions · Loans example

### Q-001 · LoanDetail

- **Status:** answered
- **Question:** "Pay now" appears in the approved and disbursed frames. Is paying allowed while the loan is only approved?
- **Evidence:** frames LoanDetail / approved and LoanDetail / disbursed both show the button.
- **Blocks:** Loan state machine; INV-LOAN-002
- **Answer:** No. Payments are only accepted once the loan is disbursed. The approved frame is a design mistake.
- **Answered by / date:** Operations lead, 2026-10-21

### Q-002 · OpsQueue

- **Status:** answered
- **Question:** Can a rejected loan be approved later?
- **Evidence:** no frame shows a rejected loan with actions.
- **Blocks:** Loan state machine
- **Answer:** No. Rejected is final; the borrower submits a new request.
- **Answered by / date:** Operations lead, 2026-10-21
