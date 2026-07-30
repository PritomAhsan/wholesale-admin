"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useProductWizard } from "@/context/ProductWizardContext";

export default function VariantStatistics() {
  const { product } = useProductWizard();

  const variants = product.variants.items;

  return (
    <ComponentCard
      title="Variant Statistics"
      desc="Current status of generated variants."
    >
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">

        <StatCard
          title="Attributes"
          value={product.variants.attributes.length}
        />

        <StatCard
          title="Variants"
          value={variants.length}
        />

        <StatCard
          title="Active"
          value={variants.filter(v => v.active).length}
        />

        <StatCard
          title="Disabled"
          value={variants.filter(v => !v.active).length}
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
  value: number;
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