"use client";

import Link from "next/link";
import { Pencil, Trash2, ListTree } from "lucide-react";
import { toast } from "sonner";

import AttributeService from "@/api/services/attribute.service";

interface Props {
  id: string;
  name: string;
  onDeleted?: () => void;
}

export default function AttributeActions({ id, name, onDeleted }: Props) {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"? This will also remove its values.`
    );

    if (!confirmed) return;

    try {
      const response = await AttributeService.delete(id);

      toast.success(response.message ?? "Attribute deleted.");

      onDeleted?.();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to delete attribute. It may still be in use by products."
      );
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/attributes/${id}/values`}
        title="Manage values"
        className="rounded-lg p-2 text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 hover:text-brand-600 dark:hover:bg-gray-800"
      >
        <ListTree size={18} />
      </Link>

      <Link
        href={`/attributes/${id}/edit`}
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
