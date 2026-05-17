
## 2025-05-15 - Guard slash-splitting logic
**Learning:** Checking for the presence of a separator character (like '/') before calling complex validation or splitting logic that relies on it can significantly reduce overhead in hot paths, especially when the separator is rare.
**Action:** Use simple string checks (.includes, .startsWith) to guard more expensive function calls or regex operations in validation loops.
