"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useProductWizard } from "@/context/ProductWizardContext";

export default function LeadTimeSettings() {
  const { product, updateShipping } = useProductWizard();

  const shipping = product.shipping;

  return (
    <ComponentCard
      title="Lead Time"
      desc="Configure production and dispatch time."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Production Lead Time
          </label>

          <input
            type="number"
            min={0}
            value={shipping.productionLeadTime}
            onChange={(e) =>
              updateShipping({
                productionLeadTime: Number(e.target.value),
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Dispatch Time
          </label>

          <input
            type="number"
            min={0}
            value={shipping.dispatchTime}
            onChange={(e) =>
              updateShipping({
                dispatchTime: Number(e.target.value),
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Unit
          </label>

          <select
            value={shipping.leadTimeUnit}
            onChange={(e) =>
              updateShipping({
                leadTimeUnit: e.target.value as
                  | "days"
                  | "weeks",
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={shipping.readyToShip}
              onChange={(e) =>
                updateShipping({
                  readyToShip: e.target.checked,
                })
              }
            />

            <span className="font-medium">
              Ready to Ship
            </span>
          </label>
        </div>
      </div>
    </ComponentCard>
  );
}