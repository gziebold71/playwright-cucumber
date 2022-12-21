import { ICustomWorld } from './custom-world';
import {config} from "./config";
import {Pool} from 'pg';
import {
    After,
    AfterAll,
    Before,
    BeforeAll,
    ITestCaseHookParameter,
    setDefaultTimeout,
    Status
} from "@cucumber/cucumber";
import {
    chromium,
    ChromiumBrowser, ConsoleMessage,
    firefox,
    FirefoxBrowser,
    webkit,
    WebKitBrowser,
    devices
} from '@playwright/test';

const mobileDevice = devices[config.device];

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
let exchangeDbPool: Pool;

setDefaultTimeout(60000)

BeforeAll(async function () {
    switch (config.browser) {
        case 'firefox':
            browser = await firefox.launch(config.browserOptions);
            break;
        case 'webkit':
            browser = await webkit.launch(config.browserOptions);
            break;
        default:
            browser = await chromium.launch(config.browserOptions);
    }

    const databaseConfig = {
        host: config.exchangeDbHost,
        port: config.exchangeDbPort,
        user: config.exchangeDbUser,
        password: config.exchangeDbPassword,
        database: config.exchangeDbDatabase,
    }
    exchangeDbPool = new Pool(databaseConfig);


});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
    try {
        this.startTime = new Date();
        this.testName = pickle.name.replace(/\W/g, '-');
        this.feature = pickle;
        this.exchangeDbPool = exchangeDbPool;
        let tags = pickle.tags.map(t=> t.name)
        let useBrowser = !tags.includes("@nobrowser");

        if(useBrowser) {
            this.browser = browser;
            let context = await this.browser.newContext();
            if (config.isMobile) {
                context = await this.browser.newContext({viewport: mobileDevice.viewport, userAgent: mobileDevice.userAgent});
            }
            this.context = context;
            this.page = await context.newPage();
            await this.page.goto(config.exchangeUrl);
            console.log(`captured site title as ${await this.page.title()}`);
        }
    }
    catch (error) {
        console.log(`chrome navigation to demo site failed due to ${error}`);
        throw new Error(`chrome navigation to demo site failed due to ${error}`)
    }
    return this.page;
});

After(async function(this: ICustomWorld, { result }: ITestCaseHookParameter) {
    await this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s`);

    if(this.browser!=null) {
        if (result.status === Status.FAILED) {
            await this.attach(await this.page.screenshot({
                path: `./Screenshots/${this.feature.name}.png`,
                fullPage: true
            }), "image/png")
        }

        await this.page?.close();
        await this.context?.close();
    }
});

AfterAll(async function() {
    await exchangeDbPool.end();
    if(browser != null) {
        await browser.close();
    }
})
