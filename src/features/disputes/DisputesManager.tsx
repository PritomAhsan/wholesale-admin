"use client";

import { useCallback, useState } from "react";

import ComponentCard from "@/components/common/ComponentCard";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useServerTable } from "@/hooks/useServerTable";
import { ServerTableQuery } from "@/types/server-table";
import disputeService from "@/api/services/dispute.service";
import { Dispute, DISPUTE_REASON_LABELS } from "@/types/dispute";

import ResolveDisputeModal from "./components/ResolveDisputeModal";

const STATUS_STYLES: Record<string, string> = {
  open: "bg-warning-50 text-warning-600 dark:bg-warning-500/15",
  resolved: "bg-success-50 text-success-600 dark:bg-success-500/15",
  rejected: "bg-error-50 text-error-600 dark:bg-error-500/15",
};

export default function DisputesManager() {
  const [statusFilter, setStatusFilter] = useState("open");
  const [resolvingDispute, setResolvingDispute] = useState<Dispute | null>(null);

  const fetcher = useCallback(
    (params: ServerTableQuery) =>
      disputeService.getAll({
        page: params.page,
        per_page: params.per_page,
        status: statusFilter,
      }),
    [statusFilter]
  );

  const table = useServerTable<Dispute>({ fetcher });

  return (
    <ComponentCard
      title="Disputes"
      desc="Buyer-reported issues on delivered orders. No live payment gateway exists yet, so a refund resolution reduces the seller's payable amount instead of processing a real refund."
    >
      <div className="mb-6 w-full sm:w-48">
        <Select
          placeholder="All Status"
          value={statusFilter}
          options={[
            { value: "", label: "All Status" },
            { value: "open", label: "Open" },
            { value: "resolved", label: "Resolved" },
          ]}
          onChange={(value) => setStatusFilter(String(value))}
        />
      </div>

      {table.loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-white/[0.03]">
          Loading disputes...
        </div>
      ) : table.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-red-600 dark:border-red-900 dark:bg-red-950/30">
          {table.error}
        </div>
      ) : table.items.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:border-gray-800 dark:bg-white/[0.03]">
          No disputes found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Buyer</TableCell>
                  <TableCell isHeader>Order</TableCell>
                  <TableCell isHeader>Reason</TableCell>
                  <TableCell isHeader>Reported</TableCell>
                  <TableCell isHeader>Status</TableCell>
                  <TableCell isHeader className="text-right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {table.items.map((dispute) => (
                  <TableRow key={dispute.uuid}>
                    <TableCell className="font-medium text-gray-800 dark:text-white/90">
                      {dispute.buyer ?? "—"}
                    </TableCell>

                    <TableCell>
                      <p className="text-gray-800 dark:text-white/90">
                        {dispute.seller_order?.seller_order_number}
                      </p>
                      <p className="text-xs text-gray-500">
                        {dispute.seller_order?.seller_id}
                      </p>
                    </TableCell>

                    <TableCell>
                      {DISPUTE_REASON_LABELS[dispute.reason] ?? dispute.reason}
                    </TableCell>

                    <TableCell className="text-gray-500">
                      {new Date(dispute.created_at).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                          STATUS_STYLES[dispute.status] ??
                          "bg-gray-100 text-gray-500 dark:bg-white/5"
                        }`}
                      >
                        {dispute.status}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      {dispute.status === "open" ? (
                        <Button onClick={() => setResolvingDispute(dispute)}>
                          Resolve
                        </Button>
                      ) : (
                        <span className="text-xs text-gray-400 capitalize">
                          {dispute.resolution?.replace(/_/g, " ")}
                        </span>
                      )}
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
                {table.pagination.last_page} ({table.pagination.total} disputes)
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

      {resolvingDispute && (
        <ResolveDisputeModal
          dispute={resolvingDispute}
          onClose={() => setResolvingDispute(null)}
          onResolved={() => {
            setResolvingDispute(null);
            table.refresh();
          }}
        />
      )}
    </ComponentCard>
  );
}
