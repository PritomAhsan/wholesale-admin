"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";

import ComponentCard from "@/components/common/ComponentCard";

import CustomerService from "@/api/services/customer.service";
import { Customer } from "@/types/customer";
import { Order } from "@/types/order";

import OrderStatusBadge from "@/features/orders/components/OrderStatusBadge";

interface Props {
  uuid: string;
}

export default function CustomerDetail({ uuid }: Props) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    CustomerService.get(uuid)
      .then((data) => {
        setCustomer(data.customer);
        setOrders(data.orders);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load this customer.");
      })
      .finally(() => setLoading(false));
  }, [uuid]);

  return (
    <ComponentCard title="Customer Details" desc="">
      <Link
        href="/customers"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-400"
      >
        <ArrowLeft size={16} />
        Back to Customers
      </Link>

      {loading && (
        <p className="py-10 text-center text-gray-400">Loading customer...</p>
      )}

      {!loading && error && (
        <p className="py-10 text-center text-error-500">{error}</p>
      )}

      {!loading && !error && customer && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
                  {customer.full_name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Joined {new Date(customer.created_at).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                  customer.status === "active"
                    ? "bg-success-50 text-success-600 dark:bg-success-500/10"
                    : "bg-gray-100 text-gray-600 dark:bg-white/5"
                }`}
              >
                {customer.status}
              </span>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <div>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Email
                </h3>
                <p className="text-gray-800 dark:text-white/90">{customer.email}</p>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Phone
                </h3>
                <p className="text-gray-800 dark:text-white/90">
                  {customer.phone ?? "—"}
                </p>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Total Orders
                </h3>
                <p className="text-gray-800 dark:text-white/90">
                  {customer.orders_count}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white/90">
              Order History ({orders.length})
            </h3>

            {orders.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                No orders yet.
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="px-6 py-3 font-semibold text-gray-500 dark:text-gray-400">Order</th>
                        <th className="px-6 py-3 font-semibold text-gray-500 dark:text-gray-400">Total</th>
                        <th className="px-6 py-3 font-semibold text-gray-500 dark:text-gray-400">Status</th>
                        <th className="px-6 py-3 font-semibold text-gray-500 dark:text-gray-400">Placed</th>
                        <th className="px-6 py-3 text-right font-semibold text-gray-500 dark:text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr
                          key={order.uuid}
                          className="border-b border-gray-100 last:border-0 dark:border-gray-800/60"
                        >
                          <td className="px-6 py-4 font-medium text-gray-800 dark:text-white/90">
                            {order.order_number}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-800 dark:text-white/90">
                            ${order.total}
                          </td>
                          <td className="px-6 py-4">
                            <OrderStatusBadge status={order.status} />
                          </td>
                          <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                            {new Date(order.placed_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/orders/${order.uuid}`}
                              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
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
              </div>
            )}
          </div>
        </div>
      )}
    </ComponentCard>
  );
}
