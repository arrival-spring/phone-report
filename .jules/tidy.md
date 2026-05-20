# Tidy's Journal

## Recurring Code Smells
- **Duplicated Regex Generation**: Separator regex components were being constructed using identical `map` and `join` logic in `src/constants.js`. Consolidated into `createSpaceOptionalGroups`.
- **Unused Imports**: Found `OSM_EDITORS` imported but not used in `src/html-report.js`. Removed to keep imports clean.
