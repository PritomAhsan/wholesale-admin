"use client";

import Image from "next/image";
import { Star, Trash2 } from "lucide-react";

import { useProductWizard } from "@/context/ProductWizardContext";

import PrimaryBadge from "./PrimaryBadge";
import type { ProductImage } from "./mediaTypes";

interface Props {
  image: ProductImage;
}

export default function ImageCard({
  image,
}: Props) {
  const {
    setPrimaryImage,
    deleteImage,
  } = useProductWizard();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="relative aspect-square">
        <Image
          src={image.url}
          alt={image.name}
          fill
          className="object-cover"
        />

        <PrimaryBadge
          show={image.isPrimary}
        />
      </div>

      <div className="space-y-3 p-3">
        <div>
          <h4 className="truncate text-sm font-medium">
            {image.name}
          </h4>

          <p className="text-xs text-gray-500">
            {(image.size / 1024).toFixed(1)} KB
          </p>
        </div>

        <div className="flex gap-2">
          {!image.isPrimary && (
            <button
              type="button"
              onClick={() =>
                setPrimaryImage(image.id)
              }
              className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-amber-300 px-3 py-2 text-sm hover:bg-amber-50"
            >
              <Star size={16} />

              Primary
            </button>
          )}

          <button
            type="button"
            onClick={() =>
              deleteImage(image.id)
            }
            className="flex items-center justify-center rounded-lg border border-red-300 px-3 py-2 text-red-600 hover:bg-red-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}