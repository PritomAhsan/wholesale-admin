"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useProductWizard } from "@/context/ProductWizardContext";

import VariantRow from "./VariantRow";

export default function VariantCombinationTable() {
  const { product, updateVariants } = useProductWizard();

  const handleUpdate = (id: string, data: any) => {
    const items = product.variants.items.map((item) =>
      item.id === id
        ? {
            ...item,
            ...data,
          }
        : item
    );

    updateVariants({
      items,
    });
  };

  return (
    <ComponentCard
      title="Variant Combinations"
      desc="Manage generated product variants."
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">#</th>

              <th className="px-4 py-3 text-left">
                Variant
              </th>

              <th className="px-4 py-3 text-left">
                SKU
              </th>

              <th className="px-4 py-3 text-left">
                Price
              </th>

              <th className="px-4 py-3 text-left">
                Stock
              </th>

              <th className="px-4 py-3 text-center">
                Active
              </th>
            </tr>
          </thead>

          <tbody>
            {product.variants.items.map(
              (variant, index) => (
                <VariantRow
                  key={variant.id}
                  variant={variant}
                  index={index}
                  onChange={handleUpdate}
                />
              )
            )}
          </tbody>
        </table>

        {product.variants.items.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            No variants generated.
          </div>
        )}
      </div>
    </ComponentCard>
  );
}