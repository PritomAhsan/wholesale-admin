"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Checkbox from "@/components/form/input/Checkbox";

import { ProductFormData } from "../CreateProductManager";

interface Props {
  form: ProductFormData;

  onChange: <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K]
  ) => void;
}

export default function ShippingCard({
  form,
  onChange,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

      <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <h3 className="text-lg font-semibold">
          Shipping & Dimensions
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Configure shipping settings and product dimensions.
        </p>
      </div>

      <div className="space-y-8 p-6">

        {/* Product Type */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <Checkbox
            checked={form.is_digital}
            onChange={(checked) =>
              onChange(
                "is_digital",
                checked
              )
            }
            label="Digital Product"
          />

          <Checkbox
            checked={
              form.requires_shipping
            }
            onChange={(checked) =>
              onChange(
                "requires_shipping",
                checked
              )
            }
            label="Requires Shipping"
          />

        </div>

        {/* Dimensions */}

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">

          <div>
            <Label>
              Weight (kg)
            </Label>

            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={form.weight}
              onChange={(e) =>
                onChange(
                  "weight",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <Label>
              Length (cm)
            </Label>

            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={form.length}
              onChange={(e) =>
                onChange(
                  "length",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <Label>
              Width (cm)
            </Label>

            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={form.width}
              onChange={(e) =>
                onChange(
                  "width",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <Label>
              Height (cm)
            </Label>

            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={form.height}
              onChange={(e) =>
                onChange(
                  "height",
                  e.target.value
                )
              }
            />
          </div>

        </div>

      </div>

    </div>
  );
}