"use client";

import ComponentCard from "@/components/common/ComponentCard";
import {
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { useProductWizard } from "@/context/ProductWizardContext";

export default function MediaValidation() {
  const { product } = useProductWizard();

  const images = product.media.images;

  const errors: string[] = [];

  if (images.length === 0) {
    errors.push(
      "Upload at least one product image."
    );
  }

  if (
    images.length > 0 &&
    !images.some((image) => image.isPrimary)
  ) {
    errors.push(
      "Select a primary product image."
    );
  }

  const isValid = errors.length === 0;

  return (
    <ComponentCard
      title="Media Validation"
      desc="Verify media before continuing."
    >
      {isValid ? (
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
          <CheckCircle2
            className="text-green-600"
            size={22}
          />

          <div>
            <h4 className="font-semibold text-green-700">
              Media completed
            </h4>

            <p className="text-sm text-green-600">
              Product media is ready.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle
              className="text-yellow-600"
              size={20}
            />

            <h4 className="font-semibold text-yellow-700">
              Please fix the following
            </h4>
          </div>

          <ul className="list-disc space-y-2 pl-5 text-sm text-yellow-700">
            {errors.map((error) => (
              <li key={error}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}
    </ComponentCard>
  );
}