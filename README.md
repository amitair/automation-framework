# automation-framework
This repository is based on a framework using Axios and AVA test runner and will be using https://petstore.swagger.io/ as a basis for the test.

## Instructions for running API tests:
1. create the .env.<environment>.local files in top level directory 
1. run npm install
1. run `NODE_ENV=<environment> npm run testAll` to run all tests in API/src directory
1. run `NODE_ENV=<environment> npm test filepath` to run specific test

