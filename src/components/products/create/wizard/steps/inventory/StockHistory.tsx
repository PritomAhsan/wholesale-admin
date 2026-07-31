"use client";

import ComponentCard from "@/components/common/ComponentCard";

export default function StockHistory() {
  return (
    <ComponentCard
      title="Stock History"
      desc="Recent stock movements."
    >
      <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500 dark:border-gray-700">
        Stock movement history will be connected to the
        Laravel API in a later phase.
      </div>
    </ComponentCard>
  );
}