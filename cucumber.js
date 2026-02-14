const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];

module.exports = {
  default: {
    require: [
      './step-definitions/**/*.js',
      './common/**/*.js'
    ],
    paths: ['features/**/*.feature'],
    format: [
      'progress',
      `json:reports/${timestamp}/cucumber-report.json`,
      `html:reports/${timestamp}/cucumber-report.html`
    ],
    publishQuiet: true
  }
};