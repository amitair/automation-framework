import axios from "axios";
import { waitFor } from "../util/commonFunctions";
import tokenFile from "../testData/tokens/token.json";

const uuid = tokenFile.session_uuid;
const testRunStart = tokenFile.session_timeStamp;
const dlay = require("delay");
const jp = require("jsonpath");
const key = process.env.API_KEY;
const getHeaders = key => ({
  headers: {
    "api_key": key,
    "Content-Type": "application/json",
    "test-uuid": uuid,
    "test-date": testRunStart
  }
});

class endUser {
  constructer() {
    this.baseUrl = process.env.API_URL;
  }

  async getSample(info) {
    const getUrl = `${this.baseurl}/sample?params=${info}`;
    return axios.get(getUrl, getHeaders(key));
  }

  async postSample(info, body) {
    const postUrl = `${this.baseurl}/sample?params=${info}`;
    return axios.post(postUrl, body, getHeaders(key));
  }

  async pollForSample(info, fieldPath, value, message, title, delay) {
    const pollUrl = `${this.baseurl}/sample?params=${info}`;
    await dlay(delay);
    return await waitFor({
      do: () => axios.get(pollUrl, getHeaders(key)).catch(error => { return error; }),
      while: response => {
        const targetField = jp.query(response.data, fieldPath)[0];
        console.log(`response target: ${targetField}`);
        return (!(targetField === `${value}`));
      },
      message,
      title,
      delay
    });
  }
}

export default endUser;
