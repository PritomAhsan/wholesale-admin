"use client";

import {
  Package,
  Building2,
  Users,
  FileText,
  TrendingUp,
} from "lucide-react";

type StatCard = {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
};

const stats: StatCard[] = [
  {
    title: "Products",
    value: "12,458",
    change: "+12.5%",
    positive: true,
    icon: Package,
  },
  {
    title: "Suppliers",
    value: "864",
    change: "+5.3%",
    positive: true,
    icon: Building2,
  },
  {
    title: "Customers",
    value: "5,927",
    change: "+18.1%",
    positive: true,
    icon: Users,
  },
  {
    title: "RFQs",
    value: "276",
    change: "-3.2%",
    positive: false,
    icon: FileText,
  },
];

export default function MarketStats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10">
                <Icon className="h-7 w-7 text-brand-600" />
              </div>

              <div
                className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                  item.positive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <TrendingUp
                  className={`h-3.5 w-3.5 ${
                    !item.positive ? "rotate-180" : ""
                  }`}
                />
                {item.change}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">
                {item.title}
              </h3>

              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}