"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

import { DashboardOrder } from "@/types/dashboard";

interface Props {
  orders: DashboardOrder[];
}

export default function SupplierRecentOrders({ orders }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 p-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Orders containing your products
          </p>
        </div>

        <Link
          href="/supplier-orders"
          className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
        >
          View All Orders
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="p-6 text-center text-sm text-gray-400">
          No orders yet.
        </p>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {orders.map((order) => (
            <div
              key={order.uuid}
              className="flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {order.sellerOrderNumber}
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Ship to {order.shipTo}
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <span className="font-semibold text-brand-600 dark:text-brand-400">
                    ${order.total}
                  </span>

                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium capitalize text-gray-600 dark:bg-white/5 dark:text-gray-300">
                    {order.status}
                  </span>
                </div>
              </div>

              <Link
                href={`/supplier-orders/${order.uuid}`}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Eye className="h-4 w-4" />
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
