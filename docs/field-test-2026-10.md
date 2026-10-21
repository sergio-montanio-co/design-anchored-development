# Field test 1 · October 2026

The first time DAD ran on design files nobody wrote for it: two public Figma files, run by AI agents, with no human answering questions.

| | [Twenty CRM](../examples/twenty-figma) | [Loan kit](../examples/loan-kit-figma) |
| --- | --- | --- |
| What it is | Product design file of an open-source CRM | Free Figma Community UI kit for a lending app |
| Phases run | 0 to 3, blind | 0 to 2 |
| Phase 0 score (16 items) | 1 pass, 7 partial, 7 fail, 1 not measurable | 0 pass, 5 partial, 11 fail |
| Default-named layers | 6% | 22% |
| `@Entity.field` layers | 0 | 0 |
| Empty / loading / error frames | 8 real empty states, loading states, 1 global error | none |
| Entities found | 13 | 15 |
| Open questions | 40 | 54 |
| Graded against code | Yes: 11 / 11 entities, 44 / 55 core fields (80%) | No code exists |

## What worked

- **Questions instead of guesses.** Neither run invented a field it could not point to. In Twenty, every structural difference from the real model (composite name, multiple emails, polymorphic task targets) had already been raised as an open question.
- **The domain hub survives a messy design.** Twenty's layer names were often stale (a Tasks table named "Company table"), so the run trusted rendered text over layer names and still recovered 80% of the core model from 3 fully-read screens.
- **DAD finds design bugs before code.** The loan kit run found an instalment that does not match its rate, a 3% fee shown as 150.00 on 2,000.00, a "Lender: null" label and a "Pay Loans" sitemap entry with no screen. In a real project these reach development.
- **It catches design/code drift.** Twenty's design shows fields that are not in its standard model (`employees`, `icp`, an event editor with repeat and time zone).

## What did not

- **Figma read quotas.** A Starter plan with a View seat allows 20 MCP reads a month. Two runs exhausted it; only 3 of 31 Twenty screens were read with values.
- **Values hidden in components.** Structure alone shows `Field Panel/Company Fields` but not the fields inside it.
- **Text layers named after styles.** Both files name text layers "Headline", "Label", "Supporting text", so a layer name says nothing about the data. This is the strongest argument for `@Entity.field`.
- **Phase 0 was skipped, not enforced.** Both runs continued past a failed checklist because the goal was to measure. In real use, the loan kit would have stopped at Phase 0.

## Changes made to DAD after this test

1. Phase 1 now treats **contradictions** as a question trigger: numbers that do not add up, labels that disagree, sitemap entries with no screen.
2. The Phase 0 lint gains a **numeric consistency** check on example data.
3. Phase 1 lists **exported frames** as the fallback input when Figma API quotas run out, and the docs state the quota issue up front.
4. Phase 1 states the precedence rule: **rendered text beats layer names** when they disagree.

## Next

- Rerun Twenty with a Dev or Full seat (or exported frames) and grade all 31 screens.
- Fix the loan kit following its Phase 0 report, rerun Phase 1 and compare the question count.
