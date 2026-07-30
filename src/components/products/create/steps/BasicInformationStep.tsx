"use client";

import {
  brands,
  categories,
  units,
} from "@/data/product-options";

import { ProductFormData } from "@/types/product";

type Props = {
  formData: ProductFormData;

  updateField: (
    key: keyof ProductFormData,
    value: string | number
  ) => void;
};

export default function BasicInformationStep({
  formData,
  updateField,
}: Props) {
  return (
    <div className="grid gap-6">

      <div>
        <label className="mb-2 block text-sm font-medium">
          Product Name
        </label>

        <input
          value={formData.productName}
          onChange={(e) =>
            updateField(
              "productName",
              e.target.value
            )
          }
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Short Description
        </label>

        <textarea
          rows={4}
          value={formData.shortDescription}
          onChange={(e) =>
            updateField(
              "shortDescription",
              e.target.value
            )
          }
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm">
            Category
          </label>

          <select
            value={formData.categoryId}
            onChange={(e) =>
              updateField(
                "categoryId",
                e.target.value
              )
            }
            className="w-full rounded-lg border px-4 py-3"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>
            ))}

          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm">
            Brand
          </label>

          <select
            value={formData.brandId}
            onChange={(e) =>
              updateField(
                "brandId",
                e.target.value
              )
            }
            className="w-full rounded-lg border px-4 py-3"
          >
            <option value="">
              Select Brand
            </option>

            {brands.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>
            ))}

          </select>

        </div>

      </div>

      <div className="grid gap-5 md:grid-cols-3">

        <div>

          <label className="mb-2 block text-sm">
            Unit
          </label>

          <select
            value={formData.unitId}
            onChange={(e) =>
              updateField(
                "unitId",
                e.target.value
              )
            }
            className="w-full rounded-lg border px-4 py-3"
          >
            <option value="">
              Select Unit
            </option>

            {units.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>
            ))}

          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm">
            Product Type
          </label>

          <select
            value={formData.productType}
            onChange={(e) =>
              updateField(
                "productType",
                e.target.value
              )
            }
            className="w-full rounded-lg border px-4 py-3"
          >
            <option value="physical">
              Physical
            </option>

            <option value="digital">
              Digital
            </option>

            <option value="service">
              Service
            </option>

          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm">
            MOQ
          </label>

          <input
            type="number"
            min={1}
            value={formData.moq}
            onChange={(e) =>
              updateField(
                "moq",
                Number(e.target.value)
              )
            }
            className="w-full rounded-lg border px-4 py-3"
          />

        </div>

      </div>

    </div>
  );
}