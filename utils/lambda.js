import JsonUtility from '../utils/json_utility.js';

/* -------------------------------
   Read LambdaTest credentials
-------------------------------- */
const lambdatest = JsonUtility.getConfigValue('lambdatest');

let LT_USERNAME;
let LT_ACCESS_KEY;
let IS_LAMBDATEST = false;

if (lambdatest && lambdatest.includes(',')) {
    [LT_USERNAME, LT_ACCESS_KEY] = lambdatest
        .split(',')
        .map(v => v.trim());
    IS_LAMBDATEST = true;
}

/* -------------------------------
   Lambda Utility Class
-------------------------------- */
export class Lambda {

    /* -------- Browser Projects -------- */
    static getProjects(browser) {
        if (!IS_LAMBDATEST) {
            return [];
        }

        const baseCaps = {
            platform: 'Windows 11',
            build: 'Playwright Demo WebShop',
            user: LT_USERNAME,
            accessKey: LT_ACCESS_KEY,
            network: true,
            video: true,
            console: true,
            resolution: '1920x1080',
        };

        const browserCaps = {
            chrome: {
                browserName: 'Chrome',
                browserVersion: 'latest',
            },
            firefox: {
                browserName: 'Firefox',
                browserVersion: 'latest',
            },
            safari: {
                browserName: 'Safari',
                browserVersion: 'latest',
            },
        };

        const browsersToRun =
            browser === 'all'
                ? Object.keys(browserCaps)
                : [browser];

        return browsersToRun.map((browserKey) => {
            if (!browserCaps[browserKey]) {
                throw new Error(`Unsupported browser for LambdaTest: ${browserKey}`);
            }

            const capabilities = {
                ...baseCaps,
                ...browserCaps[browserKey],
                name: `LambdaTest - ${browserKey.toUpperCase()}`,
            };

            return {
                name: `LambdaTest-${browserKey}`,
                use: {
                    browserName: 'chromium', // mandatory for LambdaTest
                    connectOptions: {
                        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
                            JSON.stringify(capabilities)
                        )}`,
                    },
                },
            };
        });
    }

    static async setTestName(page, testInfo) {
        if (!IS_LAMBDATEST) return;

        await page.evaluate((testTitle) => {
            // @ts-ignore
            window.lambdatest_action = JSON.stringify({
                action: 'setTestName',
                arguments: {
                    name: testTitle
                }
            });
        }, testInfo.title);  // Pass testInfo.title as a parameter
    }

    static async setTestStatus(page, testInfo) {
        if (!IS_LAMBDATEST) return;

        const status = testInfo.status === 'passed' ? 'passed' : 'failed';
        const remark = testInfo.error?.message || 'Executed via Playwright';

        await page.evaluate((data) => {
            // @ts-ignore
            window.lambdatest_action = JSON.stringify({
                action: 'setTestStatus',
                arguments: {
                    status: data.status,
                    remark: data.remark
                }
            });
        }, { status, remark });  // Pass as an object
    }
}
