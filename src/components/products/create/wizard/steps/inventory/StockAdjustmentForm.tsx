"use client";

import { useState } from "react";

import StockAdjustmentCard from "./StockAdjustmentCard";

import { useProductWizard } from "@/context/ProductWizardContext";

export default function StockAdjustmentForm() {
  const { product, updateInventory } =
    useProductWizard();

  const [type, setType] = useState<"add" | "remove">(
    "add"
  );

  const [quantity, setQuantity] = useState(0);

  const applyAdjustment = () => {
    const current = product.inventory.quantity;

    const updated =
      type === "add"
        ? current + quantity
        : Math.max(0, current - quantity);

    updateInventory({
      quantity: updated,
    });

    setQuantity(0);
  };

  return (
    <StockAdjustmentCard>
      <div className="grid gap-5 lg:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Action
          </label>

          <select
            value={type}
            onChange={(e) =>
              setType(
                e.target.value as "add" | "remove"
              )
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
          >
            <option value="add">
              Increase Stock
            </option>

            <option value="remove">
              Decrease Stock
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Quantity
          </label>

          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={applyAdjustment}
            className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-white transition hover:bg-brand-700"
          >
            Apply Adjustment
          </button>
        </div>
      </div>
    </StockAdjustmentCard>
  );
}