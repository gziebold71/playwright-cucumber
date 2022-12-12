import {Given, When, Then} from "@cucumber/cucumber";
import {page} from './world'
import {expect} from '@playwright/test'

const email = 'input[type="email"]';
const sellOffsetsButton = 'button[type="submit"]'
const helperText = '[id="SMUI-textfield-helper-text-0"]'

Given('on the login page I enter the email address of {string}', async (emailAddress) => {
    await page.locator(email).fill(emailAddress);
});

When('on the login page I tap the Sell Offsets button', async () => {
    await page.locator(sellOffsetsButton).click();
})


Then('on the login page I do not see the helper error message', async () => {
    const actualText =  await page.locator(helperText).getAttribute('aria-hidden')
    expect(actualText).toEqual('true')
})


Then('on the login page I see the helper error message', async () => {
    const actualText =  await page.locator(helperText).getAttribute('aria-hidden')
    expect(actualText).toBeNull()
})

