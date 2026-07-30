import api from "./axios";
import { API } from "./endpoints";

export const AuthService = {
  login(payload: {
    email: string;
    password: string;
  }) {
    return api.post(
      API.AUTH.LOGIN,
      payload
    );
  },

  logout() {
    return api.post(API.AUTH.LOGOUT);
  },

  me() {
    return api.get(API.AUTH.ME);
  },
};