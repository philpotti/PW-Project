const {test, expect} = require('@playwright/test');

test('Popup validations', async({page}) =>{
    
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('http://google.com');
    // await page.goBack();
    // await page.goForward();    

    // ASSERT ON OBJECT WHEN IS {{VISIBLE}} OR {{HIDDEN}}
    await expect (page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect (page.locator('#displayed-text')).toBeHidden();

    // await page.pause();

    // POP-UP: Handling Pop-ups
        // ACCEPT OR DISMISS a POP-UP
        // page.on('dialog', dialog => dialog.dismiss());
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();

    // HOW TO HOVER OVER ELEMENTS
    await page.locator('#mousehover').hover();

    // iFrame HANDLING    
    const framesPage = page.frameLocator('#courses-iframe');
    await framesPage.locator('li a[href*="lifetime-access"]:visible').click(); //li a[href*=lifetime-access] locator has 2 elements (1 visible and 1 invisible. :visible will select the visible)
    const textCheck = await framesPage.locator('div h2:has-text(" Happy Subscibers!")').textContent();
    console.log(textCheck.split(" ")[1]);
});