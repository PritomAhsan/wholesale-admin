"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  id: number;
}

export default function BrandActions({
  id,
}: Props) {
const handleDelete = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this brand?\n\nThis action cannot be undone."
  );

  if (!confirmed) return;

  try {
    console.log("Deleting Brand:", id);

    // Phase 9
    // await api.delete(`/brands/${id}`);

    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    alert("Brand deleted successfully.");

    // Phase 9
    // router.refresh();
  } catch (error) {
    console.error(error);

    alert("Failed to delete brand.");
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
  onClick={handleDelete}
  className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-error-600 dark:hover:bg-gray-800"
>
  <Trash2 size={18} />
</button>
    </div>
  );
}