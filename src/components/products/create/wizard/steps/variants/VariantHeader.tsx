"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { RefreshCw } from "lucide-react";

import { useProductWizard } from "@/context/ProductWizardContext";

import { generateVariantCombinations } from "./variantGenerator";

export default function VariantHeader() {
  const { product, updateVariants } = useProductWizard();

  const handleRegenerate = () => {
    const combinations = generateVariantCombinations(
      product.variants.attributes
    );

    updateVariants({
      items: combinations,
    });
  };

  return (
    <ComponentCard
      title="Product Variants"
      desc="Create multiple versions of this product using attributes like Color, Size, Material and more."
    >
      <div className="rounded-xl border border-brand-200 bg-brand-50 p-5 dark:border-brand-800 dark:bg-brand-900/20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              Enterprise Variant Management
            </h3>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Enable variants only when the product has multiple
              purchasable combinations. The wizard will automatically
              generate every possible SKU and inventory record for each
              variant.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRegenerate}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700"
          >
            <RefreshCw className="h-4 w-4" />
            Regenerate Variants
          </button>
        </div>
      </div>
    </ComponentCard>
  );
}