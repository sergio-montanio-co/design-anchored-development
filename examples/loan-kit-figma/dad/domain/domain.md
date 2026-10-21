# Domain model · Loan kit (Figma Community)

Phase 2 output and the hub of DAD. Business language only: no screens, no endpoints, no storage details.

**Validated by:** Not validated (demo run, no domain expert)

> **Run note.** DAD stops Phase 2 while any question is `open`. All 54 are open here. This model was written anyway, from evidence only: every fact below is visible in the design; everything else is a `pending Q-xxx` placeholder, not a guess. Read it as "what the design proves" plus "what the business must decide".

## Actors and roles

| Role | Who they are | Evidence |
| --- | --- | --- |
| borrower | A person who registers, verifies their identity, borrows, adds money to their wallet and repays | every screen |
| *pending Q-045* | Whoever approves loans, operates the service, or supports customers. No such role is designed | "Subject to evaluation", "Help Center" |

External parties named in the design (they appear as data, not as users of this system): **Lender** (pending Q-013), **Merchant** (partner stores selling financed products), **Cash-in channel** (banks, e-wallets, over-the-counter partners).

## Entities

### Customer

A person who holds an account and can borrow.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | UUID | yes | |
| givenNames | String | yes | "full legal first and middle name(s)" |
| familyName | String | yes | "full legal last name" |
| fullName | String | derived | givenNames + familyName |
| dateOfBirth | Date | yes | collected as day, month, year; age rule pending Q-047 |
| address | Address | yes | |
| phone | PhoneNumber | yes | login identifier pending Q-051; allowed countries pending Q-004 |
| email | Email | *pending Q-052* | no evidence it is collected |
| signature | Image | yes | what it signs pending Q-050 |
| attestedAt | DateTime | yes | when the customer confirmed "the information you provided is true and correct" |
| accountType | *pending Q-048* | | "Your personal Account" suggests more than one |
| scheduledPayEnabled | *pending Q-053* | | |

**Relationships:** a Customer has one IdentityVerification, one Wallet, one CreditScore, one CreditOffer (pending Q-009), many Loans, many Transactions, many Notifications (pending Q-042).

**State machine:** *pending Q-046.* The design implies a customer cannot borrow before finishing registration ("You're ready to start a loan"), but no customer status is shown.

### IdentityVerification

The checks that prove a Customer is who they say they are.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | UUID | yes | |
| customerId | UUID | yes | → Customer |
| phoneVerifiedAt | DateTime | no | absent until the 6-digit OTP is confirmed |
| selfieImage | Image | no | absent until captured |
| idDocumentImage | Image | no | absent until scanned |
| idDocumentType | *pending Q-005* | | |
| faceMatchStatus | FaceMatchStatus | no | absent until the selfie is compared with the ID |

**State machine:** only the success path is designed.

```text
phone verified → selfie captured → ID scanned → face matched
```

Failure, retry and manual review states: *pending Q-046*.

### Wallet

Money the Customer holds in the app.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | UUID | yes | |
| customerId | UUID | yes | → Customer |
| balance | Money | yes | derived from Transactions (pending Q-030) |

What the balance can be spent on: *pending Q-031*.

### CreditScore

A number that rates how trustworthy the Customer is as a borrower.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| customerId | UUID | yes | → Customer |
| value | Int | yes | example 720 |
| scaleMin | Int | yes | 300 |
| scaleMax | Int | yes | 850 |
| band | CreditScoreBand | yes | derived from value; thresholds pending Q-044 |
| updatedAt | DateTime | *pending Q-044* | |

Source (internal or bureau) and what changes it: *pending Q-044*. The design states that the borrowing limit "is based on your credit score" and that paying on time keeps the score.

### CreditOffer

The terms a Customer can currently borrow under.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| customerId | UUID | yes | → Customer |
| maxAmount | Money | yes | example ₱30,000.00; per loan or total outstanding pending Q-009, Q-020 |
| minTermMonths | Int | yes | 6 |
| maxTermMonths | Int | yes | 12; allowed values pending Q-011 |
| interestRate | Rate | yes | shown as "1.99% average per month"; basis pending Q-006 |
| processingFeeRate | Rate | yes | shown as "3%, as low as"; variable or fixed pending Q-008 |

"Subject to evaluation": the offer is not a commitment (Q-014).

### InstallmentPlan

One repayment option offered for a requested amount.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| termMonths | Int | yes | example 6 |
| interestRate | Rate | yes | example 2.99% |
| installmentAmount | Money | yes | example ₱982.12 per month; formula pending Q-007 |

Value object computed from amount and term; not stored on its own.

### Loan

Money lent to a Customer and repaid in Installments.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | UUID | yes | |
| customerId | UUID | yes | → Customer |
| lenderId | UUID | *pending Q-013* | the design shows the lender as "null" |
| principal | Money | yes | example ₱2,000.00; bounds pending Q-010 |
| purpose | LoanPurpose | *pending Q-012* | example "Educational" |
| termMonths | Int | yes | |
| interestRate | Rate | yes | |
| installmentAmount | Money | yes | design label "Monthly Fee" |
| processingFeeRate | Rate | yes | |
| processingFee | Money | yes | how it is computed and charged pending Q-008 |
| netDisbursedAmount | Money | yes | "Total amount to Receive"; relation to principal and fee pending Q-008 |
| outstandingBalance | Money | *pending Q-021* | |
| merchantId | UUID | *pending Q-022* | loans in the design name a merchant (Apple Inc., Nike Inc.) |
| productId | UUID | *pending Q-022* | loans in the design name a product (iPhone 15 Pro Max) |
| downPayment | Money | *pending Q-022, Q-025* | only on financed products |
| status | LoanStatus | yes | see state machine |
| disbursedAt | DateTime | yes in `active` and `paid` | "Jul 15, 2024 9:12 AM" on the credit; absence in earlier states pending Q-014 |
| closedAt | DateTime | no | absent while active; which date the design shows pending Q-041 |

**Relationships:** a Loan has many Installments; a Loan belongs to one Customer; a Loan may reference one Merchant and one Product (pending Q-022); a Loan is credited to the Wallet (pending Q-015).

**State machine:** only two states are evidenced.

```text
active → paid
```

- States before `active` (requested, under review, approved, rejected, cancelled): *pending Q-014*. The sitemap mentions "Pending Loans" but no screen shows one.
- States after `active` other than `paid` (overdue, defaulted, restructured): *pending Q-016, Q-017*.

### Installment

One scheduled part of a Loan's repayment. The design calls it a "Fee" ("Fees of February", "Monthly Fee"), see Q-018.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | UUID | yes | |
| loanId | UUID | yes | → Loan |
| dueDate | Date | yes | monthly; due day pending Q-018 |
| amountDue | Money | yes | |
| paidAt | DateTime | no | absent while unpaid |
| lateFee | *pending Q-017* | | |

**State machine:**

```text
unpaid → paid
```

Overdue and partial payment: *pending Q-017, Q-019*.

### Transaction

A movement of money in or out of the Customer's Wallet.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | UUID | yes | |
| customerId | UUID | yes | → Customer |
| reference | String | yes | example "#200412312551"; uniqueness and format pending Q-038 |
| type | TransactionType | yes | |
| direction | Direction | yes | in or out |
| amount | Money | yes | |
| fee | Money | no | absent when no fee applies; what each fee is pending Q-033, Q-039 |
| counterpartyName | String | no | "From GCash", "To Apple Inc." |
| cashInChannelId | UUID | no | → CashInChannel, present only for cash-in |
| loanId | UUID | no | → Loan, present for disbursement and payment |
| occurredAt | DateTime | yes | |
| status | *pending Q-036* | | only completed transactions are designed |

### CashInChannel

A bank, e-wallet or over-the-counter partner through which the Customer adds money.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | UUID | yes | |
| name | String | yes | BPI, GCash, 7-Eleven... |
| kind | CashInChannelKind | yes | |
| logo | Image | yes | |
| maxTransactionAmount | Money | no | shown for over-the-counter partners; currency pending Q-002 |
| dailyLimit | Money | no | shown for BPI; which limits apply pending Q-032 |

Over-the-counter flow (reference code, waiting for payment): *pending Q-035*.

### Merchant

A partner store that sells products on instalments. *Whole entity pending Q-022.*

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | UUID | yes | |
| name | String | yes | Power Max Center, The Loop, I-Mac Center, Apple Inc., Nike Inc. |
| logo | Image | yes | |
| location | *pending Q-027* | | "Davao City, Davao del Sur" |

### Product

An item a Customer can buy on instalments. *Whole entity pending Q-022.*

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | UUID | yes | |
| name | String | yes | variant handling pending Q-029 |
| brand | String | yes | Apple, Jordan, Adidas |
| category | String | yes | Phone, Headphones, Apparel |
| images | Image list | yes | at least one |

### FinancingOffer

The terms under which a Merchant sells a Product on instalments. *Whole entity pending Q-022, Q-023.*

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| merchantId | UUID | yes | → Merchant |
| productId | UUID | yes | → Product |
| installmentAmount | Money | yes | "From $1,200" |
| termMonths | Int | yes | 12 (24 on catalogue cards) |
| totalPrice | Money | yes | "$1,800 total price"; inconsistent with amount × term (Q-023) |
| downPaymentRate | Rate | yes | 65% |
| interestRate | *pending Q-024* | | "0% Installment" vs "Low interest" |
| availability | *pending Q-026* | | "Limited Availability" |

### Notification

A message sent to the Customer. *In or out of the domain pending Q-042.*

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | UUID | yes | |
| customerId | UUID | yes | → Customer |
| title | String | yes | |
| body | String | yes | |
| category | *pending Q-042* | | "Announcement" |
| createdAt | DateTime | yes | |
| readAt | DateTime | no | absent while unread |

### Lender

*Pending Q-013.* The design has a "Lender" field with a "What is this?" link and the value "null". No fields can be derived.

## Value types

| Type | Definition |
| --- | --- |
| Money | Decimal amount + ISO 4217 currency. PHP is the dominant currency in the design; USD amounts appear and are unresolved (Q-002). Precision 2 decimals in most examples (Q-003) |
| Rate | Percentage with 2 decimals (1.99%, 2.99%, 3%, 65%). Period and basis (monthly, flat or declining) pending Q-006 |
| PhoneNumber | Country calling code + national number (+63 and +65 both appear, Q-004) |
| Address | line1, city, postalCode (country not collected) |

## Enums

| Enum | Values from evidence | Pending |
| --- | --- | --- |
| LoanStatus | `active`, `paid` | Q-014, Q-016 |
| InstallmentStatus | `unpaid`, `paid` | Q-017 |
| LoanPurpose | `educational` | Q-012 |
| TransactionType | `cash_in` ("Cash-In", "Added"), `loan_disbursement` ("Loan Amount"), `loan_payment` ("Paid Bills", "Paid this month") | Q-037 |
| Direction | `in`, `out` | Q-040 |
| CashInChannelKind | `bank`, `e_wallet`, `over_the_counter` | |
| CreditScoreBand | `good` | Q-044 |
| FaceMatchStatus | `matched` | Q-046 |

## Inventory coverage

Every `@Entity.field` in the inventory, and where it lands.

| Inventory field | Domain field |
| --- | --- |
| `@Customer.fullName`, `givenNames`, `familyName`, `dateOfBirth`, `address.*`, `signature`, `attestedAt` | Customer, same names |
| `@Customer.phoneNumber`, `@Customer.phoneCountryCode` | Customer.phone (PhoneNumber) |
| `@Customer.initials` | derived from fullName, not stored |
| `@Customer.accountType` | **not mapped**, pending Q-048 |
| `@Customer.preferredLocation` | **not mapped**, pending Q-027 |
| `@IdentityVerification.phoneOtp` | **not mapped on purpose**: a transient credential; only `phoneVerifiedAt` is domain data |
| `@IdentityVerification.selfieImage`, `idDocumentImage`, `faceMatchStatus` | IdentityVerification, same names |
| `@Wallet.balance` | Wallet.balance |
| `@CreditScore.value`, `band`, `scaleMin`, `scaleMax` | CreditScore, same names |
| `@CreditOffer.*` | CreditOffer, same names |
| `@InstallmentPlan.termMonths`, `interestRate`, `monthlyAmount` | InstallmentPlan; `monthlyAmount` renamed `installmentAmount` |
| `@Loan.principal`, `purpose`, `processingFeeRate`, `processingFee`, `netDisbursedAmount`, `interestRate`, `termMonths`, `status`, `closedAt` | Loan, same names |
| `@Loan.monthlyAmount` | Loan.installmentAmount |
| `@Loan.lender.name` | Loan.lenderId → Lender (pending Q-013) |
| `@Loan.merchant.name`, `@Loan.product.name` | Loan.merchantId, Loan.productId (pending Q-022) |
| `@Loan.outstandingBalance` | Loan.outstandingBalance (pending Q-021) |
| `@Installment.amountDue`, `dueDate` | Installment, same names |
| `@Transaction.amount`, `type`, `fee`, `occurredAt`, `reference`, `counterpartyName`, `direction` | Transaction, same names |
| `@Transaction.channel.name` | Transaction.cashInChannelId → CashInChannel.name |
| `@CashInChannel.kind`, `name`, `logo`, `maxTransactionAmount`, `dailyLimit` | CashInChannel, same names |
| `@Notification.*` | Notification (pending Q-042) |
| `@Merchant.name`, `logo` | Merchant |
| `@Product.name`, `brand`, `category`, `images` | Product |
| `@FinancingOffer.monthlyAmount`, `termMonths`, `totalPrice`, `downPaymentRate`, `availability` | FinancingOffer; `monthlyAmount` renamed `installmentAmount` |

Unmapped: 3 (`accountType`, `preferredLocation`, `phoneOtp`).

## Glossary

- **Borrowing limit:** the most a Customer can borrow, shown as "You can borrow up to". Per loan or in total: pending Q-009.
- **Cash-in:** adding money to the Wallet through a bank, an e-wallet or an over-the-counter partner.
- **Credit score:** the Customer's "trust score" on a 300 to 850 scale.
- **Down payment:** the share of a financed product's price paid up front (65% in the example).
- **Installment:** one monthly repayment of a Loan. The design calls it a "fee" ("Fees of March", "Monthly Fee"); the domain uses "installment" to avoid confusion with charges (pending Q-018).
- **Net disbursed amount:** what the Customer actually receives ("Total amount to Receive").
- **Over-the-counter:** cash paid at a partner store or pawnshop (7-Eleven, Cebuana Lhuillier, LBC, M Lhuillier).
- **Paid (loan):** shown for finished loans; assumed to mean fully repaid, pending Q-041.
- **Processing fee:** a percentage charge on a new Loan.

## Checkpoint

Not validated. Before Phase 3 a domain expert must answer at least Q-002, Q-006 to Q-009, Q-013, Q-014, Q-016, Q-019, Q-021 and Q-022, then validate this file and record it in the checkpoint log in `rules.md`.
