"use client";

import Badge from "@/components/ui/badge/Badge";

interface Props {
  status: boolean;
}

export default function CategoryStatusBadge({
  status,
}: Props) {
  return (
    <Badge
      size="sm"
      color={status ? "success" : "error"}
    >
      {status ? "Active" : "Inactive"}
    </Badge>
  );
}