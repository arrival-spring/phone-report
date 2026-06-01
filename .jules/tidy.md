### Centralized Map Serialization
- **Issue:** Duplicated inline logic for serializing `Map` objects during `JSON.stringify` across `names-processor.js`, `opening-hours-processor.js`, and `phone-processor.js`.
- **Solution:** Extracted logic into a shared `mapReplacer` utility in `src/data-processor.js`.
- **Impact:** Improved DRYness and consistency across data processors.

### Standardized Processor Variable Naming
- **Issue:** Inconsistent naming of the primary invalid item counter in `names-processor.js` (`incompleteNames`) vs other processors (`invalidCount`).
- **Solution:** Renamed `incompleteNames` to `invalidCount` in `src/names-processor.js`.
- **Impact:** Better internal consistency and readability.
