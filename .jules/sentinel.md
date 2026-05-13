## 2026-05-13 - [Cross-Site Scripting (XSS) and Tab-nabbing in Report Rendering]
**Vulnerability:** User-provided content from OpenStreetMap (usernames and feature names) was being rendered directly into the HTML without escaping, creating XSS risks. Additionally, external website links lacked `rel="noopener noreferrer"`, exposing users to tab-nabbing attacks.
**Learning:** Rendering logic often prioritizes functionality and ease of implementation, leading to the omission of security-critical escaping, especially when dealing with data from supposedly trusted or "semi-structured" external sources like OSM.
**Prevention:** Always escape user-controllable data before rendering it in the DOM. Use `rel="noopener noreferrer"` for all external links that open in a new tab.
