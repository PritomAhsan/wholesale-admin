"use client";

export default function DashboardHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Marketplace Dashboard
      </h1>

      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Monitor products, suppliers, RFQs and marketplace activity.
      </p>
    </div>
  );
}