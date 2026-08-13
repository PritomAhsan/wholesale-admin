"use client";

import Badge from "@/components/ui/badge/Badge";
import { OrderStatus, SellerOrderStatus } from "@/types/order";

const CONFIG: Record<
  OrderStatus | SellerOrderStatus,
  { label: string; color: "success" | "warning" | "error" | "info" | "dark" }
> = {
  pending: { label: "Pending", color: "warning" },
  processing: { label: "Processing", color: "info" },
  shipped: { label: "Shipped", color: "info" },
  delivered: { label: "Delivered", color: "success" },
  completed: { label: "Completed", color: "success" },
  cancelled: { label: "Cancelled", color: "error" },
};

interface Props {
  status: OrderStatus | SellerOrderStatus;
}

export default function OrderStatusBadge({ status }: Props) {
  const config = CONFIG[status];

  return (
    <Badge size="sm" color={config.color}>
      {config.label}
    </Badge>
  );
}
