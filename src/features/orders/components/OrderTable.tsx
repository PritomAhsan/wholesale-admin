"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Order } from "@/types/order";
import OrderStatusBadge from "./OrderStatusBadge";

interface Props {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

export default function OrderTable({ orders, loading, error }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Order</TableCell>
              <TableCell isHeader>Buyer</TableCell>
              <TableCell isHeader>Sellers</TableCell>
              <TableCell isHeader>Total</TableCell>
              <TableCell isHeader>Status</TableCell>
              <TableCell isHeader>Placed</TableCell>
              <TableCell isHeader className="text-right">Actions</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-gray-400">
                  Loading orders...
                </TableCell>
              </TableRow>
            )}

            {!loading && error && (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-error-500">
                  {error}
                </TableCell>
              </TableRow>
            )}

            {!loading && !error && orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-gray-400">
                  No orders found.
                </TableCell>
              </TableRow>
            )}

            {!loading && !error && orders.map((order) => (
              <TableRow key={order.uuid}>
                <TableCell>
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {order.order_number}
                  </p>
                </TableCell>

                <TableCell>
                  <div>
                    <p>{order.buyer?.full_name}</p>
                    <p className="text-sm text-gray-500">{order.buyer?.email}</p>
                  </div>
                </TableCell>

                <TableCell>
                  {order.seller_orders.length} seller
                  {order.seller_orders.length !== 1 ? "s" : ""}
                </TableCell>

                <TableCell className="font-semibold text-gray-800 dark:text-white/90">
                  ${order.total}
                </TableCell>

                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>

                <TableCell className="text-gray-500">
                  {new Date(order.placed_at).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right">
                  <Link
                    href={`/orders/${order.uuid}`}
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
  );
}
