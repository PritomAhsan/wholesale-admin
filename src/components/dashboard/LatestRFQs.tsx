"use client";

import Link from "next/link";
import { Clock3, Eye, PackageSearch } from "lucide-react";

import { DashboardRFQ } from "@/types/dashboard";

interface Props {
  rfqs: DashboardRFQ[];
}

export default function LatestRFQs({ rfqs }: Props) {
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
          {rfqs.length} Recent
        </span>
      </div>

      {rfqs.length === 0 ? (
        <p className="p-6 text-center text-sm text-gray-400">
          No RFQs submitted yet.
        </p>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {rfqs.map((rfq) => (
            <div
              key={rfq.uuid}
              className="flex items-center justify-between p-5 hover:bg-gray-50 transition dark:hover:bg-gray-800/40"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-500/10">
                  <PackageSearch className="h-7 w-7 text-orange-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {rfq.productName}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">{rfq.buyer}</p>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span>
                      {rfq.quantity} {rfq.unit}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    rfq.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  <Clock3 className="h-3.5 w-3.5" />
                  {rfq.status}
                </span>

                <Link
                  href={`/rfqs/${rfq.uuid}`}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <Eye className="h-4 w-4" />
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-800 p-4 text-center">
        <Link
          href="/rfqs"
          className="text-sm font-medium text-brand-600 hover:underline"
        >
          View All RFQs →
        </Link>
      </div>
    </div>
  );
}
