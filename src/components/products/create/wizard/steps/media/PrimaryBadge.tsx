"use client";

import { Star } from "lucide-react";

interface Props {
  show: boolean;
}

export default function PrimaryBadge({
  show,
}: Props) {
  if (!show) return null;

  return (
    <div className="absolute left-2 top-2 flex items-center gap-1 rounded-lg bg-amber-500 px-2 py-1 text-xs font-semibold text-white">
      <Star size={12} fill="currentColor" />
      Primary
    </div>
  );
}