"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useProductWizard } from "@/context/ProductWizardContext";

export default function ShippingSummary() {
  const { product } = useProductWizard();

  const shipping = product.shipping;

  return (
    <ComponentCard
      title="Shipping Summary"
      desc="Product shipping dimensions."
    >
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
        <SummaryItem
          title="Weight"
          value={`${shipping.weight} ${shipping.weightUnit}`}
        />

        <SummaryItem
          title="Length"
          value={`${shipping.length} ${shipping.dimensionUnit}`}
        />

        <SummaryItem
          title="Width"
          value={`${shipping.width} ${shipping.dimensionUnit}`}
        />

        <SummaryItem
          title="Height"
          value={`${shipping.height} ${shipping.dimensionUnit}`}
        />

        <SummaryItem
          title="Volumetric Weight"
          value={`${shipping.volumetricWeight.toFixed(2)} ${shipping.weightUnit}`}
        />

        <SummaryItem
  title="Production"
  value={`${shipping.productionLeadTime} ${shipping.leadTimeUnit}`}
/>

<SummaryItem
  title="Dispatch"
  value={`${shipping.dispatchTime} ${shipping.leadTimeUnit}`}
/>

<SummaryItem
  title="Ready to Ship"
  value={shipping.readyToShip ? "Yes" : "No"}
/>

<SummaryItem
  title="Domestic"
  value={shipping.domesticShipping ? "Yes" : "No"}
/>

<SummaryItem
  title="International"
  value={shipping.internationalShipping ? "Yes" : "No"}
/>

<SummaryItem
  title="Pickup"
  value={shipping.pickupAvailable ? "Yes" : "No"}
/>

<SummaryItem
  title="Free Shipping"
  value={shipping.freeShipping ? "Yes" : "No"}
/>

{shipping.shippingNotes && (
  <div className="mt-6 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
    <p className="mb-2 text-sm font-medium text-gray-500">
      Shipping Notes
    </p>

    <p className="text-sm">
      {shipping.shippingNotes}
    </p>
  </div>
)}

<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

<SummaryItem
title="Weight"
value={`${shipping.weight} ${shipping.weightUnit}`}
/>

<SummaryItem
title="Dimensions"
value={`${shipping.length} × ${shipping.width} × ${shipping.height} ${shipping.dimensionUnit}`}
/>

<SummaryItem
title="Volumetric"
value={`${shipping.volumetricWeight} ${shipping.weightUnit}`}
/>

<SummaryItem
title="Lead Time"
value={`${shipping.productionLeadTime} ${shipping.leadTimeUnit}`}
/>

<SummaryItem
title="Dispatch"
value={`${shipping.dispatchTime} ${shipping.leadTimeUnit}`}
/>

<SummaryItem
title="Ready"
value={shipping.readyToShip ? "Yes" : "No"}
/>

<SummaryItem
title="Domestic"
value={shipping.domesticShipping ? "Yes" : "No"}
/>

<SummaryItem
title="International"
value={shipping.internationalShipping ? "Yes" : "No"}
/>

<SummaryItem
title="Pickup"
value={shipping.pickupAvailable ? "Yes" : "No"}
/>

<SummaryItem
title="Free Shipping"
value={shipping.freeShipping ? "Yes" : "No"}
/>

</div>
      </div>
    </ComponentCard>
  );
}

function SummaryItem({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="mt-2 text-xl font-semibold">
        {value}
      </h3>
    </div>
  );
}