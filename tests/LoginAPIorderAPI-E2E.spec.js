const { test, expect, request } = require('@playwright/test');
const loginPayLoad = {userEmail: "imhaslop@gmail.com", userPassword: "Passwd321@_"};
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};
let token;
let orderId;

test.beforeAll( async () => 
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {                                       
            data: loginPayLoad
        }) //200, 201,
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        token = loginResponseJson.token;
        console.log(token);

        const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayLoad,
            headers: 
            {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        orderId = orderResponseJson.orders[0]
});

test.beforeEach( () => {

});

test('Browser context Playwright Test', async ({ page }) => 
{
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);                                      
    
    await page.goto('https:rahulshettyacademy.com/client/');
    const productName = "zara coat 3";
    const products = page.locator('.card-body');
  
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
    await page.pause();
    expect(orderId.includes(orderIdDetailsPage)).toBeTruthy();
    }
);