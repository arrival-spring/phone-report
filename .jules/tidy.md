## 2025-05-22 - Refactor Phone Processor Utilities

**Learning:**
- Utility functions like `phoneTagToUse` and `keyToRemove` had redundant conditional logic and verbose score lookups.
- The `in` operator was being used to check for keys in a `Map` object, which is a common pitfall (it checks for properties, not Map keys).
- The `isSafeEdit` function used `.match()` with a global regex for a simple boolean check, which is less efficient and clear than `.test()`.

**Action:**
- Simplified `phoneTagToUse` with early returns.
- Updated `keyToRemove` to use the nullish coalescing operator (`??`) for score lookups.
- Refactored `isSafeEdit` to use `.test()` and strict inequality for better performance and clarity.
- Fixed the Map key check by replacing the `in` operator with `.has()`.
