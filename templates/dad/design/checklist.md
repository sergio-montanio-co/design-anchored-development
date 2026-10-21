# Phase 0 · Design checklist

Owned by the designer. Complete it before handing the file to Phase 1. The Figma lint plugin re-checks the items marked *(lint)*.

**Design file:** <!-- link -->
**Screens in scope:** <!-- list or Figma page -->

## Data

- [ ] No lorem ipsum anywhere; every text uses realistic data *(lint)*
- [ ] Amounts show currency and decimals (`$12,500.00 MXN`)
- [ ] Dates show the real format users will see
- [ ] Long values are tested (long names, big amounts, empty optional fields)

## Naming

- [ ] Every dynamic layer is named `@Entity.field` (`@Loan.amount`) *(lint)*
- [ ] Fixed copy is prefixed `#static` *(lint)*
- [ ] Entity names are business words, not screen words

## States

- [ ] Empty state for every list *(lint)*
- [ ] Loading state for every screen that fetches data
- [ ] Error state for every screen and every form
- [ ] One frame per entity state (e.g. requested, approved, rejected)
- [ ] Components with states use variants (`LoanBadge / status=approved`)

## Rules and flows

- [ ] Every conditional element has an annotation ("visible only when balance is 0")
- [ ] Every validation rule on a form is annotated (min, max, format)
- [ ] Who can see or do each action is annotated when it depends on the user's role
- [ ] Screens are connected as a prototype flow, including error paths

## Sign-off

| Role | Name | Date |
| --- | --- | --- |
| Designer | | |
| Engineer | | |
