"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import {
  ImagePlus,
  Trash2,
} from "lucide-react";

import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

interface Props {
  image?: string | null;

  onChange: (
    file: File | null
  ) => void;
}

export default function BrandLogoUpload({
  image = null,
  onChange,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [preview, setPreview] =
    useState<string | null>(
      image
    );

  useEffect(() => {
    setPreview(image);
  }, [image]);

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      alert(
        "Please select an image."
      );

      return;
    }

    if (
      file.size >
      2 * 1024 * 1024
    ) {
      alert(
        "Maximum file size is 2MB."
      );

      return;
    }

    setPreview(
      URL.createObjectURL(
        file
      )
    );

    onChange(file);
  };

  const removeImage =
    () => {
      setPreview(null);

      onChange(null);

      if (inputRef.current) {
        inputRef.current.value =
          "";
      }
    };

  return (
    <ComponentCard
      title="Brand Logo"
      desc="Upload your brand logo."
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
          {preview ? (
            <Image
              src={preview}
              alt="Brand Logo"
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="text-center text-gray-500">
              <ImagePlus
                size={42}
                className="mx-auto mb-3"
              />

              <p>
                No logo selected
              </p>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={
            handleSelect
          }
        />

        <div className="flex gap-3">
          <Button
            onClick={() =>
              inputRef.current?.click()
            }
          >
            Choose Logo
          </Button>

          {preview && (
            <Button
              variant="outline"
              onClick={
                removeImage
              }
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
          Recommended size:
          600 × 600 px
          <br />
          JPG, PNG, WEBP
          <br />
          Maximum size: 2MB
        </p>
      </div>
    </ComponentCard>
  );
}