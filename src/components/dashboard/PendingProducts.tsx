"use client";

import Link from "next/link";
import { useState } from "react";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

import ApprovalService from "@/api/services/approval.service";
import { DashboardPendingProduct } from "@/types/dashboard";

interface Props {
  products: DashboardPendingProduct[];
  onChanged: () => void;
}

export default function PendingProducts({ products, onChanged }: Props) {
  const [busyUuid, setBusyUuid] = useState<string | null>(null);

  async function handleApprove(uuid: string) {
    setBusyUuid(uuid);

    try {
      await ApprovalService.approve(uuid);
      onChanged();
    } catch (error) {
      console.error(error);
      alert("Failed to approve product.");
    } finally {
      setBusyUuid(null);
    }
  }

  async function handleReject(uuid: string) {
    const remarks = window.prompt("Reason for rejection:");

    if (!remarks) return;

    setBusyUuid(uuid);

    try {
      await ApprovalService.reject(uuid, remarks);
      onChanged();
    } catch (error) {
      console.error(error);
      alert("Failed to reject product.");
    } finally {
      setBusyUuid(null);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 p-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Pending Product Approvals
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Products waiting for review
          </p>
        </div>

        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
          {products.length} Pending
        </span>
      </div>

      {products.length === 0 ? (
        <p className="p-6 text-center text-sm text-gray-400">
          No products awaiting approval.
        </p>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {products.map((product) => (
            <div
              key={product.uuid}
              className="flex flex-wrap items-center justify-between gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">{product.supplier}</p>

                <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  {new Date(product.submitted).toLocaleDateString()}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  disabled={busyUuid === product.uuid}
                  onClick={() => handleApprove(product.uuid)}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Approve
                </button>

                <button
                  disabled={busyUuid === product.uuid}
                  onClick={() => handleReject(product.uuid)}
                  className="flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-900/20"
                >
                  <XCircle className="h-4 w-4" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-800 p-4 text-center">
        <Link
          href="/approvals"
          className="text-sm font-medium text-brand-600 hover:underline"
        >
          View All Pending Products →
        </Link>
      </div>
    </div>
  );
}
