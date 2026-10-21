# Open questions · Loan kit (Figma Community)

Phase 1 output. The agent writes a question here instead of guessing. Phase 2 does not start until every question is answered or deferred.

Status: `open` · `answered` · `deferred`

All 54 questions are `open`: this is a third-party kit and there is no designer or domain expert to answer them. Node ids refer to Figma file `HIyEGervvXLwpmt4CS3OPj`.

**Most blocking (answer these first):** Q-014 (loan states and approval), Q-022 (one loan kind or two), Q-013 (who the lender is), Q-007 and Q-008 (how instalments and fees are calculated), Q-019 (how repayment works), Q-009 and Q-044 (what the credit score and limit drive), Q-002 (currency).

---

## Product and market

### Q-001 · Brand and operator

- **Status:** open
- **Question:** Is the product called "lendly" or "Rayland"? Is one the app brand and the other the company or the lending partner?
- **Evidence:** logo text "lendly" (189:5118) and "your own lendly loan account" (Verified, 224:3190); "All here in Rayland" (77:4912), "Rayland is working with trusted partners" (139:1408).
- **Blocks:** glossary, Lender entity
- **Answer:**
- **Answered by / date:**

### Q-002 · Currency

- **Status:** open
- **Question:** Is every amount in Philippine pesos? Are the USD amounts design mistakes, or does the shop sell in USD?
- **Evidence:** PHP on loans, wallet and history (`₱ 30,000.00` I225:4444;77:4918, `1,255.00 PHP` 93:27171); USD on OTC limits (`$5,000` 93:27463), product screen (`$1,200` 91:20362, `$1,800 total price`), Shop price filter (`$500 - $1000`, 88:19966) and the Balance-card component (`$ 400.00`, 77:3883).
- **Blocks:** `Money` value type, FinancingOffer amounts
- **Answer:**
- **Answered by / date:**

### Q-003 · Amount precision and display

- **Status:** open
- **Question:** What is the canonical precision (centavos?) and display format? What value is "1,2555 PHP": 12,555.00, 1,255.50 or 1,255.00?
- **Evidence:** `1,2555 PHP` (196:1735, 93:26366) while the detail of the same payment shows `1,255.00 PHP` (93:27171); `₱1500.00` (72:3736); `₱1,200` (117:1030); four notations (`₱`, `PHP 2,000.00`, `2,000.00 PHP`, `$`).
- **Blocks:** `Money` value type, invariants on amounts
- **Answer:**
- **Answered by / date:**

### Q-004 · Phone number country

- **Status:** open
- **Question:** Which country codes are accepted? Is the service Philippines-only (+63)?
- **Evidence:** login shows `+63-923456790` (196:3108); registration and profile show `+65` (164:1806, 133:2065), Singapore's code; SMS screen masks the number as `******731` while the typed number ends in 255 (164:1898).
- **Blocks:** Customer.phoneNumber format, KYC rules
- **Answer:**
- **Answered by / date:**

### Q-005 · Jurisdiction and accepted ID documents

- **Status:** open
- **Question:** Which identity documents are accepted (PhilSys, passport, driver's licence...)? Must the system record the document type, number and expiry?
- **Evidence:** the ID scan sample is an Estonian ID card ("EESTI VABARIIK", 181:2435) in an app with Philippine cities, banks and pawnshops; "Only 1 ID needed for the loan approval" (product screen).
- **Blocks:** IdentityVerification fields
- **Answer:**
- **Answered by / date:**

## Loan terms and pricing

### Q-006 · Interest rate basis

- **Status:** open
- **Question:** Is the rate monthly, flat or on the declining balance? Does each plan have its own rate? What is "1.99% ave per mo." an average of?
- **Evidence:** Loan info "1.99% ave per mo." (I225:4444;77:4959, 77:4960); the 6-month plan shows "2.99% Interest" (81:7710) and the success screen "Interest 2.99%" (223:3077).
- **Blocks:** InstallmentPlan.interestRate, Loan.interestRate, invariants
- **Answer:**
- **Answered by / date:**

### Q-007 · Instalment formula

- **Status:** open
- **Question:** How is the monthly amount calculated? ₱2,000.00 over 6 months at 2.99% gives ₱982.12/mo (₱5,892.72 in total, 195% over principal). Neither a flat nor an amortised 2.99% monthly rate produces this (both give roughly ₱370 to ₱393). Is the example wrong, or is there a fee or insurance component?
- **Evidence:** 81:7663 (₱2,000.00), 81:7710 (2.99%), 81:7713 (₱ 982.12/mo), 223:3034 ("Monthly Fee ₱982.12").
- **Blocks:** Installment.amount, all repayment invariants
- **Answer:**
- **Answered by / date:**

### Q-008 · Processing fee

- **Status:** open
- **Question:** How is the processing fee computed, and is it deducted from the money received, added to the principal, or paid separately? The summary shows a 3% fee of 150.00 on 2,000.00 (3% is 60.00) and still "Total amount to Receive ₱ 2,000.00". Is the rate fixed at 3% or variable ("as low as")?
- **Evidence:** 81:7749 ("3% Processing Fee"), 81:7750 ("-150.00"), 81:7756 ("₱ 2,000.00"), I225:4444;77:4964 and 77:4965 ("3% as low as").
- **Blocks:** Loan.processingFee, Loan.netDisbursedAmount, invariants
- **Answer:**
- **Answered by / date:**

### Q-009 · Borrowing limit

- **Status:** open
- **Question:** How is the maximum amount ("You can borrow up to ₱ 30,000.00") set? Is it per customer, derived from the credit score, and is it a cap per loan or on the total outstanding? What does "Subject to evaluation" involve?
- **Evidence:** I225:4444;77:4918, I225:4444;77:4920; "The offered loan amount is based on your credit score" (139:1292).
- **Blocks:** CreditOffer entity, invariants on principal
- **Answer:**
- **Answered by / date:**

### Q-010 · Amount bounds

- **Status:** open
- **Question:** What are the minimum amount, maximum amount and allowed increments for a loan request?
- **Evidence:** amount input shows ₱2,000.00 (81:7663) with no rule.
- **Blocks:** invariants on Loan.principal
- **Answer:**
- **Answered by / date:**

### Q-011 · Available terms

- **Status:** open
- **Question:** Which terms can a customer choose? Any whole number of months between 6 and 12, a fixed list (6, 12), or 24 as well?
- **Evidence:** "Payable in 6 - 12 months" (I225:4444;77:4934); only "6 Months" in the plan picker (81:7707); product financing "× 12 months" (91:20498); product cards "x 24 mo" (117:1030).
- **Blocks:** InstallmentPlan values
- **Answer:**
- **Answered by / date:**

### Q-012 · Loan purpose

- **Status:** open
- **Question:** What purposes exist besides "Educational"? Is purpose required, and does it affect approval or price?
- **Evidence:** 91:20478; no option list designed.
- **Blocks:** LoanPurpose enum
- **Answer:**
- **Answered by / date:**

### Q-013 · Lender

- **Status:** open
- **Question:** Who lends the money? The summary shows "Lender: null" with "What is this?", the success screen says the money came "From Apple Inc.", and copy mentions "trusted partners". Is the lender a partner institution chosen per loan, the merchant, or the operator?
- **Evidence:** 81:7759, 81:7760, 223:3028, 139:1408.
- **Blocks:** Lender entity, Loan.lenderId, actors and policies
- **Answer:**
- **Answered by / date:**

## Loan lifecycle

### Q-014 · Approval and application states

- **Status:** open
- **Question:** What happens between "Get This Loan" and the money arriving? Is approval instant and automatic, or can a request be pending, approved, rejected or cancelled? The sitemap lists "Preview Pending Loans" under Home, but no pending or rejected screen exists.
- **Evidence:** form (81:5560) goes straight to "Added to your account" (223:2994); "Get instant approval" (139:1325); "Subject to evaluation" (I225:4444;77:4920); "check if you are qualified" (product screen); Sitemap (27:138).
- **Blocks:** Loan state machine (most important open item)
- **Answer:**
- **Answered by / date:**

### Q-015 · Disbursement destination

- **Status:** open
- **Question:** Is a cash loan always credited to the in-app wallet? Can the customer withdraw it to a bank or e-wallet? No cash-out screen exists.
- **Evidence:** "Added to your account" (223:3026); wallet balance on Home (I93:28480;71:3282).
- **Blocks:** Loan disbursement, Wallet, Transaction types
- **Answer:**
- **Answered by / date:**

### Q-016 · Full set of loan statuses

- **Status:** open
- **Question:** Besides active ("Present", "Unpaid") and "Paid", which statuses exist: overdue, defaulted, restructured, written off, cancelled?
- **Evidence:** 196:1719, 196:1814, 72:3302; no status component or variant exists.
- **Blocks:** Loan state machine
- **Answer:**
- **Answered by / date:**

### Q-017 · Late payment

- **Status:** open
- **Question:** What happens when an instalment is not paid by its due date: late fee, penalty interest, grace period, credit score impact?
- **Evidence:** "Please pay this balance within the date to keep your credit score" (123:1767).
- **Blocks:** Installment states, invariants, CreditScore rules
- **Answer:**
- **Answered by / date:**

### Q-018 · Repayment schedule

- **Status:** open
- **Question:** Are instalments monthly? On which day of the month is each due? Is the label "Fees of February" the instalment's due month? Is the instalment called a "fee" in the business?
- **Evidence:** "Fees of Febuary" (I93:28471;71:3288), "Fees of March" (72:3737), "Monthly Fee" (223:3033), due-date calendar "Mon, Aug 17" (I225:4650;143:16444).
- **Blocks:** Installment entity, glossary
- **Answer:**
- **Answered by / date:**

### Q-019 · How the customer repays

- **Status:** open
- **Question:** There is no repayment screen. How does a customer pay an instalment: from the wallet balance, directly through a bank or OTC partner, or both? Can they pay more than the due amount, pay early, or pay off the whole loan?
- **Evidence:** Sitemap "Pay Loans" (27:138) with no screen; notification "Tap to pay" (123:1767); "pay your due on the application" (139:1381); history "Paid this month ... To Apple Inc." (93:27166 to 93:27173).
- **Blocks:** Payment entity or Transaction type, repayment invariants, mutations
- **Answer:**
- **Answered by / date:**

### Q-020 · Concurrent loans

- **Status:** open
- **Question:** How many loans can a customer have at once? Do outstanding loans reduce the amount they can borrow?
- **Evidence:** Home shows two unpaid items (Nike Inc., Apple Inc.); Active loans shows three present loans (196:1722, 196:2070, 196:2082).
- **Blocks:** invariants on new loans, CreditOffer
- **Answer:**
- **Answered by / date:**

### Q-021 · What an "unpaid" row is

- **Status:** open
- **Question:** Each row in "Unpaid Loans" and "Active loans" shows a merchant, a month and an amount. Is the row a loan (amount = outstanding balance) or a single instalment (amount = amount due)?
- **Evidence:** I93:28471;71:3290 (₱400.00), 72:3736 (₱1500.00), 196:1735 (1,2555 PHP).
- **Blocks:** Loan vs Installment fields
- **Answer:**
- **Answered by / date:**

## Product financing (Shop)

### Q-022 · One loan kind or two

- **Status:** open
- **Question:** The file shows a cash loan (amount, plan, purpose, credited to the wallet) and product financing (merchant, product, down payment, pick-up). Are these one Loan entity with an optional product and merchant, or two products with different rules? Why does a cash loan say "From Apple Inc." and why do loans in the Active list name an iPhone?
- **Evidence:** loan form 81:5560; product screen 91:19987; 223:3028; 196:1734; onboarding "LOAN PRODUCT IN-APP · Many products to loan" (189:3550).
- **Blocks:** entity split (Loan vs financing), every downstream phase
- **Answer:**
- **Answered by / date:**

### Q-023 · Financing arithmetic

- **Status:** open
- **Question:** The offer reads "From $1,200 × 12 months · $1,800 total price · 65% Downpayment". 12 × 1,200 is 14,400; 65% of 1,800 is 1,170. Which numbers are right, and what does each mean (monthly instalment, cash price, financed total)?
- **Evidence:** merchant rows 91:20440, 91:20505, 91:20522; "From as low as $1,200 per month" (91:20362); product cards "₱1,200 x 24 mo" (117:1030).
- **Blocks:** FinancingOffer fields and invariants
- **Answer:**
- **Answered by / date:**

### Q-024 · Interest on product financing

- **Status:** open
- **Question:** Is product financing interest-free ("0% Installment") or low-interest ("Low interest")? Since filters sort by "Low Interest", does the rate vary per merchant or product?
- **Evidence:** 91:20282, 91:20296; Filter "Sort by: Low Interest" (88:18950).
- **Blocks:** FinancingOffer.interestRate
- **Answer:**
- **Answered by / date:**

### Q-025 · Down payment

- **Status:** open
- **Question:** Who collects the down payment (merchant at pick-up, or the app from the wallet)? Is the percentage set per merchant, per product, or by credit score?
- **Evidence:** "65% Downpayment" on all three merchants; "Down Payment and other loan terms may vary" (disclaimer).
- **Blocks:** FinancingOffer.downPaymentRate, payment flow
- **Answer:**
- **Answered by / date:**

### Q-026 · Availability

- **Status:** open
- **Question:** Does the system track stock per merchant and location, or is "Limited Availability" a static badge?
- **Evidence:** "Limited Availability" on every merchant row.
- **Blocks:** FinancingOffer.availability (or drop it)
- **Answer:**
- **Answered by / date:**

### Q-027 · Location and fulfilment

- **Status:** open
- **Question:** What does "Where do you want to shop?" select: the city that filters merchants, or a store? Is fulfilment pick-up only ("Easy pick-up") or is delivery possible?
- **Evidence:** 91:20402 ("Davao City, Davao del Sur"), 91:20313.
- **Blocks:** Merchant location fields
- **Answer:**
- **Answered by / date:**

### Q-028 · Financing application flow

- **Status:** open
- **Question:** What happens after "Continue" on a product? Is a financing application created with the chosen merchant, and does it go through the same approval as a cash loan?
- **Evidence:** Continue button on 91:19987; no following screen.
- **Blocks:** Loan or financing application lifecycle
- **Answer:**
- **Answered by / date:**

### Q-029 · Product identity and variants

- **Status:** open
- **Question:** Are storage and colour part of the product (one record per SKU) or variants of one product? The header and title disagree on the model.
- **Evidence:** header "Apple iPhone 12 Pro Max" (91:20091) vs title "Apple iPhone 15 Pro Max 256GB, Rose Gold" (91:20365).
- **Blocks:** Product entity
- **Answer:**
- **Answered by / date:**

## Wallet and cash-in

### Q-030 · Wallet balance

- **Status:** open
- **Question:** Is the balance on Home (₱ 2,500.00) the same balance shown as "Balance: ₱0.00" on the cash-in screen? Is the wallet a stored-value (e-money) account held by the operator?
- **Evidence:** I93:28480;71:3282, 93:27729.
- **Blocks:** Wallet entity
- **Answer:**
- **Answered by / date:**

### Q-031 · Use of wallet funds

- **Status:** open
- **Question:** What can wallet money be used for: repaying instalments, down payments, purchases, withdrawals?
- **Evidence:** Cash-in channels say "Pay via other banks" and "Pay in cash" (93:27414, 93:27402) for adding money; no spend or cash-out screen.
- **Blocks:** Transaction types, invariants on Wallet
- **Answer:**
- **Answered by / date:**

### Q-032 · Cash-in limits

- **Status:** open
- **Question:** Which limits does the system enforce: per-transaction maximum, daily maximum, minimum? Are they set per channel? Is the OTC limit really $5,000 for every partner?
- **Evidence:** "Max. Transaction amount $5,000" (93:27463 and siblings), "BPI's max limit is ₱10,000.00 per day" (93:27740).
- **Blocks:** CashInChannel fields, invariants
- **Answer:**
- **Answered by / date:**

### Q-033 · Cash-in fee

- **Status:** open
- **Question:** Is the transfer fee fixed (₱15.00) or per channel? Is the credited amount gross or net of the fee?
- **Evidence:** "Transfer Fee -₱15.00" (224:3378) and "2,500.00 PHP" credited (224:3371) for a 2,500.00 request (93:27734).
- **Blocks:** Transaction.fee, invariants
- **Answer:**
- **Answered by / date:**

### Q-034 · Cash-in source mismatch

- **Status:** open
- **Question:** The amount screen is for BPI but the success screen says "From GCash". Is the success screen meant to show the channel used?
- **Evidence:** 93:27740, 224:3372.
- **Blocks:** Transaction.channel
- **Answer:**
- **Answered by / date:**

### Q-035 · Over-the-counter flow

- **Status:** open
- **Question:** For cash at 7-Eleven or a pawnshop, does the app issue a reference code and wait for the payment (an asynchronous pending state)? No screen exists after choosing a partner.
- **Evidence:** 93:27436.
- **Blocks:** cash-in state machine
- **Answer:**
- **Answered by / date:**

### Q-036 · Cash-in statuses

- **Status:** open
- **Question:** Can a cash-in be pending, failed, expired or reversed? Only success is designed.
- **Evidence:** 224:3338.
- **Blocks:** Transaction state machine
- **Answer:**
- **Answered by / date:**

## Transactions and history

### Q-037 · Transaction types

- **Status:** open
- **Question:** What is the full list of transaction types? Filter chips show "All, Type, Balance, Paid Bills, Added, Paid Bills"; detail chips show "Paid Bills", "Cash-In", "Loan Amount". Are "Added" and "Cash-In" the same? Are "Type" and "Balance" filters rather than types?
- **Evidence:** I93:21341;88:18910 to I93:21358;88:18910, I93:27174;88:18910, I224:3373;88:18910, I223:3029;88:18910.
- **Blocks:** TransactionType enum
- **Answer:**
- **Answered by / date:**

### Q-038 · Transaction reference

- **Status:** open
- **Question:** Is the transaction number unique per transaction, and what is its format? The same "#200412312551" appears on a loan credit, a cash-in and a payment. It is styled as a link: where does it go?
- **Evidence:** 223:3040, 224:3384, 93:27214.
- **Blocks:** Transaction.reference, invariants
- **Answer:**
- **Answered by / date:**

### Q-039 · Payment fee

- **Status:** open
- **Question:** What is the ₱100.00 "Fee" on a ₱1,255.00 instalment payment: a convenience fee, a late fee, or part of the instalment?
- **Evidence:** 93:27207.
- **Blocks:** Transaction.fee, repayment rules
- **Answer:**
- **Answered by / date:**

### Q-040 · Direction of a history row

- **Status:** open
- **Question:** One row reads "Paid this month 1,200 PHP" with an incoming ("add") icon and no counterparty. Is it a payment out or money in?
- **Evidence:** 93:26423, 93:26424, 93:26484.
- **Blocks:** Transaction.direction
- **Answer:**
- **Answered by / date:**

### Q-041 · Closed loans

- **Status:** open
- **Question:** In "Recent Loans", what date is "02/08/2024" (origination, final payment, last instalment) and in which format (DD/MM or MM/DD)? Does "Paid" mean the loan is fully repaid?
- **Evidence:** 196:1810, 196:1814, 93:26836, 93:26840.
- **Blocks:** Loan.closedAt, Loan state machine
- **Answer:**
- **Answered by / date:**

## Notifications and credit score

### Q-042 · Notifications

- **Status:** open
- **Question:** Are "Today" and "Announcement" date groups or categories? Is the dot a read/unread marker? What is the real body of the survey notification (it repeats the due-date text)? Are notifications in scope of the domain or a separate messaging service?
- **Evidence:** 123:1604, 124:1823, 124:1776 vs 124:1787, 124:1788 and 124:1791.
- **Blocks:** Notification entity (or exclusion from the domain)
- **Answer:**
- **Answered by / date:**

### Q-043 · Due-date calendar

- **Status:** open
- **Question:** Should the calendar mark every upcoming due date across all loans, or only the next one? The example shows one day, a wrong weekday ("Mon, Aug 17" in August 2023) and a year that differs from the transactions (2024).
- **Evidence:** I225:4650;143:16444, I225:4650;143:16447, I225:4650;143:16488.
- **Blocks:** Installment query needs
- **Answer:**
- **Answered by / date:**

### Q-044 · Credit score

- **Status:** open
- **Question:** Is the score internal ("your trust score") or from a credit bureau? What are the bands and thresholds (only "Good" is shown on a 300 to 850 scale)? What does it drive: borrowing limit (stated), interest rate, processing fee ("as low as")? What changes it, and how often is it recalculated?
- **Evidence:** I225:4871;134:2243 (720), I225:4871;134:2244 (Good), 134:2468/134:2469 (300, 850), 139:1292, 123:1767.
- **Blocks:** CreditScore entity, CreditOffer derivation
- **Answer:**
- **Answered by / date:**

## Actors, customer and KYC

### Q-045 · Actors beyond the borrower

- **Status:** open
- **Question:** Who else acts in the system: an operations analyst who approves loans, the lender partner, merchants who confirm pick-ups, support agents? None is designed.
- **Evidence:** "trusted partners" (139:1408), "Lender" (81:7758), merchants (91:20440), "Customer Support" and "Help Center" links.
- **Blocks:** actors and roles in the domain, Phase 4b policies
- **Answer:**
- **Answered by / date:**

### Q-046 · Identity verification rules

- **Status:** open
- **Question:** Which steps are required before a customer can apply (phone OTP, selfie, ID, face match, personal details, signature)? What happens when one fails (wrong OTP, face does not match, unreadable ID), how many retries are allowed, and is manual review possible?
- **Evidence:** registration flow 164:1750 → 164:1876 → 165:2078 → 180:2232 → 224:3190 → 180:1407 → 164:1532 → 180:1946 → 181:2290; only success frames.
- **Blocks:** IdentityVerification state machine, Customer status
- **Answer:**
- **Answered by / date:**

### Q-047 · Eligibility

- **Status:** open
- **Question:** Are there eligibility rules beyond KYC, such as minimum age, residency or income?
- **Evidence:** date of birth collected (131:1927, 131:1969, 131:1990) without a stated rule.
- **Blocks:** invariants on Customer and Loan
- **Answer:**
- **Answered by / date:**

### Q-048 · Account types

- **Status:** open
- **Question:** "Currently using as · Your personal Account" suggests a customer can switch between accounts (for example personal and business). Is that in scope? Why are the initials "KB" for a customer named John Doe?
- **Evidence:** 127:1039, 129:1222, 129:1229.
- **Blocks:** Customer and Account entities
- **Answer:**
- **Answered by / date:**

### Q-049 · Editing verified data

- **Status:** open
- **Question:** After KYC, which personal details can the customer change? Does changing legal name, date of birth or phone trigger re-verification? Do the darker borders on the name inputs mean something?
- **Evidence:** Profile-detail (130:1578), Edit chip (129:1232), border colours on 131:1854 and 131:1897 vs the rest.
- **Blocks:** Customer invariants
- **Answer:**
- **Answered by / date:**

### Q-050 · Signature

- **Status:** open
- **Question:** What does the signature sign: a one-time customer agreement at registration, or each loan agreement? Is it compared with the ID signature ("same signature as with the document you provided")?
- **Evidence:** 164:1744, 164:1747.
- **Blocks:** Customer.signature vs LoanAgreement entity
- **Answer:**
- **Answered by / date:**

### Q-051 · Credentials

- **Status:** open
- **Question:** Is the phone number the login identifier? Is the password rule exactly "at least 9 characters, containing a letter and a number"? Is an OTP required at login or only at registration?
- **Evidence:** 196:3108, 196:3146, 181:2281.
- **Blocks:** authentication rules (likely outside the domain model)
- **Answer:**
- **Answered by / date:**

### Q-052 · Email

- **Status:** open
- **Question:** "Receiving by email or phone" suggests an email address, but registration never asks for one. Is email a customer field?
- **Evidence:** 129:1274; registration form 180:1407.
- **Blocks:** Customer.email
- **Answer:**
- **Answered by / date:**

### Q-053 · Scheduled pay

- **Status:** open
- **Question:** What is "Scheduled pay": automatic debit of instalments from the wallet on the due date? Can the customer turn it on or off?
- **Evidence:** 129:1289, 134:2547; no screen.
- **Blocks:** repayment rules, Loan or Customer setting
- **Answer:**
- **Answered by / date:**

### Q-054 · Missing states and business errors

- **Status:** open
- **Question:** No empty, loading or error frame exists. Which business errors can a loan request return (amount over limit, identity not verified, overdue loan exists, term not offered)? Should the designer add those frames, or are they deferred to Phase 4?
- **Evidence:** whole file; Phase 0 items S1 to S3 fail.
- **Blocks:** Phase 4 error types, client error handling
- **Answer:**
- **Answered by / date:**
