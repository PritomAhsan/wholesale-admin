import api from "../axios";
import { API } from "../endpoints";

import {
  LoginRequest,
  LoginResponse,
  User,
} from "@/types/auth";

class AuthService {
  async login(payload: LoginRequest) {
    const { data } =
      await api.post<LoginResponse>(
        API.AUTH.LOGIN,
        payload
      );

    return data;
  }

  async logout() {
    return api.post(API.AUTH.LOGOUT);
  }

  async me() {
    const { data } =
      await api.get<User>(API.AUTH.ME);

    return data;
  }
}

export default new AuthService();