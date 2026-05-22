## 2025-05-15 - [Optimization of Preset Indexing]
**Learning:** Indexing iD presets solely by tag keys led to a large search space for common keys like `amenity` or `shop`. Introducing a secondary index for exact `key=value` pairs significantly reduces the number of candidate presets to evaluate in `getBestPreset`.
**Action:** Always prefer dual-index (wildcard + exact) lookups when matching objects against a set of rules defined by multiple optional/required tags.
