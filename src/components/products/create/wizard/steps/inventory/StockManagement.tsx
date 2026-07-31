"use client";

import LowStockAlert from "./LowStockAlert";
import StockAdjustmentForm from "./StockAdjustmentForm";
import StockHistory from "./StockHistory";
import StockStatus from "./StockStatus";

export default function StockManagement() {
  return (
    <div className="space-y-6">
      <StockStatus />

      <LowStockAlert />

      <StockAdjustmentForm />

      <StockHistory />
    </div>
  );
}