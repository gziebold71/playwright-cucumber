import {Given, When, Then} from "@cucumber/cucumber";
import {config, DBActions} from '../support/config';
import {expect} from "@playwright/test";

let queryResults;
let dbConnection = new DBActions();

Given('I select {string} from {string} table where {string} {string} {string} and {string} {string} {string}',
    async (valuesToSelect, tableName, field1, operator1, value1, field2, operator2, value2) => {
    await dbConnection.connectDB(config.dbUsername, config.dbPassword, config.dbServerName,
        config.dbPort, config.dbName);
    queryResults = await dbConnection.query(
        'SELECT ' + valuesToSelect + ' FROM ' + tableName + ' WHERE ' + field1 + operator1 + value1 + ' AND ' + field2 + operator2 + value2 +';');
    await dbConnection.disconnectDB();
});

Then('I verify that the {string} from the database is {string}', async(fieldToValidate, valueToValidate) => {
    expect(((queryResults.rows[0][fieldToValidate]).toString())).toEqual(valueToValidate)
})

