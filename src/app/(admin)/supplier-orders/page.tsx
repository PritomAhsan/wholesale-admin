import { Metadata } from "next";

import SupplierOrderManager from "@/features/supplier-orders/SupplierOrderManager";

export const metadata: Metadata = {
  title: "My Orders",
};

export default function SupplierOrdersPage() {
  return <SupplierOrderManager />;
}
