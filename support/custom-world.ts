import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import * as messages from '@cucumber/messages';
import {BrowserContext, Page, PlaywrightTestOptions, APIRequestContext, Browser} from '@playwright/test';
import {Pool} from 'pg';

export interface CucumberWorldConstructorParams {
    parameters: { [key: string]: string };
}

export interface ICustomWorld extends World {
    debug: boolean;
    feature?: messages.Pickle;
    context?: BrowserContext;
    page?: Page;
    exchangeDbPool?: Pool;
    browser: Browser;
    testName?: string;
    startTime?: Date;
    playwrightOptions?: PlaywrightTestOptions;
}

export class CustomWorld extends World implements ICustomWorld {
    constructor(options: IWorldOptions) {
        super(options);
    }
    debug = false;
    browser: Browser;

}

setWorldConstructor(CustomWorld);