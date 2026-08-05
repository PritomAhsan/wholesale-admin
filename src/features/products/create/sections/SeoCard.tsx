"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import TextArea from "@/components/form/input/TextArea";

import { ProductFormData } from "../CreateProductManager";

interface Props {
  form: ProductFormData;

  onChange: <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K]
  ) => void;
}

export default function SeoCard({
  form,
  onChange,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <h3 className="text-lg font-semibold">
          Search Engine Optimization
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Improve how this product appears in search engines.
        </p>
      </div>

      <div className="space-y-6 p-6">

        {/* Meta Title */}

        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label>
              Meta Title
            </Label>

            <span className="text-xs text-gray-500">
              {form.meta_title.length}/60
            </span>
          </div>

          <Input
            placeholder="SEO title"
            value={form.meta_title}
            onChange={(e) =>
              onChange(
                "meta_title",
                e.target.value
              )
            }
          />

          <p className="mt-2 text-xs text-gray-500">
            Recommended: 50–60 characters.
          </p>
        </div>

        {/* Meta Description */}

        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label>
              Meta Description
            </Label>

            <span className="text-xs text-gray-500">
              {form.meta_description.length}/160
            </span>
          </div>

          <TextArea
            rows={4}
            placeholder="Describe your product for search engines..."
            value={form.meta_description}
            onChange={(value) =>
              onChange(
                "meta_description",
                value
              )
            }
          />

          <p className="mt-2 text-xs text-gray-500">
            Recommended: 150–160 characters.
          </p>
        </div>

        {/* Meta Keywords */}

        <div>
          <Label>
            Meta Keywords
          </Label>

          <Input
            placeholder="keyword1, keyword2, keyword3"
            value={form.meta_keywords}
            onChange={(e) =>
              onChange(
                "meta_keywords",
                e.target.value
              )
            }
          />

          <p className="mt-2 text-xs text-gray-500">
            Separate keywords with commas.
          </p>
        </div>

        {/* Preview */}

        <div className="rounded-lg border border-dashed border-gray-300 p-5 dark:border-gray-700">

          <p className="text-xs uppercase tracking-wide text-gray-500">
            Search Preview
          </p>

          <h4 className="mt-3 text-lg font-medium text-blue-600">
            {form.meta_title ||
              form.name ||
              "Product Title"}
          </h4>

          <p className="mt-1 text-sm text-green-600">
            https://your-domain.com/products/
            {form.slug || "product-slug"}
          </p>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {form.meta_description ||
              form.short_description ||
              "Your product description will appear here."}
          </p>

        </div>

      </div>

    </div>
  );
}