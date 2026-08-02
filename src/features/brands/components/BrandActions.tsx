"use client";

import Link from "next/link";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import BrandService from "@/api/services/brand.service";

interface Props {
  id: string;

  name: string;

  onDeleted?: () => void;
}

export default function BrandActions({
  id,
  name,
  onDeleted,
}: Props) {
  const handleDelete =
    async () => {
      const confirmed =
        window.confirm(
          `Are you sure you want to delete "${name}"?`
        );

      if (!confirmed)
        return;

      try {
        const response =
          await BrandService.delete(
            id
          );

        alert(
          response.message
        );

        onDeleted?.();
      } catch (error: any) {
        console.error(
          error
        );

        alert(
          error?.response?.data
            ?.message ??
            "Failed to delete brand."
        );
      }
    };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/brands/${id}/edit`}
        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-warning-600 dark:hover:bg-gray-800"
      >
        <Pencil size={18} />
      </Link>

      <button
        type="button"
        onClick={
          handleDelete
        }
        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-error-600 dark:hover:bg-gray-800"
      >
        <Trash2
          size={18}
        />
      </button>
    </div>
  );
}