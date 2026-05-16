## 2025-05-15 - Defense in Depth for XSS in Search and OSM Edits
**Vulnerability:** XSS via `innerHTML` and inline `onclick` handlers in client-side search and OSM edit components.
**Learning:** Even when data is "escaped" into HTML, injecting it into an `onclick` attribute can still lead to XSS because browsers decode HTML entities before JavaScript execution. Furthermore, complex UI state management with `innerHTML` is prone to escaping omissions.
**Prevention:** Use safe DOM APIs like `document.createElement`, `textContent`, and `addEventListener` instead of string-based `innerHTML` templates whenever possible. For unavoidable `innerHTML` usage, ensure all dynamic components are strictly escaped using a centralized, robust `escapeHTML` implementation.
