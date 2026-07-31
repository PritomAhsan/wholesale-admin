"use client";

import { RotateCw } from "lucide-react";

import ComponentCard from "@/components/common/ComponentCard";
import { useProductWizard } from "@/context/ProductWizardContext";

import { generateAllSkus } from "./skuGenerator";

export default function SkuSettings() {
  const { product, updateVariants } = useProductWizard();

  const regenerateSkus = () => {
    const items = generateAllSkus(product.variants.items, {
      prefix: product.basic.sku || "SKU",
      separator: "-",
    });

    updateVariants({
      items,
    });
  };

  return (
    <ComponentCard
      title="SKU Generator"
      desc="Generate unique SKUs for all variants."
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-500">
            Prefix
          </p>

          <p className="font-semibold">
            {product.basic.sku || "SKU"}
          </p>
        </div>

        <button
          type="button"
          onClick={regenerateSkus}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
        >
          <RotateCw size={18} />

          Regenerate SKUs
        </button>

      </div>
    </ComponentCard>
  );
}