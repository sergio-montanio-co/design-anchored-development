# Blind run vs. Twenty's real data model

A DAD agent ran Phases 0 to 3 on a copy of [Twenty](https://github.com/twentyhq/twenty)'s public Figma file without access to its code, docs or website, citing a Figma node id for every field. A separate agent extracted the real model from the source code (commit `d7499bf4`, 2026-10-21) without seeing the design. This file grades the first against the second.

**Result: all 11 user-facing entities found; 44 of 55 core fields recovered (80%); 0 fields that contradict the code; every structural difference was already raised as an open question.**

## How it was graded

- **Core fields** = the fields a person sees or sets: scalars plus forward relations. Back-references (`company.taskTargets`), polymorphic join plumbing and system fields (`id`, `createdAt`, `position`) are excluded from the denominator.
- A field counts as **found** when the blind domain has the same concept on the same entity, even if the name differs (`url` for `domainName`). Type differences are listed separately.
- **Design-only** = fields the design shows but the standard model does not have. They are not errors: the design file shows demo-workspace custom fields and features that differ from the code.

## Entities

| Real object | Blind entity | Core fields found | Missed |
| --- | --- | --- | --- |
| company | Company | 6 / 6 | none |
| person | Person | 6 / 6 | none |
| opportunity | Opportunity | 2 / 7 | amount, closeDate, stage, pointOfContact, owner |
| task | Task | 5 / 6 | dueAt |
| note | Note | 3 / 3 | none |
| attachment | File | 2 / 3 | file |
| messageThread | EmailThread | 2 / 3 | subject (placed on Email) |
| message | Email | 5 / 6 | isDraft |
| calendarEvent | CalendarEvent | 8 / 10 | isCanceled, description |
| timelineActivity | Activity | 4 / 4 | none |
| workspaceMember | TeamMember | 1 / 1 | none |
| **Total** | **11 / 11** | **44 / 55 (80%)** | |

The blind run also modeled **View** and **Favorite**. Both are real concepts, but in the current code views are core metadata tables and `favorite` was replaced by `navigationMenuItem`.

Opportunity is the main miss, and it is a measurement artifact: the Figma plan allowed 20 MCP reads per month, and the opportunity screens were never read with values. The run kept every unread opportunity field as an open question instead of filling it from what CRMs usually have.

## Structure: right concept, simpler shape

Every one of these was flagged as an open question in the blind run, which is exactly what Phase 1 should do.

| Concept | Blind run | Real model | Question raised |
| --- | --- | --- | --- |
| Person name | `name: String` | `FULL_NAME` (first + last) | Q-005: one string or split? |
| Email, phone | single `String` | `EMAILS`, `PHONES` (primary + additional) | Q-006: one or many? |
| Links | `Link` value type | `LINKS` (primary + secondary) | Q-007 |
| Address | `String` | `ADDRESS` composite | Q-009 |
| Email recipients | `from`, `to`, `cc`, `bcc` on Email | `messageParticipant` with `role` FROM, TO, CC, BCC | recipients modeled; join entity not |
| Task and note links | `companies` relation | polymorphic `taskTarget` / `noteTarget` to person, company, opportunity | Q-032: only companies? |
| Task status | `TaskStatus` from a checkbox | TODO, IN_PROGRESS, DONE | Q-031: more than two states? |

## Design-only fields

| Field in the design | Why it is not in the standard model |
| --- | --- |
| Company `employees`, `icp` | Custom fields added by Twenty's demo-data seeder |
| Company and Person `twitter` | Not in the current standard objects |
| Company `mainContact` | Not in the standard objects |
| CalendarEvent `repeat`, `timeZone`, `sendInvitations`, `calendar` | The design shows an event editor; in the code events are synced from external calendars |
| Email `visibility`, `owner` | Visibility exists at the message-channel level (core metadata), not on the message |

These are a finding in their own right: the design and the code have drifted. DAD's change-management rule (changes enter at the earliest artifact and flow down) is meant to prevent exactly this.

## Caveats

- **Partial read.** Only 3 of 31 screens were read with real values; the other 28 come from layer structure and plain text. A full run needs a higher Figma seat or exported frames.
- **Prior knowledge.** The model may know Twenty from training. The guard was the rule that every field must cite a Figma node id; every non-id field in the blind domain does.
- **One grader.** The grading above was done by the session that launched both agents, after both finished.

## Source files

- Blind run: [`dad/domain/domain.md`](dad/domain/domain.md), [`dad/design/open-questions.md`](dad/design/open-questions.md), [`phase0-score.md`](phase0-score.md), [`run-log.md`](run-log.md)
- Ground truth: `twenty-standard-application` standard object definitions in `packages/twenty-server`, commit `d7499bf4ba11ed8c8a9392e02a42bb12b576e543`
