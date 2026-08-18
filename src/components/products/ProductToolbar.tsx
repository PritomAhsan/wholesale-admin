"use client";

import Link from "next/link";
import { Search, Plus } from "lucide-react";

import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";

interface Props {
  onSearch: (value: string) => void;

  onStatusChange: (
    value: string | ""
  ) => void;

  onFeaturedChange?: (
    value: string
  ) => void;

  onStockChange?: (
    value: string
  ) => void;

  onBrandChange?: (
    value: string
  ) => void;

  onSupplierChange?: (
    value: string
  ) => void;

  onReset?: () => void;
}

export default function ProductToolbar({
  onSearch,
  onStatusChange,
  onFeaturedChange,
  onStockChange,
  onBrandChange,
  onSupplierChange,
  onReset,
}: Props) {
  return (
    <div className="mb-6 space-y-4">
      {/* Row 1 */}
      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </span>

          <Input
            placeholder="Search products..."
            className="pl-11"
            onChange={(e) =>
              onSearch(e.target.value)
            }
          />
        </div>

        <Link
          href="/products/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white hover:bg-brand-600"
        >
          <Plus size={18} />

          Add Product
        </Link>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">

        <Select
          options={[
            {
              value: "",
              label: "All Status",
            },
            {
              value: "draft",
              label: "Draft",
            },
            {
              value: "pending",
              label: "Pending",
            },
            {
              value: "published",
              label: "Published",
            },
            {
              value: "archived",
              label: "Archived",
            },
          ]}
          placeholder="Status"
          onChange={onStatusChange}
        />

        <Select
          options={[
            {
              value: "",
              label: "All Featured",
            },
            {
              value: "1",
              label: "Featured",
            },
            {
              value: "0",
              label: "Not Featured",
            },
          ]}
          placeholder="Featured"
          onChange={onFeaturedChange ?? (() => {})}
        />

        <Select
          options={[
            {
              value: "",
              label: "All Stock",
            },
            {
              value: "in_stock",
              label: "In Stock",
            },
            {
              value: "out_of_stock",
              label: "Out of Stock",
            },
          ]}
          placeholder="Stock"
          onChange={onStockChange ?? (() => {})}
        />

        <Select
          options={[
            {
              value: "",
              label: "All Brands",
            },
          ]}
          placeholder="Brand"
          onChange={onBrandChange ?? (() => {})}
        />

        <Select
          options={[
            {
              value: "",
              label: "All Suppliers",
            },
          ]}
          placeholder="Supplier"
          onChange={onSupplierChange ?? (() => {})}
        />

      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}