# Design inventory · Twenty (Figma, blind run)

Phase 1 output. Extracted by the agent from the Figma file only, not reviewed by a designer.

**Source:** Figma file `Fy8iMPgT3Hp8l0BO0SDnZz`, page "💼 Standard App" (`478:19796`), read on 2026-10-21
**Generated:** 2026-10-21

## How to read this file

**Coverage is partial**, because the Figma MCP quota ran out partway through the run (see `../../run-log.md`). Every section says how deeply it was read:

| Depth | Meaning |
| --- | --- |
| **Text** | Real text values read with `get_design_context` and/or a rendered screenshot |
| **Structure** | Only layer names and text-layer names from a page-wide `get_metadata` dump. Values inside component instances (most field values) are **not visible** at this depth |

**Node ids.** The cells sit deep inside instances, so their full ids are long (`I<screen>;<instance>;…;<leaf>`). Each section defines a short prefix (`P`, `C`, …), and a citation such as `P;6668:117325;8245:130294` means that full id. A citation with no prefix is a top-level node id.

**Entity names** are the design's own words (Companies, People, Tasks, Notes, Files, Emails, Calendar, Opportunities, Team Member, Activity). `@Entity.field` names were assigned by the agent, because the file has no `@` layer names.

---

## Shared chrome (every Index and record page)

**Depth:** Text (`102294:358115`, via `get_design_context`)

Sidebar `I102294:358115;96495:287710`. It is the same on every screen, so it is listed once.

| Field | Maps to | Example | Notes |
| --- | --- | --- | --- |
| Workspace name | `@Workspace.name` | Apple | `…;23229:62076`. The logo is an image |
| Favorites section | `@Favorite.target` | "Stripe · Company", "Brian Chesky · Person", "Send NDA to Google · Task", "All Companies" (a view), "Page Layout" | `…;93352:299432`. Mixes records, a view and a page layout |
| Favorite folder | `@Favorite.folder`? | Best leads | `…;93352:339321;32432:101340`. Folds open to show its children. See Q-021 |
| Object list | object types | Companies, People, Opportunities, Tasks, Notes | `…;93352:366557` |
| Other items | – | "Sales Dashboard · Dashboard", "Claude", "Stripe" (with a chevron) | Dashboards and the other items are out of scope (Q-022) |
| Breadcrumb | object / view name | Companies | `I…;96495:287712;59329:218268` |

| Action | Trigger | Leads to | Condition (annotation) |
| --- | --- | --- | --- |
| New Record | button `59329:227556` | new row or record (no frame in scope) | none |
| Previous / Next record | icon buttons `59329:236539` / `59329:236540` | adjacent record | none |
| Command menu | `⌘K` button `59329:207474` | out of scope | none |

---

## Screen: Index · People table (`102294:353645`)

**Purpose:** list People records in a table view.
**Depth:** Text (screenshot + `get_design_context` of the table)
Prefix `P` = `I102294:353645;96495:287713;102294:437600` (`Tables/People/Table`). Header row `P;6668:117324`, first data row `P;6668:117325`.

### Dynamic fields

| Field | Maps to | Example | Node (header / row 1 cell) | Notes |
| --- | --- | --- | --- | --- |
| People (first column) | `@Person.name` | Alexandre Prot | `…;6377:116029` / `P;6668:117325;2985:100462` | Avatar or initial ("T" for Thomas Kurian). One string: first/last split unknown (Q-005) |
| Email | `@Person.email` | alexandre@google.com | `…;6377:116030` / `P;6668:117325;8245:130294` | Component `Cells/Default/📨 Email`. Empty for Thomas Kurian (optional) |
| Company | `@Person.company` | Google | `…;6377:116031` / `P;6668:117325;2985:100533` | Chip with logo, so a relation to Company |
| Phone | `@Person.phone` | (920) 948-1722 | `…;6377:116032` / `P;6668:117325;8245:135117` | `Cells/Default/☎️ Phone`. US format, no country code (Q-006) |
| Job Title | `@Person.jobTitle` | CEO, Founder, Partner | `…;6377:116033` / `P;6668:117325;2985:100609` | Free text |
| Linkedin | `@Person.linkedin` | "Sundar Pichai" | `…;6377:134104` / `P;6668:117325;6377:107098` | `Chip/Link`. Shows a label, never a URL (Q-007). Row 1's label is another person's name (Q-008) |
| Twitter | `@Person.twitter` | @alex_prot | `…;6377:134161` / `P;6668:117325;6377:110751` | `Chip/Link`. Empty for Thomas Kurian |
| Created at | `@Person.createdAt` | Jun 12, 2023 3:13 pm | `…;6377:134372` / `P;6668:117325;2985:100621` | Row 3 shows the placeholder "Simple text" (`P;6668:117327;3328:183243`) |
| View name + count | `@View.name`, record count | All · 9 | `I102294:353645;96495:287713;102294:437599` | Only 8 rows are drawn (Q-003) |

### States shown

- [ ] Empty
- [ ] Loading
- [ ] Error
- Row selection: row 3 (Roelof Botha) is checked and highlighted (`P;6668:117327`)

### Actions

| Action | Trigger | Leads to | Condition (annotation) |
| --- | --- | --- | --- |
| Select rows | checkbox per row + header checkbox | bulk actions (not in scope) | none |
| Add column | "+" in the header (`Add column`) | field picker (not in scope) | none |
| Filter / Sort / Options | view bar | Filter Menu, Sort Menu, Options Menu | none |

### Annotated rules

- None. The file has no annotation layers.

### Open questions

- Q-001 (breadcrumb says "Companies" over a People table), Q-003, Q-005, Q-006, Q-007, Q-008

---

## Screen: Index · Companies table (`102294:349175`)

**Purpose:** list Company records with their commercial fields.
**Depth:** Text for visible columns (screenshot). Columns past the right edge were read cell by cell with `get_design_context`.
Prefix `C` = `I102294:349175;96495:287713;102294:442017` (`Tables/Companies/Table`). Headers `C;100429:473367…473379`, row 1 (Anthropic) `C;100429:473381…473393`.

### Dynamic fields

| Field | Maps to | Example | Node (row 1 unless stated) | Notes |
| --- | --- | --- | --- | --- |
| Companies (first column) | `@Company.name` | Anthropic | `C;100429:473381` | Logo chip |
| Url | `@Company.url` | anthropic.com | `C;100429:473382` | Rendered as a link chip: a bare domain, no scheme |
| Created By | `@Company.createdBy` | Jeff Williams | `C;100429:473383` | Actor with a source icon, see the table below |
| Address | `@Company.address` | San Francisco, CA | `C;100429:473384` | Elsewhere a street ("1316 Dameon Mou…", `102294:346940`). Composite? (Q-009) |
| Account Owner | `@Company.accountOwner` | Phil Schiller | `C;100429:473385` | Avatar chip of a workspace member (Q-010) |
| ICP | `@Company.icp` | True / False | `C;100429:473386` | Boolean shown as ✓ True / ✗ False |
| ARR | `@Company.arr` | $500,000 | `C;100429:473387` | USD symbol, no decimals (Q-011) |
| Linkedin | `@Company.linkedin` | "anthropicrese…" (truncated) | `C;100429:473388` | Link chip label |
| Twitter | `@Company.twitter` | @slack, twenty.com | `C;100429:473389` (values from `102294:346940`) | Holds both handles and domains (Q-008) |
| Main contact | `@Company.mainContact` | Stewart Butterfield | `C;100429:473390` (values from `102294:346940`) | Person chip with avatar |
| Employees | `@Company.employees` | 3,3…, 8…, 9,9… (truncated) | header `C;100429:473377` (verified "Employees"), cell `C;100429:473391` | Integer with a thousands separator |
| Opportunities | `@Company.opportunities` | "Relation 1", "Relation 2", "Relation 3" | header `C;100429:473378`, cell `C;100429:473392` | Placeholder chips. A to-many relation |
| Creation date | `@Company.createdAt` | "Simple text" | `C;100429:473393` | Placeholder. The People table calls the same concept "Created at" (Q-012) |
| View name + count | `@View.name` | All Companies · 9 | view bar | 14 rows are drawn (Q-003) |

**Created By sources seen** (icon + label, column `…473383` per row; rows read from the screenshot):

| Row | Cell | Label | Icon |
| --- | --- | --- | --- |
| Anthropic, Google, Stripe, … | `C;100429:473383` | Jeff Williams, Tim Cook, Katherine Adams … | member avatar |
| NVIDIA | `C;100429:473495` | Phil Schiller | blue calendar icon reading "31" |
| GitHub | `C;100429:473439` | Jeff Williams | blue mail-app icon |
| Notion | `C;100429:473425` | API - Key name | "API" badge |
| Figma | `C;100429:473397` | Workflow name | gear icon |
| SpaceX | `C;100429:473551` | System | robot icon |
| Slack | `C;100429:473411` | Import | "CSV" badge |

### States shown

- [ ] Empty
- [ ] Loading
- [ ] Error
- Cell edit: `102294:346940` shows an Address cell with an edit outline ("1162 Sammy Creek")
- Hover affordance on cells: copy and pencil buttons (`Button/IconGroup` inside `C;100429:473392`, opacity 0)

### Actions

| Action | Trigger | Leads to | Condition (annotation) |
| --- | --- | --- | --- |
| Edit cell | pencil on hover / click | inline editor | none |
| Copy cell | copy icon on hover | clipboard | none |
| New Record | page action | new Company | none |
| Filter by Account Owner | Filter menu | `93302:194332` | none |

### Open questions

- Q-003, Q-008, Q-009, Q-010, Q-011, Q-012, Q-013

---

## Screen: Index · Companies variants (`102294:346940`, `109702:183911`, `102294:355880`, `102294:344705`, `102294:342470`, `102294:358115`)

**Depth:** Text for `102294:346940` (screenshot). Structure only for the rest.

| Node | What differs | Evidence |
| --- | --- | --- |
| `102294:346940` | Same table scrolled right, view "All records · 9". Shows Twitter, Main contact and Employees values. Address cell in edit mode | Screenshot. Rows are frames named `Company Table Item` with cells `URL`, `Account Owner`, `Address`, `ICP`, `ARR`, `Linkedin`, `Twitter`, `Main contact`, `Opportunities`, `Creation date` (`102294:440401…440413`) |
| `109702:183911` | Companies table with a **record side panel** open. Tabs `Timeline`, `Timeline`, `Tasks`, `Notes`, `Files`, `Emails`, `Emails` (`109702:188467`). Sections `Holdings`, `Section`, `People` (`109702:188479`, `…188483`, `…188487`) | Structure |
| `102294:355880` | Companies table with the sidebar collapsed (`Expand navigation` visible) | Structure |
| `102294:344705`, `102294:342470` | Companies table. The difference could not be seen at structure depth | Structure (Q-014) |
| `102294:358115` | Empty `Body` slot under the breadcrumb "Companies" | `get_design_context`: no children in Body (Q-002) |

---

## Screen: Expanded Cell (`27081:70136`)

**Depth:** Structure. Five `Tag` instances (`27081:70137`, `…70138`, `…70141`, `…70143`, `…70145`): a multi-value cell expanded beyond its column width. Values and field unknown (Q-015).

---

## Screen: Company record · Record & relations (`102308:204799`, `102308:203344`)

**Purpose:** one Company with its fields, its related records and an activity timeline.
**Depth:** Structure (field values sit inside instances and were not readable).

### Dynamic fields

| Field | Maps to | Example | Node | Notes |
| --- | --- | --- | --- | --- |
| Fields widget | Company fields | – | `Field Panel/Company Fields` `…;119576:803279` | Contents not readable |
| Holdings widget | `@Company.holdings`? | – | `Holdings` `…;119576:803321` with one `Field Panel/Relation Card` | Target entity unknown (Q-016) |
| Opportunities widget | `@Company.opportunities` | – | `Opportunities` `…;119576:803497`, 1 relation card | |
| People widget | `@Company.people` | count badge | `People` `…;119576:803673`, `Count` `117615:28221`, 2 relation cards | Company has many People |
| Timeline month header | `@Activity.happenedAt` (grouped) | July | `…;119576:804044` | |
| Activity line | `@Activity.kind` + actor + target | "edited 3 fields on", "linked … to …", "updated … → …", "was created by", "imported … from a CSV", "imported … with 230 others from a CSV" (`102308:203344`), "was created from … emails" | `…;119576:804053`, `…804070`, `…804101`, `…804114`, `…804125`, `…804137` | Actor and target are chips (values not readable) |
| Activity time | `@Activity.happenedAt` | 25 days ago, 23 days ago, 42 days ago | `…;119576:804057`, `…804076`, `…804117` | Relative time |
| Field diff | changed values | `Cells/Inline/Tag`, `Cells/Inline/Text`, `Cells/Inline/Relation` | `…;119576:804063…804065` | "edited 3 fields" shows the three new values |
| Linked record card | linked record | `Kanban/Card` | `102308:203344` variant | A linked record is shown as a card |

### States shown

- [x] Empty: `102308:203829` "Add your first Activity" / "There are no activities associated with this record." (`…;119554:784881`, `…784882`), with three `Button/GroupItem` actions (`Action -> Notes` `…;119554:784883`)
- [x] Loading: `102308:202374` timeline skeleton (`LoadingIndicator` `…;119576:145744`)
- [ ] Error

### Actions

| Action | Trigger | Leads to | Condition (annotation) |
| --- | --- | --- | --- |
| Open timeline entry | `Button/Icon` on an activity line | detail (not in scope) | none |
| Create first activity | 3 buttons in the empty state | Note / Task / … (labels not readable) | none |

### Open questions

- Q-016, Q-017, Q-018

---

## Screen: Company record · Notes & tasks timeline (`102308:202859`, `102308:200919`, `102308:201404`)

**Depth:** Structure (activity texts are plain text layers, so they are readable).

| Field | Maps to | Example | Node | Notes |
| --- | --- | --- | --- | --- |
| Note title | `@Note.title` | Intro strategy for Qonto | `…;119576:788626` | |
| Note activity verb | `@Activity.kind` | created, edited, commented, deleted | `…;119576:788660`, `…788648`, `…788636`, `…788624` | |
| Task title | `@Task.title` | Send NDA to Steve Anavi; Call back Steve about Qonto pricing | `…;119576:788679`, `…788715` | Shown next to a `Checkbox` (`…788678`) |
| Task activity verb | `@Activity.kind` | created, Edited, has been assigned to, completed, deleted, commented | `…;119576:788737`, `…788725`, `…788713`, `…788701`, `…788689`, `…788677` | "completed" implies a done state. "has been assigned to" implies an assignee |
| Activity time | `@Activity.happenedAt` | 28 secs ago, 10 mins ago, 16:34 | `…;119576:788628`, `…788681`, `…788717` | Mixes relative times and 24h clock times |
| Other Fields card | Company custom fields? | cell types Multi Select, Multi Relation, Link/Phone/Email, Team Member, Text, Boolean, More | `102308:201404` › `Other Fields` `…;119589:828276`, cells `…828287…828293` | Field names not readable (Q-019) |

States: no empty or loading state for this tab inside these frames (they exist in other sections, see Phase 0).

---

## Screen: Company record · Emails timeline (`102308:201889`)

**Depth:** Structure

| Field | Maps to | Example | Node | Notes |
| --- | --- | --- | --- | --- |
| Activity verb | `@Activity.kind` | Received a message from, received an email from, replied to, received a reply from, sent an email to | `…;119589:150359`, `…150383`, `…150405`, `…150417`, `…150429` | |
| Participants | `@Email.participants` | stanav@qonto.com, alex@qonto.com, kath@apple.com | `…;119589:150372…150374` | Email addresses |
| Subject | `@Email.subject` | "small card title" | `…;119589:150370` | Placeholder layer name |
| Body preview | `@Email.text` | "Description" | `…;119589:150400` | Placeholder |
| Visibility | `@Email.visibility` | Not shared by Tim Cook | `…;119589:150378` | The owner decides whether the content is shared (Q-020) |

---

## Screen: Company record · Calendar timeline (`102308:204314`)

**Depth:** Structure

| Field | Maps to | Example | Node | Notes |
| --- | --- | --- | --- | --- |
| Activity verb | `@Activity.kind` | has been invited to an event; created an event | `…;119583:148258`, `…148331` | |
| Event day | `@CalendarEvent.startsAt` | Wed 23 | `…;119583:148269`, `…148270` | |
| Event time range | `@CalendarEvent.startsAt/endsAt` | 2:30pm → 3:00pm | `…;119583:148280` | 12h clock here, 24h in the composer |
| Event title | `@CalendarEvent.title` | "small card title" | `…;119583:148274` | Placeholder |
| Attendee avatars | `@CalendarEvent.participants` | – | `avatars` `…;119583:148275` | |
| Visibility | `@CalendarEvent.visibility` | Not shared | `…;119583:148303` | Title hidden when not shared |

---

## Screen: Company record · Emails tab (`102373:15693`)

**Depth:** Structure

| Element | Node | Notes |
| --- | --- | --- |
| Pinned actions: Send Email, Ask AI, Add to Favorites, Navigate to previous Company, Navigate to next Company | `…;119565:765691…765695` | Record-level actions |
| Widgets: Fields, Relations, Emails | `Widgets/Content/Fields`, `Widgets/Content/Relations`, `Emails` `…;119565:767910` | Values not readable |

---

## Screen: Email composer (`110059:366941`)

**Purpose:** write a new email or a reply, and read a thread.
**Depth:** Structure

| Field | Maps to | Example | Node | Notes |
| --- | --- | --- | --- | --- |
| To | `@Email.to` | two recipient chips | `Composer Field Row / To` `114001:663287`, chips `114001:663304`, `…663305` | Removable chips |
| Cc, Bcc | `@Email.cc`, `@Email.bcc` | – | `114001:663426`, `114001:663440` | Shown in the third variant `110059:367827` |
| From | `@Email.from` | – | row `Composer Field Row / Cc/Bcc, From` `114001:663413` | Sender account (Q-020) |
| Subject | `@Email.subject` | "Subject" | `114001:663338` | Field label only |
| Body | `@Email.body` | rich text: H1, H2, H3, paragraph, numbered and bulleted lists, quote, image, divider | `110059:367749…367768` | Rich text |
| Thread message body | `@Email.text` | "Hi Steve, hope you're doing well. I was wondering if you would be ok to join Apple best customers program. Looking forward to meet you, Phil" | `110059:367866` (Email Thread `110059:367849`) | |
| Thread recipients line | `@Email.to` | to: me, Alexandre | `110059:367868` | |
| Message time | `@Email.sentAt` | 3 days ago, Yesterday, 2 hours ago | `110059:367860`, `…367884`, `…367892` | |
| Other messages | `@Email.text` | "Hi Phil, can you jump on quick call tomorrow morning? …", "I'll be there to", "Call me at 9am", "Please update the report before the call" | `110059:367875`, `…367886`, `…367894`, `…367902` | |

| Action | Trigger | Leads to | Condition (annotation) |
| --- | --- | --- | --- |
| Send | `Main CTA` `119745:149586` (thread footer) / `Button/GroupItem` (composer) | email sent | none |
| Reply | `Reply composer` `110059:367904` | inline reply | none |
| Remove recipient | hover on `Chip/HoverRemovableChip` | – | none |
| Options | `Options` `119745:149585` | menu (not in scope) | none |

States: no sending, sent or failed states (Q-024).

---

## Screen: Calendar · New Event (`111632:923717`) and Repeat + Time zone (`111639:924416`)

**Purpose:** create a calendar event.
**Depth:** Structure (inputs show only their `Label` layer name)

| Field | Maps to | Example | Node | Notes |
| --- | --- | --- | --- | --- |
| Title | `@CalendarEvent.title` | – | `Composer Field Row / Title` `114001:142947` | |
| Start / end time | `@CalendarEvent.startsAt`, `endsAt` | 18:30 → 19:30 | frame name `18:30 → 19:30` `114005:146842` | 24h clock |
| Start / end day | `@CalendarEvent.startsAt`, `endsAt` | – | `Day` `114005:146846` | |
| Full day? | `@CalendarEvent.isFullDay` | – | `Full day?` `114005:146845` | Toggle |
| Repeat | `@CalendarEvent.repeat` | – | `Composer Field Row / Repeat` `114005:146935` (Select) | Options unknown (Q-025) |
| Time zone | `@CalendarEvent.timeZone` | – | `Composer Field Row / Time zone` `114005:146946` (Select) | Hidden behind a "Repeat and time zone" button in the default form (`114005:146815`) |
| Guests | `@CalendarEvent.participants` | one chip | `Composer Field Row / Guests` `114001:143029` | |
| Location | `@CalendarEvent.location` | – | `Composer Field Row / Location` `114001:143051` | |
| Invitations | `@CalendarEvent.sendInvitations` | – | `Composer Field Row / Invitations` `114001:143065` (Switch) | Meaning inferred from the label (Q-026) |
| Video call | `@CalendarEvent.hasVideoCall` | – | `Composer Field Row / Video call` `114001:143081` (Switch) | |
| Calendar | `@CalendarEvent.calendar` | – | `Composer Field Row / Calendar` `114001:143097` (Select) | Which connected calendar (Q-027) |
| Extra inputs | ? | – | `Inputs/Select Input` `111639:924921`, `Inputs/Text Group Input` with a flag adornment `111639:924922` | Purpose unknown (Q-028) |

| Action | Trigger | Leads to | Condition (annotation) |
| --- | --- | --- | --- |
| Create event | button `111632:923766` | event created | none |
| Discard | button `111632:923765` | close | none |

States: no validation or error states.

---

## Screen: Calendar event record page (`111639:924961`)

**Depth:** Structure. The same rows as New Event (Time, Repeat, Time zone, Guests, Location, Invitations, Video call, Calendar: `119593:551158…551165`), plus a relation widget `Widgets/Widget` `119593:551514` whose card holds `Link, Phone, Email`, `Team Member`, `Text`, `Boolean`, `Number` cells (`119593:551377…551383`), and a `People` section `119593:551601`. Which record the card shows is unknown (Q-029).

---

## Screen: Tasks index (`102294:450532`)

**Depth:** Structure only. A table with a first column and 3 more columns (`I102294:450532;96495:287713;102294:451572`). Row cells are named `Field first column`, `Account Owner`, `Creation date` and the table is named `Company table`: names copied from the Companies table, so they cannot be trusted (Q-030). 14 rows.

## Screen: Task detail page (`102294:450992`)

**Depth:** Structure

| Field | Maps to | Example | Node | Notes |
| --- | --- | --- | --- | --- |
| Body | `@Task.body` | "We should contact @Blandine to get Alexandre schedule first. Better call her in the morning, she is often busy in the afternoon." | `119590:850308` | Block editor with drag handles and an `@mention` |
| Empty block hint | – (static) | Enter text or type "/" for commands | `119590:850313` | Static copy |
| Tag field | ? | – | `Cells/Inline/Tag` `119590:850181` | A select-type field on Task. Name and options unknown (Q-031) |

## Screen: Tasks · side panel (`45745:103762`, variant `45745:103796`)

**Depth:** Structure. `Field Panel/Header` (`79475:858077`), tabs (`Timeline` ×3), a body `Paragraph` (`45745:103780`), `Properties/chips` with a `Label` and two buttons (`45745:103789`). Variant `45745:103796` holds a note-style body ("Summary: …", see Notes). No task-specific field names were readable (Q-031).

## Screen: Note · side panel (`36824:90523`, variant `36824:90557`)

**Depth:** Structure

| Field | Maps to | Example | Node | Notes |
| --- | --- | --- | --- | --- |
| Body | `@Note.body` | "Summary:" / "Engaging discussion with Sundar Pichai of Google today. Google is actively expanding across Europe, and expressed interest in potential collaborations." / "Key Points:" / "Google's European growth strategy: …" / "Partnership interest: …" / "Follow-up Actions:" / "Prepare a tailored proposal for our cloud services." | `36824:90584`, `…90591`, `…90598`, `…90605`, `…90612`, `…90619`, `…90626` | Block editor, one block per line |
| Linked records chips | `@Note.targets` | "Label" | `Properties/chips` `36824:90550` | What the chips point to is unclear (Q-032) |
| Title | `@Note.title` | – | `Field Panel/Header` `53242:306200` | Value not readable. Titles appear on the timeline ("Intro strategy for Qonto") |

---

## Screen: Files tab (`102373:32363`) and Files - Empty (`102373:43835`)

**Depth:** Structure

| Field | Maps to | Example | Node | Notes |
| --- | --- | --- | --- | --- |
| Filter + count | – | All · number | `119569:772311`, `…772312` | |
| File row | `@File` | 9 rows | frames named `Task` (`119569:772315` …), stale name | |
| File type icon | `@File.type` | – | `Icon/Filled` `119569:772317` | Icon varies per row? (Q-033) |
| File name | `@File.name` | "small card title" | `119569:772318` | Placeholder |
| Secondary label | ? | "Label" | `119569:772322` | Probably date or size (Q-033) |
| Rename | `@File.name` | inline `Input` | row 2 `119569:772327` | Rename in place |

| Action | Trigger | Leads to | Condition (annotation) |
| --- | --- | --- | --- |
| Row menu | `Button/Icon/Light` `119569:772323` | menu (not in scope) | none |
| Add file | `Button` `119569:772313` | upload (not in scope) | none |

States: [x] Empty "No Files" / "There are no associated files with this record." (`119569:781408`, `…781409`) with an action `Button` (`119569:781411`). Loading and error states are not shown.

---

## Screen: Filter menu (`93302:194311`) and Filter Account Owner (`93302:194332`)

**Depth:** Structure. `Filter` lists 6 menu items (`93302:194304…194309`), `Filter Account Owner` lists 5 (`93302:194326…194330`) with a search box. Item labels are inside instances and were not read (Q-034). Options/Fields (`93308:112551`, `93308:112552`) and Options/GroupBy (`93308:112553`, `93314:228540`) have the same limitation.
