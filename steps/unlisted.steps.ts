import {Given, When, Then} from "@cucumber/cucumber";
import {expect} from '@playwright/test'
import {ICustomWorld} from "../support/custom-world";

const offsetIdColumn = '[data-column-id="offset_id"]';
const firstPageButton = '[title="First page"]'
const lastPageButton = '[title="Last page"]'
const nextPageButton = '[title="Next page"]'
const previousPageButton = '[title="Prev page"]'

When('on the unlisted page I click to sort the offset id column', async function(){
    await this.page.locator(offsetIdColumn).click()
})

When('on the unlisted page I click the unlisted offset last page button', async function(){
    await this.page.locator(lastPageButton).click()
})

When('on the unlisted page I click the unlisted offset first page button', async function(){
    await this.page.locator(firstPageButton).click()
})

When('on the unlisted page I click the unlisted offset next page button', async function(){
    await this.page.locator(nextPageButton).click()
})

When('on the unlisted page I click the unlisted offset previous page button', async function(){
    await this.page.locator(previousPageButton).click()
})

Then('I verify on the unlisted offsets page sorting on the offset id column is {string}', async function( sortOrder: string) {
    const actualText =  await this.page.locator(offsetIdColumn).getAttribute('aria-sort')
    expect(actualText).toEqual(sortOrder)
});

When('I verify on the unlisted page that the unlisted offset previous page button is disabled', async function(){
    await expect(this.page.locator(previousPageButton)).not.toBeVisible
})

When('I verify on the unlisted page that the unlisted offset previous page button is enabled', async function(){
    await expect(this.page.locator(previousPageButton)).toBeVisible
})
