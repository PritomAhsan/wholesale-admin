"use client";

import ComponentCard from "@/components/common/ComponentCard";

import { useProductWizard } from "@/context/ProductWizardContext";

export default function InventorySummary() {
  const { product } = useProductWizard();

  const inventory = product.inventory;

  const available =
    inventory.quantity -
    inventory.reservedQuantity;

  return (
    <ComponentCard
      title="Inventory Summary"
      desc="Current inventory overview."
    >
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <SummaryCard
          title="Quantity"
          value={inventory.quantity}
        />

        <SummaryCard
          title="Reserved"
          value={inventory.reservedQuantity}
        />

        <SummaryCard
          title="Available"
          value={available}
        />

        <SummaryCard
          title="Incoming"
          value={inventory.incomingQuantity}
        />

        <SummaryCard
  title="Low Stock Alert"
  value={inventory.lowStockThreshold}
/>
      </div>
    </ComponentCard>
  );
}

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="mt-3 text-3xl font-bold">
        {value}
      </h3>
    </div>
  );
}