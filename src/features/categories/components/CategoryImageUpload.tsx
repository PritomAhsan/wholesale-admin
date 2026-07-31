"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Trash2 } from "lucide-react";

import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

export default function CategoryImageUpload() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(
    null
  );

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

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
    <ComponentCard
      title="Category Image"
      desc="Upload a category thumbnail."
    >
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
          {preview ? (
            <Image
              src={preview}
              alt="Category"
              width={192}
              height={192}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-center text-gray-500">
              <ImagePlus
                className="mx-auto mb-3"
                size={40}
              />

              <p>No image selected</p>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleSelect}
        />

        <div className="flex gap-3">
          <Button
            onClick={() => inputRef.current?.click()}
          >
            Choose Image
          </Button>

          {preview && (
            <Button
              variant="outline"
              onClick={removeImage}
            >
              <Trash2
                size={16}
                className="mr-2"
              />

              Remove
            </Button>
          )}
        </div>

        <p className="text-center text-sm text-gray-500">
          Recommended size: 600 × 600 px
          <br />
          JPG, PNG or WEBP (Max 2 MB)
        </p>
      </div>
    </ComponentCard>
  );
}