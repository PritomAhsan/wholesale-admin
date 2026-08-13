"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Eye, RefreshCw } from "lucide-react";

import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import Select from "@/components/form/Select";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SupplierOrderService from "@/api/services/supplier-order.service";
import { SellerOrder } from "@/types/order";
import { ServerPagination } from "@/types/server-table";

import OrderStatusBadge from "@/features/orders/components/OrderStatusBadge";

export default function SupplierOrderManager() {
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [pagination, setPagination] = useState<ServerPagination>({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  });

  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);

      const response = await SupplierOrderService.getAll({
        page,
        status: status || undefined,
      });

      setOrders(response.items);
      setPagination(response.pagination);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  }, [page, status]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ComponentCard
      title="My Orders"
      desc="Orders that include your products."
    >
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
          {pagination.total} Orders
        </h4>

        <Button variant="outline" onClick={load}>
          <RefreshCw size={16} className="mr-2" />
          Refresh
        </Button>
      </div>

      <div className="mb-6 w-full sm:w-48">
        <Select
          placeholder="Status"
          value={status}
          options={[
            { value: "", label: "All Status" },
            { value: "pending", label: "Pending" },
            { value: "processing", label: "Processing" },
            { value: "shipped", label: "Shipped" },
            { value: "delivered", label: "Delivered" },
            { value: "cancelled", label: "Cancelled" },
          ]}
          onChange={(value) => {
            setPage(1);
            setStatus(value);
          }}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Order</TableCell>
                <TableCell isHeader>Ship To</TableCell>
                <TableCell isHeader>Total</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader>Placed</TableCell>
                <TableCell isHeader className="text-right">Actions</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-gray-400">
                    Loading orders...
                  </TableCell>
                </TableRow>
              )}

              {!loading && error && (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-error-500">
                    {error}
                  </TableCell>
                </TableRow>
              )}

              {!loading && !error && orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-gray-400">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}

              {!loading && !error && orders.map((order) => (
                <TableRow key={order.uuid}>
                  <TableCell>
                    <p className="font-medium text-gray-800 dark:text-white/90">
                      {order.seller_order_number}
                    </p>
                  </TableCell>

                  <TableCell>
                    {order.order?.shipping.city}, {order.order?.shipping.country}
                  </TableCell>

                  <TableCell className="font-semibold text-gray-800 dark:text-white/90">
                    ${order.subtotal}
                  </TableCell>

                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>

                  <TableCell className="text-gray-500">
                    {order.order
                      ? new Date(order.order.placed_at).toLocaleDateString()
                      : "—"}
                  </TableCell>

                  <TableCell className="text-right">
                    <Link
                      href={`/supplier-orders/${order.uuid}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ComponentCard>
  );
}
