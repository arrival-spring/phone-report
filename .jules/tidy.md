# Tidy's Journal - Architectural Debt

## Insights and Refactorings

### Variable Naming Consistency (2026-05-29)
*   **Smell:** Processor modules (`phone-processor.js`, `opening-hours-processor.js`, `names-processor.js`) had inconsistent naming for their main "invalid item" counters (e.g., `incompleteNames` vs `invalidCount`).
*   **Fix:** Standardized on `invalidCount` across all processors. This matches the property name in the returned statistics object, allowing for cleaner code (ES6 property shorthand).
*   **Impact:** Reduced cognitive load when switching between processor implementations.

### ESLint Unused Arguments (2026-05-29)
*   **Smell:** Several functions had unused parameters (`locale`, `value`) to maintain signature compatibility with dispatchers or common callback patterns (e.g., `Object.entries().filter(([key, value]) => ...)`). This triggered ESLint `no-unused-vars` warnings.
*   **Fix:** Updated `eslint.config.js` to ignore variables prefixed with an underscore (`argsIgnorePattern: '^_'`). Applied this to `src/html-report.js`, `src/main.js`, and `test/html-report.test.js`.
*   **Impact:** Clean linting while preserving descriptive function signatures.
