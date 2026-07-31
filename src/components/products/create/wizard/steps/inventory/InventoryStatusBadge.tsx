"use client";

interface Props {
  status: "in-stock" | "low-stock" | "out-of-stock";
}

export default function InventoryStatusBadge({
  status,
}: Props) {
  const styles = {
    "in-stock":
      "bg-green-100 text-green-700 border-green-300",

    "low-stock":
      "bg-yellow-100 text-yellow-700 border-yellow-300",

    "out-of-stock":
      "bg-red-100 text-red-700 border-red-300",
  };

  const labels = {
    "in-stock": "In Stock",
    "low-stock": "Low Stock",
    "out-of-stock": "Out of Stock",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-sm font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}