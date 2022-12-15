import { ICustomWorld } from '../support/custom-world';
import {Given, When, Then} from "@cucumber/cucumber";
import {expect} from "@playwright/test";

let queryResults;

Given('I select {string} from {string} table where {string} {string} {string} and {string} {string} {string}',
    async function (this: ICustomWorld, valuesToSelect, tableName, field1, operator1, value1, field2, operator2, value2)  {
    queryResults = await this.exchangeDbPool.query('SELECT ' + valuesToSelect + ' FROM ' + tableName + ' WHERE ' + field1 + operator1 + value1 + ' AND ' + field2 + operator2 + value2 +';')
});

Then('I verify that the {string} from the database is {string}', async(fieldToValidate, valueToValidate) => {
    expect(((queryResults.rows[0][fieldToValidate]).toString())).toEqual(valueToValidate)
})

