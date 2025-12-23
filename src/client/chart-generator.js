let chartData = null;
let progressChart = null;
let progressChartPercent = null;

function getAxisColour() {
    const isDarkMode = document.documentElement.classList.contains('dark');
    return isDarkMode ? '#9ca3af' : '#6b7280';
}

function updateCharts(days) {
    if (!chartData) return;

    const allData = REPORT_COUNTRY_KEY === 'ALL' ? chartData.countries : chartData.divisions;
    const regionKeys = Object.keys(allData);

    const allDates = new Set();
    Object.values(allData).forEach(regionArray => {
        regionArray.forEach(d => allDates.add(d.date));
    });
    const sortedLabels = Array.from(allDates).sort();

    const endDate = new Date(sortedLabels[sortedLabels.length - 1]);
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - days);

    const labels = sortedLabels.filter(date => new Date(date) >= startDate);

    // If charts exist, update them
    if (progressChart && progressChartPercent) {
        progressChart.data.labels = labels;
        progressChartPercent.data.labels = labels;

        progressChart.data.datasets.forEach((dataset, index) => {
            const regionKey = regionKeys[index];
            const regionHistory = allData[regionKey];
            const dataPoints = labels.map(date => {
                const entry = regionHistory.find(d => d.date === date);
                return entry ? entry.invalidCount : null;
            });
            dataset.data = dataPoints;
        });

        progressChartPercent.data.datasets.forEach((dataset, index) => {
            const regionKey = regionKeys[index];
            const regionHistory = allData[regionKey];
            const dataPoints = labels.map(date => {
                const entry = regionHistory.find(d => d.date === date);
                if (entry && entry.totalNumbers > 0) {
                    return ((entry.invalidCount / entry.totalNumbers) * 100).toFixed(2);
                }
                return null;
            });
            dataset.data = dataPoints;
        });

        progressChart.update();
        progressChartPercent.update();
        return;
    }

    // --- Otherwise, create the charts for the first time ---
    const axisColour = getAxisColour();
    const semiTransparentGridColour = axisColour + '40';
    const colours = generateColours(regionKeys.length);

    // Chart for raw counts
    const ctxCount = document.getElementById('progressChart').getContext('2d');
    const countDatasets = regionKeys.map((region, index) => {
        const regionHistory = allData[region];
        const displayName = regionHistory.length > 0 ? (regionHistory[0].name || region) : region;
        const dataPoints = labels.map(date => {
            const entry = regionHistory.find(d => d.date === date);
            return entry ? entry.invalidCount : null;
        });
        return {
            label: displayName,
            data: dataPoints,
            fill: false,
            borderColor: colours[index],
            pointBackgroundColor: colours[index],
            tension: 0.1,
            yAxisID: 'y'
        };
    });

    progressChart = new Chart(ctxCount, {
        type: 'line',
        data: { labels: labels, datasets: countDatasets },
        options: {
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { color: axisColour }, grid: { color: semiTransparentGridColour, borderColor: axisColour } },
                x: { ticks: { color: axisColour }, grid: { color: semiTransparentGridColour, borderColor: axisColour } }
            },
            plugins: {
                legend: { labels: { color: axisColour, usePointStyle: true, pointStyle: 'circle' } }
            }
        }
    });

    // Chart for percentage
    const ctxPercent = document.getElementById('progressChartPercent').getContext('2d');
    const percentDatasets = regionKeys.map((region, index) => {
        const regionHistory = allData[region];
        const displayName = regionHistory.length > 0 ? (regionHistory[0].name || region) : region;
        const dataPoints = labels.map(date => {
            const entry = regionHistory.find(d => d.date === date);
            if (entry && entry.totalNumbers > 0) {
                return ((entry.invalidCount / entry.totalNumbers) * 100).toFixed(2);
            }
            return null;
        });
        return {
            label: displayName,
            data: dataPoints,
            fill: false,
            borderColor: colours[index],
            pointBackgroundColor: colours[index],
            tension: 0.1,
        };
    });

    progressChartPercent = new Chart(ctxPercent, {
        type: 'line',
        data: { labels: labels, datasets: percentDatasets },
        options: {
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0,
                    ticks: { color: axisColour, callback: value => value + '%' },
                    grid: { color: semiTransparentGridColour, borderColor: axisColour }
                },
                x: { ticks: { color: axisColour }, grid: { color: semiTransparentGridColour, borderColor: axisColour } }
            },
            plugins: {
                legend: { labels: { color: axisColour, usePointStyle: true, pointStyle: 'circle' } },
                tooltip: {
                    callbacks: {
                        label: context => {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) label += context.parsed.y + '%';
                            else label += 'No Data';
                            return label;
                        }
                    }
                }
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const timeRangeSlider = document.getElementById('timeRange');
    const rangeValueLabel = document.getElementById('rangeValue');

    fetch('./history-data.json')
        .then(response => response.json())
        .then(data => {
            chartData = data;
            updateCharts(timeRangeSlider.value); // Initial chart generation

            timeRangeSlider.addEventListener('input', () => {
                const days = timeRangeSlider.value;
                if (days == 365) {
                    rangeValueLabel.textContent = '1 year';
                } else {
                    rangeValueLabel.textContent = days + ' days';
                }
                updateCharts(days);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function generateColours(numColours) {
    const colours = [];
    const colourPalette = [
        'oklch(63.7% 0.237 25.331)', 'oklch(76.8% 0.233 130.85)', 'oklch(71.5% 0.143 215.221)',
        'oklch(62.7% 0.265 303.9)', 'oklch(64.5% 0.246 16.439)', 'oklch(55.4% 0.046 257.417)',
        'oklch(76.9% 0.188 70.08)', 'oklch(69.6% 0.17 162.48)', 'oklch(55.3% 0.013 58.071)',
        'oklch(70.5% 0.213 47.604)', 'oklch(72.3% 0.219 149.579)', 'oklch(62.3% 0.214 259.815)',
        'oklch(66.7% 0.295 322.15)', 'oklch(55.6% 0 0)', 'oklch(79.5% 0.184 86.047)',
        'oklch(70.4% 0.14 182.503)', 'oklch(68.5% 0.169 237.323)', 'oklch(58.5% 0.233 277.117)',
        'oklch(60.6% 0.25 292.717)', 'oklch(65.6% 0.241 354.308)', 'oklch(55.1% 0.027 264.364)',
        'oklch(55.2% 0.016 285.938)'
    ];
    for (let i = 0; i < numColours; i++) {
        colours.push(colourPalette[i % colourPalette.length]);
    }
    return colours;
}
