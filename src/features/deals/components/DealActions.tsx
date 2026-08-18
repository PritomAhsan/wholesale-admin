"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

import dealService from "@/api/services/deal.service";
import { Deal } from "@/types/deal";

interface Props {
  deal: Deal;
  onChanged: () => void;
}

export default function DealActions({ deal, onChanged }: Props) {
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Delete the deal "${deal.title}"?`)) return;

    setBusy(true);

    try {
      await dealService.delete(deal.uuid);
      onChanged();
    } catch (error) {
      console.error(error);
      alert("Failed to delete deal.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/deals/${deal.uuid}/edit`}
        className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-300"
      >
        <Pencil size={14} />
        Edit
      </Link>

      <button
        onClick={handleDelete}
        disabled={busy}
        className="flex items-center gap-1 rounded-lg bg-error-50 px-3 py-2 text-xs font-medium text-error-600 hover:bg-error-100 disabled:opacity-50 dark:bg-error-500/15"
      >
        <Trash2 size={14} />
        Delete
      </button>
    </div>
  );
}
