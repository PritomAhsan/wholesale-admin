"use client";

import ComponentCard from "@/components/common/ComponentCard";

import { useProductWizard } from "@/context/ProductWizardContext";

export default function WarehouseSummary() {
  const { product } = useProductWizard();

  const warehouses = product.warehouse.warehouses;

  const totalWarehouses = warehouses.length;

  const totalStock = warehouses.reduce(
    (sum, warehouse) => sum + warehouse.quantity,
    0
  );

  const reserved = warehouses.reduce(
    (sum, warehouse) => sum + warehouse.reservedQuantity,
    0
  );

  const available = warehouses.reduce(
    (sum, warehouse) => sum + warehouse.availableQuantity,
    0
  );

  return (
    <ComponentCard
      title="Warehouse Summary"
      desc="Warehouse inventory overview."
    >
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <Stat
          title="Warehouses"
          value={totalWarehouses}
        />

        <Stat
          title="Stock"
          value={totalStock}
        />

        <Stat
          title="Reserved"
          value={reserved}
        />

        <Stat
          title="Available"
          value={available}
        />
      </div>
    </ComponentCard>
  );
}

function Stat({
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