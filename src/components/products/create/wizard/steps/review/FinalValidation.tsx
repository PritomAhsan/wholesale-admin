"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useProductWizard } from "@/context/ProductWizardContext";

export default function FinalValidation() {
  const { product } = useProductWizard();

  const validations = [
    {
      title: "Basic Information",
      valid: !!product.basic.productName,
    },
    {
      title: "Category",
      valid: !!product.category.categoryId,
    },
    {
      title: "Pricing",
      valid: product.pricing.costPrice > 0,
    },
    {
      title: "Variants",
      valid: true,
    },
    {
      title: "Inventory",
      valid: product.inventory.trackInventory
        ? product.inventory.quantity >= 0
        : true,
    },
    {
      title: "Shipping",
      valid: product.shipping.weight > 0,
    },
    {
      title: "Media",
      valid: product.media.images.length > 0,
    },
    {
      title: "SEO",
      valid:
        product.seo.title.trim() !== "" &&
        product.seo.slug.trim() !== "",
    },
  ];

  const completed = validations.filter(
    (item) => item.valid
  ).length;

  const ready =
    completed === validations.length;

  return (
    <ComponentCard
      title="Final Validation"
      desc={`Completed ${completed}/${validations.length} sections`}
    >
      <div className="space-y-3">
        {validations.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700"
          >
            <span className="font-medium">
              {item.title}
            </span>

            <span
              className={`font-semibold ${
                item.valid
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {item.valid ? "✓ Complete" : "✗ Incomplete"}
            </span>
          </div>
        ))}

        <div
          className={`mt-6 rounded-xl p-4 text-center font-semibold ${
            ready
              ? "bg-green-100 text-green-700 dark:bg-green-900/20"
              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20"
          }`}
        >
          {ready
            ? "Product is ready for submission."
            : "Please complete all required sections before submitting."}
        </div>
      </div>
    </ComponentCard>
  );
}