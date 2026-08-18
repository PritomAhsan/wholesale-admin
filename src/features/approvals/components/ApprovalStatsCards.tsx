"use client";

import { ApprovalStatistics } from "@/types/approval";

interface Props {
  statistics: ApprovalStatistics | null;
  loading: boolean;
}

const CARDS: {
  key: keyof ApprovalStatistics;
  label: string;
}[] = [
  { key: "pending", label: "Pending Review" },
  { key: "approved", label: "Approved" },
  { key: "published", label: "Published" },
  { key: "rejected", label: "Rejected" },
  { key: "draft", label: "Draft" },
  { key: "archived", label: "Archived" },
];

export default function ApprovalStatsCards({ statistics, loading }: Props) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      {CARDS.map((card) => (
        <div
          key={card.key}
          className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400">{card.label}</p>

          <p className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {loading ? "-" : statistics?.[card.key] ?? 0}
          </p>
        </div>
      ))}
    </div>
  );
}
