"use client";

import Label from "@/components/form/Label";
import Select from "@/components/form/Select";

import { ProductFormData } from "../CreateProductManager";

interface Option {
  value: string;
  label: string;
}

interface Props {
  form: ProductFormData;

  onChange: <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K]
  ) => void;

  brands?: Option[];

  suppliers?: Option[];

  units?: Option[];

  categories?: Option[];
}

export default function OrganizationCard({
  form,
  onChange,
  brands = [],
  suppliers = [],
  units = [],
  categories = [],
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Organization
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Assign brand, supplier, unit and category.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">

        {/* Brand */}

        <div>
          <Label>Brand</Label>

          <Select
            placeholder="Select Brand"
            options={[
              {
                value: "",
                label: "Select Brand",
              },
              ...brands,
            ]}
            value={
              form.brand_id
                ? String(form.brand_id)
                : ""
            }
            onChange={(value) =>
              onChange(
                "brand_id",
                value
                  ? Number(value)
                  : null
              )
            }
          />
        </div>

        {/* Supplier */}

        <div>
          <Label>Supplier</Label>

          <Select
            placeholder="Select Supplier"
            options={[
              {
                value: "",
                label: "Select Supplier",
              },
              ...suppliers,
            ]}
            value={
              form.supplier_id
                ? String(
                    form.supplier_id
                  )
                : ""
            }
            onChange={(value) =>
              onChange(
                "supplier_id",
                value
                  ? Number(value)
                  : null
              )
            }
          />
        </div>

        {/* Unit */}

        <div>
          <Label>Unit</Label>

          <Select
            placeholder="Select Unit"
            options={[
              {
                value: "",
                label: "Select Unit",
              },
              ...units,
            ]}
            value={
              form.unit_id
                ? String(form.unit_id)
                : ""
            }
            onChange={(value) =>
              onChange(
                "unit_id",
                value
                  ? Number(value)
                  : null
              )
            }
          />
        </div>

        {/* Category */}

        <div>
          <Label>Primary Category</Label>

          <Select
            placeholder="Select Category"
            options={[
              {
                value: "",
                label: "Select Category",
              },
              ...categories,
            ]}
            value={
              form.category_ids.length
                ? String(
                    form.category_ids[0]
                  )
                : ""
            }
            onChange={(value) =>
              onChange(
                "category_ids",
                value
                  ? [Number(value)]
                  : []
              )
            }
          />
        </div>

      </div>
    </div>
  );
}