"use client";

import ComponentCard from "@/components/common/ComponentCard";

import { useProductWizard } from "@/context/ProductWizardContext";

import InventoryStatusBadge from "./InventoryStatusBadge";
import {
  calculateAvailableStock,
  getStockStatus,
} from "./inventoryHelpers";

export default function StockStatus() {
  const { product } = useProductWizard();

  const inventory = product.inventory;

  const available = calculateAvailableStock(
    inventory.quantity,
    inventory.reservedQuantity
  );

  const status = getStockStatus(
    available,
    inventory.lowStockThreshold
  );

  return (
    <ComponentCard
      title="Stock Status"
      desc="Current inventory health."
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Available Stock
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {available}
          </h2>
        </div>

        <InventoryStatusBadge
          status={status}
        />
      </div>
    </ComponentCard>
  );
}