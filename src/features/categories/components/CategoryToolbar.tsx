"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";

import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";

interface Props {
  onSearch: (value: string) => void;

  onStatusChange: (
    status: boolean | ""
  ) => void;

  onSortChange?: (
    sort: string,
    order: "asc" | "desc"
  ) => void;

  onPerPageChange?: (
    perPage: number
  ) => void;

  onRefresh?: () => void;

  onReset?: () => void;
}

export default function CategoryToolbar({
  onSearch,
  onStatusChange,
  onSortChange,
  onPerPageChange,
  onRefresh,
  onReset,
}: Props) {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [sort, setSort] =
    useState("created_at_desc");

  const [perPage, setPerPage] =
    useState("15");

  /**
   * Debounced Search
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(search);
    }, 500);

    return () =>
      clearTimeout(timeout);
  }, [search, onSearch]);

  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-4 md:flex-row">
          {/* Search */}
          <div className="relative w-full md:max-w-md">
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

          {/* Status */}
          <div className="w-full md:w-52">
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

          {/* Sort */}
          <div className="w-full md:w-56">
            <Select
              value={sort}
              options={[
                {
                  value:
                    "created_at_desc",
                  label:
                    "Newest",
                },
                {
                  value:
                    "created_at_asc",
                  label:
                    "Oldest",
                },
                {
                  value:
                    "name_asc",
                  label:
                    "Name A-Z",
                },
                {
                  value:
                    "name_desc",
                  label:
                    "Name Z-A",
                },
              ]}
              onChange={(
                value
              ) => {
                setSort(value);

                const index = value.lastIndexOf("_");

const field = value.substring(0, index);

const order = value.substring(index + 1) as
  | "asc"
  | "desc";

                onSortChange?.(
                  field,
                  order as
                    | "asc"
                    | "desc"
                );
              }}
            />
          </div>

          {/* Per Page */}
          <div className="w-full md:w-40">
            <Select
              value={perPage}
              options={[
                {
                  value: "15",
                  label: "15",
                },
                {
                  value: "25",
                  label: "25",
                },
                {
                  value: "50",
                  label: "50",
                },
                {
                  value: "100",
                  label: "100",
                },
              ]}
              onChange={(
                value
              ) => {
                setPerPage(
                  value
                );

                onPerPageChange?.(
                  Number(value)
                );
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() =>
              onRefresh?.()
            }
          >
            <RefreshCw
              size={16}
              className="mr-2"
            />

            Refresh
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setStatus("");
              setSort(
                "created_at_desc"
              );
              setPerPage("15");

              onReset?.();
            }}
          >
            Reset
          </Button>

          <Link
            href="/categories/create"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-600"
          >
            <Plus size={18} />

            Add Category
          </Link>
        </div>
      </div>
    </div>
  );
}