"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";

import { useProductWizard } from "@/context/ProductWizardContext";

export default function ProductStatus() {
  const { product, updateProduct } = useProductWizard();

  const options = [
    {
      value: "draft",
      title: "Save as Draft",
      description: "Product will not be visible to buyers.",
    },
    {
      value: "pending",
      title: "Submit for Review",
      description: "Product will wait for approval.",
    },
    {
      value: "published",
      title: "Publish Now",
      description: "Product becomes immediately available.",
    },
  ];

  return (
    <ComponentCard
      title="Product Status"
      desc="Choose what happens after saving this product."
    >
      <div className="space-y-4">
        {options.map((option) => (
          <label
            key={option.value}
            className={`block cursor-pointer rounded-xl border p-4 transition ${
              product.basic.status === option.value
                ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="productStatus"
                checked={product.basic.status === option.value}
                onChange={() =>
                  updateProduct({
                    // status: option.value,
                  })
                }
              />

              <div>
                <Label>{option.title}</Label>

                <p className="mt-1 text-sm text-gray-500">
                  {option.description}
                </p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </ComponentCard>
  );
}