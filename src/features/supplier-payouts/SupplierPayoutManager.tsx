"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import supplierPayoutService from "@/api/services/supplier-payout.service";
import { Payout } from "@/types/payout";
import { ServerPagination } from "@/types/server-table";

const STATUS_STYLES: Record<string, string> = {
  requested: "bg-warning-50 text-warning-600 dark:bg-warning-500/15",
  processing: "bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/15",
  paid: "bg-success-50 text-success-600 dark:bg-success-500/15",
  failed: "bg-error-50 text-error-600 dark:bg-error-500/15",
};

export default function SupplierPayoutManager() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [pagination, setPagination] = useState<ServerPagination>({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  });
  const [pendingAmount, setPendingAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);

      const response = await supplierPayoutService.getAll();

      setPayouts(response.items);
      setPagination(response.pagination);
      setPendingAmount(response.pending_amount);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Unable to load payouts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleRequest() {
    setRequesting(true);

    try {
      await supplierPayoutService.request();
      toast.success("Payout requested.");
      await load();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ?? "Failed to request payout."
      );
    } finally {
      setRequesting(false);
    }
  }

  return (
    <ComponentCard
      title="Payouts"
      desc="Your earnings from delivered orders, after platform commission. No live payment gateway is connected yet — an admin marks a request paid once the transfer is sent manually."
    >
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800 dark:bg-white/[0.03]">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Available to request</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white/90">
            ${pendingAmount.toFixed(2)}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            From delivered orders not yet included in a payout request.
          </p>
        </div>

        <Button
          onClick={handleRequest}
          disabled={requesting || pendingAmount <= 0}
        >
          {requesting ? "Requesting..." : "Request Payout"}
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Amount</TableCell>
                <TableCell isHeader>Orders</TableCell>
                <TableCell isHeader>Requested</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader>Reference</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-gray-400">
                    Loading payouts...
                  </TableCell>
                </TableRow>
              )}

              {!loading && error && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-error-500">
                    {error}
                  </TableCell>
                </TableRow>
              )}

              {!loading && !error && payouts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-gray-400">
                    No payout requests yet.
                  </TableCell>
                </TableRow>
              )}

              {!loading && !error && payouts.map((payout) => (
                <TableRow key={payout.uuid}>
                  <TableCell className="font-semibold text-gray-800 dark:text-white/90">
                    ${payout.amount.toFixed(2)}
                  </TableCell>

                  <TableCell>{payout.seller_orders_count ?? "—"}</TableCell>

                  <TableCell className="text-gray-500 dark:text-gray-400">
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

                  <TableCell className="text-gray-500 dark:text-gray-400">
                    {payout.reference_note ?? "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {pagination.total > 0 && (
          <div className="border-t border-gray-200 px-6 py-4 text-sm text-gray-500 dark:text-gray-400 dark:border-gray-800">
            {pagination.total} payout{pagination.total === 1 ? "" : "s"} total
          </div>
        )}
      </div>
    </ComponentCard>
  );
}
