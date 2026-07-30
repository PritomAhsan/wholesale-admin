"use client";

export default function VariantEmptyState() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-300 py-20 text-center dark:border-gray-700">

      <div className="mx-auto max-w-md">

        <h2 className="text-2xl font-bold">
          No Variants Yet
        </h2>

        <p className="mt-3 text-gray-500">
          Add product attributes such as Color, Size,
          Material or Capacity to generate multiple
          purchasable product variations.
        </p>

      </div>

    </div>
  );
}