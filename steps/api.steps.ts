import { ICustomWorld } from '../support/custom-world';
import {Given, When, Then} from "@cucumber/cucumber";
import {expect} from '@playwright/test'
import {config} from "../support/config";

const request = require('supertest');

let apiResponse;

Given('make a GET request for {string}', async function (this: ICustomWorld, uri: string) {
    apiResponse = await request(config.exchangeApiUrl).get(uri).set('Accept', 'application/json')
});

Then('Verify the response status code is {string}', async function (responseCode) {
    expect(apiResponse.statusCode).toEqual(parseInt(responseCode));
})

Then('I verify that {string} offsets are returned', async (countOfOffsets) => {
    const body = await JSON.parse(apiResponse.text)
    expect(body.offsets.length).toEqual(parseInt(countOfOffsets))
})

Then('I verify that all returned offsets are of type {string}', async (listState) => {
    const body = await JSON.parse(apiResponse.text)
    for (let i = 0; i < body.offsets.length; i++) {
        expect(body.offsets[i].list_state).toEqual(listState);
    }
})
