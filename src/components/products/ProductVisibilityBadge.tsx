interface Props {
  status: "Active" | "Draft";
}

export default function ProductVisibilityBadge({
  status,
}: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        status === "Active"
          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
          : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
      }`}
    >
      {status}
    </span>
  );
}