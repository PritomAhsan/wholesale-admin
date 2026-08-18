"use client";

import PayoutsManager from "./PayoutsManager";
import SupplierPayoutManager from "../supplier-payouts/SupplierPayoutManager";

import { useAuthContext } from "@/context/AuthContext";

export default function PayoutsRouter() {
  const { hasRole } = useAuthContext();

  const isSupplierOnly =
    hasRole("Supplier") &&
    !hasRole("Admin") &&
    !hasRole("Super Admin");

  return isSupplierOnly ? <SupplierPayoutManager /> : <PayoutsManager />;
}
