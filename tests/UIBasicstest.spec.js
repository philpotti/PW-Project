const { test, expect } = require('@playwright/test');

test.only('Browser context Playwright Test', async ({ browser }) => {
    // chrome - plugins / cookies
    /* Offial Playwright documentation website: playwright.dev/docs/test-assertions */

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const singInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await userName.type('rahulshetty');
    await page.locator('[type="password"]').type('learning');
    await singInBtn.click();
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
    /* fill method */
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await singInBtn.click();

    console.log(await cardTitles.first().textContent());  /* Different way to get the first element from an array is first(). method */
    // console.log(await cardTitles.last().textContent());   /* Different way to get the last element from an array is last(). method */
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('Page Playwright test', async ({ page }) => {

    await page.goto("https://www.google.com")
    await expect(page).toHaveTitle("Google");
});