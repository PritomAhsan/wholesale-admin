"use client";

import { Plus } from "lucide-react";

export interface ProductVariant {
  sku: string;

  barcode: string;

  cost_price: string;

  selling_price: string;

  compare_at_price: string;

  wholesale_price: string;

  stock_quantity: string;

  low_stock_quantity: string;

  min_order_quantity: string;

  max_order_quantity: string;

  is_default: boolean;

  is_active: boolean;

  attributes: {
    attribute_id: number | null;
    attribute_value_id: number | null;
  }[];
}

interface Props {
  variants?: ProductVariant[];

  onChange?: (
    variants: ProductVariant[]
  ) => void;
}

export default function VariantsCard({
  variants = [],
  onChange,
}: Props) {
  const addVariant = () => {
    onChange?.([
      ...variants,
      {
        sku: "",

        barcode: "",

        cost_price: "",

        selling_price: "",

        compare_at_price: "",

        wholesale_price: "",

        stock_quantity: "0",

        low_stock_quantity: "5",

        min_order_quantity: "1",

        max_order_quantity: "",

        is_default: variants.length === 0,

        is_active: true,

        attributes: [],
      },
    ]);
  };

  const updateVariant = <
  K extends keyof ProductVariant
>(
  index: number,
  field: K,
  value: ProductVariant[K]
) => {
  const updated = [...variants];

  updated[index] = {
    ...updated[index],
    [field]: value,
  };

  onChange?.(updated);
};

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">

        <div>
          <h3 className="text-lg font-semibold">
            Product Variants
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Create multiple variants such as
            Color, Size or Material.
          </p>
        </div>

        <button
          type="button"
          onClick={addVariant}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
        >
          <Plus size={16} />

          Add Variant
        </button>

      </div>

      <div className="p-6">

        {variants.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-sm text-gray-500 dark:border-gray-700">
            No variants added yet.
          </div>
        )}

                {variants.map((variant, index) => (
          <div
            key={index}
            className="mb-6 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-5 py-3 dark:border-gray-700 dark:bg-white/[0.02]">

              <h4 className="font-semibold">
                Variant #{index + 1}
              </h4>

              <button
                type="button"
                onClick={() =>
                  onChange?.(
                    variants.filter(
                      (_, i) => i !== index
                    )
                  )
                }
                className="text-sm font-medium text-red-500 hover:text-red-600"
              >
                Remove
              </button>

            </div>

            <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-2">

              {/* SKU */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  SKU
                </label>

                <input
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={variant.sku}
                  onChange={(e) =>
  updateVariant(
    index,
    "sku",
    e.target.value
  )
}
                />
              </div>

              {/* Barcode */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Barcode
                </label>

                <input
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={
                    variant.barcode
                  }
                  onChange={(e) =>
  updateVariant(
    index,
    "barcode",
    e.target.value
  )
}
                />
              </div>

              {/* Cost */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Cost Price
                </label>

                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={
                    variant.cost_price
                  }
                  onChange={(e) =>
  updateVariant(
    index,
    "cost_price",
    e.target.value
  )
}
                />
              </div>

              {/* Selling */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Selling Price
                </label>

                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={
                    variant.selling_price
                  }
                  onChange={(e) =>
  updateVariant(
    index,
    "selling_price",
    e.target.value
  )
}
                />
              </div>

              {/* Wholesale */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Wholesale Price
                </label>

                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={
                    variant.wholesale_price
                  }
                  onChange={(e) =>
  updateVariant(
    index,
    "wholesale_price",
    e.target.value
  )
}
                />
              </div>

              {/* Compare */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Compare At Price
                </label>

                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={
                    variant.compare_at_price
                  }
                  onChange={(e) =>
  updateVariant(
    index,
    "compare_at_price",
    e.target.value
  )
}
                />
              </div>

                            {/* Stock Quantity */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={variant.stock_quantity}
                  onChange={(e) =>
  updateVariant(
    index,
    "stock_quantity",
    e.target.value
  )
}
                />
              </div>

              {/* Low Stock */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Low Stock Alert
                </label>

                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={variant.low_stock_quantity}
                  onChange={(e) =>
  updateVariant(
    index,
    "low_stock_quantity",
    e.target.value
  )
}
                />
              </div>

              {/* MOQ */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Minimum Order Quantity
                </label>

                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={variant.min_order_quantity}
                  onChange={(e) =>
  updateVariant(
    index,
    "min_order_quantity",
    e.target.value
  )
}
                />
              </div>

              {/* Maximum Order */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Maximum Order Quantity
                </label>

                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={variant.max_order_quantity}
                  onChange={(e) =>
  updateVariant(
    index,
    "max_order_quantity",
    e.target.value
  )
}
                />
              </div>

            </div>

            {/* Settings */}

            <div className="border-t border-gray-200 px-5 py-4 dark:border-gray-700">

              <div className="flex flex-wrap items-center gap-8">

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    checked={variant.is_default}
                    onChange={(e) => {
  const updated = variants.map(
    (variant, i) => ({
      ...variant,
      is_default:
        i === index
          ? e.target.checked
          : false,
    })
  );

  onChange?.(updated);
}}
                  />

                  <span className="text-sm">
                    Default Variant
                  </span>

                </label>

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    checked={variant.is_active}
                    onChange={(e) =>
  updateVariant(
    index,
    "is_active",
    e.target.checked
  )
}
                  />

                  <span className="text-sm">
                    Active
                  </span>

                </label>

              </div>

            </div>

            {/* Attributes Placeholder */}

            <div className="border-t border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-white/[0.02]">

              <h5 className="mb-2 font-medium">
                Variant Attributes
              </h5>

              <p className="text-sm text-gray-500">
                Attribute combinations (Color, Size,
                Material, etc.) will be connected in the
                next batch using your existing
                ProductVariantAttributeValue backend.
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}