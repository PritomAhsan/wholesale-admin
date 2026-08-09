"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import { Auth } from "@/lib/auth";
import { Token } from "@/lib/token";
import { User } from "@/types/auth";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  hasRole: (...roles: string[]) => boolean;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadUser = useCallback(async () => {
    if (!Token.get()) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const me = await Auth.me();
      setUser(me);
    } catch {
      // Token is invalid/expired — drop it, don't leave the app
      // thinking the user is still signed in.
      Token.remove();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const loggedInUser = await Auth.login(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    },
    []
  );

  const logout = useCallback(async () => {
    await Auth.logout();
    setUser(null);
    router.push("/signin");
  }, [router]);

  const hasRole = useCallback(
    (...roles: string[]) => {
      if (!user) return false;
      return roles.some((role) => user.roles?.includes(role));
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        hasRole,
        refresh: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuthContext must be used within an AuthProvider"
    );
  }

  return ctx;
}
