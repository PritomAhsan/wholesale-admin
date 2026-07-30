"use client";

import Image from "next/image";

type Props = {
  open: boolean;
  image?: string;
  onClose: () => void;
};

export default function ImageViewerModal({
  open,
  image,
  onClose,
}: Props) {
  if (!open || !image) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative h-[85vh] w-full max-w-6xl"
      >
        <Image
          src={image}
          alt=""
          fill
          unoptimized
          className="object-contain"
        />
      </div>
    </div>
  );
}