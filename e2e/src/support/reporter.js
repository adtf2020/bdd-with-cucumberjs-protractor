const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const jsonReports = path.join(process.cwd(), './e2e/reports/json');
const htmlReports = path.join(process.cwd(), './e2e/reports/html');
const targetJson = jsonReports + '/cucumber_report.json';
const cucumberReporterOptions = {
  jsonFile: targetJson,
  output: htmlReports + '/cucumber_reporter.html',
  reportSuiteAsScenarios: true,
  theme: 'bootstrap'
};
const Reporter = /** @class */ (function () {
  function Reporter() {
  }

  Reporter.createDirectory = function (dir) {
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
  };
  Reporter.createHTMLReport = function () {
    try {
      reporter.generate(cucumberReporterOptions);
    }
    catch (err) {
      if (err) {
        throw new Error('Failed to save cucumber test results to json file.');
      }
    }
  };
  return Reporter;
}());
module.exports = Reporter;
