"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import payoutService from "@/api/services/payout.service";
import { Payout } from "@/types/payout";

interface Props {
  payout: Payout;
  onChanged: () => void;
}

export default function PayoutActions({ payout, onChanged }: Props) {
  const [busy, setBusy] = useState(false);

  if (payout.status === "paid") {
    return <span className="text-xs text-gray-400">Paid</span>;
  }

  async function handleMarkPaid() {
    const note = window.prompt(
      `Mark this $${payout.amount} payout to ${payout.supplier?.seller_id ?? "this seller"} as paid.\n\nReference (e.g. bank transfer ID) — optional:`
    );

    if (note === null) return; // cancelled

    setBusy(true);

    try {
      await payoutService.markPaid(payout.uuid, note || undefined);
      onChanged();
    } catch (error) {
      console.error(error);
      alert("Failed to mark payout as paid.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handleMarkPaid}
      disabled={busy}
      className="flex items-center gap-1 rounded-lg bg-success-50 px-3 py-2 text-xs font-medium text-success-600 hover:bg-success-100 disabled:opacity-50 dark:bg-success-500/15"
    >
      <CheckCircle2 size={14} />
      Mark Paid
    </button>
  );
}
