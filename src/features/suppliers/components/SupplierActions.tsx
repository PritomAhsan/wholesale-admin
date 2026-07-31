"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  id: number;
}

export default function SupplierActions({
  id,
}: Props) {
const handleDelete = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this supplier?\n\nThis action cannot be undone."
  );

  if (!confirmed) return;

  try {
    console.log("Deleting Supplier:", id);

    // Phase 8 / Laravel API
    // await api.delete(`/suppliers/${id}`);

    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    alert("Supplier deleted successfully.");

    // Phase 8
    // router.refresh();
  } catch (error) {
    console.error(error);

    alert("Failed to delete supplier.");
  }
};

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/suppliers/${id}/edit`}
        className="rounded-lg p-2 hover:bg-gray-100"
      >
        <Pencil size={18} />
      </Link>

      <button
        onClick={handleDelete}
        className="rounded-lg p-2 hover:bg-gray-100"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}