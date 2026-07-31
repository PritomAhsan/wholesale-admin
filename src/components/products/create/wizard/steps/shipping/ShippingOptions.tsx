"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useProductWizard } from "@/context/ProductWizardContext";

export default function ShippingOptions() {
  const { product, updateShipping } = useProductWizard();

  const shipping = product.shipping;

  const options = [
    {
      key: "domesticShipping",
      label: "Domestic Shipping",
    },
    {
      key: "internationalShipping",
      label: "International Shipping",
    },
    {
      key: "pickupAvailable",
      label: "Pickup Available",
    },
    {
      key: "freeShipping",
      label: "Free Shipping",
    },
  ] as const;

  return (
    <ComponentCard
      title="Shipping Options"
      desc="Choose available shipping methods."
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {options.map((option) => (
            <label
              key={option.key}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
            >
              <span className="font-medium">
                {option.label}
              </span>

              <input
                type="checkbox"
                checked={shipping[option.key]}
                onChange={(e) =>
                  updateShipping({
                    [option.key]: e.target.checked,
                  })
                }
              />
            </label>
          ))}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Shipping Notes
          </label>

          <textarea
            rows={4}
            value={shipping.shippingNotes}
            onChange={(e) =>
              updateShipping({
                shippingNotes: e.target.value,
              })
            }
            placeholder="Example: Shipping charges depend on destination, order quantity, or negotiated terms."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-gray-900"
          />
        </div>
      </div>
    </ComponentCard>
  );
}