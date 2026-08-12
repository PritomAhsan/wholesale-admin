"use client";

import Badge from "@/components/ui/badge/Badge";

import { ProductStatusValue } from "@/types/approval";

const STATUS_CONFIG: Record<
  ProductStatusValue,
  { label: string; color: "success" | "warning" | "error" | "info" | "light" }
> = {
  draft: { label: "Draft", color: "light" },
  pending: { label: "Pending Review", color: "warning" },
  approved: { label: "Approved", color: "info" },
  rejected: { label: "Rejected", color: "error" },
  published: { label: "Published", color: "success" },
  unpublished: { label: "Unpublished", color: "light" },
  archived: { label: "Archived", color: "error" },
};

interface Props {
  status: ProductStatusValue | string;
}

export default function ProductStatusBadge({ status }: Props) {
  const config =
    STATUS_CONFIG[status as ProductStatusValue] ?? {
      label: status,
      color: "light" as const,
    };

  return (
    <Badge size="sm" color={config.color}>
      {config.label}
    </Badge>
  );
}
