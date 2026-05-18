## 2025-05-22 - [URL Protocol Validation]
**Vulnerability:** XSS via `javascript:` and other dangerous URI schemes in the `website` tag.
**Learning:** `escapeHTML` is insufficient for `href` attributes as it doesn't prevent execution of scripts within the protocol handler.
**Prevention:** Always validate user-provided URLs against an allowlist of safe protocols (e.g., `http:`, `https:`) before rendering as clickable links.
