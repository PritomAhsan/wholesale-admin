"use client";

import ComponentCard from "@/components/common/ComponentCard";

interface Props {
  children: React.ReactNode;
}

export default function WarehouseCard({
  children,
}: Props) {
  return (
    <ComponentCard
      title="Warehouse Management"
      desc="Manage stock across multiple warehouse locations."
    >
      <div className="space-y-5">
        {children}
      </div>
    </ComponentCard>
  );
}