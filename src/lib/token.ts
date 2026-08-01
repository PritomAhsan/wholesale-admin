const TOKEN_KEY = "access_token";

export const Token = {

  get() {

    if (typeof window === "undefined") return null;

    return localStorage.getItem(TOKEN_KEY);

  },

  set(token: string) {

    if (typeof window === "undefined") return;

    localStorage.setItem(TOKEN_KEY, token);

  },

  remove() {

    if (typeof window ==="undefined") return;

    localStorage.removeItem(TOKEN_KEY);

  },

};