"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

import Button from "@/components/ui/button/Button";

export default function CoverImageUpload() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const handleSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          Cover Image
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Upload a supplier cover image.
          Recommended size: 1200 × 300 px.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
        {preview ? (
          <Image
            src={preview}
            alt="Cover Image"
            width={1200}
            height={300}
            className="h-56 w-full object-cover"
          />
        ) : (
          <div className="flex h-56 flex-col items-center justify-center">
            <Upload
              size={40}
              className="mb-3 text-gray-400"
            />

            <p className="text-sm text-gray-500">
              No cover image selected
            </p>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleSelect}
        />

        <Button
          onClick={() =>
            inputRef.current?.click()
          }
        >
          Choose Cover
        </Button>

        {preview && (
          <Button
            variant="outline"
            onClick={removeImage}
          >
            <X
              size={16}
              className="mr-2"
            />
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}