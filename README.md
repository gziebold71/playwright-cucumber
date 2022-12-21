
## Environment Variables
This test automation uses the dotenv library to configure the tests to run against different environments.

See the **example.env** file for an example of all of the available environment variables. Simply copy
this file and name it according to purpose and retain the .env extension. For example,
qa.env could be environment variable values for testing a qa environment. These files should 
never end up committed to the git repository.

By default, the automation will try to use a file named .env but you can control the file used
by setting the ENV_FILE to the environment file to be used.

Example:
    
    ENV_FILE=qa.env
    npm run test


## Running Tests Without Browser

Some sets of tests do not require a running browser (headless or not). This is 
accomplished by tagging scenarios with **@nobrowser**. In those cases, a browser window will
not be opened for the scenario.

## Running in mobile/table view

If you want to run this in a mobile or table view then you can set the .env property of 
`IS_MOBILE` to true and setting the `MOBILE_DEVICE_TYPE` property to the device you would
like to test on.

The list of available devices can be found here: 
https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json

