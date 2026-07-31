"use client";

import ComponentCard from "@/components/common/ComponentCard";

interface InventoryCardProps {
  children: React.ReactNode;
}

export default function InventoryCard({
  children,
}: InventoryCardProps) {
  return (
    <ComponentCard
      title="Inventory Settings"
      desc="Configure inventory tracking, stock levels and availability."
    >
      <div className="space-y-6">
        {children}
      </div>
    </ComponentCard>
  );
}