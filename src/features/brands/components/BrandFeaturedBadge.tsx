"use client";

import Badge from "@/components/ui/badge/Badge";

interface Props {
  featured: boolean;
}

export default function BrandFeaturedBadge({
  featured,
}: Props) {
  return (
    <Badge
      size="sm"
      color={
        featured
          ? "warning"
          : "light"
      }
    >
      {featured
        ? "Featured"
        : "Normal"}
    </Badge>
  );
}