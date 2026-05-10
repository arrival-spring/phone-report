## 2025-05-22 - Refactor i18n translation logic to be data-driven

**Learning:**
The `translate` function in `src/i18n.js` contained a long `if-else if` chain that was hard to read and maintain. Each new key with placeholders required a new branch in the logic.

**Action:**
Refactored the translation logic by introducing a `KEY_PLACEHOLDERS` mapping that defines the expected placeholders for each translation key. The `translate` function was updated to use this mapping for positional replacements, making it more concise and easier to extend. Also added better error handling during the initial loading of locale JSON files.
