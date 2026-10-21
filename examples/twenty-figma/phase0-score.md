# Phase 0 score · Twenty Figma file

The `templates/dad/design/checklist.md` items scored against the "💼 Standard App" page (`478:19796`) of `Fy8iMPgT3Hp8l0BO0SDnZz`. This is a real product file that was never prepared for DAD, so the score shows how much a typical professional file gives an agent with no extra work.

**Summary: 1 pass · 7 partial · 7 fail · 1 not measurable** (16 items). The file is a well-built, real design system file, so its data and states are good. It fails almost everything DAD adds on top: field naming, annotations, and business states.

## Page facts

| Fact | Value | Source |
| --- | --- | --- |
| Nodes on the page | 24,623 | page-wide `get_metadata` |
| Default-named layers (`Frame 4163`, `Rectangle 25`, `Vector` …) | 1,564, about 6% | same |
| Component instances / hidden nodes | 11,140 / 7,400 | same |
| Sections | 37 | same |
| Text layers | 3,817: **3,509 (92%) have generic or style-like names** (`Label` ×1,040, `·` ×816, `Menu name` ×694, `small card title` ×313, `Name`, `Count`, `Description` …); **308 (8%) are named by their content** ("Send NDA to Steve Anavi", "edited 3 fields on") | same |
| Lorem ipsum | 0 | measured |
| `@Entity.field` layer names | 0 | measured |
| `#static` prefixes | 0 | measured |
| Layer names containing "empty" | 172, but only **8 are real empty-state frames**. The other 164 are layout fillers (`Empty spacer` ×122, `Empty last column cell` ×42) | measured |
| Layer names containing "loading" | 19: 5 state frames + 14 `LoadingIndicator` / `Loading` parts | measured |
| Layer names containing "error" | 1 (`Error 500` notification `32530:164356`) | measured |
| Annotation layers (annotation, note, spec, TODO, redline) | 0 (one layer named `Specifications`) | measured |
| Variant-style instance names (`prop=value`) on the page | 0. Variants exist in the library (e.g. `State=Default, Cell type=✏️ Text, Changed?=False`, `color=blue, size=16px, Background?=False`) but instance layer names do not expose them | component descriptions returned by `get_design_context` |
| Component descriptions | Present and good (e.g. `Navbar segmented control` explains its Smart Animate rules; the Text cell variant says "Only use this variant with: No relation chip, Tag") | `get_design_context` |

## Checklist

### Data

| Item | Score | Evidence |
| --- | --- | --- |
| No lorem ipsum; realistic data | **partial** | No lorem ipsum, and people, companies and emails are realistic (Alexandre Prot, alexandre@google.com, `P;6668:117325`). Generic placeholders take its place in several cells: "Simple text" in date columns (`P;6668:117327;3328:183243`, `C;100429:473393`), "Relation 1/2/3" (`C;100429:473392`), "API - Key name", "Workflow name" (`C;100429:473425`, `…473397`), and "small card title" / "Description" as the visible text of email, event and file cards (`…;119589:150370`, `119569:772318`). Values also contradict their columns (Linkedin "Sundar Pichai" on Alexandre Prot; Twitter "twenty.com", Q-008) |
| Amounts show currency and decimals | **partial** | ARR "$500,000" shows a currency symbol but no decimals or ISO code (`C;100429:473387`) |
| Dates show the real format | **partial** | Real formats are present ("Jun 12, 2023 3:13 pm", "25 days ago", "Wed 23", "2:30pm → 3:00pm"), but 12h and 24h clocks are mixed ("16:34", "18:30 → 19:30") and two date cells are placeholders |
| Long values tested | **pass** | Truncation is designed ("1316 Dameon Mou…", "Stewart Butter…", "anthropicrese…"), and empty optional fields appear (Thomas Kurian has no email or Twitter, `P;6668:117326`) |

### Naming

| Item | Score | Evidence |
| --- | --- | --- |
| Dynamic layers named `@Entity.field` | **fail** | 0 occurrences. Cells are named after their column in some tables (`Account Owner`, `ICP`, `Main contact` in `C;100429:473385…`), which helps, but those names are not reliable (next row) |
| Fixed copy prefixed `#static` | **fail** | 0 occurrences |
| Entity names are business words | **partial** | Components use object words (`Tables/People/Table`, `Tables/Companies/Table`, `Field Panel/Company Fields`). But copied layers keep **stale names**: the Tasks table is `Company table` with cells `Account Owner` / `Creation date` (`102294:450532`); File rows are frames named `Task` (`119569:772315`); People-table headers are named `Employees`, `Url`, `Address`, `Account Manager` over the columns Email, Company, Phone, Job Title (`P;6668:117324`). An agent that trusts layer names gets these wrong |

### States

| Item | Score | Evidence |
| --- | --- | --- |
| Empty state for every list | **partial** | 8 empty-state frames: Company timeline (`102308:203829`), Files (`102373:43835`), Tasks, Notes, Emails, inbox. No empty state for index tables in scope; Index `102294:358115` has an empty Body with no copy (Q-002) |
| Loading state for every screen that fetches | **partial** | Timeline, Emails, Notes tab, side panel and app loading frames exist (`102308:202374`, `Emails - Loading`, `Notes - Tab loading`, `App Loading`). None for index tables in scope |
| Error state for every screen and form | **fail** | Only one global `Error 500` notification. No validation or error states on the Email composer or the New Event form, and no failed-send state |
| One frame per entity state | **fail** | No entity status is drawn as states in scope. Task done/not done is only implied by a checkbox and a "completed" activity. Opportunity stages are not in scope |
| Components with states use variants | **partial** | The library uses variants heavily, but for presentation (cell type, color, size, active tab), not for business states. Instance names don't show the variant |

### Rules and flows

| Item | Score | Evidence |
| --- | --- | --- |
| Conditional elements annotated | **fail** | 0 annotations. Conditional behavior ("Not shared by Tim Cook" hides content; hover-only edit buttons) is shown but never explained |
| Validation rules annotated | **fail** | None (Email recipients, event dates, ARR range …) |
| Role-dependent actions annotated | **fail** | No role annotations. A "Record access (share popup)" section exists (`117216:133778`) but annotates nothing on these screens |
| Screens connected as a prototype flow | **not measurable** | The Figma MCP tools used here (`get_metadata`, `get_design_context`, `get_screenshot`) do not expose prototype reactions. One component description mentions a "Navigation QA prototype" |

## What helped the agent anyway

- **Sections and frame names are semantic:** "Show - Timeline", "Files - Empty", "Company - Timeline Loading", "Email composer". Finding the screens and their states took one page-wide metadata call.
- **Column-named cells in the Companies table** (`URL`, `Account Owner`, `ICP`, `ARR`, `Main contact`, `Opportunities`, `Creation date`) almost act as `@Company.*` names. When they are correct, they are the cheapest field list in the file.
- **Activity copy is plain text** ("edited 3 fields on", "imported … with 230 others from a CSV"), so the timeline vocabulary was readable without rendering anything.
- **Component descriptions** carry usage rules (a Text cell "Only use this variant with: No relation chip, Tag"). They are design-system rules, not business rules.

## What a DAD pass on this file would add first

1. Rename the dynamic text layers in the 6 row/cell components to `@Entity.field` (the 92% generic text-layer names are the main loss).
2. Replace "Simple text", "Relation N", "small card title" and "Label" with realistic values.
3. Add an error frame for the Email composer and New Event, plus an empty and a loading frame for each index table.
4. Add one annotation per hidden-content rule ("Not shared") and per role-dependent action.
