"use client";

import Badge from "@/components/ui/badge/Badge";

interface Props {
  featured: boolean;
}

export default function ProductFeaturedBadge({
  featured,
}: Props) {
  return (
    <Badge
      size="sm"
      color={
        featured
          ? "success"
          : "light"
      }
    >
      {featured
        ? "Featured"
        : "No"}
    </Badge>
  );
}