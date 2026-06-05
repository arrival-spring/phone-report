# Tidy 🧹 Journal

## Refactorings

### Centralized Button State Management (src/client/report-ui-controller.js)
- **What:** Consolidated redundant logic for enabling/disabling 'Save', 'Undo', and 'Redo' buttons into a `setButtonState(id, enabled)` helper.
- **Why:** Code smell identified: several near-identical blocks of code performing DOM lookups and applying `enableGrayBtn`/`disableGrayBtn`.
- **Result:** Reduced boilerplate and improved readability in `setUpSaveBtn` and `setUpUndoRedoBtns` by using boolean expressions. Improved robustness by standardizing null-checks for button elements.
