"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Plus } from "lucide-react";

import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";

interface Props {
  onSearch: (value: string) => void;
  onStatusChange: (
    status: boolean | ""
  ) => void;
}

export default function CategoryToolbar({
  onSearch,
  onStatusChange,
}: Props) {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  /**
   * Auto search
   */
  useEffect(() => {
  const timeout = setTimeout(() => {
    onSearch(search);
  }, 500);

  return () => clearTimeout(timeout);
}, [search, onSearch]);

  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-4 sm:flex-row">
        <div className="relative w-full sm:max-w-md">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </span>

          <Input
            value={search}
            placeholder="Search categories..."
            className="pl-11"
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />
        </div>

        <div className="w-full sm:w-56">
          <Select
            value={status}
            placeholder="Status"
            options={[
              {
                value: "",
                label:
                  "All Status",
              },
              {
                value: "1",
                label:
                  "Active",
              },
              {
                value: "0",
                label:
                  "Inactive",
              },
            ]}
            onChange={(
              value
            ) => {
              setStatus(value);

              if (value === "") {
                onStatusChange(
                  ""
                );
              } else {
                onStatusChange(
                  value === "1"
                );
              }
            }}
          />
        </div>
      </div>

      <Link
        href="/categories/create"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-600"
      >
        <Plus size={18} />

        Add Category
      </Link>
    </div>
  );
}