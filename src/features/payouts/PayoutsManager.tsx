"use client";

import { useCallback, useState } from "react";

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
import payoutService from "@/api/services/payout.service";
import { Payout } from "@/types/payout";

import PayoutActions from "./components/PayoutActions";

const STATUS_STYLES: Record<string, string> = {
  requested: "bg-warning-50 text-warning-600 dark:bg-warning-500/15",
  processing: "bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/15",
  paid: "bg-success-50 text-success-600 dark:bg-success-500/15",
  failed: "bg-error-50 text-error-600 dark:bg-error-500/15",
};

export default function PayoutsManager() {
  const [statusFilter, setStatusFilter] = useState("");

  const fetcher = useCallback(
    (params: ServerTableQuery) =>
      payoutService.getAll({
        page: params.page,
        per_page: params.per_page,
        status: statusFilter,
      }),
    [statusFilter]
  );

  const table = useServerTable<Payout>({ fetcher });

  return (
    <ComponentCard
      title="Payouts"
      desc="Seller payout requests, funded by delivered orders minus platform commission. Marking one paid records that the transfer was sent manually — no live payment gateway is connected yet."
    >
      <div className="mb-6 w-full sm:w-48">
        <Select
          placeholder="All Status"
          value={statusFilter}
          options={[
            { value: "", label: "All Status" },
            { value: "requested", label: "Requested" },
            { value: "processing", label: "Processing" },
            { value: "paid", label: "Paid" },
            { value: "failed", label: "Failed" },
          ]}
          onChange={(value) => setStatusFilter(String(value))}
        />
      </div>

      {table.loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-white/[0.03]">
          Loading payouts...
        </div>
      ) : table.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-red-600 dark:border-red-900 dark:bg-red-950/30">
          {table.error}
        </div>
      ) : table.items.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:border-gray-800 dark:bg-white/[0.03]">
          No payout requests found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Seller</TableCell>
                  <TableCell isHeader>Amount</TableCell>
                  <TableCell isHeader>Orders</TableCell>
                  <TableCell isHeader>Requested</TableCell>
                  <TableCell isHeader>Status</TableCell>
                  <TableCell isHeader className="text-right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {table.items.map((payout) => (
                  <TableRow key={payout.uuid}>
                    <TableCell>
                      <p className="font-medium text-gray-800 dark:text-white/90">
                        {payout.supplier?.company_name ?? "—"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {payout.supplier?.seller_id}
                      </p>
                    </TableCell>

                    <TableCell className="font-semibold text-gray-800 dark:text-white/90">
                      ${payout.amount.toFixed(2)}
                    </TableCell>

                    <TableCell>{payout.seller_orders_count ?? "—"}</TableCell>

                    <TableCell>
                      {payout.requested_at
                        ? new Date(payout.requested_at).toLocaleDateString()
                        : "—"}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                          STATUS_STYLES[payout.status] ??
                          "bg-gray-100 text-gray-500 dark:bg-white/5"
                        }`}
                      >
                        {payout.status}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <PayoutActions payout={payout} onChanged={table.refresh} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {table.pagination.last_page > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-800">
              <div className="text-sm text-gray-500">
                Page {table.pagination.current_page} of{" "}
                {table.pagination.last_page} ({table.pagination.total} payouts)
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={table.pagination.current_page === 1}
                  onClick={() => table.changePage(table.pagination.current_page - 1)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={table.pagination.current_page === table.pagination.last_page}
                  onClick={() => table.changePage(table.pagination.current_page + 1)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
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
