# Tidy's Journal - Architectural Debt

## 2025-05-15 - Refactored createStatsBox in src/html-utils.js
**Learning:** Found redundant percentage calculation and formatting logic in `createStatsBox`. The JSDoc was also significantly outdated, describing parameters that didn't exist in the function signature.
**Action:** Extracted `getFormattedPercentage` helper function and `PERCENTAGE_OPTIONS` constant. Updated JSDoc to accurately reflect the function's parameters and purpose.
