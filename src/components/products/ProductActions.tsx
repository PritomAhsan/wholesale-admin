"use client";

import Link from "next/link";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import ProductService from "@/api/services/product.service";

interface Props {
  uuid: string;

  name: string;

  refresh: () => void;
}

export default function ProductActions({
  uuid,
  name,
  refresh,
}: Props) {
  const handleDelete =
    async () => {
      const confirmed =
        window.confirm(
          `Delete "${name}"?`
        );

      if (!confirmed) {
        return;
      }

      try {
        await ProductService.delete(
          uuid
        );

        refresh();
      } catch (error) {
        console.error(error);

        alert(
          "Failed to delete product."
        );
      }
    };

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/products/${uuid}/edit`}
        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-warning-600 dark:hover:bg-gray-800"
      >
        <Pencil size={18} />
      </Link>

      <button
        onClick={handleDelete}
        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-error-600 dark:hover:bg-gray-800"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}