import axios from "axios";
const querystring = require("querystring");

class tokenAPI {
  constructor() {
    this.authUrl = process.env.AUTH_URL;
    this.hostUrl = process.env.HOST_URL;
    this.client_name = process.env.API_OWNER_USERNAME;
    this.client_secret = process.env.API_OWNER_SECRET;
  }

  getCredentials() {
    return {
      "username": this.username,
      "password": this.password,
      "grant_type": "password",
      "client_id": "frontend"
    };
  }

  getToken() {
    // console.log("CREDS===>", this.getCredentials().username);
    const tokenUrl = this.authUrl;
    return axios.post(tokenUrl, querystring.stringify(
      this.getCredentials()
    ), {
      headers: {
        "Authorization": "Basic " + process.env.HEADER_AUTH_TOKEN,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).catch(error => { return error; });
  }
}
export default tokenAPI;
