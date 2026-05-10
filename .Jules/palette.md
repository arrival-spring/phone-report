## 2025-05-10 - Accessibility & Keyboard Navigation
**Learning:** Icon-only buttons (like theme toggles or back links on mobile) are invisible to screen readers without ARIA labels and lack visual feedback for keyboard users if focus states are suppressed by default reset styles.
**Action:** Always provide `aria-label` for icon-only components and implement `focus-visible` rings to support accessibility without compromising visual design for mouse users.
