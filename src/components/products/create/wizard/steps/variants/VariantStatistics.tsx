"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useProductWizard } from "@/context/ProductWizardContext";

export default function VariantStatistics() {
  const { product } = useProductWizard();

  const items = product.variants.items;

  const totalVariants = items.length;

  const activeVariants = items.filter(
    (item) => item.active
  ).length;

  const totalStock = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalValue = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <ComponentCard
      title="Variant Statistics"
      desc="Current status of generated variants."
    >
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <StatCard
          title="Variants"
          value={totalVariants}
        />

        <StatCard
          title="Active"
          value={activeVariants}
        />

        <StatCard
          title="Total Stock"
          value={totalStock}
        />

        <StatCard
          title="Inventory Value"
          value={`$${totalValue.toLocaleString()}`}
        />
      </div>
    </ComponentCard>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}