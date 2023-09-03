const { test } = require('@playwright/test');

test('Browser context Playwright Test', async ({ browser }) => {
    chrome - plugins / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

});

test('Page Playwright test', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

});