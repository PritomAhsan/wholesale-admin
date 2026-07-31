"use client";

import { useState } from "react";

import ComponentCard from "@/components/common/ComponentCard";
import { useProductWizard } from "@/context/ProductWizardContext";

import UploadPreview from "./UploadPreview";
import UploadZone from "./UploadZone";
import { validateImage } from "./mediaHelpers";

import type { ProductImage } from "./mediaTypes";
import ImageGallery from "./ImageGallery";

export default function ImageUploader() {
  const { product, updateMedia } =
    useProductWizard();

  const [error, setError] = useState("");

  const handleUpload = (
    files: FileList | null
  ) => {
    if (!files) return;

    const uploaded: ProductImage[] = [];

    Array.from(files).forEach((file, index) => {
      const validation = validateImage(file);

      if (validation) {
        setError(validation);
        return;
      }

      uploaded.push({
        id: crypto.randomUUID(),

        file,

        url: URL.createObjectURL(file),

        name: file.name,

        size: file.size,

        type: file.type,

        isPrimary:
          product.media.images.length === 0 &&
          index === 0,

        sortOrder:
          product.media.images.length + index,
      });
    });

    updateMedia({
      images: [
        ...product.media.images,
        ...uploaded,
      ],
    });

    setError("");
  };

  return (
    <ComponentCard
      title="Product Images"
      desc="Upload high-quality product images."
    >
      <div className="space-y-6">
        <UploadZone
          onSelect={handleUpload}
        />

        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {product.media.images.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.media.images.length > 0 && (
  <ImageGallery />
)}
          </div>
        )}
      </div>
    </ComponentCard>
  );
}