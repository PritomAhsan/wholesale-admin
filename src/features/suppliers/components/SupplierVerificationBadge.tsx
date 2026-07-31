"use client";

import Badge from "@/components/ui/badge/Badge";

interface Props {
  status: "verified" | "pending";
}

export default function SupplierVerificationBadge({
  status,
}: Props) {
  return (
    <Badge
      size="sm"
      color={
        status === "verified"
          ? "success"
          : "warning"
      }
    >
      {status === "verified"
        ? "Verified"
        : "Pending"}
    </Badge>
  );
}