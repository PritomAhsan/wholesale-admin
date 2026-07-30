"use client";

import { Plus, Trash2 } from "lucide-react";

import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

import { useProductWizard } from "@/context/ProductWizardContext";

export default function TierPricingTable() {
  const { product, updatePricing } = useProductWizard();

  const pricing = product.pricing;

  const addTier = () => {
    updatePricing({
      priceTiers: [
        ...pricing.priceTiers,
        {
          id: crypto.randomUUID(),
          minQuantity: 1,
          maxQuantity: 10,
          price: 0,
        },
      ],
    });
  };

  const updateTier = (
    id: string,
    field: "minQuantity" | "maxQuantity" | "price",
    value: number
  ) => {
    updatePricing({
      priceTiers: pricing.priceTiers.map((tier) =>
        tier.id === id
          ? {
              ...tier,
              [field]: value,
            }
          : tier
      ),
    });
  };

  const removeTier = (id: string) => {
    updatePricing({
      priceTiers: pricing.priceTiers.filter(
        (tier) => tier.id !== id
      ),
    });
  };

  return (
    <ComponentCard
      title="Wholesale Price Tiers"
      desc="Offer lower prices for larger order quantities."
    >
      <div className="space-y-5">
        {pricing.priceTiers.map((tier) => (
          <div
            key={tier.id}
            className="grid grid-cols-12 gap-4 items-end rounded-xl border border-gray-200 p-4 dark:border-gray-700"
          >
            <div className="col-span-3">
              <Label>Min Qty</Label>

              <Input
                type="number"
                defaultValue={tier.minQuantity}
                onChange={(e) =>
                  updateTier(
                    tier.id,
                    "minQuantity",
                    Number(e.target.value)
                  )
                }
              />
            </div>

            <div className="col-span-3">
              <Label>Max Qty</Label>

              <Input
                type="number"
                defaultValue={tier.maxQuantity}
                onChange={(e) =>
                  updateTier(
                    tier.id,
                    "maxQuantity",
                    Number(e.target.value)
                  )
                }
              />
            </div>

            <div className="col-span-4">
              <Label>Price</Label>

              <Input
                type="number"
                defaultValue={tier.price}
                onChange={(e) =>
                  updateTier(
                    tier.id,
                    "price",
                    Number(e.target.value)
                  )
                }
              />
            </div>

            <div className="col-span-2">
              <button
                type="button"
                onClick={() => removeTier(tier.id)}
                className="flex h-11 w-full items-center justify-center rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addTier}
          className="flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-white hover:bg-brand-700"
        >
          <Plus size={18} />
          Add Price Tier
        </button>
      </div>
    </ComponentCard>
  );
}