## 2025-05-15 - [Phone Number Validation Cache]
**Learning:** Cache keys for phone validation must consider that some numbers (exclusions) depend on the full context of other tags on the OSM element. Unbounded Maps in stream processors risk memory issues. `PhoneNumber` objects from `libphonenumber-js` cannot be used with `structuredClone` due to internal functions.
**Action:** Use `LRUCache` for memory safety. Skip caching for numbers subject to `EXCLUSIONS`. Use shallow cloning for isolation if `structuredClone` fails.

## 2025-05-15 - [Point Geometry Bypass]
**Learning:** OpenStreetMap data is heavily skewed towards 'Point' geometries. Bypassing complex geospatial calculations (like `pointOnFeature` or area checks) for points provides a significant, low-effort performance boost.
**Action:** Always check geometry type early in processors and provide fast paths for 'Point' features.

## 2025-05-15 - [Tag Iteration Optimization]
**Learning:** `Object.values(obj).includes(val)` is less efficient than checking the condition during a manual `for...in` loop over the object, especially when the loop is already necessary for other purposes (like collecting a subset of tags).
**Action:** Perform matching logic within existing loops to avoid redundant passes and array allocations.
