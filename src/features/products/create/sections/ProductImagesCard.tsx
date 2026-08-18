"use client";

import Image from "next/image";
import { Upload, X } from "lucide-react";

export interface ExistingImage {
  id: number;

  uuid: string;

  image: string;

  alt_text: string | null;

  is_primary: boolean;

  sort_order: number;
}

interface LocalImage {
  file: File;
  preview: string;
  isPrimary: boolean;
}

interface Props {
  existingImages?: ExistingImage[];

  images?: LocalImage[];

  onImagesChange?: (
    images: LocalImage[]
  ) => void;

  onDeleteExisting?: (
    image: { id: number; uuid: string }
  ) => Promise<void>;

  onSetPrimaryExisting?: (
    image: { id: number; uuid: string }
  ) => Promise<void>;

  onReorderExisting?: (
    images: { uuid: string; sort_order: number }[]
  ) => Promise<void>;
}

export default function ProductImagesCard({

  existingImages = [],

  images = [],

  onImagesChange,

  onDeleteExisting,

  onSetPrimaryExisting,

}: Props) {
  const handleFiles = (
    files: FileList | null
  ) => {
    if (!files) return;

    const newImages: LocalImage[] =
      Array.from(files).map(
        (file, index) => ({
          file,

          preview:
            URL.createObjectURL(file),

          isPrimary:
            images.length === 0 &&
            index === 0,
        })
      );

    onImagesChange?.([
      ...images,
      ...newImages,
    ]);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

      <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">

        <h3 className="text-lg font-semibold">
          Product Images
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Upload product gallery images.
        </p>

      </div>

      <div className="p-6">

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 transition hover:border-brand-500 dark:border-gray-700">

          <Upload
            size={36}
            className="mb-3 text-gray-400"
          />

          <p className="font-medium">
            Click to upload
          </p>

          <p className="mt-1 text-sm text-gray-500">
            JPG, PNG, WEBP
          </p>

          <input
            hidden
            multiple
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleFiles(
                e.target.files
              )
            }
          />

        </label>

        {/* Existing Images */}

{existingImages.length > 0 && (

  <div className="mt-8">

    <h4 className="mb-4 text-sm font-semibold">
      Existing Images
    </h4>

    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">

      {existingImages.map((image) => (

        <div
          key={image.id}
          className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700"
        >

          <div className="relative aspect-square">

            <Image
              src={image.image}
              alt={
                image.alt_text ??
                "Product Image"
              }
              fill
              unoptimized
              className="object-cover"
            />

          </div>

          {image.is_primary && (

            <span className="absolute left-2 top-2 rounded-full bg-brand-500 px-2 py-1 text-xs font-medium text-white">

              Primary

            </span>

          )}

          <button
            type="button"
            onClick={() => onDeleteExisting?.(image)}
            className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition group-hover:opacity-100"
          >
            <X size={16} />
          </button>

          {!image.is_primary && (
            <button
              type="button"
              onClick={() => onSetPrimaryExisting?.(image)}
              className="absolute bottom-2 left-2 right-2 rounded-lg bg-white/90 px-3 py-2 text-xs font-medium opacity-0 transition group-hover:opacity-100"
            >
              Set Primary
            </button>
          )}

        </div>

      ))}

    </div>

  </div>

)}

                {images.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">

            {images.map(
              (image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="relative aspect-square">

                    <Image
                      src={image.preview}
                      alt={`Product ${index + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />

                  </div>

                  {/* Remove */}

                  <button
  type="button"
  onClick={() => {

    onImagesChange?.(
      images.filter((_, i) => i !== index)
    );

  }}
  className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition group-hover:opacity-100"
>
  <X size={16} />
</button>

                  {/* Primary Badge */}

                  {image.isPrimary && (
                    <span className="absolute left-2 top-2 rounded-full bg-brand-500 px-2 py-1 text-xs font-medium text-white">
                      Primary
                    </span>
                  )}

                  {/* Set Primary */}

                  {!image.isPrimary && (

  <button
    type="button"
    onClick={() => {

      onImagesChange?.(

        images.map(
          (img, i) => ({

            ...img,

            isPrimary: i === index,

          })
        )

      );

    }}
    className="absolute bottom-2 left-2 right-2 rounded-lg bg-white/90 px-3 py-2 text-xs font-medium"
  >

    Set Primary

  </button>

)}

                </div>
              )
            )}

          </div>
        )}

                {/* Footer */}

        <div className="mt-6 flex flex-col gap-2 border-t border-gray-200 pt-4 text-sm text-gray-500 dark:border-gray-700">

          <div className="flex items-center justify-between">

            <span>
              Images Selected
            </span>

            <span className="font-medium">
              {images.length} / 20
            </span>

          </div>

          <div className="flex items-center justify-between">

            <span>
              Supported Formats
            </span>

            <span>
              JPG, JPEG, PNG, WEBP
            </span>

          </div>

          <div className="flex items-center justify-between">

            <span>
              Maximum File Size
            </span>

            <span>
              5 MB per image
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}