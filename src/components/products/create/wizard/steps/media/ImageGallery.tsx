"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useProductWizard } from "@/context/ProductWizardContext";

import ImageCard from "./ImageCard";

export default function ImageGallery() {
  const { product } = useProductWizard();

  if (
    product.media.images.length === 0
  ) {
    return null;
  }

  const images = [...product.media.images].sort(
  (a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;

    return a.sortOrder - b.sortOrder;
  }
);

  return (
    <ComponentCard
      title="Image Gallery"
      desc={`${product.media.images.length} image(s) uploaded`}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {images.map(
          (image) => (
            <ImageCard
              key={image.id}
              image={image}
            />
          )
        )}
      </div>
    </ComponentCard>
  );
}