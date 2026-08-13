"use client";

import Badge from "@/components/ui/badge/Badge";
import { RfqStatus } from "@/types/rfq";

const CONFIG: Record<
  RfqStatus,
  { label: string; color: "success" | "warning" | "error" | "info" | "dark" }
> = {
  pending: { label: "Pending", color: "warning" },
  quoted: { label: "Quoted", color: "info" },
  accepted: { label: "Accepted", color: "success" },
  rejected: { label: "Rejected", color: "error" },
  closed: { label: "Closed", color: "dark" },
};

interface Props {
  status: RfqStatus;
}

export default function RfqStatusBadge({ status }: Props) {
  const config = CONFIG[status];

  return (
    <Badge size="sm" color={config.color}>
      {config.label}
    </Badge>
  );
}
