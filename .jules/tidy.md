
## Refactoring Pattern: Consistent naming and structure in processors
In `src/names-processor.js`, `incompleteNames` was renamed to `invalidCount` to align with `phone-processor.js` and `opening-hours-processor.js`. Static data structures were hoisted to the module scope to improve readability and performance by avoiding re-creation inside the processing loop.

## Serialization Logic: Map-to-Object serialization
When using `Map` for data storage that needs to be serialized to JSON, ensure the `JSON.stringify` replacer includes logic to convert `Map` to a plain object (`Object.fromEntries(value)`). This pattern is used across processors to maintain a clean internal data structure while ensuring correct output format for the client-side reports.
