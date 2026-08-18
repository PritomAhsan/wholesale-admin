"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Eye, X } from "lucide-react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "@/components/ui/button/Button";

import ApprovalService from "@/api/services/approval.service";

import { PendingProduct } from "@/types/approval";
import { ServerPagination } from "@/types/server-table";

import DecisionModal from "./DecisionModal";

interface Props {
  products: PendingProduct[];
  pagination: ServerPagination;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onPageChange: (page: number) => void;
}

export default function PendingApprovalTable({
  products,
  pagination,
  loading,
  error,
  onRefresh,
  onPageChange,
}: Props) {
  const [decision, setDecision] = useState<{
    product: PendingProduct;
    type: "approve" | "reject";
  } | null>(null);

  const handleConfirm = async (remarks: string) => {
    if (!decision) return;

    if (decision.type === "approve") {
      await ApprovalService.approve(decision.product.uuid, remarks || undefined);
      toast.success(`${decision.product.name} approved.`);
    } else {
      await ApprovalService.reject(decision.product.uuid, remarks);
      toast.success(`${decision.product.name} rejected.`);
    }

    onRefresh();
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-white/[0.03]">
        Loading pending products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-red-600 dark:border-red-900 dark:bg-red-950/30">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:text-gray-400 dark:border-gray-800 dark:bg-white/[0.03]">
        Nothing waiting for review right now.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Product</TableCell>
                <TableCell isHeader>SKU</TableCell>
                <TableCell isHeader>Supplier</TableCell>
                <TableCell isHeader>Submitted</TableCell>
                <TableCell isHeader className="text-right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((product) => {
                const image =
                  product.images?.find((img) => img.is_primary) ??
                  product.images?.[0];

                return (
                  <TableRow key={product.uuid}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-gray-200">
                          <Image
                            src={
                              image?.image_url ??
                              "/images/product-placeholder.png"
                            }
                            alt={product.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>

                        <Link
                          href={`/approvals/${product.uuid}`}
                          className="font-medium text-gray-800 hover:text-brand-600 dark:text-white/90"
                        >
                          {product.name}
                        </Link>
                      </div>
                    </TableCell>

                    <TableCell>{product.sku}</TableCell>

                    <TableCell>{product.supplier?.name ?? "-"}</TableCell>

                    <TableCell>
                      {new Date(product.created_at).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/approvals/${product.uuid}`}
                          title="View details"
                          className="rounded-lg p-2 text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 hover:text-brand-600 dark:hover:bg-gray-800"
                        >
                          <Eye size={18} />
                        </Link>

                        <button
                          type="button"
                          title="Approve"
                          onClick={() =>
                            setDecision({ product, type: "approve" })
                          }
                          className="rounded-lg p-2 text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 hover:text-success-600 dark:hover:bg-gray-800"
                        >
                          <Check size={18} />
                        </button>

                        <button
                          type="button"
                          title="Reject"
                          onClick={() =>
                            setDecision({ product, type: "reject" })
                          }
                          className="rounded-lg p-2 text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 hover:text-error-600 dark:hover:bg-gray-800"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {pagination.last_page > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-800">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing page{" "}
              <span className="font-medium">{pagination.current_page}</span>{" "}
              of{" "}
              <span className="font-medium">{pagination.last_page}</span> (
              {pagination.total} pending)
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={pagination.current_page === 1}
                onClick={() => onPageChange(pagination.current_page - 1)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={pagination.current_page === pagination.last_page}
                onClick={() => onPageChange(pagination.current_page + 1)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {decision && (
        <DecisionModal
          isOpen={!!decision}
          onClose={() => setDecision(null)}
          onConfirm={handleConfirm}
          title={
            decision.type === "approve"
              ? `Approve "${decision.product.name}"?`
              : `Reject "${decision.product.name}"?`
          }
          description={
            decision.type === "approve"
              ? "The supplier will be notified this product passed review."
              : "The supplier will see these remarks and can resubmit after fixing the issue."
          }
          confirmLabel={
            decision.type === "approve" ? "Approve" : "Reject"
          }
          remarksRequired={decision.type === "reject"}
          destructive={decision.type === "reject"}
        />
      )}
    </>
  );
}
