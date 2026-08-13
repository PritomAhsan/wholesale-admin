"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";

import { DashboardSupplier } from "@/types/dashboard";

interface Props {
  suppliers: DashboardSupplier[];
}

export default function LatestSuppliers({ suppliers }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 p-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Latest Suppliers
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Recently registered supplier companies
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {suppliers.length} New
        </span>
      </div>

      {suppliers.length === 0 ? (
        <p className="p-6 text-center text-sm text-gray-400">
          No suppliers yet.
        </p>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {suppliers.map((supplier) => (
            <div
              key={supplier.uuid}
              className="flex items-center justify-between p-5 hover:bg-gray-50 transition dark:hover:bg-gray-800/40"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Building2 className="h-6 w-6 text-gray-400" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {supplier.companyName}
                  </h3>

                  <p className="mt-1 text-sm capitalize text-gray-500">
                    {supplier.businessType}
                  </p>

                  <span
                    className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-medium capitalize ${
                      supplier.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : supplier.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {supplier.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-800 p-4 text-center">
        <Link
          href="/suppliers"
          className="text-sm font-medium text-brand-600 hover:underline"
        >
          View All Suppliers →
        </Link>
      </div>
    </div>
  );
}
