"use client";

import { useEffect } from "react";

import ComponentCard from "@/components/common/ComponentCard";
import { useProductWizard } from "@/context/ProductWizardContext";
import LeadTimeSettings from "./LeadTimeSettings";
import DimensionInput from "./DimensionInput";
import ShippingSummary from "./ShippingSummary";
import ShippingOptions from "./ShippingOptions";
import ShippingValidation from "./ShippingValidation";

export default function ShippingDimensions() {
  const { product, updateShipping } =
    useProductWizard();

  const shipping = product.shipping;

  useEffect(() => {
    const volumetricWeight =
      (shipping.length *
        shipping.width *
        shipping.height) /
      5000;

    if (
      volumetricWeight !==
      shipping.volumetricWeight
    ) {
      updateShipping({
        volumetricWeight: Number(
          volumetricWeight.toFixed(2)
        ),
      });
    }
  }, [
    shipping.length,
    shipping.width,
    shipping.height,
  ]);

  return (
    <div className="space-y-6">
      <ComponentCard
        title="Product Dimensions"
        desc="Enter the package dimensions used for shipping."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <DimensionInput
            label="Weight"
            value={shipping.weight}
            onChange={(value) =>
              updateShipping({
                weight: value,
              })
            }
          />

          <DimensionInput
            label="Length"
            value={shipping.length}
            onChange={(value) =>
              updateShipping({
                length: value,
              })
            }
          />

          <DimensionInput
            label="Width"
            value={shipping.width}
            onChange={(value) =>
              updateShipping({
                width: value,
              })
            }
          />

          <DimensionInput
            label="Height"
            value={shipping.height}
            onChange={(value) =>
              updateShipping({
                height: value,
              })
            }
          />

          <div>
            <label className="mb-2 block text-sm font-medium">
              Weight Unit
            </label>

            <select
              value={shipping.weightUnit}
              onChange={(e) =>
                updateShipping({
                  weightUnit: e.target
                    .value as
                    | "kg"
                    | "g"
                    | "lb",
                })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
            >
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="lb">lb</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Dimension Unit
            </label>

            <select
              value={shipping.dimensionUnit}
              onChange={(e) =>
                updateShipping({
                  dimensionUnit: e.target
                    .value as
                    | "cm"
                    | "m"
                    | "inch",
                })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
            >
              <option value="cm">cm</option>
              <option value="m">m</option>
              <option value="inch">
                inch
              </option>
            </select>
          </div>
        </div>
      </ComponentCard>

<LeadTimeSettings />

<ShippingOptions />

      <ShippingSummary />

      <ShippingValidation />
    </div>
  );
}