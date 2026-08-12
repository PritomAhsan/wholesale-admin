"use client";

import DashboardGrid from "@/components/dashboard/DashboardGrid";
import SupplierDashboard from "./SupplierDashboard";

import { useAuthContext } from "@/context/AuthContext";

export default function DashboardRouter() {
  const { hasRole } = useAuthContext();

  const isSupplierOnly =
    hasRole("Supplier") &&
    !hasRole("Admin") &&
    !hasRole("Super Admin");

  return isSupplierOnly ? <SupplierDashboard /> : <DashboardGrid />;
}
