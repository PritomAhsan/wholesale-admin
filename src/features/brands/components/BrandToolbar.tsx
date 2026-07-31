"use client";

import Link from "next/link";
import { Search, Plus } from "lucide-react";

import InputField from "@/components/form/input/InputField";
import Select from "@/components/form/Select";

export default function BrandToolbar() {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-4 sm:flex-row">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <InputField
            placeholder="Search brands..."
            className="pl-11"
          />
        </div>

        <div className="w-full sm:w-56">
          <Select
            placeholder="Status"
            options={[
              {
                value: "",
                label: "All Status",
              },
              {
                value: "active",
                label: "Active",
              },
              {
                value: "inactive",
                label: "Inactive",
              },
            ]}
            onChange={() => {}}
          />
        </div>
      </div>

      <Link
        href="/brands/create"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white hover:bg-brand-600"
      >
        <Plus size={18} />

        Add Brand
      </Link>
    </div>
  );
}