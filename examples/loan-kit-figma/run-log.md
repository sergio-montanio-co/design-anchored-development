# Run log · DAD Phases 0 to 2 on a Figma Community loan kit

**Date:** 2026-10-21
**Input:** Figma `HIyEGervvXLwpmt4CS3OPj`, "Loan Management and Fintech Mobile Design Kit" (user copy of a Community file). Brand inside the file: "lendly" / "Rayland". Philippine market (PHP, Davao City, GCash, Cebuana Lhuillier).
**Agent:** Claude, following `docs/methodology.md`, `templates/dad/rules.md`, `templates/dad/design/checklist.md`, `.claude/commands/dad-extract.md`, `.claude/commands/dad-domain.md`.
**Goal:** test whether an unprepared, third-party design can feed DAD, and measure how much the agent has to ask or guess.

## Outputs

| File | Phase | Content |
| --- | --- | --- |
| [`phase0-score.md`](phase0-score.md) | 0 | 16 checklist items: 0 pass, 5 partial, 11 fail (2.5/16) |
| [`dad/design/inventory.md`](dad/design/inventory.md) | 1 | 33 screens, 126 field rows mapped to `@Entity.field`, 0 states beyond the happy path |
| [`dad/design/open-questions.md`](dad/design/open-questions.md) | 1 | 54 open questions |
| [`dad/domain/domain.md`](dad/domain/domain.md) | 2 | 15 entities, 103 fields, 38 of them carry a `pending Q-xxx` decision; 8 enums; not validated |

## What I did

1. Read the methodology, rules, checklist and the two phase prompts. Used `examples/loans/` only for format, not content.
2. **Phase 0.** Combined the pre-measured lint facts (2,282 nodes, 22% default names, 0 lorem, 0 `@` layers) with what I saw on each screen, and scored every checklist item with node-level evidence.
3. **Phase 1.** Called `get_design_context` on 17 screens (Loan ×4, Home ×8, History ×2, Manage ×3). This gave real text and node ids. The Figma Starter plan then refused further `get_design_context` calls ("tool call limit on the Starter plan"). I switched to:
   - `get_screenshot` with `enableBase64Response` (the screenshot URLs return 403 through the sandbox proxy, so curl was not an option) for the done page, the Sitemap, the Components page, the Mockup page, the whole Pages canvas and the Product screen;
   - cropping the full-canvas screenshot locally to read the 10 Login/Register screens and 4 Shop screens;
   - one `get_metadata` on the Pages page (294 KB, saved to disk and filtered with grep/python) to get frame ids and the few text layers named after their content, plus `get_metadata` on Components to list symbols and variants.
4. Wrote the inventory screen by screen, with one question per ambiguity, contradiction or missing state.
5. **Phase 2.** Wrote the domain only from what the inventory proves; every undecided field or state is a `pending Q-xxx` placeholder. Checked that every inventory `@Entity.field` lands in the domain (3 do not, by design).

**Deliberate rule breaks**, both requested for this demo: `dad-extract` says to stop when the checklist is not signed off, and `dad-domain` says to stop while any question is `open`. I ran both phases anyway and marked the outputs as not validated.

## What was hard

1. **Nothing is named for the agent.** Text layers are named after type styles (`Headline` ×93, `input-text` ×59). Every one of the 126 field mappings was inferred from the visible value and its position, not read from a name. The methodology's central Phase 0 convention (`@Entity.field`) is fully absent, so extraction is interpretation, which is exactly the failure mode DAD is designed to avoid.
2. **The example data contradicts itself.** These are design-kit placeholders, not data from a real product. Found while reading:
   - ₱2,000 at 2.99%/month over 6 months shown as ₱982.12/month (≈ ₱5,893 total); no standard formula gives that (Q-007).
   - 3% processing fee on ₱2,000 shown as 150.00, and the customer still receives ₱2,000.00 (Q-008).
   - Interest 1.99% on the offer, 2.99% on the plan (Q-006).
   - Product financing "$1,200 × 12 months" with "$1,800 total price" and "65% Downpayment" (Q-023).
   - PHP and USD mixed; `1,2555 PHP` next to `1,255.00 PHP` for the same payment (Q-002, Q-003).
   - +63 and +65 phone codes; OTP sent to `******731` for a number ending in 255; Estonian ID card in a Philippine app (Q-004, Q-005).
   - Lender shown as the literal string `null`; a cash loan "From Apple Inc." (Q-013).
   - Cash-in via BPI confirmed as "From GCash"; wallet balance ₱2,500.00 on Home and ₱0.00 on cash-in (Q-030, Q-034).
   - The same transaction number on three unrelated transactions (Q-038).
   - "Mon, Aug 17" on an August 2023 calendar where the 17th is a Thursday (Q-043).
   - Initials "KB" for John Doe; product header "iPhone 12 Pro Max" over title "iPhone 15 Pro Max" (Q-048, Q-029).

   Each of these forced a question, because picking one side is a guess that would propagate into invariants.
3. **Only the happy path exists.** No empty, loading or error frame; no loan state besides "active" and "Paid"; no approval, rejection or overdue frame. The Loan state machine, the most important artefact of a lending domain, has 2 evidenced states and everything else is pending Q-014/Q-016.
4. **The core borrower action is missing.** There is no repayment screen at all, although the sitemap lists "Pay Loans" and notifications say "Tap to pay" (Q-019).
5. **Two products in one kit.** Cash loans (Loan tab) and buy-now-pay-later product financing (Shop: merchant, down payment, pick-up) overlap: loans in lists name a merchant and an iPhone. Whether they are one entity or two cannot be decided from the design (Q-022), and it changes every downstream phase.
6. **Tooling.** The Starter-plan MCP limit stopped high-fidelity reads after 17 screens. For the rest, text came from screenshots and node ids from metadata, so 10 Login/Register and Shop field rows cite a container id instead of the exact text layer. Prototype links could not be read through the MCP at all, so flows are inferred from canvas order and the static Sitemap.

## How much had to be guessed

| Measure | Value |
| --- | --- |
| Field mappings read from layer names | 0 of 126 (0%) |
| Field mappings inferred from visible text | 126 of 126 (100%), entity and field names proposed by the agent |
| Entity names present in the file | 0 (all 15 proposed by the agent) |
| Business rules annotated by the designer | 0 (13 rules found in on-screen copy) |
| Open questions | 54 for 33 screens (1.6 per screen); the worked `examples/loans` needed 2 |
| Domain fields with a pending decision | 38 of 103 (37%); whole entities pending: Merchant, Product, FinancingOffer (Q-022), Notification (Q-042), Lender (Q-013) |
| States evidenced | Loan 2, Installment 2, IdentityVerification 1 (success only), Transaction 1 |
| Guesses written as facts | none intended. Soft inferences that remain: direction from icons (arrow up = out, plus = in), read/unread from dot colour, grouping "Unpaid Loans" rows under Installment. All are marked with a question |

## Verdict

**Not usable as DAD input as-is.** The kit is a good visual kit: realistic-looking screens, a coherent Material 3 theme, Philippine market details, and a sitemap. As a source of truth for a domain it fails on all three things DAD needs from a design: names (no `@Entity.field`), states (happy path only), and rules (no annotations, and the example numbers contradict each other). Phase 1 still worked in the sense DAD intends: it did not invent a lending product, it turned the gaps into 54 precise, node-referenced questions. But a domain built on these answers would come from the business expert's answers, not from the design; the design would only contribute the screen inventory and the field list.

**What it is useful for:**
- A Phase 6 visual reference for a mobile client once the domain exists elsewhere.
- A demonstration of why Phase 0 exists: the same kit with `@` names, one frame per Loan state, an annotated repayment flow and consistent example numbers would cut the question list to roughly the business-policy ones (Q-006, Q-009, Q-012, Q-013, Q-014, Q-017, Q-044), which no design can answer anyway.

**Minimum to make it usable:** fix the example arithmetic and currency; name dynamic layers; add frames for loan requested, rejected, overdue and paid; design the repayment flow; decide cash loan vs product financing; annotate limits and fees. Then rerun Phase 1.

**Methodology feedback from this run:**
- `dad-extract` could add a "contradictions" category: in this kit most questions came from example values that disagree with each other, not from missing data.
- The inventory template has no place for "rules stated in copy" (not annotations, but still rules); I added it per screen.
- A Phase 0 lint should also check numeric consistency of example data (fee = rate × amount), which would have caught Q-007, Q-008 and Q-023 before extraction.
- The Figma MCP Starter-plan limit (about 17 high-fidelity reads here) is a practical constraint for real files; the methodology should mention exporting frames as a fallback.
