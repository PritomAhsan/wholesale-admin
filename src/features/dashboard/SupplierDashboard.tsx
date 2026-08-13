"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import ComponentCard from "@/components/common/ComponentCard";
import ProductStatusBadge from "@/features/approvals/components/ProductStatusBadge";
import OrderStatusBadge from "@/features/orders/components/OrderStatusBadge";

import ProductService from "@/api/services/product.service";
import DashboardService from "@/api/services/dashboard.service";

import { ProductListItem } from "@/types/product";
import { SupplierDashboardStatistics, DashboardOrder } from "@/types/dashboard";
import { useAuthContext } from "@/context/AuthContext";

const STAT_STATUSES: { key: string; label: string }[] = [
  { key: "draft", label: "Draft" },
  { key: "pending", label: "Pending Review" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
  { key: "published", label: "Published" },
];

export default function SupplierDashboard() {
  const { user } = useAuthContext();

  const [counts, setCounts] = useState<Record<string, number>>({});
  const [countsLoading, setCountsLoading] = useState(true);

  const [recent, setRecent] = useState<ProductListItem[]>([]);
  const [recentLoading, setRecentLoading] = useState(true);

  const [orderStats, setOrderStats] = useState<SupplierDashboardStatistics | null>(null);
  const [recentOrders, setRecentOrders] = useState<DashboardOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadOrders = async () => {
      try {
        setOrdersLoading(true);

        const data = await DashboardService.getSupplierDashboard();

        if (cancelled) return;

        setOrderStats(data.statistics);
        setRecentOrders(data.recentOrders);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setOrdersLoading(false);
      }
    };

    loadOrders();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadCounts = async () => {
      try {
        setCountsLoading(true);

        const results = await Promise.all(
          STAT_STATUSES.map((s) =>
            ProductService.getAll({
              status: s.key,
              per_page: 1,
            } as any)
          )
        );

        if (cancelled) return;

        const next: Record<string, number> = {};

        STAT_STATUSES.forEach((s, i) => {
          next[s.key] = results[i].pagination?.total ?? 0;
        });

        setCounts(next);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setCountsLoading(false);
      }
    };

    const loadRecent = async () => {
      try {
        setRecentLoading(true);

        const response = await ProductService.getAll({
          per_page: 5,
        } as any);

        if (cancelled) return;

        setRecent(response.items);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setRecentLoading(false);
      }
    };

    loadCounts();
    loadRecent();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <ComponentCard
        title={`Welcome back${user?.first_name ? `, ${user.first_name}` : ""}`}
        desc="Here's where your products stand right now."
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {STAT_STATUSES.map((s) => (
            <div
              key={s.key}
              className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]"
            >
              <p className="text-xs text-gray-500">{s.label}</p>

              <p className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white/90">
                {countsLoading ? "-" : counts[s.key] ?? 0}
              </p>
            </div>
          ))}
        </div>
      </ComponentCard>

      <ComponentCard
        title="Recent Products"
        desc="Your most recently added or updated products."
      >
        <div className="mb-4 flex justify-end">
          <Link
            href="/products/create"
            className="text-sm text-brand-600 hover:underline"
          >
            + Add a new product
          </Link>
        </div>

        {recentLoading ? (
          <div className="py-8 text-center text-sm text-gray-500">
            Loading...
          </div>
        ) : recent.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-500">
            You haven't added any products yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {recent.map((product) => (
              <Link
                key={product.uuid}
                href={`/products/${product.uuid}/edit`}
                className="flex items-center justify-between py-3 hover:bg-gray-50 dark:hover:bg-white/[0.02]"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    SKU: {product.sku}
                  </p>
                </div>

                <ProductStatusBadge status={product.status} />
              </Link>
            ))}
          </div>
        )}

        <div className="mt-4 text-right">
          <Link
            href="/products"
            className="text-sm text-brand-600 hover:underline"
          >
            View all products →
          </Link>
        </div>
      </ComponentCard>

      <ComponentCard
        title="My Orders"
        desc="Orders that include your products."
      >
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-xs text-gray-500">Total Orders</p>
            <p className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {ordersLoading ? "-" : orderStats?.totalOrders ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-xs text-gray-500">Need Fulfillment</p>
            <p className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {ordersLoading ? "-" : orderStats?.pendingOrders ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-xs text-gray-500">Revenue</p>
            <p className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {ordersLoading ? "-" : `$${(orderStats?.totalRevenue ?? 0).toLocaleString()}`}
            </p>
          </div>
        </div>

        {ordersLoading ? (
          <div className="py-8 text-center text-sm text-gray-500">
            Loading...
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-500">
            No orders yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentOrders.map((order) => (
              <Link
                key={order.uuid}
                href={`/supplier-orders/${order.uuid}`}
                className="flex items-center justify-between py-3 hover:bg-gray-50 dark:hover:bg-white/[0.02]"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {order.sellerOrderNumber}
                  </p>
                  <p className="text-xs text-gray-500">
                    Ship to {order.shipTo} · ${order.total}
                  </p>
                </div>

                <OrderStatusBadge
                  status={
                    order.status as
                      | "pending"
                      | "processing"
                      | "shipped"
                      | "delivered"
                      | "cancelled"
                  }
                />
              </Link>
            ))}
          </div>
        )}

        <div className="mt-4 text-right">
          <Link
            href="/supplier-orders"
            className="text-sm text-brand-600 hover:underline"
          >
            View all orders →
          </Link>
        </div>
      </ComponentCard>
    </div>
  );
}
