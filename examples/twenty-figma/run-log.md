# Run log · DAD blind run on the Twenty Figma file

**Date:** 2026-10-21 · **Agent:** Claude (subagent) · **Input:** Figma `Fy8iMPgT3Hp8l0BO0SDnZz`, page "💼 Standard App" (`478:19796`) · **Blind:** no source code, docs, website or web search about the product. The only web request was Figma's own MCP rate-limit page, fetched to diagnose the quota.

## TL;DR

Phases 0-3 were produced, and `dad-check` passes (0 errors). Phase 1 coverage is **partial**: the Figma account is on the **Starter plan with a View seat, which allows 20 MCP read calls per month**. The quota ran out after reading 3 of the 31 screens at text depth. The other 28 were extracted from a page-wide `get_metadata` dump, which has layer and text-layer names but no values inside component instances. As a result, the domain is reliable for **Company** and **Person**, plausible for **Email**, **CalendarEvent**, **Activity**, **Task** and **Note**, and thin for everything else. 40 open questions remain.

## What I did

1. Read the methodology, `rules.md`, the checklist, the three phase prompts and the loans example.
2. **Figma calls (23 in total):**

   | # | Tool | Node | Result |
   | --- | --- | --- | --- |
   | 1 | get_design_context | `102294:358115` (whole Index) | OK, truncated inline: the sidebar alone fills the 25k-token limit. Body empty |
   | 2-3 | get_screenshot | `102294:353645` | URL not downloadable (proxy 403); base64 OK |
   | 4 | get_metadata | `102294:353645` | OK, found `Tables/People/Table` |
   | 5 | get_design_context | People table instance | OK (193k chars, saved to file, parsed with a script) |
   | 6 | get_screenshot | `102294:346940` | OK |
   | 7-8 | get_screenshot | `102294:349175`, `109702:183911` (in parallel) | **quota** |
   | 9 | whoami | – | Starter plan, View seat |
   | 10 | get_metadata | `102294:349175` | OK |
   | 11-13, 16 | get_design_context | Companies table / screen | "unexpected error" ×4 (node too large, server side) |
   | 14 | get_screenshot | `102294:349175` | OK |
   | 15 | get_metadata | Companies table | OK (cell names per column) |
   | 17-20 | get_design_context | 2 headers, 2 cells | OK ("Employees", "Opportunities", "Relation 1/2/3", "Simple text") |
   | 21-23 | get_screenshot / get_design_context | `109702:183911`, Company Fields panel | **quota**, also after waiting 60 s |

   The early quota errors (calls 7-8) and a shared `tool-results` folder full of renders from an unrelated lending-app file show that **another agent was spending the same account's quota at the same time**. I did not use any of its outputs.
3. **The page-wide metadata dump.** A `get_metadata` result for the whole Standard App page (4.4 MB, 24,623 nodes) was already in this session's tool-results folder, fetched earlier by the parent session to measure the Phase 0 facts. I did **not** call `get_metadata` on the page myself. Once my quota ran out, I parsed that file with a script (`sub.py`, kept in the scratchpad, not in the repo) to get the structure and plain text layers of every screen in scope. It reveals timeline verbs, task and note titles, note bodies, email bodies, empty-state copy and form row labels. It does not reveal values inside instances: table cells, field panels, menus.
4. Wrote `phase0-score.md`, `dad/design/inventory.md`, `dad/design/open-questions.md`, `dad/domain/domain.md`, `dad/contracts/schema.graphql`, 10 operation files and empty `invariants.yaml` / `policies.yaml`.
5. `node scripts/dad-check.mjs --dad examples/twenty-figma/dad`: the first run found a real type conflict (`title` is `String!` on Note/Task but `String` on CalendarEvent inside the `ActivitySubject` union selection). I fixed it with an alias in the operation, not in the schema. Final run: **0 errors, 1 warning** (`NotAuthorized` is not referenced by a policy yet, which is expected before Phase 4b).

About 60 tool calls in total, 23 of them to Figma (14 successful reads).

## Coverage

| Depth | Screens |
| --- | --- |
| Text (values read) | Index People `102294:353645`, Index Companies `102294:349175`, Index Companies scrolled `102294:346940`, plus the sidebar and top bar from `102294:358115` |
| Structure only | the other 27 frames in scope: 5 Index variants, Expanded Cell, 9 Show-Timeline frames, Tasks ×3, Note side panel, Files ×2, Emails tab, Email composer, Calendar ×3, Filter ×2 |
| Not read | menu item labels (Filter, Sort, Options/Fields, Options/GroupBy), field-panel contents on every record page |

## How much was guessed

13 entities, 69 non-id fields:

| Confidence | Fields | Which |
| --- | --- | --- |
| **Seen with a value** | 23 (33%) | Company ×12 (2 of them placeholder values), Person ×9, Favorite record/folder (sidebar) |
| **Seen as a label, verb or text layer, no value** | 29 (42%) | Email (from, to, cc, bcc, subject, text, sentAt, visibility), CalendarEvent (12 form rows + visibility), Task title/body, Note title/body, File name, Activity kind/happenedAt/details, View name |
| **Inferred from indirect evidence** | 17 (25%) | TeamMember as an entity (from Account Owner avatars + "Team Member" cell type), Task.status (checkbox + "completed"), Task.assignee ("has been assigned to"), every `companies` / `company` link on Task, Note, EmailThread, CalendarEvent, File, Activity and Opportunity (they appear on a Company's tabs), Email.owner ("Not shared by Tim Cook"), Activity.actor/subject (chip positions), View.objectName, and the enum values ActorSource CALENDAR/EMAIL (icons only) |

Mutations carry more guesswork than fields: `createCompany`, `createPerson`, `updateCompany`, `sendEmail`, `createCalendarEvent`, `renameFile`, `addFavorite` and `completeTask` come from visible buttons or controls. `assignTask`, `deleteTask`, `updateNote` and `deleteNote` come only from timeline verbs. All input shapes (which fields are editable) are assumptions.

**Things I deliberately left out** because the design never shows them, even though a CRM "usually" has them: opportunity amount, stage and close date; task due date; person first/last name split; company and person deletion; comments as an entity; custom fields; roles. Each one has a question (Q-035, Q-031, Q-005, Q-037, Q-036, Q-019, Q-039).

## What was hard

1. **The quota, by far.** 20 read calls a month is not enough to read 31 screens, especially when one large node fails and burns a call. A real DAD run on a Starter/View seat needs exported frames or a higher plan. Phase 1 should plan its calls up front: one page-wide metadata call, then design context only on the leaf components that hold values.
2. **Output size.** `get_design_context` on a whole screen is dominated by the sidebar (it overflowed the 25k-token inline limit), and on the 14-row Companies table it fails outright. The usable unit is "one table instance" or smaller.
3. **Values live inside instances.** The structure dump names every frame but hides almost every value, so an agent sees `Field Panel/Company Fields` and not the fields. With `@Entity.field` names on the inner text layers, the single metadata call would have been enough for most of Phase 1. This is the strongest argument for the Phase 0 naming convention that this run produced.
4. **Stale layer names lie.** The Tasks table is called "Company table" with "Account Owner" cells, file rows are called "Task", and People-table headers are named "Employees/Url/Address". A literal reading of layer names gives wrong fields, so I trusted rendered text over layer names whenever both were available.

## Where the design was ambiguous

- The breadcrumb says "Companies" over a People table (Q-001). Counts don't match rows (Q-003).
- Sample data contradicts its columns (Q-008), so I used no value to infer a format unless it was consistent across rows.
- "Holdings" on the Company page could be subsidiaries, investments or anything else (Q-016).
- Account owners are almost certainly workspace users, but the design never says so (Q-010).
- Email and event visibility ("Not shared by Tim Cook") is clearly a rule, and the most interesting business rule in scope, but its scope (message, thread or account) is unknown (Q-020).

## Next steps if this run continues

1. Get quota (a Dev/Full seat or exported PNGs), then read: Company Fields panel, Tasks table header, Options/Fields and Filter menus (Q-030, Q-034), the Opportunities index (Q-035).
2. Have someone who knows the product answer the 40 questions, then re-run Phase 2.
3. Phase 4 candidates already visible: email and event content hidden when NOT_SHARED (an invariant or a policy), Task completion transitions, CalendarEvent `endsAt >= startsAt`.
