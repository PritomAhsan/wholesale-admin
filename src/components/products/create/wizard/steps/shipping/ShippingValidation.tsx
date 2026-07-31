"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { useProductWizard } from "@/context/ProductWizardContext";

export default function ShippingValidation() {
  const { product } = useProductWizard();

  const shipping = product.shipping;

  const errors: string[] = [];

  if (shipping.weight <= 0)
    errors.push("Product weight is required.");

  if (shipping.length <= 0)
    errors.push("Length is required.");

  if (shipping.width <= 0)
    errors.push("Width is required.");

  if (shipping.height <= 0)
    errors.push("Height is required.");

  if (shipping.productionLeadTime < 0)
    errors.push("Production lead time is invalid.");

  if (
    !shipping.domesticShipping &&
    !shipping.internationalShipping &&
    !shipping.pickupAvailable
  ) {
    errors.push(
      "Select at least one shipping method."
    );
  }

  const valid = errors.length === 0;

  return (
    <ComponentCard
      title="Shipping Validation"
      desc="Verify shipping information before continuing."
    >
      {valid ? (
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
          <CheckCircle2 className="text-green-600" size={22} />

          <div>
            <h4 className="font-semibold text-green-700">
              Shipping configuration completed
            </h4>

            <p className="text-sm text-green-600">
              This product is ready for the next step.
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
              Please complete the following
            </h4>
          </div>

          <ul className="list-disc space-y-2 pl-5 text-sm text-yellow-700">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </ComponentCard>
  );
}