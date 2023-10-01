const { test, expect } = require('@playwright/test');

test('Browser context Playwright Test', async ({ page }) => 
{                                   
    await page.goto('https:rahulshettyacademy.com/client/');
    await page.goto('https:rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('imhaslop@gmail.com');
    await page.locator('#userPassword').fill('Passwd321@_');
    await page.locator('[class*="login-btn"]').click();
        
    const productName = "zara coat 3";                          
    const products = page.locator('.card-body');               
    const email = "imhaslop@gmail.com";                                 

    // await page.waitForLoadState('networkidle'); /* This makes the framework to wait till everything else is loaded on the page to carry on with the steps. Avoids innecesary waits */
    await page.locator('[class*="card-body"] b').first().waitFor(); /* This is a different way to wait for the element/s to be visible. waitForLoadState() method can be a little flaky */
    const titles = await page.locator('[class*="card-body"] b').allTextContents();
    console.log(titles);

    const count = await products.count();
    
    for(let i = 0; i < count; ++i) {
        if(await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    // ONCE ADDED THE ITEM TO THE CART, WE CLICK ON THE CART BUTTON TO GO TO A DIFFERENT PAGE
    await page.locator("[routerlink*='/cart']").click();
    await page.locator("div li").first().waitFor();

    //ASSERT THAT THE PRODUCT THAT HAS BEEN ADDED TO THE CART IS VISIBLE
    const isAddedProductVisible = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(isAddedProductVisible).toBeTruthy();
    
    await page.locator('text=Checkout').click();
    
    // SELECTING COUNTRY IN A DYNAMIC DROPDOWN. WITH FOR LOOK WE'RE LOOKING FOR INDIA
    await page.locator('[placeholder="Select Country"]').pressSequentially('ind',{delay:800})
    const countryDropDown = page.locator('[class*="ta-results"]');
    await countryDropDown.waitFor();
    const optionsCount = await countryDropDown.locator('button').count();
    for(let i = 0; i < optionsCount; i++){
        const text = await countryDropDown.locator('button').nth(i).textContent();
        // if(text === ' India')
        if(text.trim() === 'India')
        // if(text.includes('India'))
        {
            await countryDropDown.locator('button').nth(i).click();
            break;
        }
    }
    // ASSERT ON THE EMAIL AND THEN SUBMIT MY ORDER
    // await expect(page.locator('[class*="user__name"] label')).toHaveValue(userEmail);   <<<<<<<< NEED TO RESOLVE >>>>>>>>>>>
    await page.locator('.action__submit').click();
    
    // ASSERT THAT WE GET THE ORDER SUCCESSFULLY HAS BEEN SUBMITTED AND GRABBING THE TEXT OF THE orderId
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderId);

    // GO TO MY ORDERS PAGE AND VERIFY THAT MY orderId IS VISIBLE IN THE ODERS TABLE
    await page.locator('button[routerlink*="myorders"]').click();
    const orderPageRows = page.locator('tbody tr')
    await orderPageRows.last().waitFor();

    for(let i = 0; i < await orderPageRows.count(); i++){
        const rowOrderId = await orderPageRows.nth(i).locator('th').textContent();
        if(orderId.includes(rowOrderId)) {
            await orderPageRows.nth(i).locator('button:has-text("View")').click();
            break;
            }
        }
    await page.locator('.email-container').first().waitFor();
    const orderIdDetailsPage = await page.locator('.col-text').textContent();
    // await page.pause();
    expect(orderId.includes(orderIdDetailsPage)).toBeTruthy();
    }
);