---
description: DAD Phase 1, read the design and write the inventory and open questions
argument-hint: <figma link, frame names or path to exported screens>
---
Run DAD Phase 1 (design extraction) on: $ARGUMENTS

Read `dad/rules.md` first and follow it.

1. Confirm `dad/design/checklist.md` is signed off. If not, stop and list the unchecked items.
2. Read the design (Figma MCP server if available, otherwise the exported frames or screenshots).
3. Write `dad/design/inventory.md` using its template: one section per screen with dynamic fields mapped to `@Entity.field`, states shown, actions and annotated rules copied verbatim.
4. For anything ambiguous, missing or contradictory, add an entry to `dad/design/open-questions.md` (status `open`) instead of guessing. Typical triggers: a state with no frame, an action with no visible condition, a field with no realistic example, two frames that disagree, example numbers that do not add up, a sitemap or menu entry with no screen.
   - When a layer name and its rendered text disagree, trust the rendered text and note the mismatch.
   - If the Figma read quota runs out, stop and ask me for exported frames instead of guessing the remaining screens.
5. Do not write any domain, schema or code.
6. End with: number of screens, number of open questions, and the questions I must answer before `/dad-domain`.
