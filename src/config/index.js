import axios from "axios";
const BASE_URL = "http://192.168.1.4:3000";
let config = {
  BASE_URL,
  client: axios.create({
    baseURL: BASE_URL,
  }),
};

export default config;
