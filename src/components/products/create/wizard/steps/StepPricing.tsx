"use client";

import PricingForm from "./pricing/PricingForm";
import TierPricingTable from "./pricing/TierPricingTable";

export default function StepPricing() {
  return (
    <div className="space-y-6">
      <PricingForm />

      <TierPricingTable />
    </div>
  );
}