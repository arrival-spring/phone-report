# Tidy's Journal - Architectural Debt

## 2025-05-22 - Improving Modularity and Readability in Client Utilities

**Vulnerability:**
Not a direct security vulnerability, but an architectural one: `calculateBufferedBBox` was being used in `src/client/report-osm-edit.js` without being exported from `src/client/report-utils.js` or imported into the consumer. In a standard ESM environment, this would cause a `ReferenceError`. The project likely works because these scripts are bundled or included in a way that puts them in the global scope, but it's poor practice for maintainability.

**Learning:**
Always ensure that shared utility functions are explicitly exported and imported, even if the runtime environment (like a browser global scope) might seem to permit implicit sharing. It makes dependencies clear and the code more resilient to changes in the build process.

**Prevention:**
Enforce explicit ESM exports/imports for all shared logic. Refactor complex nested ternaries into clearer control structures like `if/else` or `switch` to reduce cognitive load for future maintainers.
