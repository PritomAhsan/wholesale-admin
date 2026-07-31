"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Pencil,
  Trash2,
} from "lucide-react";

interface Props {
  id: number;
  name: string;
}

export default function CategoryActions({
  id,
  name,
}: Props) {
  const [open, setOpen] =
    useState(false);

    const handleDelete = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this category?"
  );

  if (!confirmed) return;

  try {
    // TODO: Phase 9 API Integration

    console.log("Delete Category", id);

    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    alert("Category deleted successfully.");
  } catch (error) {
    console.error(error);

    alert("Failed to delete category.");
  }
};

  return (
    <>
      <div className="flex items-center gap-2">
        <Link
          href={`/categories/${id}/edit`}
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


    </>
  );
}