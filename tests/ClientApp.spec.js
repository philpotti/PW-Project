const { test, expect } = require('@playwright/test');

test.only('Browser context Playwright Test', async ({ page }) => {

    await page.goto('https:rahulshettyacademy.com/client')
    await page.locator('#userEmail').type('imhaslop@gmail.com');
    await page.locator('#userPassword').fill('Passwd321@_');
    await page.locator('[class*="login-btn"]').click();

    const titles = await page.locator('[class*="card-body"] b').allTextContents();

    console.log(titles);

});


// imhaslop@gmail.com
// Passwd321@_