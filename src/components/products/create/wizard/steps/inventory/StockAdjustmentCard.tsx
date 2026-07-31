"use client";

import ComponentCard from "@/components/common/ComponentCard";

interface Props {
  children: React.ReactNode;
}

export default function StockAdjustmentCard({
  children,
}: Props) {
  return (
    <ComponentCard
      title="Stock Adjustment"
      desc="Increase or decrease available inventory."
    >
      <div className="space-y-5">
        {children}
      </div>
    </ComponentCard>
  );
}