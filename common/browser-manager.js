const { chromium, firefox, webkit } = require('playwright');
const JsonUtility = require('../utils/json_utility.js');

class BrowserManager {
    static browser = null;
    static context = null;
    static page = null;

    static async launchBrowser() {
        const browserType = JsonUtility.getConfigValue('browser') || 'chromium';
        const headless = JsonUtility.getConfigValue('headless') !== false;
        const docker = JsonUtility.getConfigValue('docker') === true;
        const dockerEndpoint = JsonUtility.getConfigValue('dockerport') || 'ws://localhost:3000';

        const browserMap = {
            chromium: chromium,
            firefox: firefox,
            webkit: webkit,
            chrome: chromium
        };

        const browserEngine = browserMap[browserType.toLowerCase()] || chromium;

        if (docker) {
            // Connect to Docker container browser
            const wsEndpoint = dockerEndpoint.startsWith('ws://') || dockerEndpoint.startsWith('wss://')
                ? dockerEndpoint
                : `ws://${dockerEndpoint}`;

            console.log(`Connecting to Docker browser at: ${wsEndpoint}`);
            this.browser = await chromium.connect(wsEndpoint);
        } else {
            // Launch local browser
            this.browser = await browserEngine.launch({ headless: headless, slowMo: 50 });
        }
    }

    static async createContext() {
        if (!this.browser) {
            throw new Error('Browser not launched. Call launchBrowser() first.');
        }

        this.context = await this.browser.newContext({
            viewport: { width: 1920, height: 1080 }
        });

        this.page = await this.context.newPage();

        const url = JsonUtility.getConfigValue('url');
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    static getPage() {
        if (!this.page) {
            throw new Error('Page not created. Call createContext() first.');
        }
        return this.page;
    }

    static async closeContext() {
        try {
            if (this.page && !this.page.isClosed()) {
                await this.page.close();
            }
            if (this.context) {
                await this.context.close();
            }
        } catch (error) {
            console.error('Error closing context:', error.message);
        } finally {
            this.context = null;
            this.page = null;
        }
    }

    static async closeBrowser() {
        try {
            // Close any remaining contexts first
            await this.closeContext();
            if (this.browser) {
                await this.browser.close();
                this.browser = null;
            }
        } catch (error) {
            console.error('Error closing browser:', error.message);
        }
    }
}

module.exports = BrowserManager;
