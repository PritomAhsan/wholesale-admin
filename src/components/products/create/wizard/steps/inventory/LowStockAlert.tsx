"use client";

import ComponentCard from "@/components/common/ComponentCard";

import { useProductWizard } from "@/context/ProductWizardContext";

export default function LowStockAlert() {
  const { product } = useProductWizard();

  const inventory = product.inventory;

  const available =
    inventory.availableQuantity;

  if (
    available > inventory.lowStockThreshold
  ) {
    return null;
  }

  return (
    <ComponentCard
      title="Inventory Alert"
      desc="Inventory requires attention."
    >
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-5">
        <h3 className="font-semibold text-yellow-700">
          Low Stock Warning
        </h3>

        <p className="mt-2 text-sm text-yellow-700">
          Only <strong>{available}</strong> units
          remain.

          Current alert threshold is{" "}
          <strong>
            {inventory.lowStockThreshold}
          </strong>.
        </p>
      </div>
    </ComponentCard>
  );
}