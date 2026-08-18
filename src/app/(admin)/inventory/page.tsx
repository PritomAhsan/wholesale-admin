import { Metadata } from "next";

import InventoryManager from "@/features/inventory/InventoryManager";

export const metadata: Metadata = {
  title: "Inventory",
};

export default function InventoryPage() {
  return <InventoryManager />;
}
