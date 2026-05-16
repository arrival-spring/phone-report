## 2025-05-15 - Fast-path for Point Geometries
**Learning:** For simple 'Point' geometries in GeoJSON, calling Turf.js `pointOnFeature` adds significant unnecessary overhead (approx. 150ms vs 7ms for 1M iterations).
**Action:** Always check for simple geometry types (Point) and access coordinates directly before falling back to more complex computational geometry libraries.
