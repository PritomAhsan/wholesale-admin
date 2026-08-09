import api from "../axios";
import { API } from "../endpoints";

import {
  ApiEnvelope,
  LoginRequest,
  LoginResponse,
  User,
} from "@/types/auth";

class AuthService {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<
      ApiEnvelope<LoginResponse>
    >(API.AUTH.LOGIN, payload);

    return data.data;
  }

  async logout() {
    return api.post(API.AUTH.LOGOUT);
  }

  async me(): Promise<User> {
    const { data } = await api.get<
      ApiEnvelope<{ user: User }>
    >(API.AUTH.ME);

    return data.data.user;
  }
}

export default new AuthService();
