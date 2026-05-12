# Tidy's Journal - Architectural Debt

## 2025-05-15 - Redundant OSM Item Creation Logic
**Learning:** `phone-processor.js` and `names-processor.js` contained identical logic for normalizing websites, extracting representative locations, and detecting if a feature is an area. This duplication makes the "base" item structure harder to maintain and evolve.
**Action:** Centralized shared item construction into `createBaseItem` and geometry validation into `isArea` within `src/data-processor.js`.
