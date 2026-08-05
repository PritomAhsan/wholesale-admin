"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

import { ProductFormData } from "../CreateProductManager";

interface Props {
  form: ProductFormData;

  onChange: <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K]
  ) => void;
}

export default function InventoryCard({
  form,
  onChange,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

      <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <h3 className="text-lg font-semibold">
          Inventory
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Configure inventory and ordering rules.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">

        <div>
          <Label required>
            Stock Quantity
          </Label>

          <Input
            type="number"
            placeholder="0"
            value={form.stock_quantity}
            onChange={(e) =>
              onChange(
                "stock_quantity",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <Label>
            Low Stock Alert
          </Label>

          <Input
            type="number"
            placeholder="5"
            value={form.low_stock_quantity}
            onChange={(e) =>
              onChange(
                "low_stock_quantity",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <Label required>
            Minimum Order Quantity
          </Label>

          <Input
            type="number"
            placeholder="1"
            value={
              form.minimum_order_quantity
            }
            onChange={(e) =>
              onChange(
                "minimum_order_quantity",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <Label>
            Maximum Order Quantity
          </Label>

          <Input
            type="number"
            placeholder="100"
            value={
              form.max_order_quantity
            }
            onChange={(e) =>
              onChange(
                "max_order_quantity",
                e.target.value
              )
            }
          />
        </div>

      </div>

    </div>
  );
}