# Tidy's Journal - Architectural Debt

## Entries

### 2025-05-22: Refactored `src/client/report-storage.js` to reduce logic duplication

- **Issue:** Duplicated logic for mapping report items to suggested fixes and for persisting undo state to `localStorage` across several functions.
- **Refactor:** Extracted `getSuggestedFix(item, language)` and `persistUndoState()` helper functions.
- **Impact:** Reduced code duplication and improved maintainability by centralizing state persistence and fix calculation logic.
