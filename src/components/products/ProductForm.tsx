"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import TextArea from "@/components/form/input/TextArea";
import Checkbox from "@/components/form/input/Checkbox";

interface ProductFormData {
  name: string;

  slug: string;

  sku: string;

  short_description: string;

  description: string;

  cost_price: string;

  selling_price: string;

  compare_at_price: string;

  currency: string;

  stock_quantity: string;

  min_order_quantity: string;

  max_order_quantity: string;

  weight: string;

  length: string;

  width: string;

  height: string;

  featured: boolean;

  is_digital: boolean;

  requires_shipping: boolean;

  meta_title: string;

  meta_description: string;

  meta_keywords: string;
}

interface Props {
  form: ProductFormData;

  errors?: Record<string, string[]>;

  loading?: boolean;

  onChange: (
    field: keyof ProductFormData,
    value: string | boolean
  ) => void;

  onSubmit: () => void;

  onCancel: () => void;
}

export default function ProductForm({
  form,
  errors = {},
  loading = false,
  onChange,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <div className="space-y-8">

      {/* ========================= */}
      {/* General Information */}
      {/* ========================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">

        <h3 className="mb-6 text-lg font-semibold">
          General Information
        </h3>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          <div>
            <Label>
              Product Name
            </Label>

            <Input
              value={form.name}
              onChange={(e) =>
                onChange(
                  "name",
                  e.target.value
                )
              }
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name[0]}
              </p>
            )}
          </div>

          <div>
            <Label>
              Slug
            </Label>

            <Input
              value={form.slug}
              onChange={(e) =>
                onChange(
                  "slug",
                  e.target.value
                )
              }
            />

            {errors.slug && (
              <p className="mt-1 text-sm text-red-500">
                {errors.slug[0]}
              </p>
            )}
          </div>

          <div>
            <Label>
              SKU
            </Label>

            <Input
              value={form.sku}
              onChange={(e) =>
                onChange(
                  "sku",
                  e.target.value
                )
              }
            />

            {errors.sku && (
              <p className="mt-1 text-sm text-red-500">
                {errors.sku[0]}
              </p>
            )}
          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* Description */}
      {/* ========================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">

        <h3 className="mb-6 text-lg font-semibold">
          Description
        </h3>

        <div className="space-y-6">

          <div>
            <Label>
              Short Description
            </Label>

            <TextArea
              rows={3}
              value={
                form.short_description
              }
              onChange={(value) =>
                onChange(
                  "short_description",
                  value
                )
              }
            />
          </div>

          <div>
            <Label>
              Description
            </Label>

            <TextArea
              rows={8}
              value={form.description}
              onChange={(value) =>
                onChange(
                  "description",
                  value
                )
              }
            />
          </div>

        </div>

      </div>

            {/* ========================= */}
      {/* Pricing */}
      {/* ========================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">

        <h3 className="mb-6 text-lg font-semibold">
          Pricing
        </h3>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          <div>
            <Label>Cost Price</Label>

            <Input
              type="number"
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
            <Label>Selling Price</Label>

            <Input
              type="number"
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
              value={
                form.compare_at_price
              }
              onChange={(e) =>
                onChange(
                  "compare_at_price",
                  e.target.value
                )
              }
            />
          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* Inventory */}
      {/* ========================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">

        <h3 className="mb-6 text-lg font-semibold">
          Inventory
        </h3>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          <div>
            <Label>
              Stock Quantity
            </Label>

            <Input
              type="number"
              value={
                form.stock_quantity
              }
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
              Minimum Order Quantity
            </Label>

            <Input
              type="number"
              value={
                form.min_order_quantity
              }
              onChange={(e) =>
                onChange(
                  "min_order_quantity",
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

      {/* ========================= */}
      {/* Dimensions */}
      {/* ========================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">

        <h3 className="mb-6 text-lg font-semibold">
          Dimensions
        </h3>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">

          <div>
            <Label>Weight</Label>

            <Input
              type="number"
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
            <Label>Length</Label>

            <Input
              type="number"
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
            <Label>Width</Label>

            <Input
              type="number"
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
            <Label>Height</Label>

            <Input
              type="number"
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

      {/* ========================= */}
      {/* Product Settings */}
      {/* ========================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">

        <h3 className="mb-6 text-lg font-semibold">
          Product Settings
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          <Checkbox
            checked={form.featured}
            onChange={(checked) =>
              onChange(
                "featured",
                checked
              )
            }
            label="Featured Product"
          />

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

      </div>

            {/* ========================= */}
      {/* SEO */}
      {/* ========================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">

        <h3 className="mb-6 text-lg font-semibold">
          SEO
        </h3>

        <div className="space-y-6">

          <div>
            <Label>
              Meta Title
            </Label>

            <Input
              value={form.meta_title}
              onChange={(e) =>
                onChange(
                  "meta_title",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <Label>
              Meta Description
            </Label>

            <TextArea
              rows={3}
              value={
                form.meta_description
              }
              onChange={(value) =>
                onChange(
                  "meta_description",
                  value
                )
              }
            />
          </div>

          <div>
            <Label>
              Meta Keywords
            </Label>

            <Input
              placeholder="keyword1, keyword2, keyword3"
              value={
                form.meta_keywords
              }
              onChange={(e) =>
                onChange(
                  "meta_keywords",
                  e.target.value
                )
              }
            />
          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* Actions */}
      {/* ========================= */}

      <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="rounded-lg bg-brand-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Save Product"}
        </button>

      </div>

    </div>
  );
}