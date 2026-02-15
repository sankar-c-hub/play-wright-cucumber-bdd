const JsonUtility = require('./utils/json_utility.js');
const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];

const isParallelEnabled = JsonUtility.getConfigValue('parallel') === true;

module.exports = {
  default: {
    require: [
      './step-definitions/**/*.js',
      './common/**/*.js'
    ],
    paths: ['features/**/*.feature'],

    // 👇 Conditional Parallel
    ...(isParallelEnabled && { parallel: 5 }),

    format: [
      'progress',
      `json:reports/${timestamp}/cucumber-report.json`,
      `html:reports/${timestamp}/cucumber-report.html`
    ],

    publishQuiet: true
  }
};
