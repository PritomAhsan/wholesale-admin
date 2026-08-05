"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";

interface Props {
  featured?: boolean;

  status?: string;

  loading?: boolean;

  onFeaturedChange?: (
    value: boolean
  ) => void;

  onStatusChange?: (
    value: string
  ) => void;

  onSubmit: () => void;

  onCancel?: () => void;

  onSaveDraft?: () => void;
}

export default function PublishCard({
  featured = false,
  status = "draft",
  loading = false,
  onFeaturedChange,
  onStatusChange,
  onSubmit,
  onCancel,
  onSaveDraft,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

      <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">

        <h3 className="text-lg font-semibold">
          Publish
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Configure product visibility before saving.
        </p>

      </div>

      <div className="space-y-6 p-6">

        {/* Featured */}

        <div>

          <Checkbox
            checked={featured}
            onChange={(checked) =>
              onFeaturedChange?.(checked)
            }
            label="Featured Product"
          />

          <p className="mt-2 text-sm text-gray-500">
            Featured products appear in
            highlighted marketplace sections.
          </p>

        </div>

        {/* Status */}

        <div>
  <Label>
    Product Status
  </Label>

  <Select
    value={status}
    options={[
      {
        value: "draft",
        label: "Draft",
      },
      {
        value: "pending",
        label: "Pending Review",
      },
      {
        value: "published",
        label: "Published",
      },
      {
        value: "archived",
        label: "Archived",
      },
    ]}
    onChange={(value) =>
      onStatusChange?.(String(value))
    }
  />

  <p className="mt-2 text-sm text-gray-500">
    Choose the publication status for this product.
  </p>
</div>

        {/* Actions */}

        <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">

          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : "Save Product"}
          </button>

          <button
            type="button"
            onClick={onSaveDraft}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Save as Draft
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-red-300 px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900 dark:hover:bg-red-900/20"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}