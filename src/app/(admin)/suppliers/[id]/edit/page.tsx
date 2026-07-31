import { Metadata } from "next";

import EditSupplierManager from "@/features/suppliers/EditSupplierManager";

export const metadata: Metadata = {
  title: "Edit Supplier",
};

export default function EditSupplierPage() {
  return <EditSupplierManager />;
}