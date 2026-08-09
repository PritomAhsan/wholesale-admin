import { AxiosError } from "axios";
import { Token } from "@/lib/token";

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

  if (
    error.response?.status === 401 &&
    typeof window !== "undefined"
  ) {

    Token.remove();

    // Hard redirect (not a router push) so every bit of in-memory
    // auth state is dropped along with the stale token, and so
    // this works even for requests fired outside the React tree.
    if (window.location.pathname !== "/signin") {

      window.location.href = "/signin";

    }

  }

  return Promise.reject(error);

}