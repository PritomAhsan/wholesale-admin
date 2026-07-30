"use client";

import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import ImagePreviewCard from "./ImagePreviewCard";
import { ProductImage } from "@/types/media";
import ImageViewerModal from "./ImageViewerModal";

const MAX_IMAGES = 10;
const MAX_SIZE = 5 * 1024 * 1024;

export default function ImageUploader() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<ProductImage[]>([]);
  const [error,setError]=useState("");
  const [preview,setPreview]=useState("");

  {
error && (

<div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">

{error}

</div>

)
}

  const addFiles = (files: FileList | null) => {
    if (!files) return;

    const list = [...files];

    const valid = list.filter((file) => {
      if (!file.type.startsWith("image/")) return false;
      if (file.size > MAX_SIZE) return false;
      return true;
    });

    const available = MAX_IMAGES - images.length;

    const next = valid
      .slice(0, available)
      .map((file, index) => ({
        id:
          crypto.randomUUID?.() ??
          `${Date.now()}-${index}`,
        file,
        preview: URL.createObjectURL(file),
        isPrimary:
          images.length === 0 && index === 0,
      }));

    setImages((prev) => [...prev, ...next]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter(
        (item) => item.id !== id
      );

      if (
        filtered.length &&
        !filtered.some((x) => x.isPrimary)
      ) {
        filtered[0].isPrimary = true;
      }

      return [...filtered];
    });
  };

  const setPrimary = (id: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isPrimary: img.id === id,
      }))
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 p-6">

      <div className="mb-5 flex items-center justify-between">

        <div>

          <h3 className="text-lg font-semibold">
            Product Images
          </h3>

          <p className="text-sm text-gray-500">
            {images.length}/{MAX_IMAGES} uploaded
          </p>

        </div>

      </div>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
        className="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-10 text-center transition hover:border-brand-500"
      >

        <ImagePlus
          size={52}
          className="mx-auto mb-4"
        />

        <h4 className="font-semibold">
          Drag images here
        </h4>

        <p className="mt-2 text-gray-500">
          or click to browse
        </p>

        <input
          ref={inputRef}
          hidden
          multiple
          type="file"
          accept="image/*"
          onChange={(e) =>
            addFiles(e.target.files)
          }
        />

      </div>

      {images.length > 0 && (

        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-5">

          {images.map((image) => (

            <ImagePreviewCard
              key={image.id}
              image={image}
              onDelete={() =>
                removeImage(image.id)
              }
              onPrimary={() =>
                setPrimary(image.id)
              }
            />

          ))}

        </div>

      )}

      <ImageViewerModal

open={!!preview}

image={preview}

onClose={()=>setPreview("")}

/>

    </div>
  );
}