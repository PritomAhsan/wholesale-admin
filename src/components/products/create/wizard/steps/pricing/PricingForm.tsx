"use client";

import { useMemo } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import { useProductWizard } from "@/context/ProductWizardContext";

const currencies = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "BDT", label: "BDT (৳)" },
  { value: "CNY", label: "CNY (¥)" },
];

const incoterms = [
  { value: "EXW", label: "EXW" },
  { value: "FOB", label: "FOB" },
  { value: "CIF", label: "CIF" },
  { value: "CFR", label: "CFR" },
  { value: "DAP", label: "DAP" },
  { value: "DDP", label: "DDP" },
];

export default function PricingForm() {
  const { product, updatePricing } = useProductWizard();

  const pricing = product.pricing;

  const margin = useMemo(() => {
    if (
      pricing.costPrice <= 0 ||
      pricing.sellingPrice <= 0
    ) {
      return 0;
    }

    return (
      ((pricing.sellingPrice -
        pricing.costPrice) /
        pricing.sellingPrice) *
      100
    );
  }, [
    pricing.costPrice,
    pricing.sellingPrice,
  ]);

  return (
    <div className="space-y-6">
      <ComponentCard
        title="Pricing Information"
        desc="Configure selling price, wholesale settings and purchasing rules."
      >
        <div className="grid grid-cols-12 gap-6">

          {/* Selling Price */}

          <div className="col-span-12 md:col-span-4">
            <Label>Selling Price *</Label>

            <Input
              type="number"
              defaultValue={pricing.sellingPrice}
              onChange={(e) =>
                updatePricing({
                  sellingPrice: Number(
                    e.target.value
                  ),
                })
              }
            />
          </div>

          {/* Compare Price */}

          <div className="col-span-12 md:col-span-4">
            <Label>Compare Price</Label>

            <Input
              type="number"
              defaultValue={
                pricing.comparePrice
              }
              onChange={(e) =>
                updatePricing({
                  comparePrice: Number(
                    e.target.value
                  ),
                })
              }
            />
          </div>

          {/* Cost Price */}

          <div className="col-span-12 md:col-span-4">
            <Label>Cost Price</Label>

            <Input
              type="number"
              defaultValue={pricing.costPrice}
              onChange={(e) =>
                updatePricing({
                  costPrice: Number(
                    e.target.value
                  ),
                })
              }
            />
          </div>

          {/* Currency */}

          <div className="col-span-12 md:col-span-6">
            <Label>Currency</Label>

            <Select
              defaultValue={pricing.currency}
              options={currencies}
              onChange={(value) =>
                updatePricing({
                  currency: value,
                })
              }
            />
          </div>

          {/* MOQ */}

          <div className="col-span-12 md:col-span-6">
            <Label>Minimum Order Quantity</Label>

            <Input
              type="number"
              defaultValue={
                pricing.minimumOrder
              }
              onChange={(e) =>
                updatePricing({
                  minimumOrder: Number(
                    e.target.value
                  ),
                })
              }
            />
          </div>

          {/* Cost Summary */}

          <div className="col-span-12">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Estimated Margin
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    {margin.toFixed(2)}%
                  </h3>
                </div>

                <div className="text-right">

                  <p className="text-sm text-gray-500">
                    Profit / Unit
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-green-600">
                    {(
                      pricing.sellingPrice -
                      pricing.costPrice
                    ).toFixed(2)}{" "}
                    {pricing.currency}
                  </h3>

                </div>

              </div>

            </div>
          </div>
                    {/* Enterprise Pricing Options */}

          <div className="col-span-12">
            <ComponentCard
              title="Enterprise Pricing"
              desc="Configure B2B pricing behaviour for wholesale buyers."
            >
              <div className="grid grid-cols-12 gap-6">

                {/* Incoterm */}

                <div className="col-span-12 md:col-span-6">
                  <Label>Incoterm</Label>

                  <Select
                    defaultValue={pricing.incoterm ?? "FOB"}
                    options={incoterms}
                    onChange={(value) =>
                      updatePricing({
                        incoterm: value,
                      })
                    }
                  />
                </div>

                {/* Sample Price */}

                <div className="col-span-12 md:col-span-6">
                  <Label>Sample Price</Label>

                  <Input
                    type="number"
                    defaultValue={
                      pricing.samplePrice ?? 0
                    }
                    onChange={(e) =>
                      updatePricing({
                        samplePrice: Number(
                          e.target.value
                        ),
                      })
                    }
                  />
                </div>

                {/* Negotiable */}

                <div className="col-span-12 md:col-span-6">

                  <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 cursor-pointer dark:border-gray-700">

                    <input
                      type="checkbox"
                      checked={
                        pricing.negotiable ?? false
                      }
                      onChange={(e) =>
                        updatePricing({
                          negotiable:
                            e.target.checked,
                        })
                      }
                    />

                    <div>
                      <p className="font-medium">
                        Negotiable Price
                      </p>

                      <p className="text-sm text-gray-500">
                        Buyers can negotiate
                        before placing orders.
                      </p>
                    </div>

                  </label>

                </div>

                {/* RFQ */}

                <div className="col-span-12 md:col-span-6">

                  <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 cursor-pointer dark:border-gray-700">

                    <input
                      type="checkbox"
                      checked={
                        pricing.rfqOnly ?? false
                      }
                      onChange={(e) =>
                        updatePricing({
                          rfqOnly:
                            e.target.checked,
                        })
                      }
                    />

                    <div>

                      <p className="font-medium">
                        RFQ Only
                      </p>

                      <p className="text-sm text-gray-500">
                        Hide public pricing and
                        require quotation requests.
                      </p>

                    </div>

                  </label>

                </div>

                {/* Wholesale */}

                <div className="col-span-12 md:col-span-6">

                  <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 cursor-pointer dark:border-gray-700">

                    <input
                      type="checkbox"
                      checked={
                        pricing.allowWholesalePricing
                      }
                      onChange={(e) =>
                        updatePricing({
                          allowWholesalePricing:
                            e.target.checked,
                        })
                      }
                    />

                    <div>

                      <p className="font-medium">
                        Enable Wholesale Pricing
                      </p>

                      <p className="text-sm text-gray-500">
                        Use multiple quantity
                        pricing tiers.
                      </p>

                    </div>

                  </label>

                </div>

                {/* Sample Available */}

                <div className="col-span-12 md:col-span-6">

                  <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 cursor-pointer dark:border-gray-700">

                    <input
                      type="checkbox"
                      checked={
                        pricing.sampleAvailable ??
                        false
                      }
                      onChange={(e) =>
                        updatePricing({
                          sampleAvailable:
                            e.target.checked,
                        })
                      }
                    />

                    <div>

                      <p className="font-medium">
                        Sample Available
                      </p>

                      <p className="text-sm text-gray-500">
                        Allow buyers to purchase
                        samples before bulk orders.
                      </p>

                    </div>

                  </label>

                </div>

              </div>
            </ComponentCard>
          </div>
                    {/* Pricing Status */}

          <div className="col-span-12">
            <ComponentCard
              title="Pricing Summary"
              desc="Review your pricing configuration before continuing."
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

                <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
                  <p className="text-sm text-gray-500">
                    Selling Price
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {pricing.currency}{" "}
                    {pricing.sellingPrice.toFixed(2)}
                  </h2>
                </div>

                <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
                  <p className="text-sm text-gray-500">
                    Cost Price
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {pricing.currency}{" "}
                    {pricing.costPrice.toFixed(2)}
                  </h2>
                </div>

                <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
                  <p className="text-sm text-gray-500">
                    Profit / Unit
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-green-600">
                    {pricing.currency}{" "}
                    {(
                      pricing.sellingPrice -
                      pricing.costPrice
                    ).toFixed(2)}
                  </h2>
                </div>

                <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
                  <p className="text-sm text-gray-500">
                    Margin
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-brand-600">
                    {margin.toFixed(2)}%
                  </h2>
                </div>

              </div>

              <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900">

                <h4 className="mb-4 font-semibold">
                  Enterprise Pricing Features
                </h4>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">

                  <div className="flex items-center gap-2">
                    <span>
                      {pricing.negotiable ? "✅" : "❌"}
                    </span>
                    <span>Negotiable</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>
                      {pricing.rfqOnly ? "✅" : "❌"}
                    </span>
                    <span>RFQ Only</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>
                      {pricing.allowWholesalePricing
                        ? "✅"
                        : "❌"}
                    </span>
                    <span>Wholesale Pricing</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>
                      {pricing.sampleAvailable
                        ? "✅"
                        : "❌"}
                    </span>
                    <span>Sample Available</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>🚢</span>
                    <span>
                      {pricing.incoterm}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>📦</span>
                    <span>
                      MOQ: {pricing.minimumOrder}
                    </span>
                  </div>

                </div>
              </div>

              {pricing.sellingPrice <= 0 && (
                <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                  Selling price must be greater than zero.
                </div>
              )}

              {pricing.costPrice >
                pricing.sellingPrice &&
                pricing.sellingPrice > 0 && (
                  <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                    Cost price is greater than selling price.
                    This product will be sold at a loss.
                  </div>
                )}

            </ComponentCard>
          </div>

        </div>
      </ComponentCard>
    </div>
  );
}