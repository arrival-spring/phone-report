## 2026-05-13 - Consolidated OSM Item Creation Logic
**Learning:** Identical boilerplate for creating base OSM items and detecting area geometries was duplicated across `phone-processor.js` and `names-processor.js`. This increased technical debt and made it harder to maintain consistency.
**Action:** Centralized `isArea` and `createBaseItem` into `src/data-processor.js`. Refactored both processors to use these shared utilities, reducing code duplication and improving maintainability.
