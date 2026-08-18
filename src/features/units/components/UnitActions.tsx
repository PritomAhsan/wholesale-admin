"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import UnitService from "@/api/services/unit.service";

interface Props {
  id: string;
  name: string;
  onDeleted?: () => void;
}

export default function UnitActions({ id, name, onDeleted }: Props) {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmed) return;

    try {
      const response = await UnitService.delete(id);

      toast.success(response.message ?? "Unit deleted.");

      onDeleted?.();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to delete unit. It may still be in use by products."
      );
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/units/${id}/edit`}
        className="rounded-lg p-2 text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 hover:text-warning-600 dark:hover:bg-gray-800"
      >
        <Pencil size={18} />
      </Link>

      <button
        type="button"
        onClick={handleDelete}
        className="rounded-lg p-2 text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 hover:text-error-600 dark:hover:bg-gray-800"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
