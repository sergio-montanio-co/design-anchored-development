# Twenty CRM: standard data model (ground truth)

- Repo: https://github.com/twentyhq/twenty
- Commit: `d7499bf4ba11ed8c8a9392e02a42bb12b576e543` (2026-10-21T20:44:11+00:00)
- Source of truth: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/` (object builders in `utils/object-metadata/create-standard-flat-object-metadata.util.ts`, one field builder per object in `utils/field-metadata/compute-<object>-standard-flat-field-metadata.util.ts`).
- Defaults when unstated: field `isSystem=false`, `isNullable=true`; object `isSystem=false`.
- Legend: **Sys** = `isSystem: true` (hidden system field). **SSE** = `isSystemSideEffect` (auto-created inverse/morph side of a relation, shown in UI but managed by the system). **NN** = not nullable.

## Overview

| Object | Label | System object | Fields (total) | Non-system fields | In requested scope |
|---|---|---|---|---|---|
| `company` | Company | no | 23 | 15 | yes |
| `dashboard` | Dashboard | no | 12 | 4 |  |
| `note` | Note | no | 13 | 5 | yes |
| `opportunity` | Opportunity | no | 22 | 14 | yes |
| `person` | Person | no | 27 | 17 | yes |
| `task` | Task | no | 16 | 8 | yes |
| `workflow` | Workflow | no | 17 | 8 |  |
| `taskTarget` | Task Target | yes | 13 | 5 | yes |
| `noteTarget` | Note Target | yes | 13 | 5 | yes |
| `attachment` | Attachment | yes | 21 | 11 | yes |
| `timelineActivity` | Timeline Activity | yes | 28 | 15 | yes |
| `calendarEvent` | Calendar event | yes | 24 | 16 | yes |
| `calendarEventParticipant` | Calendar event participant | yes | 15 | 7 | yes |
| `message` | Message | yes | 17 | 9 | yes |
| `messageThread` | Message Thread | yes | 12 | 4 | yes |
| `messageParticipant` | Message Participant | yes | 15 | 7 | yes |
| `workspaceMember` | Workspace Member | yes | 34 | 13 | yes |
| `agentChatThreadParticipant` | Chat thread participant | yes | 11 | 2 |  |
| `agentChatThread` | Chat | yes | 27 | 7 |  |
| `agentChatThreadTarget` | Agent chat thread target | yes | 9 | 5 |  |
| `agentMessagePart` | Agent message part | yes | 27 | 1 |  |
| `agentMessageReaction` | Chat message reaction | yes | 8 | 2 |  |
| `agentMessage` | Agent message | yes | 14 | 5 |  |
| `agentTurn` | Agent turn | yes | 19 | 2 |  |
| `blocklist` | Blocklist | yes | 11 | 2 |  |
| `calendarChannelEventAssociation` | Calendar Channel Event Association | yes | 12 | 4 |  |
| `calendarEventTarget` | Calendar Event Target | yes | 15 | 5 |  |
| `callRecording` | Call Recording | yes | 21 | 13 |  |
| `campaignDelivery` | Campaign delivery | yes | 19 | 0 |  |
| `messageCampaign` | Campaign | yes | 30 | 22 |  |
| `messageChannelMessageAssociationMessageFolder` | Message Channel Message Association Message Folder | yes | 10 | 2 |  |
| `messageChannelMessageAssociation` | Message Channel Message Association | yes | 15 | 7 |  |
| `messageListMember` | List Member | yes | 10 | 2 |  |
| `messageList` | List | yes | 13 | 5 |  |
| `messageSuppression` | Message suppression | yes | 9 | 0 |  |
| `messageThreadTarget` | Message Thread Target | yes | 15 | 5 |  |
| `recordShare` | Record share | yes | 15 | 0 |  |
| `shortLink` | Short link | yes | 11 | 0 |  |
| `workflowAutomatedTrigger` | Workflow Automated Trigger | yes | 11 | 3 |  |
| `workflowRun` | Workflow Run | yes | 20 | 9 |  |
| `workflowVersion` | Workflow Version | yes | 16 | 7 |  |

## Not standard workspace objects at this commit

| Name | Status | Note | Source |
|---|---|---|---|
| `favorite` | REMOVED | Workspace object dropped by upgrade command 2-7 (drop-favorite-objects); sidebar favorites are now core navigationMenuItem entities. | `packages/twenty-server/src/database/commands/upgrade-version-command/2-7/2-7-workspace-command-1798000030000-drop-favorite-objects.command.ts` |
| `navigationMenuItem` | CORE_ENTITY | Replaces favorites (sidebar items). | `packages/twenty-server/src/engine/metadata-modules/navigation-menu-item/entities/navigation-menu-item.entity.ts` |
| `view` | CORE_ENTITY | Views live in the core/metadata schema, not as workspace records. | `packages/twenty-server/src/engine/metadata-modules/view/entities/view.entity.ts` |
| `viewField` | CORE_ENTITY |  | `packages/twenty-server/src/engine/metadata-modules/view-field/entities/view-field.entity.ts` |
| `viewFieldGroup` | CORE_ENTITY |  | `packages/twenty-server/src/engine/metadata-modules/view-field-group/entities/view-field-group.entity.ts` |
| `viewFilter` | CORE_ENTITY |  | `packages/twenty-server/src/engine/metadata-modules/view-filter/entities/view-filter.entity.ts` |
| `viewFilterGroup` | CORE_ENTITY |  | `packages/twenty-server/src/engine/metadata-modules/view-filter-group/entities/view-filter-group.entity.ts` |
| `viewGroup` | CORE_ENTITY |  | `packages/twenty-server/src/engine/metadata-modules/view-group/entities/view-group.entity.ts` |
| `viewSort` | CORE_ENTITY |  | `packages/twenty-server/src/engine/metadata-modules/view-sort/entities/view-sort.entity.ts` |
| `connectedAccount` | CORE_ENTITY |  | `packages/twenty-server/src/engine/metadata-modules/connected-account/entities/connected-account.entity.ts` |
| `messageChannel` | CORE_ENTITY |  | `packages/twenty-server/src/engine/metadata-modules/message-channel/entities/message-channel.entity.ts` |
| `messageFolder` | CORE_ENTITY |  | `packages/twenty-server/src/engine/metadata-modules/message-folder/entities/message-folder.entity.ts` |
| `calendarChannel` | CORE_ENTITY |  | `packages/twenty-server/src/engine/metadata-modules/calendar-channel/entities/calendar-channel.entity.ts` |

Dev/demo seeder adds these as CUSTOM fields (not standard): company: `employees` (NUMBER), `tagline` (TEXT), `introVideo` (LINKS), `workPolicy` (MULTI_SELECT), `visaSponsorship` (BOOLEAN); person: `intro` (TEXT), `whatsapp` (PHONES), `workPreference` (MULTI_SELECT), `performanceRating` (RATING).

## SELECT / MULTI_SELECT fields

| Object.field | Type | Options (value: label) | Default |
|---|---|---|---|
| `opportunity.stage` | SELECT | `NEW`: New, `SCREENING`: Screening, `MEETING`: Meeting, `PROPOSAL`: Proposal, `CUSTOMER`: Customer | "'NEW'" |
| `task.status` | SELECT | `TODO`: To do, `IN_PROGRESS`: In progress, `DONE`: Done | "'TODO'" |
| `workflow.statuses` | MULTI_SELECT | `DRAFT`: Draft, `ACTIVE`: Active, `DEACTIVATED`: Deactivated |  |
| `attachment.fileCategory` | SELECT | `ARCHIVE`: Archive, `AUDIO`: Audio, `IMAGE`: Image, `PRESENTATION`: Presentation, `SPREADSHEET`: Spreadsheet, `TEXT_DOCUMENT`: Text Document, `VIDEO`: Video, `OTHER`: Other | "'OTHER'" |
| `calendarEventParticipant.responseStatus` | SELECT | `NEEDS_ACTION`: Needs Action, `DECLINED`: Declined, `TENTATIVE`: Tentative, `ACCEPTED`: Accepted | "'NEEDS_ACTION'" |
| `messageParticipant.role` | SELECT | `FROM`: From, `TO`: To, `CC`: Cc, `BCC`: Bcc, `REPLY_TO`: Reply To | `'${MessageParticipantRole.FROM}'` |
| `workspaceMember.dateFormat` | SELECT | `SYSTEM`: System, `MONTH_FIRST`: Month First, `DAY_FIRST`: Day First, `YEAR_FIRST`: Year First | "'SYSTEM'" |
| `workspaceMember.timeFormat` | SELECT | `SYSTEM`: System, `HOUR_24`: 24HRS, `HOUR_12`: 12HRS | "'SYSTEM'" |
| `workspaceMember.numberFormat` | SELECT | `SYSTEM`: System, `COMMAS_AND_DOT`: Commas and dot, `SPACES_AND_COMMA`: Spaces and comma, `DOTS_AND_COMMA`: Dots and comma, `APOSTROPHE_AND_DOT`: Apostrophe and dot | `'${WorkspaceMemberNumberFormatEnum.SYSTEM}'` |
| `blocklist.scope` | SELECT | `WORKSPACE_MEMBER`: Workspace member, `WORKSPACE`: Workspace | `'${BlocklistScope.WORKSPACE_MEMBER}'` |
| `callRecording.status` | SELECT | `SCHEDULED`: Scheduled, `JOINING`: Joining, `RECORDING`: Recording, `PROCESSING`: Processing, `COMPLETED`: Completed, `FAILED`: Failed, `NOT_RECORDED`: Not recorded | "'SCHEDULED'" |
| `callRecording.recordingRequestStatus` | SELECT | `REQUESTED`: Requested, `CANCELED`: Canceled | "'REQUESTED'" |
| `messageCampaign.status` | SELECT | `DRAFT`: Draft, `SCHEDULED`: Scheduled, `SENDING`: Sending, `SENT`: Sent, `SENT_WITH_ERRORS`: Sent with errors, `CANCELED`: Canceled | "'DRAFT'" |
| `messageChannelMessageAssociation.direction` | SELECT | `INCOMING`: Incoming, `OUTGOING`: Outgoing | `'${MessageDirection.INCOMING}'` |
| `recordShare.principalType` | SELECT | `EVERYONE`: Everyone, `WORKSPACE_MEMBER`: Workspace member, `ROLE`: Role |  |
| `recordShare.accessLevel` | SELECT | `READ`: Read, `READ_WRITE`: Read and write, `FULL`: Full, `NONE`: Restricted | `'${RecordShareAccessLevel.READ}'` |
| `recordShare.rowCause` | SELECT | `OWNER`: Owner, `MANUAL`: Manual, `RULE`: Rule, `APPLICATION`: Application |  |
| `workflowAutomatedTrigger.type` | SELECT | `DATABASE_EVENT`: Database Event, `CRON`: Cron | "'DATABASE_EVENT'" |
| `workflowRun.status` | SELECT | `NOT_STARTED`: Not started, `RUNNING`: Running, `COMPLETED`: Completed, `FAILED`: Failed, `ENQUEUED`: Enqueued, `STOPPING`: Stopping, `STOPPED`: Stopped | "'NOT_STARTED'" |
| `workflowVersion.status` | SELECT | `DRAFT`: Draft, `ACTIVE`: Active, `DEACTIVATED`: Deactivated, `ARCHIVED`: Archived | "'DRAFT'" |

## `company`: Company / Companies

- System object: **no** · searchable: True · readability: OPEN · label identifier: `name`
- Description: A company
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-company-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/company/standard-objects/company.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `name` | Name | TEXT |  |  |  |
| `domainName` | Domain Name | LINKS |  |  |  |
| `address` | Address | ADDRESS |  |  |  |
| `linkedinLink` | Linkedin | LINKS |  |  |  |
| `annualRevenue` | Annual Revenue | CURRENCY |  |  |  |
| `people` | People | RELATION | person, one-to-many, inverse `company` |  |  |
| `accountOwner` | Account Owner | RELATION | workspaceMember, many-to-one, inverse `accountOwnerForCompanies`, onDelete SET_NULL |  |  |
| `taskTargets` | Tasks | RELATION | taskTarget, one-to-many, inverse `targetCompany` | SSE |  |
| `noteTargets` | Notes | RELATION | noteTarget, one-to-many, inverse `targetCompany` | SSE |  |
| `agentChatThreadTargets` | Chats | RELATION | agentChatThreadTarget, one-to-many, inverse `targetCompany` | SSE |  |
| `calendarEventTargets` | Calendar events | RELATION | calendarEventTarget, one-to-many, inverse `targetCompany` | SSE |  |
| `messageThreadTargets` | Emails | RELATION | messageThreadTarget, one-to-many, inverse `targetCompany` | SSE |  |
| `opportunities` | Opportunities | RELATION | opportunity, one-to-many, inverse `company` |  |  |
| `attachments` | Attachments | RELATION | attachment, one-to-many, inverse `targetCompany` | SSE |  |
| `timelineActivities` | Timeline Activities | RELATION | timelineActivity, one-to-many, inverse `targetCompany` | SSE |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `dashboard`: Dashboard / Dashboards

- System object: **no** · searchable: True · readability: OPEN · label identifier: `title`
- Description: A dashboard
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-dashboard-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/dashboard/standard-objects/dashboard.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `title` | Title | TEXT |  |  |  |
| `pageLayoutId` | Page Layout ID | UUID |  |  |  |
| `timelineActivities` | Timeline Activities | RELATION | timelineActivity, one-to-many, inverse `targetDashboard` | SSE |  |
| `attachments` | Attachments | RELATION | attachment, one-to-many, inverse `targetDashboard` | SSE |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `note`: Note / Notes

- System object: **no** · searchable: True · readability: INHERITED · label identifier: `title`
- Description: A note
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-note-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/note/standard-objects/note.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `title` | Title | TEXT |  |  |  |
| `bodyV2` | Body | RICH_TEXT |  |  |  |
| `noteTargets` | Relations | RELATION | noteTarget, one-to-many, inverse `note` |  |  |
| `attachments` | Attachments | RELATION | attachment, one-to-many, inverse `targetNote` | SSE |  |
| `timelineActivities` | Timeline Activities | RELATION | timelineActivity, one-to-many, inverse `targetNote` | SSE |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `opportunity`: Opportunity / Opportunities

- System object: **no** · searchable: True · readability: OPEN · label identifier: `name`
- Description: An opportunity
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-opportunity-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/opportunity/standard-objects/opportunity.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `name` | Name | TEXT |  |  |  |
| `amount` | Amount | CURRENCY |  |  |  |
| `closeDate` | Close date | DATE_TIME |  |  |  |
| `stage` | Stage | SELECT |  | NN | NEW, SCREENING, MEETING, PROPOSAL, CUSTOMER |
| `pointOfContact` | Point of Contact | RELATION | person, many-to-one, inverse `pointOfContactForOpportunities`, onDelete SET_NULL |  |  |
| `company` | Company | RELATION | company, many-to-one, inverse `opportunities`, onDelete SET_NULL |  |  |
| `taskTargets` | Tasks | RELATION | taskTarget, one-to-many, inverse `targetOpportunity` | SSE |  |
| `noteTargets` | Notes | RELATION | noteTarget, one-to-many, inverse `targetOpportunity` | SSE |  |
| `agentChatThreadTargets` | Chats | RELATION | agentChatThreadTarget, one-to-many, inverse `targetOpportunity` | SSE |  |
| `calendarEventTargets` | Calendar events | RELATION | calendarEventTarget, one-to-many, inverse `targetOpportunity` | SSE |  |
| `messageThreadTargets` | Emails | RELATION | messageThreadTarget, one-to-many, inverse `targetOpportunity` | SSE |  |
| `attachments` | Attachments | RELATION | attachment, one-to-many, inverse `targetOpportunity` | SSE |  |
| `timelineActivities` | Timeline Activities | RELATION | timelineActivity, one-to-many, inverse `targetOpportunity` | SSE |  |
| `owner` | Owner | RELATION | workspaceMember, many-to-one, inverse `ownedOpportunities`, onDelete SET_NULL |  |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `person`: Person / People

- System object: **no** · searchable: True · readability: OPEN · label identifier: `name`
- Description: A person
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-person-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/person/standard-objects/person.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `name` | Name | FULL_NAME |  |  |  |
| `emails` | Emails | EMAILS |  |  |  |
| `linkedinLink` | Linkedin | LINKS |  |  |  |
| `jobTitle` | Job Title | TEXT |  |  |  |
| `phones` | Phones | PHONES |  |  |  |
| `company` | Company | RELATION | company, many-to-one, inverse `people`, onDelete SET_NULL |  |  |
| `pointOfContactForOpportunities` | Opportunities | RELATION | opportunity, one-to-many, inverse `pointOfContact` |  |  |
| `taskTargets` | Tasks | RELATION | taskTarget, one-to-many, inverse `targetPerson` | SSE |  |
| `noteTargets` | Notes | RELATION | noteTarget, one-to-many, inverse `targetPerson` | SSE |  |
| `agentChatThreadTargets` | Chats | RELATION | agentChatThreadTarget, one-to-many, inverse `targetPerson` | SSE |  |
| `calendarEventTargets` | Calendar events | RELATION | calendarEventTarget, one-to-many, inverse `targetPerson` | SSE |  |
| `messageThreadTargets` | Emails | RELATION | messageThreadTarget, one-to-many, inverse `targetPerson` | SSE |  |
| `attachments` | Attachments | RELATION | attachment, one-to-many, inverse `targetPerson` | SSE |  |
| `messageParticipants` | Message Participants | RELATION | messageParticipant, one-to-many, inverse `person` |  |  |
| `calendarEventParticipants` | Calendar Event Participants | RELATION | calendarEventParticipant, one-to-many, inverse `person` |  |  |
| `timelineActivities` | Events | RELATION | timelineActivity, one-to-many, inverse `targetPerson` | SSE |  |
| `listMemberships` | Lists | RELATION | messageListMember, one-to-many, inverse `person` |  |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `avatarUrl` | Avatar | TEXT |  | Sys |  |
| `avatarFile` | Avatar File | FILES |  | Sys |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `task`: Task / Tasks

- System object: **no** · searchable: True · readability: INHERITED · label identifier: `title`
- Description: A task
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-task-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/task/standard-objects/task.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `title` | Title | TEXT |  |  |  |
| `bodyV2` | Body | RICH_TEXT |  |  |  |
| `dueAt` | Due Date | DATE_TIME |  |  |  |
| `status` | Status | SELECT |  |  | TODO, IN_PROGRESS, DONE |
| `taskTargets` | Relations | RELATION | taskTarget, one-to-many, inverse `task` |  |  |
| `attachments` | Attachments | RELATION | attachment, one-to-many, inverse `targetTask` | SSE |  |
| `assignee` | Assignee | RELATION | workspaceMember, many-to-one, inverse `assignedTasks`, onDelete SET_NULL |  |  |
| `timelineActivities` | Timeline Activities | RELATION | timelineActivity, one-to-many, inverse `targetTask` | SSE |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `workflow`: Workflow / Workflows

- System object: **no** · searchable: True · readability: OPEN · label identifier: `name`
- Description: A workflow
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-workflow-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/workflow/common/standard-objects/workflow.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `name` | Name | TEXT |  |  |  |
| `lastPublishedVersionId` | Last published Version ID | TEXT |  |  |  |
| `statuses` | Statuses | MULTI_SELECT |  |  | DRAFT, ACTIVE, DEACTIVATED |
| `versions` | Versions | RELATION | workflowVersion, one-to-many, inverse `workflow` | NN |  |
| `runs` | Runs | RELATION | workflowRun, one-to-many, inverse `workflow` | NN |  |
| `automatedTriggers` | Automated Triggers | RELATION | workflowAutomatedTrigger, one-to-many, inverse `workflow` | NN |  |
| `timelineActivities` | Timeline Activities | RELATION | timelineActivity, one-to-many, inverse `targetWorkflow` | SSE NN |  |
| `attachments` | Attachments | RELATION | attachment, one-to-many, inverse `targetWorkflow` | SSE NN |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `coreWorkflowId` | Core workflow id | UUID |  | Sys |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `taskTarget`: Task Target / Task Targets

- System object: **yes** · searchable: False · readability: INHERITED · label identifier: `id`
- Description: A task target
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-task-target-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/task/standard-objects/task-target.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `task` | Task | RELATION | task, many-to-one, inverse `taskTargets`, onDelete CASCADE |  |  |
| `target` | Related to | MORPH_RELATION | (polymorphic: see target<Object> fields), many-to-one |  |  |
| `targetPerson` | Linked to | MORPH_RELATION | person, many-to-one, inverse `taskTargets`, onDelete CASCADE | SSE |  |
| `targetCompany` | Linked to | MORPH_RELATION | company, many-to-one, inverse `taskTargets`, onDelete CASCADE | SSE |  |
| `targetOpportunity` | Linked to | MORPH_RELATION | opportunity, many-to-one, inverse `taskTargets`, onDelete CASCADE | SSE |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `noteTarget`: Note Target / Note Targets

- System object: **yes** · searchable: False · readability: INHERITED · label identifier: `id`
- Description: A note target
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-note-target-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/note/standard-objects/note-target.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `note` | Note | RELATION | note, many-to-one, inverse `noteTargets`, onDelete CASCADE |  |  |
| `target` | Related to | MORPH_RELATION | (polymorphic: see target<Object> fields), many-to-one |  |  |
| `targetPerson` | Linked to | MORPH_RELATION | person, many-to-one, inverse `noteTargets`, onDelete CASCADE | SSE |  |
| `targetCompany` | Linked to | MORPH_RELATION | company, many-to-one, inverse `noteTargets`, onDelete CASCADE | SSE |  |
| `targetOpportunity` | Linked to | MORPH_RELATION | opportunity, many-to-one, inverse `noteTargets`, onDelete CASCADE | SSE |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `attachment`: Attachment / Attachments

- System object: **yes** · searchable: False · readability: INHERITED · label identifier: `name`
- Description: An attachment
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-attachment-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/attachment/standard-objects/attachment.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `name` | Name | TEXT |  |  |  |
| `file` | File | FILES |  |  |  |
| `targetTask` | Attached to | MORPH_RELATION | task, many-to-one, inverse `attachments`, onDelete SET_NULL | SSE |  |
| `targetNote` | Attached to | MORPH_RELATION | note, many-to-one, inverse `attachments`, onDelete SET_NULL | SSE |  |
| `target` | Related to | MORPH_RELATION | (polymorphic: see target<Object> fields), many-to-one |  |  |
| `targetPerson` | Attached to | MORPH_RELATION | person, many-to-one, inverse `attachments`, onDelete CASCADE | SSE |  |
| `targetCompany` | Attached to | MORPH_RELATION | company, many-to-one, inverse `attachments`, onDelete CASCADE | SSE |  |
| `targetOpportunity` | Attached to | MORPH_RELATION | opportunity, many-to-one, inverse `attachments`, onDelete CASCADE | SSE |  |
| `targetDashboard` | Attached to | MORPH_RELATION | dashboard, many-to-one, inverse `attachments`, onDelete CASCADE | SSE |  |
| `targetWorkflow` | Attached to | MORPH_RELATION | workflow, many-to-one, inverse `attachments`, onDelete CASCADE | SSE |  |
| `targetAgentChatThread` | Attached to | MORPH_RELATION | agentChatThread, many-to-one, inverse `attachments`, onDelete CASCADE | SSE |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `fullPath` | Full path | TEXT |  | Sys |  |
| `fileCategory` | File category | SELECT |  | Sys NN | ARCHIVE, AUDIO, IMAGE, PRESENTATION, SPREADSHEET, TEXT_DOCUMENT, VIDEO, OTHER |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `timelineActivity`: Timeline Activity / Timeline Activities

- System object: **yes** · searchable: False · readability: INHERITED · label identifier: `linkedRecordCachedName`
- Description: Aggregated / filtered event to be displayed on the timeline
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-timeline-activity-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/timeline/standard-objects/timeline-activity.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `happensAt` | Creation date | DATE_TIME |  | NN |  |
| `properties` | Event details | RAW_JSON |  |  |  |
| `workspaceMember` | Workspace Member | RELATION | workspaceMember, many-to-one, inverse `timelineActivities`, onDelete CASCADE |  |  |
| `target` | Related to | MORPH_RELATION | (polymorphic: see target<Object> fields), many-to-one |  |  |
| `targetPerson` | Person | MORPH_RELATION | person, many-to-one, inverse `timelineActivities`, onDelete CASCADE | SSE |  |
| `targetCompany` | Company | MORPH_RELATION | company, many-to-one, inverse `timelineActivities`, onDelete CASCADE | SSE |  |
| `targetOpportunity` | Opportunity | MORPH_RELATION | opportunity, many-to-one, inverse `timelineActivities`, onDelete SET_NULL | SSE |  |
| `targetNote` | Note | MORPH_RELATION | note, many-to-one, inverse `timelineActivities`, onDelete SET_NULL | SSE |  |
| `targetTask` | Task | MORPH_RELATION | task, many-to-one, inverse `timelineActivities`, onDelete SET_NULL | SSE |  |
| `targetWorkflow` | Workflow | MORPH_RELATION | workflow, many-to-one, inverse `timelineActivities`, onDelete CASCADE | SSE |  |
| `targetWorkflowVersion` | WorkflowVersion | MORPH_RELATION | workflowVersion, many-to-one, inverse `timelineActivities`, onDelete CASCADE | SSE |  |
| `targetWorkflowRun` | WorkflowRun | MORPH_RELATION | workflowRun, many-to-one, inverse `timelineActivities`, onDelete CASCADE | SSE |  |
| `targetDashboard` | Dashboard | MORPH_RELATION | dashboard, many-to-one, inverse `timelineActivities`, onDelete SET_NULL | SSE |  |
| `targetMessageList` | MessageList | MORPH_RELATION | messageList, many-to-one, inverse `timelineActivities`, onDelete SET_NULL | SSE |  |
| `targetMessageCampaign` | MessageCampaign | MORPH_RELATION | messageCampaign, many-to-one, inverse `timelineActivities`, onDelete SET_NULL | SSE |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `timelineActivityTypeId` | Event type | UUID |  | Sys |  |
| `timelineActivityTypeSnapshot` | Event type | RAW_JSON |  | Sys |  |
| `linkedRecordCachedName` | Linked Record cached name | TEXT |  | Sys |  |
| `linkedRecordId` | Linked Record id | UUID |  | Sys |  |
| `linkedObjectMetadataId` | Linked Object Metadata ID | UUID |  | Sys |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `calendarEvent`: Calendar event / Calendar events

- System object: **yes** · searchable: False · readability: OPEN · label identifier: `title`
- Description: Calendar events
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-calendar-event-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/calendar/common/standard-objects/calendar-event.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `title` | Title | TEXT |  |  |  |
| `isCanceled` | Is canceled | BOOLEAN |  | NN |  |
| `isFullDay` | Is Full Day | BOOLEAN |  | NN |  |
| `startsAt` | Start Date | DATE_TIME |  |  |  |
| `endsAt` | End Date | DATE_TIME |  |  |  |
| `externalCreatedAt` | Creation DateTime | DATE_TIME |  |  |  |
| `externalUpdatedAt` | Update DateTime | DATE_TIME |  |  |  |
| `description` | Description | TEXT |  |  |  |
| `location` | Location | TEXT |  |  |  |
| `iCalUid` | iCal UID | TEXT |  |  |  |
| `conferenceSolution` | Conference Solution | TEXT |  |  |  |
| `conferenceLink` | Meet Link | LINKS |  |  |  |
| `calendarChannelEventAssociations` | Calendar Channel Event Associations | RELATION | calendarChannelEventAssociation, one-to-many, inverse `calendarEvent` | NN |  |
| `calendarEventParticipants` | Event Participants | RELATION | calendarEventParticipant, one-to-many, inverse `calendarEvent` | NN |  |
| `calendarEventTargets` | Relations | RELATION | calendarEventTarget, one-to-many, inverse `calendarEvent` |  |  |
| `callRecordings` | Call Recordings | RELATION | callRecording, one-to-many, inverse `calendarEvent` | NN |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `calendarEventParticipant`: Calendar event participant / Calendar event participants

- System object: **yes** · searchable: False · readability: OPEN · label identifier: `handle`
- Description: Calendar event participants
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-calendar-event-participant-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/calendar/common/standard-objects/calendar-event-participant.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `handle` | Handle | TEXT |  |  |  |
| `displayName` | Display Name | TEXT |  |  |  |
| `isOrganizer` | Is Organizer | BOOLEAN |  | NN |  |
| `responseStatus` | Response Status | SELECT |  | NN | NEEDS_ACTION, DECLINED, TENTATIVE, ACCEPTED |
| `calendarEvent` | Event ID | RELATION | calendarEvent, many-to-one, inverse `calendarEventParticipants`, onDelete CASCADE | NN |  |
| `person` | Person | RELATION | person, many-to-one, inverse `calendarEventParticipants`, onDelete SET_NULL |  |  |
| `workspaceMember` | Workspace Member | RELATION | workspaceMember, many-to-one, inverse `calendarEventParticipants`, onDelete SET_NULL |  |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `message`: Message / Messages

- System object: **yes** · searchable: False · readability: OPEN · label identifier: `subject`
- Description: Message
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-message-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/messaging/common/standard-objects/message.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `headerMessageId` | Header message ID | TEXT |  |  |  |
| `subject` | Subject | TEXT |  |  |  |
| `text` | Text | TEXT |  |  |  |
| `receivedAt` | Received At | DATE_TIME |  |  |  |
| `messageThread` | Message Thread ID | RELATION | messageThread, many-to-one, inverse `messages`, onDelete CASCADE |  |  |
| `messageParticipants` | Message Participants | RELATION | messageParticipant, one-to-many, inverse `message` |  |  |
| `messageChannelMessageAssociations` | Message Channel Association | RELATION | messageChannelMessageAssociation, one-to-many, inverse `message` |  |  |
| `messageCampaign` | Campaign | RELATION | messageCampaign, many-to-one, inverse `messages`, onDelete SET_NULL |  |  |
| `isDraft` | Is draft | BOOLEAN |  | NN |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `messageThread`: Message Thread / Message Threads

- System object: **yes** · searchable: False · readability: OPEN · label identifier: `subject`
- Description: Message Thread
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-message-thread-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/messaging/common/standard-objects/message-thread.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `subject` | Subject | TEXT |  |  |  |
| `messages` | Messages | RELATION | message, one-to-many, inverse `messageThread` |  |  |
| `messageChannelMessageAssociations` | Message Channel Association | RELATION | messageChannelMessageAssociation, one-to-many, inverse `messageThread` |  |  |
| `messageThreadTargets` | Relations | RELATION | messageThreadTarget, one-to-many, inverse `messageThread` |  |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `messageParticipant`: Message Participant / Message Participants

- System object: **yes** · searchable: False · readability: OPEN · label identifier: `handle`
- Description: Message Participants
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-message-participant-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/messaging/common/standard-objects/message-participant.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `role` | Role | SELECT |  | NN | FROM, TO, CC, BCC, REPLY_TO |
| `handle` | Handle | TEXT |  |  |  |
| `displayName` | Display Name | TEXT |  |  |  |
| `message` | Message | RELATION | message, many-to-one, inverse `messageParticipants`, onDelete CASCADE | NN |  |
| `person` | Person | RELATION | person, many-to-one, inverse `messageParticipants`, onDelete SET_NULL |  |  |
| `workspaceMember` | Workspace Member | RELATION | workspaceMember, many-to-one, inverse `messageParticipants`, onDelete SET_NULL |  |  |
| `messageCampaign` | Campaign | RELATION | messageCampaign, many-to-one, inverse `recipients`, onDelete SET_NULL |  |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `workspaceMember`: Workspace Member / Workspace Members

- System object: **yes** · searchable: True · readability: OPEN · label identifier: `name`
- Description: A workspace member
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-workspace-member-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/workspace-member/standard-objects/workspace-member.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `name` | Name | FULL_NAME |  | NN |  |
| `assignedTasks` | Assigned tasks | RELATION | task, one-to-many, inverse `assignee` | NN |  |
| `accountOwnerForCompanies` | Account Owner For Companies | RELATION | company, one-to-many, inverse `accountOwner` | NN |  |
| `messageParticipants` | Message Participants | RELATION | messageParticipant, one-to-many, inverse `workspaceMember` | NN |  |
| `blocklist` | Blocklist | RELATION | blocklist, one-to-many, inverse `workspaceMember` | NN |  |
| `calendarEventParticipants` | Calendar Event Participants | RELATION | calendarEventParticipant, one-to-many, inverse `workspaceMember` | NN |  |
| `timelineActivities` | Events | RELATION | timelineActivity, one-to-many, inverse `workspaceMember` |  |  |
| `agentMessages` | Chat messages | RELATION | agentMessage, one-to-many, inverse `senderWorkspaceMember` |  |  |
| `agentChatThreads` | Chat threads | RELATION | agentChatThread, one-to-many, inverse `workspaceMember` |  |  |
| `agentChatThreadParticipants` | Chat thread participations | RELATION | agentChatThreadParticipant, one-to-many, inverse `workspaceMember` |  |  |
| `agentMessageReactions` | Chat message reactions | RELATION | agentMessageReaction, one-to-many, inverse `workspaceMember` |  |  |
| `assignedAgentChatThreads` | Assigned chat threads | RELATION | agentChatThread, one-to-many, inverse `assignee` |  |  |
| `ownedOpportunities` | Owned opportunities | RELATION | opportunity, one-to-many, inverse `owner` | NN |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `colorScheme` | Color Scheme | TEXT |  | Sys NN |  |
| `uiScale` | Interface Scale | TEXT |  | Sys NN |  |
| `openRecordIn` | Open Records In | TEXT |  | Sys NN |  |
| `locale` | Language | TEXT |  | Sys NN |  |
| `avatarUrl` | Avatar URL | TEXT |  | Sys |  |
| `userEmail` | User Email | TEXT |  | Sys |  |
| `jobTitle` | Job Title | TEXT |  | Sys |  |
| `calendarStartDay` | Start of the week | NUMBER |  | Sys NN |  |
| `userId` | User ID | UUID |  | Sys NN |  |
| `timeZone` | Time zone | TEXT |  | Sys NN |  |
| `dateFormat` | Date format | SELECT |  | Sys NN | SYSTEM, MONTH_FIRST, DAY_FIRST, YEAR_FIRST |
| `timeFormat` | Time format | SELECT |  | Sys NN | SYSTEM, HOUR_24, HOUR_12 |
| `numberFormat` | Number format | SELECT |  | Sys NN | SYSTEM, COMMAS_AND_DOT, SPACES_AND_COMMA, DOTS_AND_COMMA, APOSTROPHE_AND_DOT |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |

## `agentChatThreadParticipant`: Chat thread participant / Chat thread participants

- System object: **yes** · searchable: False · readability: PRIVATE · label identifier: `id`
- Description: Read and inbox state of a member in a chat thread
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-agent-chat-thread-participant-standard-flat-field-metadata.util.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `thread` | Thread | RELATION | agentChatThread, many-to-one, inverse `participants`, onDelete CASCADE | NN |  |
| `workspaceMember` | Workspace Member | RELATION | workspaceMember, many-to-one, inverse `agentChatThreadParticipants`, onDelete CASCADE | NN |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Created At | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Updated At | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted At | DATE_TIME |  | Sys |  |
| `lastReadAt` | Last read at | DATE_TIME |  | Sys |  |
| `archivedAt` | Archived at | DATE_TIME |  | Sys |  |
| `snoozedUntil` | Snoozed until | DATE_TIME |  | Sys |  |
| `isSubscribed` | Subscribed | BOOLEAN |  | Sys NN |  |
| `lastMentionedAt` | Last mentioned at | DATE_TIME |  | Sys |  |

## `agentChatThread`: Chat / Chats

- System object: **yes** · searchable: False · readability: PRIVATE · label identifier: `title`
- Description: Agent chat thread
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-agent-chat-thread-standard-flat-field-metadata.util.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `turns` | Turns | RELATION | agentTurn, one-to-many, inverse `thread` |  |  |
| `workspaceMember` | Workspace Member | RELATION | workspaceMember, many-to-one, inverse `agentChatThreads`, onDelete CASCADE |  |  |
| `assignee` | Assignee | RELATION | workspaceMember, many-to-one, inverse `assignedAgentChatThreads`, onDelete SET_NULL |  |  |
| `messages` | Messages | RELATION | agentMessage, one-to-many, inverse `thread` |  |  |
| `attachments` | Attachments | RELATION | attachment, one-to-many, inverse `targetAgentChatThread` | SSE |  |
| `recordTargets` | Record Targets | RELATION | agentChatThreadTarget, one-to-many, inverse `thread` |  |  |
| `participants` | Participants | RELATION | agentChatThreadParticipant, one-to-many, inverse `thread` |  |  |
| `id` | ID | UUID |  | Sys NN |  |
| `title` | Title | TEXT |  | Sys |  |
| `totalInputTokens` | Total Input Tokens | NUMBER |  | Sys NN |  |
| `totalOutputTokens` | Total Output Tokens | NUMBER |  | Sys NN |  |
| `contextWindowTokens` | Context Window Tokens | NUMBER |  | Sys |  |
| `conversationSize` | Conversation Size | NUMBER |  | Sys NN |  |
| `totalInputCredits` | Total Input Credits | NUMERIC |  | Sys NN |  |
| `totalOutputCredits` | Total Output Credits | NUMERIC |  | Sys NN |  |
| `totalCacheReadTokens` | Total Cache Read Tokens | NUMERIC |  | Sys NN |  |
| `totalCacheCreationTokens` | Total Cache Creation Tokens | NUMERIC |  | Sys NN |  |
| `activeStreamId` | Active Stream ID | TEXT |  | Sys |  |
| `pendingQuestionMessageId` | Pending Question Message ID | UUID |  | Sys |  |
| `deletedAt` | Deleted At | DATE_TIME |  | Sys |  |
| `archivedAt` | Archived At | DATE_TIME |  | Sys |  |
| `lastActivityAt` | Last activity | DATE_TIME |  | Sys |  |
| `lastMessageText` | Last message | TEXT |  | Sys |  |
| `lastMessageSenderWorkspaceMemberId` | Last message sender | UUID |  | Sys |  |
| `writerWorkspaceMemberIds` | Writers | ARRAY |  | Sys |  |
| `createdAt` | Created At | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Updated At | DATE_TIME |  | Sys NN |  |

## `agentChatThreadTarget`: Agent chat thread target / Agent chat thread targets

- System object: **yes** · searchable: False · readability: INHERITED · label identifier: `id`
- Description: Record an agent chat thread is attached to
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-agent-chat-thread-target-standard-flat-field-metadata.util.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `thread` | Thread | RELATION | agentChatThread, many-to-one, inverse `recordTargets`, onDelete CASCADE | NN |  |
| `target` | Related to | MORPH_RELATION | (polymorphic: see target<Object> fields), many-to-one |  |  |
| `targetPerson` | Person | MORPH_RELATION | person, many-to-one, inverse `agentChatThreadTargets`, onDelete CASCADE | SSE |  |
| `targetCompany` | Company | MORPH_RELATION | company, many-to-one, inverse `agentChatThreadTargets`, onDelete CASCADE | SSE |  |
| `targetOpportunity` | Opportunity | MORPH_RELATION | opportunity, many-to-one, inverse `agentChatThreadTargets`, onDelete CASCADE | SSE |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Created At | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Updated At | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted At | DATE_TIME |  | Sys |  |

## `agentMessagePart`: Agent message part / Agent message parts

- System object: **yes** · searchable: False · readability: SYSTEM · label identifier: `id`
- Description: Agent message part
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-agent-message-part-standard-flat-field-metadata.util.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `message` | Message | RELATION | agentMessage, many-to-one, inverse `parts`, onDelete CASCADE | NN |  |
| `id` | ID | UUID |  | Sys NN |  |
| `orderIndex` | Order Index | NUMBER |  | Sys NN |  |
| `type` | Type | TEXT |  | Sys NN |  |
| `textContent` | Text Content | TEXT |  | Sys |  |
| `reasoningContent` | Reasoning Content | TEXT |  | Sys |  |
| `toolName` | Tool Name | TEXT |  | Sys |  |
| `toolCallId` | Tool Call ID | TEXT |  | Sys |  |
| `toolInput` | Tool Input | RAW_JSON |  | Sys |  |
| `toolOutput` | Tool Output | RAW_JSON |  | Sys |  |
| `state` | State | TEXT |  | Sys |  |
| `providerExecuted` | Provider Executed | BOOLEAN |  | Sys |  |
| `errorMessage` | Error Message | TEXT |  | Sys |  |
| `errorDetails` | Error Details | RAW_JSON |  | Sys |  |
| `sourceUrlSourceId` | Source URL Source ID | TEXT |  | Sys |  |
| `sourceUrlUrl` | Source URL URL | TEXT |  | Sys |  |
| `sourceUrlTitle` | Source URL Title | TEXT |  | Sys |  |
| `sourceDocumentSourceId` | Source Document Source ID | TEXT |  | Sys |  |
| `sourceDocumentMediaType` | Source Document Media Type | TEXT |  | Sys |  |
| `sourceDocumentTitle` | Source Document Title | TEXT |  | Sys |  |
| `sourceDocumentFilename` | Source Document Filename | TEXT |  | Sys |  |
| `fileFilename` | File Filename | TEXT |  | Sys |  |
| `fileId` | File ID | UUID |  | Sys |  |
| `providerMetadata` | Provider Metadata | RAW_JSON |  | Sys |  |
| `createdAt` | Created At | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Updated At | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted At | DATE_TIME |  | Sys |  |

## `agentMessageReaction`: Chat message reaction / Chat message reactions

- System object: **yes** · searchable: False · readability: SYSTEM · label identifier: `id`
- Description: Emoji reaction of a workspace member to a chat message
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-agent-message-reaction-standard-flat-field-metadata.util.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `message` | Message | RELATION | agentMessage, many-to-one, inverse `reactions`, onDelete CASCADE | NN |  |
| `workspaceMember` | Workspace Member | RELATION | workspaceMember, many-to-one, inverse `agentMessageReactions`, onDelete CASCADE |  |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Created At | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Updated At | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted At | DATE_TIME |  | Sys |  |
| `agentId` | Agent ID | UUID |  | Sys |  |
| `emoji` | Emoji | TEXT |  | Sys NN |  |

## `agentMessage`: Agent message / Agent messages

- System object: **yes** · searchable: False · readability: SYSTEM · label identifier: `id`
- Description: Agent message
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-agent-message-standard-flat-field-metadata.util.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `senderWorkspaceMember` | Sender | RELATION | workspaceMember, many-to-one, inverse `agentMessages`, onDelete SET_NULL |  |  |
| `thread` | Thread | RELATION | agentChatThread, many-to-one, inverse `messages`, onDelete CASCADE | NN |  |
| `turn` | Turn | RELATION | agentTurn, many-to-one, inverse `messages`, onDelete CASCADE |  |  |
| `parts` | Parts | RELATION | agentMessagePart, one-to-many, inverse `message` |  |  |
| `reactions` | Reactions | RELATION | agentMessageReaction, one-to-many, inverse `message` |  |  |
| `id` | ID | UUID |  | Sys NN |  |
| `agentId` | Agent ID | UUID |  | Sys |  |
| `senderApplicationId` | Sender application ID | UUID |  | Sys |  |
| `role` | Role | TEXT |  | Sys NN |  |
| `status` | Status | TEXT |  | Sys NN |  |
| `processedAt` | Processed At | DATE_TIME |  | Sys |  |
| `createdAt` | Created At | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Updated At | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted At | DATE_TIME |  | Sys |  |

## `agentTurn`: Agent turn / Agent turns

- System object: **yes** · searchable: False · readability: SYSTEM · label identifier: `id`
- Description: Agent turn
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-agent-turn-standard-flat-field-metadata.util.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `thread` | Thread | RELATION | agentChatThread, many-to-one, inverse `turns`, onDelete CASCADE | NN |  |
| `messages` | Messages | RELATION | agentMessage, one-to-many, inverse `turn` |  |  |
| `id` | ID | UUID |  | Sys NN |  |
| `agentId` | Agent ID | UUID |  | Sys |  |
| `status` | Status | TEXT |  | Sys NN |  |
| `error` | Error | RAW_JSON |  | Sys |  |
| `startedAt` | Started At | DATE_TIME |  | Sys |  |
| `endedAt` | Ended At | DATE_TIME |  | Sys |  |
| `modelId` | Model ID | TEXT |  | Sys |  |
| `inputTokens` | Input Tokens | NUMBER |  | Sys |  |
| `outputTokens` | Output Tokens | NUMBER |  | Sys |  |
| `cacheReadTokens` | Cache Read Tokens | NUMERIC |  | Sys |  |
| `cacheCreationTokens` | Cache Creation Tokens | NUMERIC |  | Sys |  |
| `inputCredits` | Input Credits | NUMERIC |  | Sys |  |
| `outputCredits` | Output Credits | NUMERIC |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `createdAt` | Created At | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Updated At | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted At | DATE_TIME |  | Sys |  |

## `blocklist`: Blocklist / Blocklists

- System object: **yes** · searchable: False · readability: OPEN · label identifier: `handle`
- Description: Blocklist
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-blocklist-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/blocklist/standard-objects/blocklist.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `handle` | Handle | TEXT |  |  |  |
| `workspaceMember` | WorkspaceMember | RELATION | workspaceMember, many-to-one, inverse `blocklist`, onDelete CASCADE |  |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |
| `scope` | Scope | SELECT |  | Sys NN | WORKSPACE_MEMBER, WORKSPACE |

## `calendarChannelEventAssociation`: Calendar Channel Event Association / Calendar Channel Event Associations

- System object: **yes** · searchable: False · readability: OPEN · label identifier: `id`
- Description: Calendar Channel Event Associations
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-calendar-channel-event-association-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/calendar/common/standard-objects/calendar-channel-event-association.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `eventExternalId` | Event external ID | TEXT |  |  |  |
| `recurringEventExternalId` | Recurring Event ID | TEXT |  |  |  |
| `calendarChannelId` | Channel ID | UUID |  | NN |  |
| `calendarEvent` | Event ID | RELATION | calendarEvent, many-to-one, inverse `calendarChannelEventAssociations`, onDelete CASCADE | NN |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `calendarEventTarget`: Calendar Event Target / Calendar Event Targets

- System object: **yes** · searchable: False · readability: INHERITED · label identifier: `id`
- Description: A calendar event target
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-calendar-event-target-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/calendar/common/standard-objects/calendar-event-target.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `target` | Related to | MORPH_RELATION | (polymorphic: see target<Object> fields), many-to-one |  |  |
| `targetPerson` | Person | MORPH_RELATION | person, many-to-one, inverse `calendarEventTargets`, onDelete CASCADE | SSE |  |
| `targetCompany` | Company | MORPH_RELATION | company, many-to-one, inverse `calendarEventTargets`, onDelete CASCADE | SSE |  |
| `targetOpportunity` | Opportunity | MORPH_RELATION | opportunity, many-to-one, inverse `calendarEventTargets`, onDelete CASCADE | SSE |  |
| `calendarEvent` | Calendar event | RELATION | calendarEvent, many-to-one, inverse `calendarEventTargets`, onDelete CASCADE | NN |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |
| `isAutomaticallyAssigned` | Automatically assigned | BOOLEAN |  | Sys NN |  |
| `isManuallyAssigned` | Manually assigned | BOOLEAN |  | Sys NN |  |

## `callRecording`: Call Recording / Call Recordings

- System object: **yes** · searchable: False · readability: OPEN · label identifier: `title`
- Description: A recording of a meeting
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-call-recording-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/call-recording/standard-objects/call-recording.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `title` | Title | TEXT |  |  |  |
| `status` | Status | SELECT |  | NN | SCHEDULED, JOINING, RECORDING, PROCESSING, COMPLETED, FAILED, NOT_RECORDED |
| `recordingRequestStatus` | Request Status | SELECT |  | NN | REQUESTED, CANCELED |
| `applicationId` | Application ID | UUID |  |  |  |
| `externalBotId` | External Bot ID | TEXT |  |  |  |
| `externalRecordingId` | External Recording ID | TEXT |  |  |  |
| `startedAt` | Started At | DATE_TIME |  |  |  |
| `endedAt` | Ended At | DATE_TIME |  |  |  |
| `video` | Video | FILES |  |  |  |
| `audio` | Audio | FILES |  |  |  |
| `transcript` | Transcript | RAW_JSON |  |  |  |
| `summary` | Summary | RICH_TEXT |  |  |  |
| `calendarEvent` | Calendar Event | RELATION | calendarEvent, many-to-one, inverse `callRecordings`, onDelete SET_NULL |  |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `campaignDelivery`: Campaign delivery / Campaign deliveries

- System object: **yes** · searchable: False · readability: SYSTEM · label identifier: `id`
- Description: Campaign delivery
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-campaign-delivery-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/emailing/standard-objects/campaign-delivery.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `id` | ID | UUID |  | Sys NN |  |
| `campaignId` | Campaign ID | UUID |  | Sys NN |  |
| `personId` | Person ID | UUID |  | Sys NN |  |
| `recipientEmail` | Recipient Email | TEXT |  | Sys NN |  |
| `state` | State | TEXT |  | Sys NN |  |
| `skipReason` | Skip Reason | TEXT |  | Sys |  |
| `failureReason` | Failure Reason | TEXT |  | Sys |  |
| `claimToken` | Claim Token | UUID |  | Sys |  |
| `claimExpiresAt` | Claim Expires At | DATE_TIME |  | Sys |  |
| `providerMessageId` | Provider Message ID | TEXT |  | Sys |  |
| `sentAt` | Sent At | DATE_TIME |  | Sys |  |
| `deliveredAt` | Delivered At | DATE_TIME |  | Sys |  |
| `bouncedAt` | Bounced At | DATE_TIME |  | Sys |  |
| `complainedAt` | Complained At | DATE_TIME |  | Sys |  |
| `rejectedAt` | Rejected At | DATE_TIME |  | Sys |  |
| `renderingFailedAt` | Rendering Failed At | DATE_TIME |  | Sys |  |
| `createdAt` | Created At | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Updated At | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted At | DATE_TIME |  | Sys |  |

## `messageCampaign`: Campaign / Campaigns

- System object: **yes** · searchable: True · readability: OPEN · label identifier: `name`
- Description: A bulk email send to an audience, with delivery stats
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-message-campaign-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/emailing/standard-objects/message-campaign.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `name` | Name | TEXT |  | NN |  |
| `subject` | Subject | TEXT |  |  |  |
| `bodyTemplate` | Body | TEXT |  |  |  |
| `fromAddress` | From address | EMAILS |  |  |  |
| `status` | Status | SELECT |  | NN | DRAFT, SCHEDULED, SENDING, SENT, SENT_WITH_ERRORS, CANCELED |
| `scheduledAt` | Scheduled at | DATE_TIME |  |  |  |
| `sentAt` | Sent at | DATE_TIME |  |  |  |
| `sentCount` | Sent | NUMBER |  | NN |  |
| `deliveredCount` | Delivered | NUMBER |  | NN |  |
| `failedCount` | Failed | NUMBER |  | NN |  |
| `bouncedCount` | Bounced | NUMBER |  | NN |  |
| `complainedCount` | Complaints | NUMBER |  | NN |  |
| `skippedCount` | Skipped | NUMBER |  | NN |  |
| `uniqueClickCount` | Unique clicks | NUMBER |  | NN |  |
| `clickRate` | Click rate | NUMBER |  | NN |  |
| `uniqueOpenCount` | Unique opens | NUMBER |  | NN |  |
| `openRate` | Open rate | NUMBER |  | NN |  |
| `unsubscribeTopicId` | Unsubscribe topic id | UUID |  |  |  |
| `list` | List | RELATION | messageList, many-to-one, inverse `campaigns`, onDelete SET_NULL |  |  |
| `timelineActivities` | Events | RELATION | timelineActivity, one-to-many, inverse `targetMessageCampaign` | SSE |  |
| `messages` | Messages | RELATION | message, one-to-many, inverse `messageCampaign` |  |  |
| `recipients` | Recipients | RELATION | messageParticipant, one-to-many, inverse `messageCampaign` |  |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `messageChannelMessageAssociationMessageFolder`: Message Channel Message Association Message Folder / Message Channel Message Association Message Folders

- System object: **yes** · searchable: False · readability: OPEN · label identifier: `id`
- Description: Join table linking message channel message associations to message folders
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-message-channel-message-association-message-folder-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/messaging/common/standard-objects/message-channel-message-association-message-folder.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `messageChannelMessageAssociation` | Message Channel Message Association | RELATION | messageChannelMessageAssociation, many-to-one, inverse `messageFolders`, onDelete CASCADE | NN |  |
| `messageFolderId` | Message Folder | UUID |  | NN |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `messageChannelMessageAssociation`: Message Channel Message Association / Message Channel Message Associations

- System object: **yes** · searchable: False · readability: OPEN · label identifier: `id`
- Description: Message Synced with a Message Channel
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-message-channel-message-association-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/messaging/common/standard-objects/message-channel-message-association.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `messageExternalId` | Message External ID | TEXT |  |  |  |
| `messageThreadExternalId` | Thread External ID | TEXT |  |  |  |
| `direction` | Direction | SELECT |  | NN | INCOMING, OUTGOING |
| `messageChannelId` | Message Channel ID | UUID |  |  |  |
| `messageThread` | Message Thread ID | RELATION | messageThread, many-to-one, inverse `messageChannelMessageAssociations`, onDelete CASCADE |  |  |
| `message` | Message ID | RELATION | message, many-to-one, inverse `messageChannelMessageAssociations`, onDelete CASCADE |  |  |
| `messageFolders` | Message Folders | RELATION | messageChannelMessageAssociationMessageFolder, one-to-many, inverse `messageChannelMessageAssociation` |  |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `messageListMember`: List Member / List Members

- System object: **yes** · searchable: False · readability: OPEN · label identifier: `id`
- Description: A person's membership in a list
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-message-list-member-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/emailing/standard-objects/message-list-member.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `list` | List | RELATION | messageList, many-to-one, inverse `members`, onDelete CASCADE | NN |  |
| `person` | Person | RELATION | person, many-to-one, inverse `listMemberships`, onDelete CASCADE | NN |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `messageList`: List / Lists

- System object: **yes** · searchable: True · readability: OPEN · label identifier: `name`
- Description: A hand-picked audience of people
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-message-list-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/emailing/standard-objects/message-list.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `name` | Name | TEXT |  |  |  |
| `description` | Description | TEXT |  |  |  |
| `members` | Members | RELATION | messageListMember, one-to-many, inverse `list` |  |  |
| `campaigns` | Campaigns | RELATION | messageCampaign, one-to-many, inverse `list` |  |  |
| `timelineActivities` | Events | RELATION | timelineActivity, one-to-many, inverse `targetMessageList` | SSE |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `messageSuppression`: Message suppression / Message suppressions

- System object: **yes** · searchable: False · readability: SYSTEM · label identifier: `id`
- Description: Message suppression
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-message-suppression-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/emailing/standard-objects/message-suppression.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `id` | ID | UUID |  | Sys NN |  |
| `emailAddress` | Email Address | TEXT |  | Sys NN |  |
| `reason` | Reason | TEXT |  | Sys NN |  |
| `source` | Source | TEXT |  | Sys NN |  |
| `providerEventId` | Provider Event ID | TEXT |  | Sys |  |
| `unsubscribeTopicId` | Unsubscribe Topic ID | UUID |  | Sys |  |
| `createdAt` | Created At | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Updated At | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted At | DATE_TIME |  | Sys |  |

## `messageThreadTarget`: Message Thread Target / Message Thread Targets

- System object: **yes** · searchable: False · readability: INHERITED · label identifier: `id`
- Description: A message thread target
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-message-thread-target-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/messaging/common/standard-objects/message-thread-target.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `target` | Related to | MORPH_RELATION | (polymorphic: see target<Object> fields), many-to-one |  |  |
| `targetPerson` | Person | MORPH_RELATION | person, many-to-one, inverse `messageThreadTargets`, onDelete CASCADE | SSE |  |
| `targetCompany` | Company | MORPH_RELATION | company, many-to-one, inverse `messageThreadTargets`, onDelete CASCADE | SSE |  |
| `targetOpportunity` | Opportunity | MORPH_RELATION | opportunity, many-to-one, inverse `messageThreadTargets`, onDelete CASCADE | SSE |  |
| `messageThread` | Message thread | RELATION | messageThread, many-to-one, inverse `messageThreadTargets`, onDelete CASCADE | NN |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |
| `isAutomaticallyAssigned` | Automatically assigned | BOOLEAN |  | Sys NN |  |
| `isManuallyAssigned` | Manually assigned | BOOLEAN |  | Sys NN |  |

## `recordShare`: Record share / Record shares

- System object: **yes** · searchable: False · readability: SYSTEM · label identifier: `id`
- Description: Who may read a record of a private object
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-record-share-standard-flat-field-metadata.util.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `recordId` | Record ID | UUID |  | Sys NN |  |
| `objectMetadataId` | Object metadata ID | UUID |  | Sys NN |  |
| `principalId` | Principal ID | UUID |  | Sys NN |  |
| `principalType` | Principal type | SELECT |  | Sys NN | EVERYONE, WORKSPACE_MEMBER, ROLE |
| `accessLevel` | Access level | SELECT |  | Sys NN | READ, READ_WRITE, FULL, NONE |
| `rowCause` | Row cause | SELECT |  | Sys NN | OWNER, MANUAL, RULE, APPLICATION |
| `sourceId` | Source ID | UUID |  | Sys NN |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `shortLink`: Short link / Short links

- System object: **yes** · searchable: False · readability: SYSTEM · label identifier: `resolvedDestinationUrl`
- Description: A link tracked in a campaign
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-short-link-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/emailing/standard-objects/short-link.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |
| `authoredTemplateUrl` | Authored template URL | TEXT |  | Sys NN |  |
| `resolvedDestinationUrl` | Resolved destination URL | TEXT |  | Sys NN |  |
| `templateAndResolvedUrlHash` | Template and resolved URL hash | TEXT |  | Sys NN |  |

## `workflowAutomatedTrigger`: Workflow Automated Trigger / Workflow Automated Triggers

- System object: **yes** · searchable: False · readability: OPEN · label identifier: `id`
- Description: A workflow automated trigger
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-workflow-automated-trigger-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/workflow/common/standard-objects/workflow-automated-trigger.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `type` | Automated Trigger Type | SELECT |  | NN | DATABASE_EVENT, CRON |
| `settings` | Settings | RAW_JSON |  | NN |  |
| `workflow` | Workflow | RELATION | workflow, many-to-one, inverse `automatedTriggers`, onDelete CASCADE | NN |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `workflowRun`: Workflow Run / Workflow Runs

- System object: **yes** · searchable: False · readability: PRIVATE · label identifier: `name`
- Description: A workflow run
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-workflow-run-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/workflow/common/standard-objects/workflow-run.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `name` | Name | TEXT |  |  |  |
| `enqueuedAt` | Workflow run enqueued at | DATE_TIME |  |  |  |
| `startedAt` | Workflow run started at | DATE_TIME |  |  |  |
| `endedAt` | Workflow run ended at | DATE_TIME |  |  |  |
| `status` | Workflow run status | SELECT |  | NN | NOT_STARTED, RUNNING, COMPLETED, FAILED, ENQUEUED, STOPPING, STOPPED |
| `state` | State | RAW_JSON |  | NN |  |
| `workflowVersion` | Workflow version | RELATION | workflowVersion, many-to-one, inverse `runs`, onDelete SET_NULL |  |  |
| `workflow` | Workflow | RELATION | workflow, many-to-one, inverse `runs`, onDelete CASCADE |  |  |
| `timelineActivities` | Timeline Activities | RELATION | timelineActivity, one-to-many, inverse `targetWorkflowRun` | SSE NN |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Executed by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `stepLogs` | Step logs | RAW_JSON |  | Sys |  |
| `coreWorkflowId` | Core workflow id | UUID |  | Sys |  |
| `coreWorkflowVersionId` | Core workflow version id | UUID |  | Sys |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |

## `workflowVersion`: Workflow Version / Workflow Versions

- System object: **yes** · searchable: False · readability: OPEN · label identifier: `name`
- Description: A workflow version
- objectMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/object-metadata/create-standard-flat-object-metadata.util.ts`
- fieldMetadata: `packages/twenty-server/src/engine/workspace-manager/twenty-standard-application/utils/field-metadata/compute-workflow-version-standard-flat-field-metadata.util.ts`
- entity: `packages/twenty-server/src/modules/workflow/common/standard-objects/workflow-version.workspace-entity.ts`

| Field | Label | Type | Relation (target, cardinality, inverse) | Flags | Options |
|---|---|---|---|---|---|
| `name` | Name | TEXT |  |  |  |
| `trigger` | Version trigger | RAW_JSON |  |  |  |
| `steps` | Version steps | RAW_JSON |  |  |  |
| `status` | Version status | SELECT |  | NN | DRAFT, ACTIVE, DEACTIVATED, ARCHIVED |
| `workflow` | Workflow | RELATION | workflow, many-to-one, inverse `versions`, onDelete CASCADE |  |  |
| `runs` | Runs | RELATION | workflowRun, one-to-many, inverse `workflowVersion` |  |  |
| `timelineActivities` | Timeline Activities | RELATION | timelineActivity, one-to-many, inverse `targetWorkflowVersion` | SSE NN |  |
| `id` | ID | UUID |  | Sys NN |  |
| `createdAt` | Creation date | DATE_TIME |  | Sys NN |  |
| `updatedAt` | Last update | DATE_TIME |  | Sys NN |  |
| `deletedAt` | Deleted at | DATE_TIME |  | Sys |  |
| `createdBy` | Created by | ACTOR |  | Sys NN |  |
| `updatedBy` | Updated by | ACTOR |  | Sys NN |  |
| `coreWorkflowVersionId` | Core workflow version id | UUID |  | Sys |  |
| `position` | Position | POSITION |  | Sys NN |  |
| `searchVector` | Search vector | TS_VECTOR |  | Sys |  |
