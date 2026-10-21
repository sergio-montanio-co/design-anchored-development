---
description: Set up DAD in this repository (copies templates into ./dad)
---
Set up Design-Anchored Development in this repository.

1. If `dad/` already exists, stop and tell me what is there; do not overwrite anything.
2. Copy every file from the DAD `templates/dad/` folder into `./dad/`, keeping the structure.
3. Copy `schemas/` and `scripts/dad-check.mjs` if they are not already present, and add `ajv`, `graphql` and `yaml` as dev dependencies.
4. Ask me for the project stack (backend language and framework, client platforms, test framework) and write the answers under "Project-specific rules" in `dad/rules.md`.
5. Tell me the next step: complete `dad/design/checklist.md` with the designer (Phase 0), then run `/dad-extract`.
