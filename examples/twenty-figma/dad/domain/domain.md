# Domain model · Twenty (Figma, blind run)

Phase 2 output. Built only from `design/inventory.md`. Every entity and field cites the Figma node where it was seen (prefixes `P` and `C` as defined in the inventory). All 40 open questions are still open. Where a question affects a field, the field takes the most literal reading of the design and names the question.

**Validated by:** Not validated (blind experiment)

## Actors and roles

| Role | Who they are | Evidence |
| --- | --- | --- |
| team_member | A user of the workspace. Owns accounts, creates records, connects a mailbox and calendar | Account Owner avatars (`C;100429:473385`), "Not shared by Tim Cook" (`…;119589:150378`), cell type "Team Member" (`…;119589:828290`) |

No roles or permission differences are visible in scope (Q-039). Non-human record creators (API key, Workflow, System, Import) are **actor sources**, not roles: see `Actor`.

## Entities

### Company

An organization the workspace tracks. It has People, Opportunities and a timeline of activity.

| Field | Type | Required | Notes | Seen at |
| --- | --- | --- | --- | --- |
| id | ID | yes | | – |
| name | String | yes | display name, shown with a logo | `C;100429:473381` |
| url | String | no | bare domain, e.g. `anthropic.com` | `C;100429:473382` |
| address | String | no | one string until Q-009 is answered | `C;100429:473384` |
| accountOwner | → TeamMember | no | Q-010 | `C;100429:473385` |
| icp | Boolean | no | shown True / False (Q-038) | `C;100429:473386` |
| arr | Money | no | `$500,000`, USD only seen (Q-011) | `C;100429:473387` |
| linkedin | Link | no | Q-007 | `C;100429:473388` |
| twitter | Link | no | Q-007, Q-008 | `C;100429:473389` |
| mainContact | → Person | no | Q-004 | `C;100429:473390` |
| employees | Int | no | | header `C;100429:473377`, cell `C;100429:473391` |
| createdBy | Actor | yes | read-only (Q-013) | `C;100429:473383` |
| createdAt | DateTime | yes | "Creation date" column (Q-012) | `C;100429:473393` |

**Relationships:**

- A Company has many People (People widget with a count, `…;119576:803673`).
- A Company has many Opportunities (`C;100429:473392`, `…;119576:803497`).
- A Company has many Activities, Notes, Tasks, Files, Email threads and Calendar events (timeline and tabs, `102308:204799`, `102308:202859`, `102373:32363`, `102373:15693`, `102308:204314`).
- A "Holdings" relation exists, but its target is unknown, so it is left out (Q-016).

### Person

A contact who usually works at a Company.

| Field | Type | Required | Notes | Seen at |
| --- | --- | --- | --- | --- |
| id | ID | yes | | – |
| name | String | yes | one string (Q-005) | `P;6668:117325;2985:100462` |
| avatar | String (image URL) | no | photo or initial fallback | `P;6668:117326;2985:100462` (initial "T") |
| email | String | no | empty for Thomas Kurian (Q-006, Q-040) | `P;6668:117325;8245:130294` |
| company | → Company | no | one chip (Q-004) | `P;6668:117325;2985:100533` |
| phone | String | no | `(920) 948-1722` (Q-006) | `P;6668:117325;8245:135117` |
| jobTitle | String | no | CEO, Founder, Partner | `P;6668:117325;2985:100609` |
| linkedin | Link | no | Q-007 | `P;6668:117325;6377:107098` |
| twitter | Link | no | `@alex_prot` | `P;6668:117325;6377:110751` |
| createdAt | DateTime | yes | "Created at", `Jun 12, 2023 3:13 pm` | `P;6668:117325;2985:100621` |

### TeamMember

A user of the workspace (Q-010).

| Field | Type | Required | Notes | Seen at |
| --- | --- | --- | --- | --- |
| id | ID | yes | | – |
| name | String | yes | Phil Schiller, Tim Cook | `C;100429:473385` |
| avatar | String (image URL) | no | | same |

### Opportunity

A potential deal with a Company. Only its name is visible in scope (Q-035).

| Field | Type | Required | Notes | Seen at |
| --- | --- | --- | --- | --- |
| id | ID | yes | | – |
| name | String | yes | placeholder "Relation 1" | `C;100429:473392` |
| company | → Company | yes | appears under a Company | `…;119576:803497` |

### Task

Something to do, linked to records, that can be assigned and completed.

| Field | Type | Required | Notes | Seen at |
| --- | --- | --- | --- | --- |
| id | ID | yes | | – |
| title | String | yes | "Call back Steve about Qonto pricing" | `…;119576:788715` |
| body | RichText | no | blocks with @mentions | `119590:850308` |
| status | TaskStatus | yes | from the checkbox and "completed" (Q-031) | `…;119576:788678`, `…788701` |
| assignee | → TeamMember | no | "has been assigned to" (Q-031) | `…;119576:788713` |
| companies | → Company (many) | no | shown on a Company timeline (Q-032) | `102308:202859` |

**State machine** (Q-031):

```text
todo → done
```

Whether a done task can be reopened, and whether the `Cells/Inline/Tag` field (`119590:850181`) is a richer status, are both unknown.

### Note

Free-form rich text about records.

| Field | Type | Required | Notes | Seen at |
| --- | --- | --- | --- | --- |
| id | ID | yes | | – |
| title | String | yes | "Intro strategy for Qonto" | `…;119576:788626` |
| body | RichText | no | "Summary: …", "Key Points: …" | `36824:90584…90626` |
| companies | → Company (many) | no | Q-032 | `102308:202859` |

### File

A file attached to a record.

| Field | Type | Required | Notes | Seen at |
| --- | --- | --- | --- | --- |
| id | ID | yes | | – |
| name | String | yes | placeholder "small card title"; renamable inline | `119569:772318`, `119569:772327` |
| company | → Company | yes | Files tab of a Company | `102373:32363` |

The type icon and the secondary label are unknown (Q-033). The upload flow is out of scope.

### EmailThread

A conversation made of Emails.

| Field | Type | Required | Notes | Seen at |
| --- | --- | --- | --- | --- |
| id | ID | yes | | – |
| emails | → Email (many) | yes | ordered by time | `Email Thread` `110059:367849` |
| companies | → Company (many) | no | Emails tab of a Company (Q-023) | `102373:15693` |

### Email

One message, received or sent.

| Field | Type | Required | Notes | Seen at |
| --- | --- | --- | --- | --- |
| id | ID | yes | | – |
| from | String | yes | email address | `114001:663413` |
| to | [String] | yes | `stanav@qonto.com`, "me, Alexandre" | `…;119589:150372`, `110059:367868` |
| cc | [String] | no | | `114001:663426` |
| bcc | [String] | no | | `114001:663440` |
| subject | String | no | | `114001:663338` |
| text | RichText | no | "Hi Steve, hope you're doing well. …" | `110059:367866` |
| sentAt | DateTime | yes | "3 days ago" | `110059:367860` |
| visibility | Visibility | yes | "Not shared by Tim Cook" (Q-020) | `…;119589:150378` |
| owner | → TeamMember | no | whose mailbox decides the visibility (Q-020, Q-023) | `…;119589:150378` |

### CalendarEvent

A meeting on a connected calendar.

| Field | Type | Required | Notes | Seen at |
| --- | --- | --- | --- | --- |
| id | ID | yes | | – |
| title | String | yes | | `114001:142947` |
| startsAt | DateTime | yes | "Wed 23", "18:30" | `…;119583:148269`, `114005:146842` |
| endsAt | DateTime | yes | "→ 19:30" | `114005:146842` |
| isFullDay | Boolean | yes | "Full day?" | `114005:146845` |
| repeat | String | no | options unknown (Q-025) | `114005:146935` |
| timeZone | String | no | | `114005:146946` |
| guests | [String] | no | chips (Q-029) | `114001:143029` |
| location | String | no | | `114001:143051` |
| sendInvitations | Boolean | no | Q-026 | `114001:143065` |
| hasVideoCall | Boolean | no | | `114001:143081` |
| calendar | String | no | name of the calendar (Q-027) | `114001:143097` |
| visibility | Visibility | yes | "Not shared" | `…;119583:148303` |
| companies | → Company (many) | no | Calendar timeline of a Company | `102308:204314` |

### Activity

One line of a record's timeline. The system writes it; it is never edited.

| Field | Type | Required | Notes | Seen at |
| --- | --- | --- | --- | --- |
| id | ID | yes | | – |
| kind | ActivityKind | yes | the verb | see the enum |
| actor | Actor | yes | the chip before the verb (Q-018) | `…;119576:804052` |
| happenedAt | DateTime | yes | "25 days ago"; grouped by month | `…;119576:804057`, `…804044` |
| company | → Company | yes | the timeline it belongs to | `102308:204799` |
| subject | Note, Task, Email, CalendarEvent or linked record | no | the chip after the verb | `…;119576:788626` |
| details | String | no | "3 fields", "A → B", "with 230 others" | `…;119576:804053`, `102308:203344` |

### View

A saved list of records of one object.

| Field | Type | Required | Notes | Seen at |
| --- | --- | --- | --- | --- |
| id | ID | yes | | – |
| name | String | yes | All, All Companies, All records | view bars of `102294:353645`, `102294:349175`, `102294:346940` |
| objectName | String | yes | Companies, People | breadcrumb |

The count next to the view name is left out until Q-003 is answered.

### Favorite

A shortcut in the sidebar, per user (Q-021).

| Field | Type | Required | Notes | Seen at |
| --- | --- | --- | --- | --- |
| id | ID | yes | | – |
| record | Company, Person, Task or View | yes | "Stripe · Company", "All Companies" | sidebar `…;93352:299432` |
| folder | String | no | "Best leads" | `…;32432:101340` |

## Value types

| Type | Definition | Seen at |
| --- | --- | --- |
| Money | Decimal amount + ISO 4217 currency. Only USD with no decimals is shown (Q-011) | `C;100429:473387` |
| Link | URL + optional label; only the label is ever shown (Q-007) | `Chip/Link` cells |
| Actor | Who or what did something: `source` (ActorSource) + display `name` + `teamMember` when the source is a member | `C;100429:473383` |
| RichText | Block document: headings, paragraphs, lists, quotes, images, dividers, @mentions | `110059:367749…367768`, `119590:850308` |

## Enums

**ActorSource** (Q-013). The Created By icons:

| Value | Evidence |
| --- | --- |
| TEAM_MEMBER | avatar + name |
| CALENDAR | "31" calendar icon + member name (`C;100429:473495`) |
| EMAIL | blue mail-app icon + member name (`C;100429:473439`) |
| API_KEY | "API - Key name" (`C;100429:473425`) |
| WORKFLOW | "Workflow name" (`C;100429:473397`) |
| SYSTEM | "System" (`C;100429:473551`) |
| IMPORT | "Import", CSV badge (`C;100429:473411`) |

**ActivityKind** (Q-017). The timeline verbs:

| Value | Verb as shown |
| --- | --- |
| CREATED | created, was created by, created an event |
| EDITED | edited, Edited, edited N fields on |
| UPDATED | updated A → B |
| LINKED | linked A to B |
| DELETED | deleted |
| COMMENTED | commented |
| COMPLETED | completed |
| ASSIGNED | has been assigned to |
| IMPORTED | imported … from a CSV |
| CREATED_FROM_EMAILS | was created from … emails |
| EMAIL_RECEIVED | Received a message from, received an email from, received a reply from |
| EMAIL_SENT | sent an email to, replied to |
| EVENT_INVITED | has been invited to an event |

**Visibility** (Q-020): `SHARED` (content shown, `…;119589:150400`) · `NOT_SHARED` ("Not shared by Tim Cook").

**TaskStatus** (Q-031): `TODO` · `DONE`.

## Inventory fields not mapped to the domain

| Inventory item | Why |
| --- | --- |
| `@Company.holdings` | Q-016 |
| Workspace name "Apple" | Workspace setup is out of scope; glossary only |
| Task `Cells/Inline/Tag` | Q-031 |
| Other Fields (custom fields) | Q-019 |
| File type icon and secondary label | Q-033 |
| Expanded Cell tags | Q-015 |
| View record count | Q-003 |

## Glossary

- **Workspace:** the account everything lives in ("Apple" in the design). Team Members belong to it.
- **Team Member:** a user of the workspace, as opposed to a Person, who is a contact.
- **Account Owner:** the Team Member responsible for a Company.
- **Main contact:** the Person to talk to at a Company.
- **ICP:** a yes/no flag on a Company. The abbreviation is not expanded in the design (Q-038).
- **ARR:** an amount of money on a Company. The abbreviation is not expanded in the design. Read here as annual recurring revenue (an assumption, Q-011).
- **Created By:** who or what created a record: a Team Member, a synced calendar or mailbox, an API key, a workflow, the system, or an import.
- **Timeline / Activity:** the history of a record, written by the system.
- **Not shared:** an email or event whose content its owner has not shared with the workspace.
- **View:** a saved list of records of one object (All, All Companies).
- **Favorite:** a sidebar shortcut to a record or view.
