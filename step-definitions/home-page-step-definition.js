import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { DemoWebShopPage } from '../pages/demo_web_shop_page.js';
import JsonUtility from '../utils/json_utility.js';
import ScreenshotUtil from '../utils/screenshot_util.js';

Given('I have access to application', async function () {
  const url = JsonUtility.getConfigValue('url');
  ScreenshotUtil.logMessages.push(`Navigating to: ${url}`);

});


When('I clicked Books in demo web shop', async function () {
  const demoPage = new DemoWebShopPage(this.page);
  await demoPage.booksLink.click();
});

Then('verify displayed Books in demo web shop', async function () {
  const demoPage = new DemoWebShopPage(this.page);
  await expect(demoPage.booksLink).toBeVisible();
});

Then('verify displayed Computers in demo web shop', async function () {
  const demoPage = new DemoWebShopPage(this.page);
  await expect(demoPage.computersLink).toBeVisible();
});

When('I clicked Computers in demo web shop', async function () {
  const demoPage = new DemoWebShopPage(this.page);
  demoPage.computersLink.click();
});
Then('verify displayed Electronics in demo web shop', async function () {
  const demoPage = new DemoWebShopPage(this.page);
  await expect(demoPage.electronicsLink).toBeVisible();
});

When('I clicked Electronics in demo web shop', async function () {
  const demoPage = new DemoWebShopPage(this.page);
  await demoPage.electronicsLink.click();
});

Then('verify displayed Apparel Shoes in demo web shop', async function () {
  const demoPage = new DemoWebShopPage(this.page);
  await expect(demoPage.apparelShoesLink).toBeVisible();
});

When('I clicked Apparel Shoes in demo web shop', async function () {
  const demoPage = new DemoWebShopPage(this.page);
  await demoPage.apparelShoesLink.click();
});

Then('verify displayed Digital downloads in demo web shop', async function () {
  const demoPage = new DemoWebShopPage(this.page);
  await expect(demoPage.digitalDownloadsLink).toBeVisible();
});

When('I clicked Digital downloads in demo web shop', async function () {
  const demoPage = new DemoWebShopPage(this.page);
  await demoPage.digitalDownloadsLink.click();
});

Then('verify displayed Jewelry in demo web shop', async function () {
  const demoPage = new DemoWebShopPage(this.page);
  await expect(demoPage.jewelryLink).toBeVisible();
});

When('I clicked Jewelry in demo web shop', async function () {
  const demoPage = new DemoWebShopPage(this.page);
  await demoPage.jewelryLink.click();
});


Then('verify displayed Gift Cards in demo web shop', async function () {
  const demoPage = new DemoWebShopPage(this.page);
  await expect(demoPage.giftCardsLink).toBeVisible();
});

When('I clicked Gift Cards in demo web shop', async function () {
  const demoPage = new DemoWebShopPage(this.page);
  await demoPage.giftCardsLink.click();
});

Then('{string} is displayed with {string}', async function (pageTitle, content) {

});

