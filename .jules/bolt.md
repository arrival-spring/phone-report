## 2025-05-23 - Preset Matching Bottleneck
**Learning:** The exhaustive search in `getBestPreset` through 1700+ presets was a major bottleneck (O(N) per OSM item). Most items only have a few tags, making indexed lookups significantly more efficient (O(T*C)).
**Action:** Always prefer indexed lookups over exhaustive search when matching items against a large static dataset like iD presets.
