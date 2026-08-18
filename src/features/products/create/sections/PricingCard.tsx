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

export default function PricingCard({
  form,
  onChange,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

      <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Pricing
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Configure selling and purchasing prices.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">

        <div>
          <Label required>
            Cost Price
          </Label>

          <Input
            type="number"
            step={0.01}
            placeholder="0.00"
            value={form.cost_price}
            onChange={(e) =>
              onChange(
                "cost_price",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <Label required>
            Selling Price
          </Label>

          <Input
            type="number"
            step={0.01}
            placeholder="0.00"
            value={form.selling_price}
            onChange={(e) =>
              onChange(
                "selling_price",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <Label>
            Compare At Price
          </Label>

          <Input
            type="number"
            step={0.01}
            placeholder="0.00"
            value={form.compare_at_price}
            onChange={(e) =>
              onChange(
                "compare_at_price",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <Label>
            Wholesale Price
          </Label>

          <Input
            type="number"
            step={0.01}
            placeholder="0.00"
            value={form.wholesale_price}
            onChange={(e) =>
              onChange(
                "wholesale_price",
                e.target.value
              )
            }
          />
        </div>

      </div>

    </div>
  );
}