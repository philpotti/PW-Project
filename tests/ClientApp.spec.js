const { test, expect } = require('@playwright/test');

test('Browser context Playwright Test', async ({ page }) => {

    await page.goto('https:rahulshettyacademy.com/client')
    await page.locator('#userEmail').type('imhaslop@gmail.com');
    await page.locator('#userPassword').fill('Passwd321@_');
    await page.locator('[class*="login-btn"]').click();

    // await page.waitForLoadState('networkidle'); /* This makes the framework to wait till everything else is loaded on the page to carry on with the steps. Avoids innecesary waits */
    await page.locator('[class*="card-body"] b').first().waitFor(); /* This is a different way to wait for the element/s to be visible. waitForLoadState() method can be a little flaky */
    const titles = await page.locator('[class*="card-body"] b').allTextContents();
    console.log(titles);

});


// imhaslop@gmail.com
// Passwd321@_