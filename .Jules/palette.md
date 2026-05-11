## 2025-05-11 - Icon-only Button Accessibility
**Learning:** Icon-only buttons (theme toggle, undo/redo, modal close) in the reports lack accessible names and clear focus indicators, which makes navigation difficult for screen reader and keyboard users.
**Action:** Always provide `aria-label` and `title` attributes for icon-only buttons and implement `focus-visible` rings for all interactive elements.
