# Open questions · Twenty (Figma, blind run)

Phase 1 output. The agent wrote a question wherever the design did not settle something. In a real run Phase 2 would wait until these are answered. In this blind experiment all of them stay **open**, and `domain.md` takes the most literal reading the design supports, marking each choice with its Q-ID.

Status: `open` · `answered` · `deferred`

---

### Q-001 · Index (People table)

- **Status:** open
- **Question:** Frame `102294:353645` has the breadcrumb "Companies" (and the Companies item selected in the sidebar) but shows a `Tables/People/Table`. Is this a design mistake, or can a Companies view show People rows?
- **Evidence:** breadcrumb `I102294:353645;96495:287712;59329:218268`, body `…;102294:437600`
- **Blocks:** nothing in the domain. It affects the screen-to-object mapping in the inventory
- **Answer:**
- **Answered by / date:**

### Q-002 · Index (empty)

- **Status:** open
- **Question:** Index `102294:358115` has an empty `Body`. Is it a loading state, an empty view, or an unfinished frame? If it is the empty state of a list, what copy and actions should it show?
- **Evidence:** `get_design_context` returns no children under `I102294:358115;96495:287713`
- **Blocks:** list empty and loading states for every object
- **Answer:**
- **Answered by / date:**

### Q-003 · Views

- **Status:** open
- **Question:** "All · 9" sits over 8 People rows, "All Companies · 9" over 14 company rows, "All records · 9" over 13. What does the number count: the total in the view, the loaded page, or nothing (stale copy)?
- **Evidence:** view bars `…;102294:437599` (`102294:353645`), `102294:349175`, `102294:346940`
- **Blocks:** whether `View` exposes a `totalCount`; Connection design
- **Answer:**
- **Answered by / date:**

### Q-004 · Person ↔ Company

- **Status:** open
- **Question:** A Person shows exactly one Company chip. Can a Person belong to more than one Company? A Company also has a single "Main contact". Must the main contact be one of the Company's People?
- **Evidence:** `P;6668:117325;2985:100533`; Main contact column (`C;100429:473390`); People widget on the Company page (`…;119576:803673`)
- **Blocks:** Person.company cardinality; a future invariant on mainContact
- **Answer:**
- **Answered by / date:**

### Q-005 · Person name

- **Status:** open
- **Question:** Names appear as one string ("Alexandre Prot"). Is the name stored as one field or as first and last name?
- **Evidence:** `P;6668:117325;2985:100462`
- **Blocks:** Person.name type
- **Answer:**
- **Answered by / date:**

### Q-006 · Phone and email cardinality

- **Status:** open
- **Question:** Phones show as "(920) 948-1722" with no country code. Is the country code stored? Can a Person have several phones or emails? The New Event form has a text input with a flag adornment (`111639:924922`), which suggests country-aware phone input exists somewhere.
- **Evidence:** `P;6668:117325;8245:135117`, `P;6668:117325;8245:130294`
- **Blocks:** Person.phone / Person.email types
- **Answer:**
- **Answered by / date:**

### Q-007 · Link fields

- **Status:** open
- **Question:** Linkedin and Twitter cells show only a chip label ("Sundar Pichai", "@alex_prot", "google"), never a URL. Is the stored value a URL with an optional label? Can a link field hold several links?
- **Evidence:** `Chip/Link` in `P;6668:117325;6377:107098`, `C;100429:473388`; a "Tooltip Url company field" frame exists (`6901:116699`, not read)
- **Blocks:** Link value type
- **Answer:**
- **Answered by / date:**

### Q-008 · Sample data consistency

- **Status:** open
- **Question:** Several values contradict their column: Alexandre Prot's Linkedin is "Sundar Pichai", the Linkedin company's Linkedin is "slack", company Twitter cells hold "twenty.com". Are these shuffled placeholders? None of them were used to infer formats.
- **Evidence:** `P;6668:117325;6377:107098`; `102294:346940` rows "Linkedin" and "Founders Fund"
- **Blocks:** nothing (data realism, Phase 0)
- **Answer:**
- **Answered by / date:**

### Q-009 · Company address

- **Status:** open
- **Question:** Address shows "San Francisco, CA" in one frame and "1316 Dameon Mou…" (a street) in another. Is Address one text or a composite (street, city, state, postcode, country)? A "Table header menu (Composite field)" frame exists (`93302:154170`, out of scope).
- **Evidence:** `C;100429:473384`; `102294:346940`
- **Blocks:** Company.address type
- **Answer:**
- **Answered by / date:**

### Q-010 · Account Owner

- **Status:** open
- **Question:** Account Owner shows people with avatars (Phil Schiller, Tim Cook …). The same names appear in Created By and in "Not shared by Tim Cook", and an inline cell type is called "Team Member". Are account owners workspace users (Team Members) rather than People records? Is the field required?
- **Evidence:** `C;100429:473385`; `Cells/Inline/Team Member` `…;119589:828290`; `…;119589:150378`
- **Blocks:** Company.accountOwner target; the TeamMember entity
- **Answer:**
- **Answered by / date:**

### Q-011 · ARR currency

- **Status:** open
- **Question:** ARR shows "$500,000" with no decimals or currency code. Is it always USD? Can a company have ARR in another currency?
- **Evidence:** `C;100429:473387`
- **Blocks:** Company.arr (Money vs plain amount)
- **Answer:**
- **Answered by / date:**

### Q-012 · Creation date vs Created at

- **Status:** open
- **Question:** The Companies table says "Creation date" and the People table "Created at". Is this the same system timestamp? Users can't edit it, can they? Both columns contain the placeholder "Simple text" in one row.
- **Evidence:** `C;100429:473393`, `P;6668:117324;6377:134372`, `P;6668:117327;3328:183243`
- **Blocks:** createdAt nullability and editability
- **Answer:**
- **Answered by / date:**

### Q-013 · Created By sources

- **Status:** open
- **Question:** Created By shows a member avatar, a calendar icon ("31"), a mail-app icon, "API - Key name", "Workflow name", "System" and "Import" (CSV). Is that the complete list of sources? Do the calendar and mail icons mean "created automatically from a synced calendar / mailbox on behalf of this member"? Is Created By read-only?
- **Evidence:** `C;100429:473383`, `…473495`, `…473439`, `…473425`, `…473397`, `…473551`, `…473411`; timeline "was created from … emails" (`…;119576:804137`)
- **Blocks:** ActorSource enum
- **Answer:**
- **Answered by / date:**

### Q-014 · Index variants

- **Status:** open
- **Question:** What do Index `102294:344705` and `102294:342470` show that `102294:349175` does not? (They could not be rendered before the quota ran out.)
- **Evidence:** same `Tables/Companies/Table` component in all three
- **Blocks:** possibly missing states
- **Answer:**
- **Answered by / date:**

### Q-015 · Expanded Cell

- **Status:** open
- **Question:** Which field holds the five tags shown in Expanded Cell `27081:70136`, and what are its options?
- **Evidence:** `Tag` instances `27081:70137…70145`
- **Blocks:** a multi-select enum
- **Answer:**
- **Answered by / date:**

### Q-016 · Holdings

- **Status:** open
- **Question:** The Company page has a "Holdings" relation widget next to Opportunities and People. What does it relate to (other Companies as subsidiaries? a separate entity?) and what is its cardinality?
- **Evidence:** `Holdings` `…;119576:803321` (`102308:204799`); side panel section `109702:188479`
- **Blocks:** a Company relation (left out of the domain until answered)
- **Answer:**
- **Answered by / date:**

### Q-017 · Activity kinds

- **Status:** open
- **Question:** The timeline shows these verbs: created, edited N fields, updated A → B, linked A to B, deleted, commented, completed, has been assigned to, was created by, imported … from a CSV, was created from … emails, received a message from, received an email from, replied to, received a reply from, sent an email to, has been invited to an event, created an event. Is that the full list? Are activities only written by the system, or can users add them?
- **Evidence:** text layers listed in the inventory for `102308:204799`, `102308:202859`, `102308:201889`, `102308:204314`
- **Blocks:** ActivityKind enum
- **Answer:**
- **Answered by / date:**

### Q-018 · Activity actor

- **Status:** open
- **Question:** Is the actor of an activity always a Team Member, or can it be System, Workflow, API key or Import, as with Created By?
- **Evidence:** actor chips (`Chip`) at the start of each activity line, values not readable
- **Blocks:** Activity.actor type
- **Answer:**
- **Answered by / date:**

### Q-019 · Other Fields

- **Status:** open
- **Question:** The "Other Fields" card on a Company shows Multi Select, Multi Relation, Link/Phone/Email, Team Member, Text and Boolean cells. Are these user-defined (custom) fields? What are their names?
- **Evidence:** `Other Fields` `…;119589:828276` (`102308:201404`)
- **Blocks:** whether the domain needs custom fields
- **Answer:**
- **Answered by / date:**

### Q-020 · Email and event visibility

- **Status:** open
- **Question:** Emails show "Not shared by Tim Cook" and events "Not shared". Is visibility set per message, per thread, or per connected account? What values exist besides "not shared"? Which account does the composer's "From" row pick?
- **Evidence:** `…;119589:150378`, `…;119583:148303`, `Composer Field Row / Cc/Bcc, From` `114001:663413`
- **Blocks:** Email.visibility, CalendarEvent.visibility; policies
- **Answer:**
- **Answered by / date:**

### Q-021 · Favorites

- **Status:** open
- **Question:** Favorites hold records (Company, Person, Task), a view ("All Companies") and a "Page Layout", grouped in folders ("Best leads"). Are favorites per user? Is a folder a separate entity?
- **Evidence:** sidebar `…;93352:299432`; pinned action "Add to Favorites" `…;119565:765693`
- **Blocks:** Favorite in the domain (modeled minimally)
- **Answer:**
- **Answered by / date:**

### Q-022 · Out-of-scope navigation items

- **Status:** deferred
- **Question:** The sidebar lists "Sales Dashboard · Dashboard", "Claude" and an expandable "Stripe". These belong to pages outside this run (Dashboards, AI, Workflows).
- **Evidence:** `…;114997:445704`, `…445735`, `…445766`
- **Blocks:** nothing in this run
- **Answer:**
- **Answered by / date:**

### Q-023 · "me" in email recipients

- **Status:** open
- **Question:** "to: me, Alexandre" means the viewing user is a recipient. So is an email tied to the connected mailbox of a Team Member? Can two members see the same email?
- **Evidence:** `110059:367868`
- **Blocks:** Email ownership; policies
- **Answer:**
- **Answered by / date:**

### Q-024 · Email states

- **Status:** open
- **Question:** No frame shows sending, sent, failed or draft states. Are drafts saved? What happens when sending fails?
- **Evidence:** `110059:366941` has only compose, thread and reply frames
- **Blocks:** Email status enum; error types for `sendEmail`
- **Answer:**
- **Answered by / date:**

### Q-025 · Event repeat options

- **Status:** open
- **Question:** What options does the Repeat select offer?
- **Evidence:** `Composer Field Row / Repeat` `114005:146935`
- **Blocks:** CalendarEvent.repeat type (kept as free text)
- **Answer:**
- **Answered by / date:**

### Q-026 · Event "Invitations" switch

- **Status:** open
- **Question:** Does the Invitations switch mean "send invitations to guests"? Is it stored on the event or only used at creation?
- **Evidence:** `Composer Field Row / Invitations` `114001:143065`
- **Blocks:** CalendarEvent.sendInvitations
- **Answer:**
- **Answered by / date:**

### Q-027 · Event calendar

- **Status:** open
- **Question:** The Calendar select picks a calendar. Is a Calendar (connected account) an entity, and whose calendars are listed?
- **Evidence:** `Composer Field Row / Calendar` `114001:143097`
- **Blocks:** CalendarEvent.calendar type (kept as a name)
- **Answer:**
- **Answered by / date:**

### Q-028 · Extra inputs on New Event

- **Status:** open
- **Question:** New Event also contains an `Inputs/Select Input` and an `Inputs/Text Group Input` with a flag adornment below the Calendar row. Are they part of the form or leftover components?
- **Evidence:** `111639:924921`, `111639:924922`
- **Blocks:** CalendarEvent fields
- **Answer:**
- **Answered by / date:**

### Q-029 · Event record relation card

- **Status:** open
- **Question:** The event record page shows a relation card with Link/Phone/Email, Team Member, Text, Boolean and Number cells, and a People section. Which records are these: guests, the linked company?
- **Evidence:** `Widgets/Widget` `119593:551514`, `People` `119593:551601` (`111639:924961`)
- **Blocks:** CalendarEvent relations
- **Answer:**
- **Answered by / date:**

### Q-030 · Tasks index columns

- **Status:** open
- **Question:** The Tasks table has a first column and three more, but its layers are named "Company table", "Account Owner" and "Creation date" (copied from Companies). What are the real Task columns?
- **Evidence:** `I102294:450532;96495:287713;102294:451572`, rows `…451582`
- **Blocks:** Task fields
- **Answer:**
- **Answered by / date:**

### Q-031 · Task fields and status

- **Status:** open
- **Question:** A Task shows a checkbox and "completed", "has been assigned to" activities, and a `Cells/Inline/Tag` field on its detail page. Is status just done / not done, or an enum with more values (which would be the Tag)? Is the assignee a Team Member? Does a task have a due date? None is visible in scope.
- **Evidence:** `Checkbox` `…;119576:788678`; `…788713`, `…788701`; `Cells/Inline/Tag` `119590:850181`
- **Blocks:** Task state machine
- **Answer:**
- **Answered by / date:**

### Q-032 · Task and note targets

- **Status:** open
- **Question:** Notes and tasks appear on a Company's timeline, and their side panels show `Properties/chips`. Can a note or task be linked to several records, and to records of different types (Company, Person, Opportunity)?
- **Evidence:** `Properties/chips` `36824:90550`, `45745:103789`; timeline `102308:202859`
- **Blocks:** Note/Task ↔ record relation (modeled many-to-many to Company and Person, see domain)
- **Answer:**
- **Answered by / date:**

### Q-033 · File row details

- **Status:** open
- **Question:** What does the second line of a file row ("Label") show: upload date, size, uploader? Does the icon depend on file type?
- **Evidence:** `119569:772322`, `Icon/Filled` `119569:772317`
- **Blocks:** File fields
- **Answer:**
- **Answered by / date:**

### Q-034 · Filter, Sort and Options menus

- **Status:** deferred
- **Question:** The menu item labels in Filter (`93302:194311`), Filter Account Owner (`93302:194332`), Companies sort (`93302:195156`), Options/Fields (`93308:112551`) and Options/GroupBy (`93314:228540`) live inside instances and were not read before the Figma quota ran out. They would confirm the field lists.
- **Evidence:** see node ids
- **Blocks:** confirming Company fields (deferred to a re-run)
- **Answer:**
- **Answered by / date:**

### Q-035 · Opportunity

- **Status:** open
- **Question:** Opportunities appear only as chips ("Relation 1/2/3", a placeholder) on a Company and as a widget on the Company page. What fields and stages does an Opportunity have? (The Opportunities index is not in scope.)
- **Evidence:** `C;100429:473392`, `…;119576:803497`; Kanban column header menus exist (`26606:36902`, out of scope)
- **Blocks:** Opportunity entity (modeled with a name only)
- **Answer:**
- **Answered by / date:**

### Q-036 · Comments

- **Status:** open
- **Question:** Tasks and notes have "commented" activities and a "Comments" layer exists. Is a Comment an entity (author, body, time)? No comment UI is in scope.
- **Evidence:** `…;119576:788636`, `…788677`
- **Blocks:** Comment entity (left out)
- **Answer:**
- **Answered by / date:**

### Q-037 · Deletion

- **Status:** open
- **Question:** Notes and tasks have "deleted" activities, and a "Soft-Delete" section exists (out of scope). Is deletion soft, with restore? Can Companies and People be deleted?
- **Evidence:** `…;119576:788624`, `…788689`; section `39227:147409`
- **Blocks:** delete mutations, a `deletedAt` field
- **Answer:**
- **Answered by / date:**

### Q-038 · ICP

- **Status:** open
- **Question:** What does "ICP" stand for, and what makes a company ICP? The design shows only True/False.
- **Evidence:** `C;100429:473386`
- **Blocks:** glossary
- **Answer:**
- **Answered by / date:**

### Q-039 · Roles and permissions

- **Status:** open
- **Question:** No screen in scope shows roles or permission-dependent actions. A "Record access (share popup)" section exists (`117216:133778`, out of scope). Who can create, edit and delete each object, and who can see unshared emails and events?
- **Evidence:** absence of role annotations
- **Blocks:** Phase 4b (policies.yaml left empty)
- **Answer:**
- **Answered by / date:**

### Q-040 · Required fields

- **Status:** open
- **Question:** Which fields are required? The design shows empty Email and Twitter for one Person, and nothing else. Every other field is modeled optional, except the record's display name.
- **Evidence:** `P;6668:117326` (Thomas Kurian row)
- **Blocks:** nullability across the schema
- **Answer:**
- **Answered by / date:**
