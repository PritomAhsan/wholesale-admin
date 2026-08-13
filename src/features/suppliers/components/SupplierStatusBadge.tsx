"use client";

import Badge from "@/components/ui/badge/Badge";
import { SupplierStatus } from "@/types/supplier";

interface Props {
  status: SupplierStatus;
}

const CONFIG: Record<SupplierStatus, { label: string; color: "success" | "warning" | "error" | "dark" }> = {
  pending: { label: "Pending", color: "warning" },
  approved: { label: "Approved", color: "success" },
  rejected: { label: "Rejected", color: "error" },
  suspended: { label: "Suspended", color: "dark" },
};

export default function SupplierStatusBadge({ status }: Props) {
  const config = CONFIG[status];

  return (
    <Badge size="sm" color={config.color}>
      {config.label}
    </Badge>
  );
}
