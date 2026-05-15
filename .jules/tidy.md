## 2025-05-15 - Redundant Regex Matching in Phone Processor
**Insight:** The `phone-processor.js` module frequently performed identical `RegExp.match()` operations on the same string across multiple utility functions (`stripStandardExtension`, `getStandardExtension`, `isStandardExtension`).
**Action:** Consolidated regex logic into a private `parseStandardExtension` helper. This pattern of "Match Once, Extract Many" should be applied to other parsing logic in the codebase to improve performance and maintainability.
