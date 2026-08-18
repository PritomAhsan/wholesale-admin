"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Trash2 } from "lucide-react";

import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

interface Props {
  image?: string | null;
  onChange: (file: File | null) => void;
}

export default function CategoryImageUpload({
  image = null,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(
    image
  );

  useEffect(() => {
    setPreview(image);
  }, [image]);

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validation
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Only JPG, PNG and WEBP images are allowed."
      );

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Maximum image size is 2 MB.");

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);

    onChange(file);
  };

  const removeImage = () => {
    setPreview(null);

    onChange(null);

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
              unoptimized
            />
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
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
          accept="image/jpeg,image/png,image/webp"
          hidden
          onChange={handleSelect}
        />

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
          >
            Choose Image
          </Button>

          {preview && (
            <Button
              type="button"
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

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Recommended size: <b>600 × 600 px</b>
          <br />
          JPG, PNG or WEBP (Max 2 MB)
        </p>
      </div>
    </ComponentCard>
  );
}