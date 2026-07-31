"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useProductWizard } from "@/context/ProductWizardContext";

export default function VariantSummary() {
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

  const prices = items.map((item) => item.price);

  const minPrice =
    prices.length > 0 ? Math.min(...prices) : 0;

  const maxPrice =
    prices.length > 0 ? Math.max(...prices) : 0;

  return (
    <ComponentCard
      title="Variant Summary"
      desc="Overview of generated variants."
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">

        <div className="rounded-xl border p-4">
          <p className="text-xs text-gray-500">
            Variants
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {totalVariants}
          </h3>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xs text-gray-500">
            Active
          </p>

          <h3 className="mt-2 text-2xl font-bold text-green-600">
            {activeVariants}
          </h3>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xs text-gray-500">
            Stock
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {totalStock}
          </h3>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xs text-gray-500">
            Min Price
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            ${minPrice}
          </h3>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xs text-gray-500">
            Max Price
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            ${maxPrice}
          </h3>
        </div>

      </div>
    </ComponentCard>
  );
}