## Tidy's Journal

### Refactoring Pattern: Centralized Edit Counting
Pending edit counting logic was centralized in `src/client/report-storage.js` via `getEditCounts(subdivision)`. This helper consolidates logic previously duplicated in `renderNumbers`, `openUploadModal`, and `setUpSaveBtn` within `src/client/report-ui-controller.js`.

**Crucial Insight:** To maintain strict zero-functional-change policy of the Tidy persona, the helper preserves an existing (buggy) behavior in `renderNumbers` where it iterates over object keys instead of values when checking for the `name` property. A future Bolt mission should address this performance/correctness issue.

### Style Guide Discoveries
- Client-side storage keys like `EDITS_KEY` are imported from `report-state.js`.
- All client-side modules must use ESM imports/exports.
- Use `Object.hasOwn(obj, prop)` for safer property checks in the browser.
