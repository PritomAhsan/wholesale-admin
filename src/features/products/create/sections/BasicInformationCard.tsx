"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import TextArea from "@/components/form/input/TextArea";

import { ProductFormData } from "../CreateProductManager";

interface Props {
  form: ProductFormData;

  errors?: Record<string, string[]>;

  onChange: <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K]
  ) => void;
}

export default function BasicInformationCard({
  form,
  errors = {},
  onChange,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Basic Information
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Enter the basic details of the product.
        </p>
      </div>

      <div className="space-y-6 p-6">

        {/* Name & SKU */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          <div>
            <Label required>
              Product Name
            </Label>

            <Input
              placeholder="Enter product name"
              value={form.name}
              onChange={(e) =>
                onChange(
                  "name",
                  e.target.value
                )
              }
            />

            {errors.name && (
              <p className="mt-2 text-sm text-error-500">
                {errors.name[0]}
              </p>
            )}
          </div>

          <div>
            <Label required>
              SKU
            </Label>

            <Input
              placeholder="PRD-10001"
              value={form.sku}
              onChange={(e) =>
                onChange(
                  "sku",
                  e.target.value
                )
              }
            />

            {errors.sku && (
              <p className="mt-2 text-sm text-error-500">
                {errors.sku[0]}
              </p>
            )}
          </div>

        </div>

        {/* Slug */}

        <div>
          <Label>
            Slug
          </Label>

          <Input
            placeholder="product-slug"
            value={form.slug}
            onChange={(e) =>
              onChange(
                "slug",
                e.target.value
              )
            }
          />

          {errors.slug && (
            <p className="mt-2 text-sm text-error-500">
              {errors.slug[0]}
            </p>
          )}
        </div>

        {/* Short Description */}

        <div>
          <Label>
            Short Description
          </Label>

          <TextArea
            rows={3}
            placeholder="Short summary of the product..."
            value={form.short_description}
            onChange={(value) =>
              onChange(
                "short_description",
                value
              )
            }
          />

          {errors.short_description && (
            <p className="mt-2 text-sm text-error-500">
              {
                errors.short_description[0]
              }
            </p>
          )}
        </div>

        {/* Description */}

        <div>
          <Label>
            Description
          </Label>

          <TextArea
            rows={8}
            placeholder="Detailed product description..."
            value={form.description}
            onChange={(value) =>
              onChange(
                "description",
                value
              )
            }
          />

          {errors.description && (
            <p className="mt-2 text-sm text-error-500">
              {errors.description[0]}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}