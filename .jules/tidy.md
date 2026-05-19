# Tidy's Journal - Architectural Debt

## 2025-05-15 - Implicit Global Dependencies in Client-side Modules

**Insight:**
The client-side JavaScript architecture relies heavily on global variables (e.g., `subdivisionName`, `reportType`, `OSM_EDITORS`) injected via `<script>` tags in Eta templates. This creates implicit dependencies that are not visible in the module's `import` statements, making the code harder to reason about, test in isolation, and prone to `ReferenceError`s during refactoring.

**Recurring Smell:**
Logic in `src/client/report-utils.js` and `src/client/report-ui-actions.js` frequently re-implements filtering and pagination rules, leading to DRY (Don't Repeat Yourself) violations and potential desync between different parts of the UI.

**Action:**
Consolidate shared logic (like filtering report items) into single-purpose utility functions that can be reused across the client-side codebase, even if they still rely on global state for now.
