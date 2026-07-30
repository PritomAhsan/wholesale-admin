"use client";

import { Plus } from "lucide-react";

export default function ProductsPageHeader() {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Products
        </h1>

        <p className="mt-2 text-gray-500">
          Manage marketplace products
        </p>
      </div>

      <button className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-white hover:bg-brand-700">
        <Plus size={18} />

        Add Product
      </button>
    </div>
  );
}