"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { AuthState } from "@/types/auth";

interface ContextType {
  auth: AuthState;

  setAuth: React.Dispatch<
    React.SetStateAction<AuthState>
  >;
}

const AuthContext =
  createContext<ContextType | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [auth, setAuth] =
    useState<AuthState>({
      user: null,

      token: null,

      authenticated: false,

      loading: true,
    });

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "AuthProvider missing."
    );
  }

  return context;
}