import { LaunchOptions } from '@playwright/test';
import * as dotenv from "dotenv";
dotenv.config({ path: process.env.ENV_FILE });


/**
 * Use this file to set up configuration values that are needed globally
 * to do things like browser settings, database connection information,
 * urls prior to running any scenarios.
 *
 */

const browserOptions: LaunchOptions = {
    headless: process.env.HEADLESS=='true',
    slowMo: 0,
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
    firefoxUserPrefs: {
        'media.navigator.streams.fake': true,
        'media.navigator.permission.disabled': true,
    },
};

export const config = {
    browser: process.env.BROWSER || 'chromium',
    exchangeUrl: process.env.EXCHANGE_URL,
    exchangeApiUrl: process.env.EXCHANGE_API_URL,
    exchangeDbHost: process.env.EXCHANGE_DB_HOST,
    exchangeDbPort: process.env.EXCHANGE_DB_PORT,
    exchangeDbUser: process.env.EXCHANGE_DB_USER,
    exchangeDbPassword: process.env.EXCHANGE_DB_PASSWORD,
    exchangeDbDatabase: process.env.EXCHANGE_DB_DATABASE,
    browserOptions,

};



