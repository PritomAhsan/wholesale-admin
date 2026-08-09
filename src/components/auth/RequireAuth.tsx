"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuthContext } from "@/context/AuthContext";
import { ADMIN_PANEL_ROLES } from "@/config/roles";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAuthenticated, logout } =
    useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace("/signin");
      return;
    }

    const allowed = ADMIN_PANEL_ROLES.some((role) =>
      user?.roles?.includes(role)
    );

    if (!allowed) {
      toast.error(
        "This account doesn't have access to the admin panel."
      );
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect is in-flight — render nothing to avoid a flash of
    // protected content.
    return null;
  }

  const allowed = ADMIN_PANEL_ROLES.some((role) =>
    user?.roles?.includes(role)
  );

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}
