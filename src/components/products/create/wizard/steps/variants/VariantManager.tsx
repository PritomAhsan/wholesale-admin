"use client";

import { useEffect } from "react";

import ComponentCard from "@/components/common/ComponentCard";
import { useProductWizard } from "@/context/ProductWizardContext";

import VariantHeader from "./VariantHeader";
import VariantStatistics from "./VariantStatistics";
import VariantEmptyState from "./VariantEmptyState";
import VariantAttributeBuilder from "./VariantAttributeBuilder";
import VariantCombinationTable from "./VariantCombinationTable";
import { generateVariantCombinations } from "./variantGenerator";
import SkuSettings from "./SkuSettings";
import VariantSummary from "./VariantSummary";

export default function VariantManager() {
  const { product, updateVariants } = useProductWizard();

  useEffect(() => {
    if (!product.variants.enabled) return;

    const items = generateVariantCombinations(
      product.variants.attributes
    );

    // Preserve edited values
    const merged = items.map((item) => {
      const existing = product.variants.items.find(
        (variant) => variant.title === item.title
      );

      return existing ?? item;
    });

    updateVariants({
      items: merged,
    });
  }, [product.variants.attributes]);

  return (
    <div className="space-y-6">

      <VariantHeader />

      <ComponentCard
        title="Variant Settings"
        desc="Enable or disable product variants."
      >
        <label className="flex items-center justify-between">

          <div>
            <h4 className="font-semibold">
              Enable Product Variants
            </h4>

            <p className="text-sm text-gray-500">
              Turn this on if this product has multiple
              sizes, colors, materials or other options.
            </p>
          </div>

          <input
            type="checkbox"
            checked={product.variants.enabled}
            onChange={(e) =>
              updateVariants({
                enabled: e.target.checked,
              })
            }
            className="h-5 w-5 rounded"
          />

        </label>
      </ComponentCard>

      {product.variants.enabled && (
        <>
  <VariantStatistics />

  <VariantAttributeBuilder />

  {product.variants.attributes.length === 0 ? (
    <VariantEmptyState />
  ) : (
    <>
      <SkuSettings />

      <VariantSummary />

      <VariantCombinationTable />
    </>
  )}
</>
      )}

    </div>
  );
}