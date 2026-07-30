"use client";

import { Eye, Clock3, PackageSearch } from "lucide-react";

type RFQ = {
  id: number;
  title: string;
  buyer: string;
  category: string;
  quantity: string;
  deadline: string;
  status: "Open" | "Closing Soon";
};

const rfqs: RFQ[] = [
  {
    id: 1,
    title: "Industrial Safety Helmets",
    buyer: "BuildMax Construction",
    category: "Safety Equipment",
    quantity: "5,000 Units",
    deadline: "3 Days Left",
    status: "Open",
  },
  {
    id: 2,
    title: "Wireless Barcode Scanners",
    buyer: "Smart Retail Ltd.",
    category: "Electronics",
    quantity: "500 Units",
    deadline: "Tomorrow",
    status: "Closing Soon",
  },
  {
    id: 3,
    title: "Office Executive Chairs",
    buyer: "Corporate Solutions",
    category: "Furniture",
    quantity: "200 Units",
    deadline: "5 Days Left",
    status: "Open",
  },
];

export default function LatestRFQs() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 p-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Latest RFQs
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Recent buyer quotation requests
          </p>
        </div>

        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
          {rfqs.length} Active
        </span>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {rfqs.map((rfq) => (
          <div
            key={rfq.id}
            className="flex items-center justify-between p-5 hover:bg-gray-50 transition dark:hover:bg-gray-800/40"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-500/10">
                <PackageSearch className="h-7 w-7 text-orange-600" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {rfq.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {rfq.buyer}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span>{rfq.category}</span>

                  <span>•</span>

                  <span>{rfq.quantity}</span>

                  <span>•</span>

                  <span className="flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {rfq.deadline}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  rfq.status === "Open"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {rfq.status}
              </span>

              <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                <Eye className="h-4 w-4" />
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 p-4 text-center">
        <button className="text-sm font-medium text-brand-600 hover:underline">
          View All RFQs →
        </button>
      </div>
    </div>
  );
}