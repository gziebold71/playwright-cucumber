//https://github.com/cucumber/cucumber-js/blob/main/docs/configuration.md#finding-your-code

const common = {
    requireModule: ['ts-node/register'],
    require: ['./steps/*.steps.ts', './support/*.ts'],
    worldParameters: {
        /**
         * use these worldParameters for information that is needed solely within
         * all scenarios regardless of the profile being run.
         */
    }
}

module.exports = {
    default: {
        ...common,
        format: ['progress', 'json:./Reports/cucumber_report.json'],
        tags: "@demo",
    },
    ci: {
        ...common,
        format: ['html:./Reports/cucumber-report.html'],
        tags: "@democi",
    }
};
