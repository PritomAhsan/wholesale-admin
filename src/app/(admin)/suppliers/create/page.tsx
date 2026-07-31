import { Metadata } from "next";

import CreateSupplierManager from "@/features/suppliers/CreateSupplierManager";

export const metadata: Metadata = {
  title: "Create Supplier",
};

export default function CreateSupplierPage() {
  return <CreateSupplierManager />;
}