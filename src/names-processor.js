import fs from 'fs';
import { createBaseItem } from './data-processor.js';

const NAME_LOCALIZED_REGEX = /^name(?::([a-z]{2,3}(?:-[a-zA-Z]{4,})?(?:-[a-zA-Z]{4,})?))$/;

const BELGIUM_REGION_LANGUAGES = {
    'BE-BRU': [['fr', 'nl']], // Strict: Only FR - NL
    'BE-VLG': [
        ['nl', 'fr'],
        ['fr', 'nl'],
    ], // Flexible
    'BE-WAL': [
        ['fr', 'nl'],
        ['nl', 'fr'],
        ['fr', 'de'],
        ['de', 'fr'],
    ], // Flexible
};

/**
 * Validates multilingual names on OpenStreetMap elements, ensuring the primary 'name' tag
 * matches at least one of the localized 'name:*' tags or follow specific regional conventions.
 *
 * @param {AsyncIterable<Object>} elementStream - Async stream of GeoJSON-like OSM elements.
 * @param {string} countryCode - Country or region code for specific validation rules (e.g., 'BE-BRU').
 * @param {string} tmpFilePath - Path to a temporary file for storing invalid items.
 * @returns {Promise<{
 *   totalCount: number,
 *   invalidCount: number,
 *   missingNamesCount: number
 * }>} Breakdown of total checked elements, invalid elements, and those missing a primary name.
 */
export async function validateNames(elementStream, countryCode, tmpFilePath) {
    const fileStream = fs.createWriteStream(tmpFilePath);
    fileStream.write('[\n');
    let isFirstItem = true;

    let totalCount = 0;
    let invalidCount = 0;
    let missingNamesCount = 0;

    for await (const element of elementStream) {
        if (!element.properties) continue;

        const tags = element.properties;

        const nameTags = {};
        let nameTagsCount = 0;
        const primaryName = tags['name'];
        let hasPrimaryNameMatch = false;

        for (const key in tags) {
            if (key.startsWith('name:') && NAME_LOCALIZED_REGEX.test(key)) {
                const tagValue = tags[key];
                nameTags[key] = tagValue;
                nameTagsCount++;
                if (primaryName && tagValue === primaryName) {
                    hasPrimaryNameMatch = true;
                }
            }
        }

        if (nameTagsCount === 0) continue;

        totalCount++;

        // Condition 1: There is no 'name' tag
        // Condition 2: There are localised names (name:*) and none of them match the primary name
        let isInvalid = !primaryName || !hasPrimaryNameMatch;

        if (isInvalid) {
            const validPairs = BELGIUM_REGION_LANGUAGES[countryCode] || [];

            // Check if primaryName matches any allowed joined pair for the region
            const isValidCombo = validPairs.some(([langA, langB]) => {
                const valA = nameTags[`name:${langA}`];
                const valB = nameTags[`name:${langB}`];
                return valA && valB && primaryName === `${valA} - ${valB}`;
            });

            if (isValidCombo) isInvalid = false;
        }

        if (!primaryName) missingNamesCount++;

        if (isInvalid) {
            invalidCount++;
            const item = {
                ...createBaseItem(element),
                nameTags,
            };

            if (!isFirstItem) {
                fileStream.write(',\n');
            }

            // Convert Maps and nested Maps
            fileStream.write(
                JSON.stringify(item, (key, value) => {
                    if (value instanceof Map) {
                        return Object.fromEntries(value);
                    }
                    return value;
                })
            );
            isFirstItem = false;
        }
    }

    fileStream.write('\n]');
    fileStream.end();

    await new Promise(resolve => fileStream.on('finish', resolve));

    return { totalCount, invalidCount, missingNamesCount };
}
