import axios from "axios";
import { waitFor } from "../util/commonFunctions";
import tokenFile from "../testData/tokens/token.json";

const uuid = tokenFile.session_uuid;
const testRunStart = tokenFile.session_timeStamp;
const dlay = require("delay");
const fse = require("fs-extra");
const getHeaders = key => ({
  "api_key": key,
  "Content-Type": "application/json",
  "test-uuid": uuid,
  "test-date": testRunStart
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return error.response || Promise.reject(error);
});

class PetStoreAPI {
  constructor() {
    this.storeURL = process.env.STORE_URL;
  }

  async createPet(key, petBody) {
    const storeURL = `${this.storeURL}/pet`;
    return axios.post(storeURL, petBody, getHeaders(key));
  }

  async updatePet(key, petBody) {
    const storeURL = `${this.storeURL}/pet`;
    return axios.put(storeURL, petBody, getHeaders(key));
  }

  async getPet(key, petID) {
    const storeURL = `${this.storeURL}/pet/${petID}`;
    return axios.get(storeURL, getHeaders(key));
  }

  async pollPet(key, petID, message, title, delay) {
    const storeURL = `${this.storeURL}/pet/${petID}`;
    await dlay(30000);
    return await waitFor({
      do: () => axios.get(storeURL, getHeaders(key)).catch(error => { return error; }),
      while: response => {
        // console.log("state.status: ", response.data.data);
        return (!("data" in response.data) || !("state" in response.data.data));
      },
      message,
      title,
      delay
    });
  }

  async deletePet(key, petID) {
    const storeURL = `${this.storeURL}/pet/${petID}`;
    return axios.delete(storeURL, getHeaders(key));
  }
}

export default PetStoreAPI;
