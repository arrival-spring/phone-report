## 2025-11-20 - [XSS via OSM Metadata Injection]
**Vulnerability:** Raw OpenStreetMap metadata (IDs, types, tag names, icon names) was being directly interpolated into HTML attributes and content, creating multiple Cross-Site Scripting (XSS) vectors.
**Learning:** Even "trusted" metadata from an external API like OSM must be treated as user-controlled data when rendered in a browser. Standard auto-escaping (like Eta's `<%=`) is insufficient when building complex HTML strings in JavaScript or injecting into attributes that aren't auto-escaped.
**Prevention:** Always use `escapeHTML` for dynamic data in HTML attributes and `encodeURIComponent` for URL components. Centralize escaping logic and ensure it is imported in all UI-generating modules.
