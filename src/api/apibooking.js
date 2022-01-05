import axios from "axios";
const https = require("https");
export default axios.create({
  baseURL: "http://localhost:3055",
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }), // (NOTE: this will disable client verification)
});
