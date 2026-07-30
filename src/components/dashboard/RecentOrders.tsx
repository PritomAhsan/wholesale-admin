"use client";

import { Eye } from "lucide-react";

type Order = {
  id: string;
  buyer: string;
  supplier: string;
  total: string;
  payment: "Paid" | "Pending";
  status: "Processing" | "Shipped" | "Delivered";
  date: string;
};

const orders: Order[] = [
  {
    id: "#ORD-1001",
    buyer: "BuildMax Construction",
    supplier: "ABC Industrial Ltd.",
    total: "$12,850",
    payment: "Paid",
    status: "Processing",
    date: "Today",
  },
  {
    id: "#ORD-1002",
    buyer: "Metro Retail",
    supplier: "Smart Electronics",
    total: "$3,420",
    payment: "Pending",
    status: "Shipped",
    date: "Yesterday",
  },
  {
    id: "#ORD-1003",
    buyer: "Corporate Solutions",
    supplier: "Modern Furniture",
    total: "$7,980",
    payment: "Paid",
    status: "Delivered",
    date: "2 days ago",
  },
  {
    id: "#ORD-1004",
    buyer: "Global Packaging",
    supplier: "Prime Packaging",
    total: "$5,120",
    payment: "Paid",
    status: "Processing",
    date: "3 days ago",
  },
];

export default function RecentOrders() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 p-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest marketplace orders
          </p>
        </div>

        <button className="text-sm font-medium text-brand-600 hover:underline">
          View All Orders
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                Order
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                Buyer
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                Supplier
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                Total
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                Payment
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                Date
              </th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
              >
                <td className="px-6 py-5 font-semibold text-gray-900 dark:text-white">
                  {order.id}
                </td>

                <td className="px-6 py-5 text-gray-600 dark:text-gray-300">
                  {order.buyer}
                </td>

                <td className="px-6 py-5 text-gray-600 dark:text-gray-300">
                  {order.supplier}
                </td>

                <td className="px-6 py-5 font-semibold text-brand-600">
                  {order.total}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      order.payment === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.payment}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-5 text-gray-500">
                  {order.date}
                </td>

                <td className="px-6 py-5">
                  <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}