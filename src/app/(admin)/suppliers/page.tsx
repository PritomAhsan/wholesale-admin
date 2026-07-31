import { Metadata } from "next";

import SupplierManager from "@/features/suppliers/SupplierManager";

export const metadata: Metadata = {
  title: "Suppliers",
};

export default function SuppliersPage() {
  return <SupplierManager />;
}