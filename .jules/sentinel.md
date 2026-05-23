## 2025-11-20 - [Context-Aware Encoding for OSM Metadata]
**Vulnerability:** Use of `escapeHTML` for identifiers within URL paths and query parameters.
**Learning:** `escapeHTML` is insufficient for URL contexts as it doesn't encode characters like `?`, `#`, or `/` which can lead to parameter injection or broken links. OSM IDs are usually numeric but should be treated as untrusted strings.
**Prevention:** Always use `encodeURIComponent` for dynamic metadata when constructing URL components, even if the data is expected to be alphanumeric. Reserved `escapeHTML` for HTML text content and generic attribute values (excluding URLs).
