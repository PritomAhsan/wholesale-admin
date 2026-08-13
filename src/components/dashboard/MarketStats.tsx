"use client";

import { Package, Building2, Users, FileText } from "lucide-react";

import { AdminDashboardStatistics } from "@/types/dashboard";

interface Props {
  statistics: AdminDashboardStatistics;
}

export default function MarketStats({ statistics }: Props) {
  const stats = [
    {
      title: "Products",
      value: statistics.totalProducts.toLocaleString(),
      sub: `${statistics.pendingProducts} pending review`,
      icon: Package,
    },
    {
      title: "Suppliers",
      value: statistics.totalSuppliers.toLocaleString(),
      sub: `${statistics.pendingSuppliers} pending approval`,
      icon: Building2,
    },
    {
      title: "Customers",
      value: statistics.totalCustomers.toLocaleString(),
      sub: `${statistics.totalOrders} orders placed`,
      icon: Users,
    },
    {
      title: "RFQs",
      value: statistics.totalRfqs.toLocaleString(),
      sub: `$${statistics.totalRevenue.toLocaleString()} GMV`,
      icon: FileText,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10">
              <Icon className="h-7 w-7 text-brand-600" />
            </div>

            <div className="mt-6">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">
                {item.title}
              </h3>

              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {item.value}
              </p>

              <p className="mt-1 text-xs text-gray-400">{item.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
