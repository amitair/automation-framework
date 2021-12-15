// enable loading of .env files by environment
require("dotenv-flow").config({
    node_env: process.env.NODE_ENV
})