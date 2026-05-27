import { validateHoursTag } from './src/opening-hours-processor.js';
import { performance } from 'perf_hooks';

const baseTestCases = [
    { value: 'Mo-Fr 08:00-17:00', tag: 'opening_hours' },
    { value: 'MO-FR 08:00-17:00', tag: 'opening_hours' },
    { value: 'Mon-Fri 08:00-17:00', tag: 'opening_hours' },
    { value: 'Mo-Fr 9:00-10:30', tag: 'opening_hours' },
    { value: 'Mo-Fr 9:00-15:00', tag: 'opening_hours' },
    { value: 'Mo 10:00-16:30 Tu 10:00-16:00', tag: 'opening_hours' },
    { value: 'Sometimes', tag: 'opening_hours' },
    { value: 'Mo,We,Th 09:30-18:30;Tu,Fr 09:30-20:30;Sa 09:00-18:30;Su 09:30-18:00', tag: 'opening_hours' },
    { value: 'Mo-Th, Sa 10:00-17:00; Fr 10:00-18:00; Su 11:00-15:00', tag: 'opening_hours' },
    { value: '24/7', tag: 'opening_hours' },
    { value: 'Mo-Su 00:00-24:00', tag: 'opening_hours' },
    { value: 'Jan 1 off; Mo-Fr 09:00-17:00', tag: 'opening_hours' },
];

const ITERATIONS = 100; // 100 sets of unique-ish strings

function runBenchmark() {
    console.log(`Running benchmark with ${ITERATIONS * baseTestCases.length} unique-ish calls (bypassing cache)...`);

    const start = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
        for (const testCase of baseTestCases) {
            // Add a comment to bypass cache: "Mo-Fr 08:00-17:00" -> "Mo-Fr 08:00-17:00 // cache bust 1"
            const value = `${testCase.value} // ${i}`;
            validateHoursTag(value, testCase.tag, 'en');
        }
    }
    const end = performance.now();

    const totalTime = end - start;
    const averageTime = totalTime / (ITERATIONS * baseTestCases.length);

    console.log(`Total time: ${totalTime.toFixed(2)}ms`);
    console.log(`Average time per call: ${averageTime.toFixed(4)}ms`);
}

runBenchmark();
