# Tidy's Journal - Architectural Debt

## Refactoring Results
* Refactoring Pattern: Extracted note comment generation logic from `openNoteModal` into a dedicated `getNoteComment(item)` helper in `src/client/report-ui-controller.js`. This reduces function bloat and improves readability by isolating report-specific formatting from modal UI state management. (2025-05-24)
