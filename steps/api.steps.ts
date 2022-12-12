import {Given, When, Then} from "@cucumber/cucumber";
import {expect} from '@playwright/test'
import {config} from "../support/config";
import {page} from './world'

let apiResponse;

Given('make a GET request for {string}', async (endpoint) => {
    apiResponse = await page.request.get(config.baseApiUrl + endpoint, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
});

Then('Verify the response status code is {string}', async (responseCode) => {
    expect(apiResponse.ok()).toBeTruthy();
})

Then('I verify that all returned offsets are of type {string}', async (listState) => {
    const body = await apiResponse.json()
    for (let i = 0; i < body.offsets.length; i++) {
        expect(body.offsets[i].list_state).toEqual(listState);
    }
})
