const fs = require('fs');
const path = require('path');

class ScreenshotUtil {

     static logMessages = [];
    /**
     * Capture screenshot for Cucumber (using World context)
     * @param {Object} page - Playwright page object
     * @param {Object} world - Cucumber World context (this)
     * @param {string} message - Screenshot name/description
     */
    static async captureForCucumber(page, world) {
        try {
            const screenshot = await page.screenshot({ fullPage: true });
            // Attach to Cucumber report
            await world.attach(screenshot, 'image/png');
        } catch (error) {
            console.error(`Failed to capture screenshot: ${error.message}`);
            return null;
        }
    }

    static async addingLogCucumber(page, world, logMessage) {
        try {
            await world.attach(logMessage, 'text/plain');
        } catch (error) {
            console.error(`Failed to attach log message: ${error.message}`);
        }
    }

    /**
     * Generate screenshot filename based on step/scenario
     * @param {string} stepText - Step text
     * @param {string} status - Step status (passed/failed)
     * @returns {string} - Sanitized filename
     */
    static generateFilename(stepText, status = 'failed') {
        const timestamp = Date.now();
        const sanitized = stepText.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
        return `${sanitized}-${status}-${timestamp}.png`;
    }
}

module.exports = ScreenshotUtil;