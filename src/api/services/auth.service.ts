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

  async forgotPassword(email: string): Promise<{ debug_token?: string }> {
    const { data } = await api.post<
      ApiEnvelope<{ debug_token?: string }>
    >(API.AUTH.FORGOT_PASSWORD, {
      email,
      redirect_url: `${window.location.origin}/reset-password`,
    });

    return data.data;
  }

  async resetPassword(payload: {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Promise<void> {
    await api.post(API.AUTH.RESET_PASSWORD, payload);
  }
}

export default new AuthService();
