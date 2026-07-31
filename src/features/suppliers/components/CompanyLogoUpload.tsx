"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

import Button from "@/components/ui/button/Button";

export default function CompanyLogoUpload() {
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
          Company Logo
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Upload the supplier company logo.
        </p>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
          {preview ? (
            <Image
              src={preview}
              alt="Company Logo"
              width={112}
              height={112}
              className="h-full w-full object-cover"
            />
          ) : (
            <Upload
              size={34}
              className="text-gray-400"
            />
          )}
        </div>

        <div className="flex flex-wrap gap-3">
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
            Choose Logo
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
    </div>
  );
}