const { BeforeAll, AfterAll, Before, After, setDefaultTimeout, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const JsonUtility = require('../utils/json_utility.js');
const BrowserManager = require('../common/browser-manager.js');
const ScreenshotUtil = require('../utils/screenshot_util.js');


// Increase timeout to 60 seconds
setDefaultTimeout(60000);


BeforeAll(async function () {
    console.log('BeforeAll: Global setup starting...');
});

Before(async function () {
    await BrowserManager.launchBrowser();
    console.log('Browser launched successfully');
    await BrowserManager.createContext();
    this.page = BrowserManager.getPage();
});

BeforeStep(async function ({ pickleStep }) {
    const stepText = pickleStep.text.toLowerCase();
});

AfterStep(async function ({ result, pickleStep, gherkinDocument }) {

    const page = BrowserManager.getPage();
    const stepText = pickleStep.text;
    const stepTextLower = stepText.toLowerCase();
    const log = ScreenshotUtil.logMessages.join('\n');
    if (log) {
        await ScreenshotUtil.addingLogCucumber(page, this, log);
        ScreenshotUtil.logMessages = [];
    }

    // 🔎 Get keyword directly in a simpler way
    const stepKeyword = gherkinDocument.feature.children
        .flatMap(child => child.scenario?.steps || [])
        .find(step => step.text === stepText)?.keyword?.trim() || '';

    const isFailed = result.status === Status.FAILED;
    const isThenStep = stepKeyword === 'Then';
    const isVerifyStep = stepTextLower.includes('verify');

    if (isFailed || isThenStep || isVerifyStep) {
        await ScreenshotUtil.captureForCucumber(page, this, stepText);
    }
});



After(async function () {
    console.log('Closing browser...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    await BrowserManager.closeBrowser();
    console.log('Browser closed successfully');

});

AfterAll(async function () {
    console.log('AfterAll executed successfully');
});