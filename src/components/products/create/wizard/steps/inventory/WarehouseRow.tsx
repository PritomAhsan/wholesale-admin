"use client";

import { Trash2 } from "lucide-react";

import { ProductWarehouseInfo } from "@/types/productWizard";

interface Props {
  warehouse: ProductWarehouseInfo;
  onChange: (warehouse: ProductWarehouseInfo) => void;
  onDelete: () => void;
}

export default function WarehouseRow({
  warehouse,
  onChange,
  onDelete,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
      <div className="grid gap-4 lg:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Warehouse
          </label>

          <input
            type="text"
            value={warehouse.warehouseName}
            onChange={(e) =>
              onChange({
                ...warehouse,
                warehouseName: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Quantity
          </label>

          <input
            type="number"
            min={0}
            value={warehouse.quantity}
            onChange={(e) =>
              onChange({
                ...warehouse,
                quantity: Number(e.target.value),
                availableQuantity: Math.max(
                  0,
                  Number(e.target.value) -
                    warehouse.reservedQuantity
                ),
              })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Reserved
          </label>

          <input
            type="number"
            min={0}
            value={warehouse.reservedQuantity}
            onChange={(e) =>
              onChange({
                ...warehouse,
                reservedQuantity: Number(e.target.value),
                availableQuantity: Math.max(
                  0,
                  warehouse.quantity -
                    Number(e.target.value)
                ),
              })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Available
            </p>

            <p className="text-xl font-bold">
              {warehouse.availableQuantity}
            </p>
          </div>

          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg p-2 text-red-600 hover:bg-red-50"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}