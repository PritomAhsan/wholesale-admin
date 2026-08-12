"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

import { useAuthContext } from "@/context/AuthContext";
import { ADMIN_PANEL_ROLES } from "@/config/roles";
import { SUPPLIER_ALLOWED_PATH_PREFIXES } from "@/config/navigation";

function isPathAllowedForSupplier(pathname: string): boolean {
  return SUPPLIER_ALLOWED_PATH_PREFIXES.some((prefix) =>
    prefix === "/" ? pathname === "/" : pathname.startsWith(prefix)
  );
}

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAuthenticated, logout } =
    useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  const isSupplierOnly =
    !!user?.roles?.includes("Supplier") &&
    !user?.roles?.includes("Admin") &&
    !user?.roles?.includes("Super Admin");

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
      return;
    }

    // Defense-in-depth only — the backend enforces this
    // independently. This just avoids showing a supplier a page
    // full of data their API calls will 403 on anyway.
    if (isSupplierOnly && !isPathAllowedForSupplier(pathname)) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated, user, router, pathname]);

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

  if (isSupplierOnly && !isPathAllowedForSupplier(pathname)) {
    // Redirect is in-flight.
    return null;
  }

  return <>{children}</>;
}
