"use client";

import Image from "next/image";
import { BadgeCheck, Globe, Eye } from "lucide-react";

type Supplier = {
  id: number;
  logo: string;
  company: string;
  country: string;
  joined: string;
  verified: boolean;
  status: "Pending" | "Approved";
};

const suppliers: Supplier[] = [
  {
    id: 1,
    logo: "/images/suppliers/company-1.png",
    company: "ABC Industrial Ltd.",
    country: "Bangladesh",
    joined: "Today",
    verified: true,
    status: "Approved",
  },
  {
    id: 2,
    logo: "/images/suppliers/company-2.png",
    company: "Smart Electronics",
    country: "China",
    joined: "Yesterday",
    verified: true,
    status: "Approved",
  },
  {
    id: 3,
    logo: "/images/suppliers/company-3.png",
    company: "Modern Furniture Co.",
    country: "Turkey",
    joined: "2 days ago",
    verified: false,
    status: "Pending",
  },
];

export default function LatestSuppliers() {
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

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="flex items-center justify-between p-5 hover:bg-gray-50 transition dark:hover:bg-gray-800/40"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-gray-200 bg-white">
                <Image
                  src={supplier.logo}
                  alt={supplier.company}
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {supplier.company}
                  </h3>

                  {supplier.verified && (
                    <BadgeCheck className="h-4 w-4 text-green-600" />
                  )}
                </div>

                <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                  <Globe className="h-4 w-4" />
                  {supplier.country}
                </div>

                <div className="mt-2 flex items-center gap-3">
                  <span className="text-xs text-gray-400">
                    Joined {supplier.joined}
                  </span>

                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      supplier.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {supplier.status}
                  </span>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
              <Eye className="h-4 w-4" />
              View
            </button>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 p-4 text-center">
        <button className="text-sm font-medium text-brand-600 hover:underline">
          View All Suppliers →
        </button>
      </div>
    </div>
  );
}