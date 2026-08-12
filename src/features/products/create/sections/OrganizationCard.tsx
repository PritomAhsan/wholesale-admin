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

  categories?: Option[];

  brands?: Option[];

  units?: Option[];

  suppliers?: Option[];

  loading?: boolean;

  hideSupplierField?: boolean;

  errors?: {

      categories?: string | null;

      brands?: string | null;

      suppliers?: string | null;

      units?: string | null;

  };
}

export default function OrganizationCard({
    form,
    onChange,
    categories = [],
    brands = [],
    units = [],
    suppliers = [],
    loading = false,
    hideSupplierField = false,
    errors,
}: Props) {
  if (loading) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center gap-3">

        <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />

        <span className="text-sm text-gray-500">
          Loading categories, brands,
          suppliers and units...
        </span>

      </div>
    </div>
  );
}

if (
  errors?.categories ||
  errors?.brands ||
  errors?.units ||
  errors?.suppliers
) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-950/20">

      <h3 className="font-semibold text-red-600">
        Failed to load lookup data
      </h3>

      <p className="mt-2 text-sm text-red-500">
        One or more lookup APIs failed.
        Please refresh the page.
      </p>

      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-red-500">

        {errors.categories && (
          <li>
            Categories: {errors.categories}
          </li>
        )}

        {errors.brands && (
          <li>
            Brands: {errors.brands}
          </li>
        )}

        {errors.units && (
          <li>
            Units: {errors.units}
          </li>
        )}

        {errors.suppliers && (
          <li>
            Suppliers: {errors.suppliers}
          </li>
        )}

      </ul>

    </div>
  );
}

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

        {!hideSupplierField && (
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
        )}

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