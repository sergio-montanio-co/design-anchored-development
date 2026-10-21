# Phase 0 score · Loan Management and Fintech Mobile Design Kit

Scored against [`templates/dad/design/checklist.md`](../../templates/dad/design/checklist.md) by the agent, not by the designer. In a real run this checklist is owned and signed by the designer; here it is a measurement of a third-party Figma Community file before Phase 1.

**Design file:** Figma `HIyEGervvXLwpmt4CS3OPj` ("Loan Management and Fintech Mobile Design Kit", user copy of a Community file; brand inside the file: "lendly", also "Rayland")
**Screens in scope:** page "Pages" (35:1096): sections Splash/Onboarding (265:2384), Login and Register (265:2385), Home (265:2390), Loan (265:2389), History (265:2386), Manage (265:2388), Shop (265:2387). Also read: Sitemap (27:138), Components (27:137), Mockup (194:5119).
**Scored:** 2026-10-21

**Measured facts (Pages page):** 2,282 nodes; 22% default-named layers (`Frame 252`, `Frame 95`...); 0 lorem ipsum; 0 `@`-named layers; 0 `#static` layers; text layers are named after type styles (`Headline` ×93, `Overline` ×60, `input-text` ×59, `supporting-text` ×45) and almost never after content; 36 layers contain "status" (all are the iOS `Status Bar`), 2 contain "success", none contain empty, loading or error; 1 component set with variants (`Navbar=Default|loan-nav|shop-nav|history-nav|manage-nav`, 71:1631). No annotation layers, no comments found.

Legend: **pass** · **partial** · **fail**

## Data

| # | Item | Result | Evidence |
| --- | --- | --- | --- |
| D1 | No lorem ipsum; every text uses realistic data *(lint)* | **partial** | Lint part passes (0 lorem). Realism fails in places: lender shown as the literal string `null` (81:7759); address `Somewhere IN BLOCK 12` (131:2010); all 6 notification bodies are the same due-date text, including the survey item "Got a minute to help us out?" (124:1791); 3 identical rows in every list (196:1722, 196:2070, 196:2082); typos `Fees of febuary` (196:1732), `si already` (139:1326) |
| D2 | Amounts show currency and decimals | **partial** | Most amounts are PHP with 2 decimals (`₱ 30,000.00` I225:4444;77:4918, `1,255.00 PHP` 93:27171). Broken cases: `1,2555 PHP` (196:1735, 93:26366), `₱1500.00` without separator (72:3736), `₱1,200` without decimals (117:1030), `-150.00` without currency (81:7750). Four currency notations for the same money (`₱`, `PHP` prefix, `PHP` suffix, `$`). USD appears on OTC limits (`$5,000`, 93:27463), the product screen (`$1,200`, 91:20362), Shop price filter (`$500 - $1000`) and the Balance-card component (`$ 400.00`, 77:3883) |
| D3 | Dates show the real format users will see | **partial** | At least five formats: `Jul 15, 2024 9:12 AM` (223:3037), `02/08/2024` (196:1810, DD/MM vs MM/DD ambiguous), `Mar 8` (123:1765), `Mon, Aug 17` with calendar `August 2023` (I225:4650;143:16444, 143:16447) where Aug 17 2023 is a Thursday, `9:07 AM` (93:26178). Year mixes 2023 and 2024 |
| D4 | Long values are tested (long names, big amounts, empty optional fields) | **fail** | No long names or large amounts; no frame with an empty optional field. Lists are copies of one row |

## Naming

| # | Item | Result | Evidence |
| --- | --- | --- | --- |
| N1 | Every dynamic layer is named `@Entity.field` *(lint)* | **fail** | 0 `@` layers. Dynamic text is named after type styles (`Headline`, `input-text`). A few layers are named after their content (`$1,200` 91:20362, `Apple iPhone 15 Pro Max 256GB, Rose Gold` 91:20365), which still says nothing about the field |
| N2 | Fixed copy is prefixed `#static` *(lint)* | **fail** | 0 `#static` layers. Static copy and data are indistinguishable by name |
| N3 | Entity names are business words, not screen words | **fail** | Frames are named after screens (`Loan screen - form`, `Succesfull Transaction - Page`) or defaults (`Frame 259`); components after UI parts (`Balance-card`, `Info-container`). No business entity name appears in any layer |

## States

| # | Item | Result | Evidence |
| --- | --- | --- | --- |
| S1 | Empty state for every list *(lint)* | **fail** | None for Unpaid Loans (72:3739), Active loans (196:1721), History (93:25981), Notifications (123:1601), Recommended (119:1170) |
| S2 | Loading state for every screen that fetches data | **fail** | None |
| S3 | Error state for every screen and every form | **fail** | None: no failed OTP, face mismatch, unreadable ID, loan rejected, over-limit amount, failed cash-in or wrong password frame |
| S4 | One frame per entity state | **fail** | Only the happy path. Loan states visible only as text: "Present" vs "Recent Loans"/"Paid" (196:1719, 196:1814) and "Unpaid Loans" (72:3302). No pending, rejected, overdue or failed frames |
| S5 | Components with states use variants | **fail** | The only variant set is navigation (`Navbar=*`, 71:1631). No status badge, chip or card has variants; the `Chip-category` component (88:18918) is reused for transaction categories without a property |

## Rules and flows

| # | Item | Result | Evidence |
| --- | --- | --- | --- |
| R1 | Every conditional element has an annotation | **fail** | 0 annotations in the file. Mockup page (194:5119) is marketing photos only |
| R2 | Every validation rule on a form is annotated | **partial** | No annotations, but three rules appear as on-screen helper text: password "At least 9 characters, containing a letter and a number" (181:2281), "BPI's max limit is ₱10,000.00 per day" (93:27740), OTC "Max. Transaction amount $5,000" (93:27463). Loan amount, term, purpose, personal details have no rules |
| R3 | Who can see or do each action is annotated when it depends on role | **fail** | Only the borrower app exists; no roles or back office. Lender, merchant and approver are referenced in copy but never designed |
| R4 | Screens are connected as a prototype flow, including error paths | **partial** | A Sitemap page exists (27:138) with five tabs and their sub-areas, but it is a static diagram. Prototype links could not be read through the Figma MCP; screen order on the canvas implies flows (Login 196:2165 → ... → done 181:2290). No error paths. Sitemap items with no screen: "Pay Loans", "Wallet", "Preview Pending Loans", "Customer Support", "Calendar" (only as overlay) |

## Score

| Result | Count |
| --- | --- |
| pass | 0 |
| partial | 5 (D1, D2, D3, R2, R4) |
| fail | 11 (D4, N1, N2, N3, S1, S2, S3, S4, S5, R1, R3) |

Weighted (pass = 1, partial = 0.5): **2.5 / 16 (16%)**. Every lint-checkable item except "no lorem ipsum" fails.

## Sign-off

| Role | Name | Date |
| --- | --- | --- |
| Designer | not signed (third-party Community kit) | |
| Engineer | not signed | |

**Gate decision:** under DAD rules this file does not pass Phase 0 and Phase 1 should not start. Phase 1 and 2 were run anyway, on purpose, as a stress test of the methodology on an unprepared design (see [`run-log.md`](run-log.md)).
