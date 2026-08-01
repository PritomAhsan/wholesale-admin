import { AxiosError } from "axios";

export function handleRequest(config: any) {

  return config;

}

export function handleRequestError(error: AxiosError) {

  return Promise.reject(error);

}

export function handleResponse(response: any) {

  return response;

}

export function handleResponseError(error: AxiosError) {

  if (error.response?.status === 401) {

    console.log("Unauthorized");

  }

  return Promise.reject(error);

}