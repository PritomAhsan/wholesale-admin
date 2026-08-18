"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

import { DashboardOrder } from "@/types/dashboard";

interface Props {
  orders: DashboardOrder[];
}

export default function RecentOrders({ orders }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 p-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Latest marketplace orders
          </p>
        </div>

        <Link
          href="/orders"
          className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
        >
          View All Orders
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="p-6 text-center text-sm text-gray-400">
          No orders placed yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  Order
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  Buyer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  Sellers
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  Placed
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {orders.map((order) => (
                <tr
                  key={order.uuid}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
                >
                  <td className="px-6 py-5 font-semibold text-gray-900 dark:text-white">
                    {order.orderNumber}
                  </td>

                  <td className="px-6 py-5 text-gray-600 dark:text-gray-300">
                    {order.buyer}
                  </td>

                  <td className="px-6 py-5 text-gray-600 dark:text-gray-300">
                    {order.sellerCount}
                  </td>

                  <td className="px-6 py-5 font-semibold text-brand-600 dark:text-brand-400">
                    ${order.total}
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold capitalize text-orange-700">
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-gray-500 dark:text-gray-400">
                    {new Date(order.placedAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5">
                    <Link
                      href={`/orders/${order.uuid}`}
                      className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
