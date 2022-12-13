import {Given, When, Then} from "@cucumber/cucumber";
import {config, DATABASE_CONFIG} from '../support/config';
import {expect} from "@playwright/test";
import {dbPool} from "./world";

let queryResults;

Given('I select {string} from {string} table where {string} {string} {string} and {string} {string} {string}',
    async (valuesToSelect, tableName, field1, operator1, value1, field2, operator2, value2) => {
    queryResults = await dbPool.query('SELECT ' + valuesToSelect + ' FROM ' + tableName + ' WHERE ' + field1 + operator1 + value1 + ' AND ' + field2 + operator2 + value2 +';')
});

Then('I verify that the {string} from the database is {string}', async(fieldToValidate, valueToValidate) => {
    expect(((queryResults.rows[0][fieldToValidate]).toString())).toEqual(valueToValidate)
})

