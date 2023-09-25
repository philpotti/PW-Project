const { test, expect } = require('@playwright/test');

test.only('Playwright special locators', async ({ page }) => {
    
    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').click();
    await page.getByLabel('Gender').selectOption('Female');
    }
);