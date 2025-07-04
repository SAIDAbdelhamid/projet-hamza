import axios from "axios";
import {addLogErrorsInterceptor} from "./interceptors";

export const INFO_ENV = {
  API_URL: process.env.EXPO_PUBLIC_API_URL,
};

const defaultOptions = {
  baseURL: INFO_ENV.API_URL,
  // timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
};

let ws = axios.create(defaultOptions);

addLogErrorsInterceptor(ws);

export default ws;
