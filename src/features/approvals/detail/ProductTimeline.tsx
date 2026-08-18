"use client";

import { useEffect, useState } from "react";

import ApprovalService from "@/api/services/approval.service";

import { ApprovalTimelineEntry, StatusHistoryEntry } from "@/types/approval";

interface Props {
  productUuid: string;
  refreshKey: number;
}

interface TimelineRow {
  key: string;
  action: string;
  decision: string | null;
  remarks: string | null;
  actor: string | null;
  at: string | null;
}

const ACTION_LABELS: Record<string, string> = {
  submit: "Submitted for review",
  approve: "Approved",
  reject: "Rejected",
  publish: "Published",
  unpublish: "Unpublished",
  archive: "Archived",
  restore: "Restored",
};

export default function ProductTimeline({ productUuid, refreshKey }: Props) {
  const [rows, setRows] = useState<TimelineRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);

        const [approvals, statusHistory] = await Promise.all([
          ApprovalService.timeline(productUuid).catch(
            () => [] as ApprovalTimelineEntry[]
          ),
          ApprovalService.statusHistory(productUuid).catch(
            () => [] as StatusHistoryEntry[]
          ),
        ]);

        if (cancelled) return;

        const approvalRows: TimelineRow[] = approvals.map((entry) => ({
          key: entry.uuid,
          action: entry.action,
          decision: entry.decision,
          remarks: entry.remarks,
          actor: entry.reviewer?.name ?? null,
          at: entry.reviewed_at,
        }));

        const statusRows: TimelineRow[] = statusHistory.map((entry) => ({
          key: entry.uuid,
          action: entry.action,
          decision: null,
          remarks: entry.remarks,
          actor: entry.performed_by?.name ?? null,
          at: entry.performed_at,
        }));

        const merged = [...approvalRows, ...statusRows].sort((a, b) => {
          const aTime = a.at ? new Date(a.at).getTime() : 0;
          const bTime = b.at ? new Date(b.at).getTime() : 0;
          return bTime - aTime;
        });

        setRows(merged);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [productUuid, refreshKey]);

  if (loading) {
    return <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">Loading history...</div>;
  }

  if (rows.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        No activity yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <div
          key={row.key}
          className="flex gap-3 border-b border-gray-100 pb-4 last:border-0 dark:border-gray-800"
        >
          <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {ACTION_LABELS[row.action] ?? row.action}
              </p>

              {row.at && (
                <p className="text-xs text-gray-400">
                  {new Date(row.at).toLocaleString()}
                </p>
              )}
            </div>

            {row.actor && (
              <p className="text-xs text-gray-500 dark:text-gray-400">by {row.actor}</p>
            )}

            {row.remarks && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {row.remarks}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
