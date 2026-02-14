const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Get the latest report directory
const reportsDir = './reports';
const dirs = fs.readdirSync(reportsDir).filter(file => {
  return fs.statSync(path.join(reportsDir, file)).isDirectory();
});

if (dirs.length === 0) {
  console.log('No reports found');
  process.exit(0);
}

// Sort directories by timestamp (newest first)
dirs.sort().reverse();
const latestDir = dirs[0];

const jsonFile = path.join(reportsDir, latestDir, 'cucumber-report.json');
const htmlFile = path.join(reportsDir, latestDir, 'cucumber-report.html');

if (!fs.existsSync(jsonFile)) {
  console.log('JSON report not found');
  process.exit(0);
}

const options = {
  theme: 'bootstrap',
  jsonFile: jsonFile,
  output: htmlFile,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': 'STAGING',
    'Browser': 'Chrome',
    'Platform': 'Windows 11',
    'Parallel': 'Scenarios',
    'Executed': 'Local'
  }
};

reporter.generate(options);

console.log(`Report generated at: ${htmlFile}`);