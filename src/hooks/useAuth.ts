"use client";

import { useState } from "react";

import { Auth } from "@/lib/auth";

export function useAuth() {
  const [loading, setLoading] =
    useState(false);

  const login = async (
    email: string,
    password: string
  ) => {
    setLoading(true);

    try {
      return await Auth.login(
        email,
        password
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);

    try {
      await Auth.logout();
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login,
    logout,
  };
}