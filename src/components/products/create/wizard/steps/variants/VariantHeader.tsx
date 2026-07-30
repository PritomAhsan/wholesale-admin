"use client";

import ComponentCard from "@/components/common/ComponentCard";

export default function VariantHeader() {
  return (
    <ComponentCard
      title="Product Variants"
      desc="Create multiple versions of this product using attributes like Color, Size, Material and more."
    >
      <div className="rounded-xl border border-brand-200 bg-brand-50 p-5 dark:border-brand-800 dark:bg-brand-900/20">
        <h3 className="text-lg font-semibold">
          Enterprise Variant Management
        </h3>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Enable variants only when the product has multiple
          purchasable combinations. The wizard will later generate
          every possible SKU automatically.
        </p>
      </div>
    </ComponentCard>
  );
}