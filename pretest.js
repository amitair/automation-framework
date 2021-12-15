// import TOKENAPI from "./API/helpers/api/tokenAPI";
import { v4 as uuidv4 } from "uuid";

require("dotenv-flow").config({
  node_env: process.env.NODE_ENV
});

const uuid = uuidv4();
const date = require("date-fns");
const testRunStart = date.format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
// const fse = require("fs-extra");

console.log("test-session-uuid: ", uuid);
console.log("test-session-local-time-stamp", testRunStart);
console.log("ENV: ", process.env.NODE_ENV);

// const token = new TOKENAPI();

// delete final files contents
// fse.emptyDir("helpers/testData/finalFiles", err => {
//   if (err) return console.error("empty dir error: ", err);
// });
// fse.emptyDir("helpers/testData/tokens", err => {
//   if (err) return console.error("empty dir error: ", err);
// });

// get token for tests
// async function getToken() {
//   try {
//     const response = await token.getToken();
//     if (response.status === 200) {
//       const access_token = response.data.access_token;
//       return access_token;
//     } else {
//       console.log(`---------\nExpected 200 for ${process.env.ROLE} token in pretest, but received ${response.status} - ${JSON.stringify(response.data, null, " ")}\nPlease token creation\n}--------`);
//       console.log(response);
//       process.exit(128);
//     }
//   } catch (err) {
//     console.log("Access token error: ", err);
//     return err;
//   }
// }

// use anonymous self invoking function in order to write any tokens we need into a json file
// (async function () {
//   const token = await getToken();
//   const tokenFile = {
//     role: (process.env.ROLE) ? process.env.ROLE.toUpperCase() : "OWNER",
//     session_uuid: uuid,
//     session_timeStamp: testRunStart,
//     token: "Bearer " + token
//   };

//   fse.writeJSON("API/helpers/testData/tokens/Token.json", sftJsonToken, { spaces: "\t" });
// })();
