"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  pending: "Pending Review",
  approved: "Approved",
  rejected: "Rejected",
  published: "Published",
  unpublished: "Unpublished",
  archived: "Archived",
};

function statusLabel(status?: string) {
  if (!status) return "Draft";
  return STATUS_LABELS[status] ?? status;
}

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

  /**
   * Suppliers can create/edit their own products but status and
   * featured placement are moderation decisions the backend now
   * silently ignores from this form — hide the controls instead of
   * showing something that won't do what it says, and offer the
   * real path (submit for review) instead.
   */
  isSupplierOnly?: boolean;

  canSubmitForReview?: boolean;

  onSubmitForReview?: () => void;

  submittingForReview?: boolean;

  /**
   * The admin's remarks from the most recent rejection, fetched from
   * the product's own approval timeline. Only meaningful when
   * status === "rejected" — a supplier otherwise has no way to know
   * why their listing didn't go through.
   */
  rejectionRemarks?: string | null;
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
  isSupplierOnly = false,
  canSubmitForReview = false,
  onSubmitForReview,
  submittingForReview = false,
  rejectionRemarks = null,
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

        {!isSupplierOnly && (
          <>

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

          </>
        )}

        {isSupplierOnly && (
          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600 dark:bg-white/[0.03] dark:text-gray-400">
            <p className="font-medium text-gray-800 dark:text-gray-200">
              Current status: {statusLabel(status)}
            </p>
            <p className="mt-1">
              {status === "draft" || status === "rejected"
                ? "Save your changes, then submit for review when the listing is ready. An admin will approve or reject it before it goes live."
                : "This listing is with the marketplace team. You can keep editing it — changes are saved as a draft copy of its current details."}
            </p>
          </div>
        )}

        {isSupplierOnly && status === "rejected" && (
          <div className="rounded-lg border border-error-200 bg-error-50 p-4 text-sm dark:border-error-500/30 dark:bg-error-500/10">
            <p className="font-medium text-error-700 dark:text-error-400">
              Why this was rejected
            </p>
            <p className="mt-1 text-error-600 dark:text-error-400/90">
              {rejectionRemarks ?? "No reason was recorded for this rejection."}
            </p>
          </div>
        )}

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

          {isSupplierOnly && canSubmitForReview && (
            <button
              type="button"
              onClick={onSubmitForReview}
              disabled={loading || submittingForReview}
              className="rounded-lg border border-brand-500 px-5 py-3 text-sm font-medium text-brand-500 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-brand-500/10"
            >
              {submittingForReview
                ? "Submitting..."
                : "Submit for Review"}
            </button>
          )}

          {!isSupplierOnly && (
            <button
              type="button"
              onClick={onSaveDraft}
              disabled={loading}
              className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Save as Draft
            </button>
          )}

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