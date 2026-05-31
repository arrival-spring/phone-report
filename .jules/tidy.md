## Refactoring Pattern: Standardizing Map Serialization

To avoid duplicating logic for converting `Map` objects to plain objects during JSON serialization, use the `mapReplacer` utility from `src/data-processor.js`.

```javascript
import { mapReplacer } from './data-processor.js';
// ...
JSON.stringify(data, mapReplacer);
```

This pattern has been applied to `phone-processor.js`, `names-processor.js`, and `opening-hours-processor.js`.

## Style & Conventions: Processor Variable Naming

Standardize the naming of the primary invalid item counter as `invalidCount` across all processor modules. This ensures consistency with the expected return object properties in `main.js`.
