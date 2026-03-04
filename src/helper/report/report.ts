const report = require("multiple-cucumber-html-reporter");

// Customizing the multiple cucumber report info
report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "Sample Report",
    pageTitle: "Demo report",
    displayDuration: false,
    metadata: {
        browser: {
            name: "Chrome",
            version: "134",
        },
        device: "LAPTOP-KB5PA8T0",
        platform: {
            name: "Windows",
            version: "11",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Prem Project", value: process.env.npm_config_TAGS || '' },
            { label: "Release", value: "2.0.0" },
            { label: "Cycle", value: "Smoke-2" }
        ],
    },
});
