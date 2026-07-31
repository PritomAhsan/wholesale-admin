"use client";

import InventoryCard from "./InventoryCard";
import InventorySwitch from "./InventorySwitch";
import InventoryNumberInput from "./InventoryNumberInput";
import InventorySummary from "./InventorySummary";
import StockManagement from "./StockManagement";
import WarehouseManager from "./WarehouseManager";
import { useProductWizard } from "@/context/ProductWizardContext";

export default function InventorySettings() {
  const { product, updateInventory } =
    useProductWizard();

  const inventory = product.inventory;

  return (
    <div className="space-y-6">
      <InventoryCard>
        <InventorySwitch
          label="Track Inventory"
          description="Enable stock tracking."
          checked={inventory.trackInventory}
          onChange={(value) =>
            updateInventory({
              trackInventory: value,
            })
          }
        />

        <InventorySwitch
          label="Allow Backorders"
          description="Allow orders when stock is unavailable."
          checked={inventory.allowBackorders}
          onChange={(value) =>
            updateInventory({
              allowBackorders: value,
            })
          }
        />

        <InventorySwitch
          label="Continue Selling"
          description="Continue selling when inventory reaches zero."
          checked={
            inventory.continueSellingWhenOutOfStock
          }
          onChange={(value) =>
            updateInventory({
              continueSellingWhenOutOfStock:
                value,
            })
          }
        />

        <InventoryNumberInput
          label="Total Quantity"
          value={inventory.quantity}
          onChange={(value) =>
            updateInventory({
              quantity: value,
            })
          }
        />

        <InventoryNumberInput
          label="Reserved Quantity"
          value={inventory.reservedQuantity}
          onChange={(value) =>
            updateInventory({
              reservedQuantity: value,
            })
          }
        />

        <InventoryNumberInput
          label="Incoming Quantity"
          value={inventory.incomingQuantity}
          onChange={(value) =>
            updateInventory({
              incomingQuantity: value,
            })
          }
        />

        <InventoryNumberInput
          label="Low Stock Alert"
          value={inventory.lowStockThreshold}
          onChange={(value) =>
            updateInventory({
              lowStockThreshold: value,
            })
          }
        />
      </InventoryCard>

      <InventorySummary />

      <WarehouseManager />

      <StockManagement />
    </div>
  );
}