"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import ComponentCard from "@/components/common/ComponentCard";
import Select from "@/components/form/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useServerTable } from "@/hooks/useServerTable";
import { ServerTableQuery } from "@/types/server-table";
import dealService from "@/api/services/deal.service";
import { Deal } from "@/types/deal";

import DealActions from "./components/DealActions";

export default function DealsManager() {
  const [typeFilter, setTypeFilter] = useState("");

  const fetcher = useCallback(
    (params: ServerTableQuery) =>
      dealService.getAll({ page: params.page, per_page: params.per_page, type: typeFilter }),
    [typeFilter]
  );

  const table = useServerTable<Deal>({ fetcher });

  return (
    <ComponentCard
      title="Deals"
      desc="Flash discounts, bulk-quantity price breaks and clearance runs shown on the storefront /deals page."
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-48">
          <Select
            placeholder="All Types"
            value={typeFilter}
            options={[
              { value: "", label: "All Types" },
              { value: "flash", label: "Flash" },
              { value: "bulk", label: "Bulk" },
              { value: "clearance", label: "Clearance" },
            ]}
            onChange={(value) => setTypeFilter(String(value))}
          />
        </div>

        <Link
          href="/deals/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-600"
        >
          <Plus size={18} />
          New Deal
        </Link>
      </div>

      {table.loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-white/[0.03]">
          Loading deals...
        </div>
      ) : table.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-red-600 dark:border-red-900 dark:bg-red-950/30">
          {table.error}
        </div>
      ) : table.items.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:text-gray-400 dark:border-gray-800 dark:bg-white/[0.03]">
          No deals found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Product</TableCell>
                  <TableCell isHeader>Type</TableCell>
                  <TableCell isHeader>Discount</TableCell>
                  <TableCell isHeader>Min Qty</TableCell>
                  <TableCell isHeader>Ends</TableCell>
                  <TableCell isHeader>Status</TableCell>
                  <TableCell isHeader className="text-right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {table.items.map((deal) => (
                  <TableRow key={deal.uuid}>
                    <TableCell>
                      <p className="font-medium text-gray-800 dark:text-white/90">
                        {deal.product?.name ?? deal.title}
                      </p>
                    </TableCell>

                    <TableCell className="capitalize">{deal.type}</TableCell>

                    <TableCell>
                      {deal.discount_percent
                        ? `${deal.discount_percent}%`
                        : deal.discount_price
                        ? `$${deal.discount_price}`
                        : "—"}
                    </TableCell>

                    <TableCell>{deal.min_quantity ?? "—"}</TableCell>

                    <TableCell>
                      {deal.ends_at
                        ? new Date(deal.ends_at).toLocaleDateString()
                        : "—"}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                          deal.status === "active"
                            ? "bg-success-50 text-success-600 dark:bg-success-500/15"
                            : "bg-gray-100 text-gray-500 dark:bg-white/5"
                        }`}
                      >
                        {deal.status}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <DealActions deal={deal} onChanged={table.refresh} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {table.pagination.last_page > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-800">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page {table.pagination.current_page} of{" "}
                {table.pagination.last_page} ({table.pagination.total} deals)
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={table.pagination.current_page === 1}
                  onClick={() => table.changePage(table.pagination.current_page - 1)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={table.pagination.current_page === table.pagination.last_page}
                  onClick={() => table.changePage(table.pagination.current_page + 1)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </ComponentCard>
  );
}
