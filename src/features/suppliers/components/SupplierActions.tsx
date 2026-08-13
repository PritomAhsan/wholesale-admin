"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

import SupplierService from "@/api/services/supplier.service";
import { Supplier } from "@/types/supplier";

interface Props {
  supplier: Supplier;
  onChanged: () => void;
}

export default function SupplierActions({
  supplier,
  onChanged,
}: Props) {
  const [busy, setBusy] = useState(false);

  if (supplier.status !== "pending") {
    return <span className="text-sm text-gray-400">—</span>;
  }

  async function handleApprove() {
    if (!window.confirm(`Approve ${supplier.company_name} as a supplier?`)) {
      return;
    }

    setBusy(true);

    try {
      await SupplierService.approve(supplier.uuid);
      onChanged();
    } catch (error) {
      console.error(error);
      alert("Failed to approve supplier.");
    } finally {
      setBusy(false);
    }
  }

  async function handleReject() {
    if (!window.confirm(`Reject ${supplier.company_name}'s application?`)) {
      return;
    }

    setBusy(true);

    try {
      await SupplierService.reject(supplier.uuid);
      onChanged();
    } catch (error) {
      console.error(error);
      alert("Failed to reject supplier.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={handleApprove}
        disabled={busy}
        className="flex items-center gap-1 rounded-lg bg-success-50 px-3 py-2 text-xs font-medium text-success-600 hover:bg-success-100 disabled:opacity-50 dark:bg-success-500/15"
      >
        <Check size={14} />
        Approve
      </button>

      <button
        onClick={handleReject}
        disabled={busy}
        className="flex items-center gap-1 rounded-lg bg-error-50 px-3 py-2 text-xs font-medium text-error-600 hover:bg-error-100 disabled:opacity-50 dark:bg-error-500/15"
      >
        <X size={14} />
        Reject
      </button>
    </div>
  );
}
