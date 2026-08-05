"use client";

import Badge from "@/components/ui/badge/Badge";

interface Props {
  status: string;
}

const colorMap: Record<
  string,
  "success" | "warning" | "error" | "light"
> = {
  published: "success",
  draft: "light",
  pending: "warning",
  archived: "error",
};

export default function ProductStatusBadge({
  status,
}: Props) {
  return (
    <Badge
      size="sm"
      color={
        colorMap[status] ??
        "light"
      }
    >
      {status
        .charAt(0)
        .toUpperCase() +
        status.slice(1)}
    </Badge>
  );
}