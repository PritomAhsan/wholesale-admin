"use client";

import { ImagePlus } from "lucide-react";

interface Props {
  onSelect: (files: FileList | null) => void;
}

export default function UploadZone({
  onSelect,
}: Props) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 transition hover:border-brand-500 hover:bg-brand-50 dark:border-gray-700 dark:hover:bg-gray-900">
      <ImagePlus
        className="mb-4 text-gray-400"
        size={42}
      />

      <p className="font-semibold">
        Upload Product Images
      </p>

      <p className="mt-1 text-sm text-gray-500">
        JPG, PNG or WebP • Max 5 MB
      </p>

      <input
        hidden
        type="file"
        multiple
        accept="image/*"
        onChange={(e) =>
          onSelect(e.target.files)
        }
      />
    </label>
  );
}