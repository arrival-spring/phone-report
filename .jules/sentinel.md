## 2025-05-15 - Sanitization at Rendering Point vs. Data Structure

**Vulnerability:** XSS risks in report labels and URL parameter injection in JOSM links.
**Learning:** Sanitizing data within core logic or data structures (e.g., escaping keys in an object) can cause regressions if those keys are used for lookups elsewhere (like in local storage or for creating OSM notes). Sanitization should be deferred to the rendering point.
**Prevention:** Always apply `escapeHTML` as late as possible (at the point of UI rendering) and use `encodeURIComponent` for dynamic components of external URLs to prevent parameter injection.
