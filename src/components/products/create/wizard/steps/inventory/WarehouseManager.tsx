"use client";

import { Plus } from "lucide-react";

import { useProductWizard } from "@/context/ProductWizardContext";
import { ProductWarehouseInfo } from "@/types/productWizard";

import WarehouseCard from "./WarehouseCard";
import WarehouseRow from "./WarehouseRow";
import WarehouseSummary from "./WarehouseSummary";

export default function WarehouseManager() {
  const { product, updateWarehouse } = useProductWizard();

  const warehouses = product.warehouse.warehouses;

  const addWarehouse = () => {
    const warehouse: ProductWarehouseInfo = {
      id: crypto.randomUUID(),

      warehouseId: null,

      warehouseName: "",

      quantity: 0,

      reservedQuantity: 0,

      availableQuantity: 0,

      isPrimary: warehouses.length === 0,
    };

    updateWarehouse({
      warehouses: [...warehouses, warehouse],
    });
  };

  const updateWarehouseRow = (
    index: number,
    warehouse: ProductWarehouseInfo
  ) => {
    const updated = [...warehouses];

    updated[index] = {
      ...warehouse,
      availableQuantity: Math.max(
        0,
        warehouse.quantity - warehouse.reservedQuantity
      ),
    };

    updateWarehouse({
      warehouses: updated,
    });
  };

  const deleteWarehouse = (index: number) => {
    const updated = warehouses.filter(
      (_, i) => i !== index
    );

    if (
      updated.length > 0 &&
      !updated.some((w) => w.isPrimary)
    ) {
      updated[0].isPrimary = true;
    }

    updateWarehouse({
      warehouses: updated,
    });
  };

  return (
    <div className="space-y-6">
      <WarehouseSummary />

      <WarehouseCard>
        <div className="space-y-4">
          {warehouses.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500 dark:border-gray-700">
              No warehouses added yet.
            </div>
          )}

          {warehouses.map((warehouse, index) => (
            <WarehouseRow
              key={warehouse.id}
              warehouse={warehouse}
              onChange={(value) =>
                updateWarehouseRow(index, value)
              }
              onDelete={() =>
                deleteWarehouse(index)
              }
            />
          ))}

          <button
            type="button"
            onClick={addWarehouse}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-white transition hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" />

            Add Warehouse
          </button>
        </div>
      </WarehouseCard>
    </div>
  );
}