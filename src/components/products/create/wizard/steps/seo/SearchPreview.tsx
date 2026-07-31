"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useProductWizard } from "@/context/ProductWizardContext";

export default function SearchPreview() {
  const { product } = useProductWizard();

  const title =
    product.seo.title ||
    product.basic.productName ||
    "Product Title";

  const slug =
    product.seo.slug || "product-slug";

  const description =
    product.seo.description ||
    product.basic.shortDescription ||
    "Product description will appear here.";

  return (
    <ComponentCard
      title="Google Search Preview"
      desc="Preview how your product may appear in search results."
    >
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="truncate text-xl text-blue-700 dark:text-blue-400">
          {title}
        </h3>

        <p className="mt-1 text-sm text-green-700 dark:text-green-400">
          https://yourdomain.com/products/{slug}
        </p>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {description}
        </p>
      </div>
    </ComponentCard>
  );
}