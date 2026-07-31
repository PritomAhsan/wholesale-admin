"use client";

import Badge from "@/components/ui/badge/Badge";

interface Props {
  status: "active" | "inactive";
}

export default function BrandStatusBadge({
  status,
}: Props) {
  return (
    <Badge
      size="sm"
      color={status === "active" ? "success" : "error"}
    >
      {status === "active" ? "Active" : "Inactive"}
    </Badge>
  );
}