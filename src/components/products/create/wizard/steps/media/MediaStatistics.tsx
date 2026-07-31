"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useProductWizard } from "@/context/ProductWizardContext";

export default function MediaStatistics() {
  const { product } = useProductWizard();

  const images = product.media.images;

  const totalSize = images.reduce(
    (sum, image) => sum + image.size,
    0
  );

  const primaryImage = images.find(
    (image) => image.isPrimary
  );

  return (
    <ComponentCard
      title="Media Statistics"
      desc="Overview of uploaded media."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Images"
          value={images.length.toString()}
        />

        <StatCard
          title="Total Size"
          value={`${(totalSize / 1024 / 1024).toFixed(2)} MB`}
        />

        <StatCard
          title="Primary Image"
          value={primaryImage ? "Selected" : "Not Selected"}
        />
      </div>
    </ComponentCard>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="mt-2 text-xl font-semibold">
        {value}
      </h3>
    </div>
  );
}