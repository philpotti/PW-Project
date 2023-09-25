const { test, expect } = require('@playwright/test');

test('UI Constrols', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const userName = page.locator('#username');
    const singInBtn = page.locator('#signInBtn');
    const dropDown = await page.locator('select.form-control');
    await dropDown.selectOption("Consultant");
    // await page.pause();

    await page.locator('.checkmark').last().click();
    await page.locator('#okayBtn').click();
    console.log(await page.locator('.checkmark').last().isChecked()); /* Will print a boolean true or false if it is checked or not */
    await expect(page.locator('.checkmark').last()).toBeChecked();
    // Assertion

});
