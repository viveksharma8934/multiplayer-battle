import axios from "axios";
import { createState, useState } from '@hookstate/core';
const BASE_URL = "http://localhost:3005";
const userState = createState(null);
let config = {
  BASE_URL,
  client: axios.create({
    baseURL: BASE_URL,
  }),
  userState
};

export default config;
