"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useProductWizard } from "@/context/ProductWizardContext";

export default function SEOValidation() {
  const { product } = useProductWizard();

  const checks = [
    {
      label: "SEO Title",
      valid: product.seo.title.trim().length > 0,
    },
    {
      label: "Title Length (50-60)",
      valid:
        product.seo.title.length >= 50 &&
        product.seo.title.length <= 60,
    },
    {
      label: "Meta Description",
      valid: product.seo.description.trim().length > 0,
    },
    {
      label: "Description Length (150-160)",
      valid:
        product.seo.description.length >= 150 &&
        product.seo.description.length <= 160,
    },
    {
      label: "URL Slug",
      valid: product.seo.slug.trim().length > 0,
    },
    {
      label: "Meta Keywords",
      valid: product.seo.keywords.length > 0,
    },
  ];

  const passed = checks.filter(
    (item) => item.valid
  ).length;

  return (
    <ComponentCard
      title="SEO Validation"
      desc={`Passed ${passed} of ${checks.length} checks`}
    >
      <div className="space-y-3">
        {checks.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700"
          >
            <span className="text-sm font-medium">
              {item.label}
            </span>

            <span
              className={`text-sm font-semibold ${
                item.valid
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {item.valid ? "Passed" : "Failed"}
            </span>
          </div>
        ))}
      </div>
    </ComponentCard>
  );
}