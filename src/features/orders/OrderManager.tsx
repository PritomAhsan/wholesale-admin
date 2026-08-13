"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

import OrderService from "@/api/services/order.service";
import { Order } from "@/types/order";
import { ServerPagination } from "@/types/server-table";

import OrderToolbar from "./components/OrderToolbar";
import OrderTable from "./components/OrderTable";

export default function OrderManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState<ServerPagination>({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);

      const response = await OrderService.getAll({
        page,
        search: search || undefined,
        status: status || undefined,
      });

      setOrders(response.items);
      setPagination(response.pagination);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ComponentCard
      title="Orders"
      desc="View and manage marketplace orders across all sellers."
    >
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
          {pagination.total} Orders
        </h4>

        <Button variant="outline" onClick={load}>
          <RefreshCw size={16} className="mr-2" />
          Refresh
        </Button>
      </div>

      <OrderToolbar
        search={search}
        status={status}
        onSearchChange={(value) => {
          setPage(1);
          setSearch(value);
        }}
        onStatusChange={(value) => {
          setPage(1);
          setStatus(value);
        }}
      />

      <OrderTable orders={orders} loading={loading} error={error} />
    </ComponentCard>
  );
}
