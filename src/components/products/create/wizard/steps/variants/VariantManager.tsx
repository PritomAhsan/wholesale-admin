"use client";

import { useProductWizard } from "@/context/ProductWizardContext";

import VariantHeader from "./VariantHeader";
import VariantStatistics from "./VariantStatistics";
import VariantEmptyState from "./VariantEmptyState";
import VariantAttributeBuilder from "./VariantAttributeBuilder";

import ComponentCard from "@/components/common/ComponentCard";

export default function VariantManager() {
  const { product, updateVariants } = useProductWizard();

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
        ) : null}
        </>
      )}

    </div>
  );
}