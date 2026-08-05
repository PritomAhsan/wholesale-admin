"use client";

import { Plus, Trash2 } from "lucide-react";

import Label from "@/components/form/Label";
import Select from "@/components/form/Select";

export interface ProductAttributeRow {
  attribute_id: number | null;
  attribute_value_id: number | null;
}

interface Option {
  value: string;
  label: string;
}

interface Props {
  items?: ProductAttributeRow[];

  attributeOptions?: Option[];

  valueOptions?: Record<number, Option[]>;

  onChange?: (
    items: ProductAttributeRow[]
  ) => void;
}

export default function AttributesCard({
  items = [],
  attributeOptions = [],
  valueOptions = {},
  onChange,
}: Props) {
  const addRow = () => {
    onChange?.([
      ...items,
      {
        attribute_id: null,
        attribute_value_id: null,
      },
    ]);
  };

  const removeRow = (index: number) => {
    onChange?.(
      items.filter((_, i) => i !== index)
    );
  };

  const updateAttribute = (
    index: number,
    attributeId: number | null
  ) => {
    const updated = [...items];

    updated[index] = {
      attribute_id: attributeId,
      attribute_value_id: null,
    };

    onChange?.(updated);
  };

  const updateValue = (
    index: number,
    valueId: number | null
  ) => {
    const updated = [...items];

    updated[index].attribute_value_id =
      valueId;

    onChange?.(updated);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">

        <div>
          <h3 className="text-lg font-semibold">
            Attributes
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Assign attributes to this product.
          </p>
        </div>

        <button
          type="button"
          onClick={addRow}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
        >
          <Plus size={16} />

          Add Attribute
        </button>

      </div>

      <div className="space-y-4 p-6">

        {items.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-gray-700">
            No attributes added yet.
          </div>
        )}

        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
          >

            <div className="col-span-5">

              <Label>
                Attribute
              </Label>

              <Select
                placeholder="Select Attribute"
                options={[
                  {
                    value: "",
                    label:
                      "Select Attribute",
                  },
                  ...attributeOptions,
                ]}
                value={
                  item.attribute_id
                    ? String(
                        item.attribute_id
                      )
                    : ""
                }
                onChange={(value) =>
                  updateAttribute(
                    index,
                    value
                      ? Number(value)
                      : null
                  )
                }
              />

            </div>

            <div className="col-span-5">

              <Label>
                Value
              </Label>

              <Select
                placeholder="Select Value"
                options={[
                  {
                    value: "",
                    label:
                      "Select Value",
                  },
                  ...(
                    valueOptions[
                      item.attribute_id ??
                        0
                    ] ?? []
                  ),
                ]}
                value={
                  item.attribute_value_id
                    ? String(
                        item.attribute_value_id
                      )
                    : ""
                }
                onChange={(value) =>
                  updateValue(
                    index,
                    value
                      ? Number(value)
                      : null
                  )
                }
              />

            </div>

            <div className="col-span-2 flex items-end justify-end">

              <button
                type="button"
                onClick={() =>
                  removeRow(index)
                }
                className="rounded-lg p-3 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <Trash2 size={18} />
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}