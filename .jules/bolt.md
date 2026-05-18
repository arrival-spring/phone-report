## 2025-11-19 - Optimized Tag Iteration in `validateNames`
**Learning:** Iterating over all keys of an object using `Object.keys(tags).reduce()` can be slow when processing millions of OpenStreetMap elements. Using a `for...in` loop with a fast guard (like `startsWith`) and pre-compiling regular expressions provides a significant performance boost.
**Action:** Prefer `for...in` loops with guards over `Object.keys().reduce()` or `.filter()` when processing large data streams. Pre-compile Regex objects used within loops.
