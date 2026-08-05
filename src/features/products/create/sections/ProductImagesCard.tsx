"use client";

import Image from "next/image";
import { Upload, X } from "lucide-react";

interface LocalImage {
  file: File;
  preview: string;
  isPrimary: boolean;
}

interface Props {
  images?: LocalImage[];

  onImagesChange?: (
    images: LocalImage[]
  ) => void;
}

export default function ProductImagesCard({
  images = [],
  onImagesChange,
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
                        images.filter(
                          (_, i) =>
                            i !== index
                        )
                      );
                    }}
                    className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 shadow transition group-hover:opacity-100"
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
                            (
                              img,
                              i
                            ) => ({
                              ...img,
                              isPrimary:
                                i ===
                                index,
                            })
                          )
                        );
                      }}
                      className="absolute bottom-2 left-2 right-2 rounded-lg bg-white/90 px-3 py-2 text-xs font-medium transition hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900"
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