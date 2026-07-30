interface Props {
  status: "Published" | "Pending" | "Rejected";
}

export default function ProductStatusBadge({
  status,
}: Props) {
  const styles = {
    Published:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",

    Pending:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",

    Rejected:
      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}