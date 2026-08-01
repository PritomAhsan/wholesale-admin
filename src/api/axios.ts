import axios from "axios";

import { Token } from "@/lib/token";

import {

  handleRequest,

  handleRequestError,

  handleResponse,

  handleResponseError,

} from "./interceptors";

const api = axios.create({

  baseURL: process.env.NEXT_PUBLIC_API_URL,

  headers: {

    Accept: "application/json",

    "Content-Type": "application/json",

  },

});

api.interceptors.request.use(

  (config) => {

    const token = Token.get();

    if (token) {

      config.headers.Authorization = `Bearer ${token}`;

    }

    return handleRequest(config);

  },

  handleRequestError

);

api.interceptors.response.use(

  handleResponse,

  handleResponseError

);

export default api;