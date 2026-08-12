"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

import ApprovalService from "@/api/services/approval.service";

import { ApprovalStatistics, PendingProduct } from "@/types/approval";
import { ServerPagination } from "@/types/server-table";

import ApprovalStatsCards from "./components/ApprovalStatsCards";
import PendingApprovalTable from "./components/PendingApprovalTable";

export default function ApprovalDashboard() {
  const [statistics, setStatistics] = useState<ApprovalStatistics | null>(
    null
  );
  const [statsLoading, setStatsLoading] = useState(true);

  const [products, setProducts] = useState<PendingProduct[]>([]);
  const [pagination, setPagination] = useState<ServerPagination>({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const data = await ApprovalService.statistics();
      setStatistics(data);
    } catch (err) {
      console.error(err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const loadPending = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ApprovalService.pending({ page });
      setProducts(response.items);
      setPagination(response.pagination);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Unable to load pending products.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  useEffect(() => {
    loadPending();
  }, [loadPending]);

  const refreshAll = () => {
    loadStats();
    loadPending();
  };

  return (
    <ComponentCard
      title="Product Approvals"
      desc="Review products submitted by suppliers before they go live."
    >
      <ApprovalStatsCards statistics={statistics} loading={statsLoading} />

      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
          Pending Review
        </h4>

        <Button variant="outline" onClick={refreshAll}>
          <RefreshCw size={16} className="mr-2" />
          Refresh
        </Button>
      </div>

      <PendingApprovalTable
        products={products}
        pagination={pagination}
        loading={loading}
        error={error}
        onRefresh={refreshAll}
        onPageChange={setPage}
      />
    </ComponentCard>
  );
}
