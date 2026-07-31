"use client";

import Image from "next/image";

interface Props {
  url: string;
}

export default function UploadPreview({
  url,
}: Props) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
      <Image
        src={url}
        alt="Preview"
        fill
        className="object-cover"
      />
    </div>
  );
}