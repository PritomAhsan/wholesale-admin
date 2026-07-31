"use client";

import { useProductWizard } from "@/context/ProductWizardContext";

import ReviewSection from "./ReviewSection";

export default function ReviewSummary() {
  const { product } = useProductWizard();

  return (
    <div className="space-y-6">

      <ReviewSection title="Basic Information">
        <p><strong>Name:</strong> {product.basic.productName}</p>
        {/* <p><strong>Brand:</strong> {product.basic.brand}</p> */}
        <p><strong>SKU:</strong> {product.inventory.sku}</p>
      </ReviewSection>

      {/* <ReviewSection title="Category">
        <p>{product.category.categoryName}</p>
      </ReviewSection>

      <ReviewSection title="Pricing">
        <p><strong>Price:</strong> {product.pricing.price}</p>
        <p><strong>MOQ:</strong> {product.pricing.moq}</p>
      </ReviewSection>

      <ReviewSection title="Variants">
        <p>{product.variants.variants.length} Variant(s)</p>
      </ReviewSection> */}

      <ReviewSection title="Inventory">
        <p>
          Available Stock: {product.inventory.availableQuantity}
        </p>
      </ReviewSection>

      <ReviewSection title="Shipping">
        <p>
          Weight: {product.shipping.weight}{" "}
          {product.shipping.weightUnit}
        </p>
      </ReviewSection>

      <ReviewSection title="Media">
        <p>
          Images: {product.media.images.length}
        </p>
      </ReviewSection>

      <ReviewSection title="SEO">
        <p><strong>Title:</strong> {product.seo.title}</p>
        <p><strong>Slug:</strong> {product.seo.slug}</p>
      </ReviewSection>

    </div>
  );
}