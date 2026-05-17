## 2025-05-15 - [XSS in Foreign Phone Numbers Report]
**Vulnerability:** Raw OpenStreetMap tag values and region names were injected into the HTML report via `innerHTML` without escaping in `createPhoneForeignFixRows`.
**Learning:** Even when using helper functions like `getIconHtml` that return HTML, subsequent concatenation with raw data can re-introduce vulnerabilities if not carefully managed. The code assumed `phone` (a raw tag value) was safe to display as-is.
**Prevention:** Always wrap user-controllable data in `escapeHTML()` before including it in any string that will be assigned to `innerHTML`. Use `textContent` where possible for simple text updates.
