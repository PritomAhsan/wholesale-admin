"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, RefreshCw, Search } from "lucide-react";

import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";

interface Props {
  onSearch: (value: string) => void;
  onSortChange?: (sort: string, order: "asc" | "desc") => void;
  onPerPageChange?: (perPage: number) => void;
  onRefresh?: () => void;
  onReset?: () => void;
}

export default function AttributeToolbar({
  onSearch,
  onSortChange,
  onPerPageChange,
  onRefresh,
  onReset,
}: Props) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("created_at_desc");
  const [perPage, setPerPage] = useState("15");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, onSearch]);

  const handleSortChange = (value: string) => {
    setSort(value);

    const index = value.lastIndexOf("_");
    const field = value.substring(0, index);
    const order = value.substring(index + 1) as "asc" | "desc";

    onSortChange?.(field, order);
  };

  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="relative xl:col-span-2">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </span>

            <Input
              value={search}
              placeholder="Search attributes..."
              className="pl-11"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Select
            value={sort}
            options={[
              { value: "created_at_desc", label: "Newest" },
              { value: "created_at_asc", label: "Oldest" },
              { value: "name_asc", label: "Name A-Z" },
              { value: "name_desc", label: "Name Z-A" },
              { value: "sort_order_asc", label: "Sort Order" },
            ]}
            onChange={handleSortChange}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="w-24">
            <Select
              value={perPage}
              options={[
                { value: "15", label: "15" },
                { value: "25", label: "25" },
                { value: "50", label: "50" },
                { value: "100", label: "100" },
              ]}
              onChange={(value) => {
                setPerPage(value);
                onPerPageChange?.(Number(value));
              }}
            />
          </div>

          <Button variant="outline" onClick={() => onRefresh?.()}>
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setSort("created_at_desc");
              setPerPage("15");
              onReset?.();
            }}
          >
            Reset
          </Button>

          <Link
            href="/attributes/create"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-600"
          >
            <Plus size={18} />
            Add Attribute
          </Link>
        </div>
      </div>
    </div>
  );
}
