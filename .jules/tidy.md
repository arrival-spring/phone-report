# Tidy's Journal - Architectural Debt

## Recurring Code Smells
- **Function Bloat in UI Controllers**: Client-side rendering functions (e.g., `renderPaginatedSection` in `report-ui-controller.js`) tended to accumulate complex conditional logic for UI state (like button layouts) that can be extracted into pure helper functions for better testability and readability.
- **Misleading Parameter Naming**: Generic names like `selector` were used for parameters that are expected to be `HTMLElement` objects, not CSS selector strings. Transitioning to `element` improves clarity.

## Refactoring Patterns
- **Pure Layout Helpers**: Logic that determines which UI components to show based on state (e.g., `getSortButtonLayout`) should be isolated from the DOM manipulation logic.
- **Ternary Simplification**: Simple mapping/styling logic (e.g., `getSortStyle`) is often more readable as a concise ternary expression when it doesn't involve complex branching.
