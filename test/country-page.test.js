import { jest } from '@jest/globals';

const store = {};
global.localStorage = {
    getItem: jest.fn(key => store[key] ?? null),
    setItem: jest.fn((key, value) => {
        store[key] = String(value);
    }),
    removeItem: jest.fn(key => {
        delete store[key];
    }),
    clear: jest.fn(() => {
        for (const k in store) delete store[k];
    }),
};

const mockElements = {};
function createMockElement(id) {
    if (!mockElements[id]) {
        mockElements[id] = {
            id,
            textContent: '',
            innerHTML: '',
            classList: { toggle: jest.fn() },
            dataset: {},
            querySelector: jest.fn(),
            querySelectorAll: jest.fn(() => []),
            appendChild: jest.fn(),
            addEventListener: jest.fn(),
        };
    }
    return mockElements[id];
}

global.document = {
    getElementById: jest.fn(id => createMockElement(id)),
    querySelectorAll: jest.fn(() => []),
    createElementNS: jest.fn(() => createMockElement('svg')),
    createElement: jest.fn(tag => createMockElement(tag)),
};

global.window = {
    matchMedia: jest.fn(() => ({ matches: false })),
};

const mockGroupedDivisionStats = {};

jest.unstable_mockModule('../src/client/config.js', () => ({
    reportType: 'phone',
    locale: 'en-GB',
    groupedDivisionStats: mockGroupedDivisionStats,
    safeCountryName: 'france',
}));

jest.unstable_mockModule('../src/client/i18n.js', () => ({
    translate: (key, locale, args) => {
        if (args?.percent) return `${args.percent}%`;
        return key;
    },
}));

jest.unstable_mockModule('../src/client/theme.js', () => ({
    initThemeToggle: jest.fn(),
}));

jest.unstable_mockModule('../src/client/background-colour.js', () => ({
    applyColors: jest.fn(),
}));

jest.unstable_mockModule('../src/client/report-state.js', () => ({
    UPLOADED_ITEMS_KEY: 'uploaded_2025-05-10',
}));

const { applyUploadedChanges } = await import('../src/client/country-page.js');

describe('country-page applyUploadedChanges', () => {
    beforeEach(() => {
        for (const k in store) delete store[k];
        for (const k in mockGroupedDivisionStats) delete mockGroupedDivisionStats[k];
        for (const k in mockElements) {
            mockElements[k].textContent = '';
        }
    });

    it('should accurately deduct autofixable and manual phone edits', () => {
        mockGroupedDivisionStats['Île-de-France'] = [
            { name: 'Paris', invalidCount: 10, autoFixableCount: 5, totalCount: 100 },
        ];

        const uploadedChanges = {
            france: {
                Paris: {
                    node: {
                        1: { _autoFixable: true, suggestedFixes: { phone: '+3312345678' } },
                        2: { _autoFixable: false, phone: '+3312345679' },
                    },
                },
            },
        };

        global.localStorage.setItem('uploaded_2025-05-10', JSON.stringify(uploadedChanges));

        applyUploadedChanges();

        expect(mockGroupedDivisionStats['Île-de-France'][0].invalidCount).toBe(8); // 10 - 2
        expect(mockGroupedDivisionStats['Île-de-France'][0].autoFixableCount).toBe(4); // 5 - 1
        expect(createMockElement('stats-box-invalid-count').textContent).toBe('8');
        expect(createMockElement('stats-box-fixable-count').textContent).toBe('4');
    });

    it('should leave counts unchanged on initial load when there are no uploaded changes for the timestamp', () => {
        mockGroupedDivisionStats['Île-de-France'] = [
            { name: 'Paris', invalidCount: 10, autoFixableCount: 5, totalCount: 100 },
        ];

        // No uploaded changes stored in localStorage for uploaded_2025-05-10

        applyUploadedChanges();

        expect(mockGroupedDivisionStats['Île-de-France'][0].invalidCount).toBe(10);
        expect(mockGroupedDivisionStats['Île-de-France'][0].autoFixableCount).toBe(5);
        expect(createMockElement('stats-box-invalid-count').textContent).toBe('10');
        expect(createMockElement('stats-box-fixable-count').textContent).toBe('5');
    });
});
