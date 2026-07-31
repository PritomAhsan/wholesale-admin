"use client";

import { ProductVariantItem } from "@/types/productWizard";

interface Props {
  variant: ProductVariantItem;
  index: number;
  onChange: (
    id: string,
    data: Partial<ProductVariantItem>
  ) => void;
}

export default function VariantRow({
  variant,
  index,
  onChange,
}: Props) {
  return (
    <tr className="border-b">

      <td className="px-4 py-3 text-sm font-medium whitespace-nowrap">
        {index + 1}
      </td>

      <td className="px-4 py-3">
        <div className="text-sm font-medium">
          {variant.title}
        </div>

        <div className="mt-1 flex flex-wrap gap-1">
          {Object.entries(variant.attributes).map(
            ([key, value]) => (
              <span
                key={key}
                className="rounded bg-gray-100 px-2 py-0.5 text-xs"
              >
                {key}: {value}
              </span>
            )
          )}
        </div>
      </td>

      <td className="px-4 py-3">
        <input
          value={variant.sku}
          onChange={(e) =>
            onChange(variant.id, {
              sku: e.target.value,
            })
          }
          className="w-36 rounded-lg border px-3 py-2"
        />
      </td>

      <td className="px-4 py-3">
        <input
          type="number"
          value={variant.price}
          onChange={(e) =>
            onChange(variant.id, {
              price: Number(e.target.value),
            })
          }
          className="w-24 rounded-lg border px-3 py-2"
        />
      </td>

      <td className="px-4 py-3">
        <input
          type="number"
          value={variant.quantity}
          onChange={(e) =>
            onChange(variant.id, {
              quantity: Number(e.target.value),
            })
          }
          className="w-24 rounded-lg border px-3 py-2"
        />
      </td>

      <td className="px-4 py-3 text-center">
        <input
          type="checkbox"
          checked={variant.active}
          onChange={(e) =>
            onChange(variant.id, {
              active: e.target.checked,
            })
          }
          className="h-5 w-5"
        />
      </td>
    </tr>
  );
}