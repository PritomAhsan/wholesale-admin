import AuthService from "@/api/services/auth.service";
import { Token } from "./token";

export const Auth = {
  async login(email: string, password: string) {
    const response =
      await AuthService.login({
        email,
        password,
      });

    Token.set(response.token);

    return response.user;
  },

  async logout() {
    try {
      await AuthService.logout();
    } finally {
      Token.remove();
    }
  },

  me() {
    return AuthService.me();
  },

  isAuthenticated() {
    return !!Token.get();
  },
};