const { test, expect } = require('@playwright/test');

test('Browser context Playwright Test', async ({ browser }) => {
    // chrome - plugins / cookies
    /* Offial Playwright documentation website: playwright.dev/docs/test-assertions */

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const singInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await userName.fill('rahulshetty');
    await page.locator('[type="password"]').fill('learning');
    await singInBtn.click();
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await singInBtn.click();

    console.log(await cardTitles.first().textContent());  /* Different way to get the first element from an array is first(). method */
    // console.log(await cardTitles.last().textContent());   /* Different way to get the last element from an array is last(). method */
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('UI Controls', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const singInBtn = page.locator('#signInBtn');
    const dropDown = page.locator('select.form-control');
    const documentLink = page.locator('[href*="documents-request"]');

    await dropDown.selectOption('Consultant');
    // await page.pause();  /** This is used to debug mainly*/
    await page.locator('.checkmark').last().click();
    await expect(page.locator('.checkmark').last()).toBeChecked(); // Or isChecked that will return a boolean value
    console.log(await page.locator('.checkmark').last().isChecked());
    await page.locator('#okayBtn').click();

    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class","blinkingText");

});

test('Child windows handling', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    const documentLink = page.locator('[href*="documents-request"]');
    const userName = page.locator('#username');

    // await page.pause();
    const [newPage] = await Promise.all([ 
        context.waitForEvent('page'),
        documentLink.click(),
    ])

    const text = await newPage.locator(':text("Please email us at")').textContent();
    const arrayText = text.split('@');
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await userName.fill(domain);
    // await page.pause();
    console.log(await userName.fill(domain));
});

// npx playwright codegen www.google.com ¡¡EXCELLENT TO GET SCRIPT BY RECORDING!!