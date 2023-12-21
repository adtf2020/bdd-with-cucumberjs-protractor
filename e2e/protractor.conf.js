const Reporter = require("./src/support/reporter");
exports.config = {
  directConnect: true,
  chromeDriver: 'src/driver/chromedriver.exe',
  baseUrl: 'https://adtf2020-webapp.netlify.app/',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  getPageTimeout: 60000,
  allScriptsTimeout: 500000,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  capabilities: {
    acceptInsecureCerts: true,
    browserName: 'chrome',
    chromeOptions: {

      args: ["--disable-gpu", "--window-size=600,300" ]
    }
  },
  specs: ['src/features/Todos.feature'],
  onPrepare: async function () {
    browser.ignoreSynchronization = true;
    await browser.manage().window().maximize();
    browser.allScriptsTimeout = 10000;
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
  },
  cucumberOpts: {
    compiler: "ts:ts-node/register",
    format: ["json:./e2e/reports/json/cucumber_report.json","node_modules/cucumber-pretty"],
    tags: ["~@ignore"],
    require:
      [
        "src/support/*.ts",
        "src/steps-definitions/*.ts"
      ],
    strict: true
  },
  onComplete: () => {
    Reporter.createHTMLReport()
  }
}