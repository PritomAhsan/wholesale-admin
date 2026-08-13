"use client";

import DashboardHeader from "./DashboardHeader";
import MarketStats from "./MarketStats";
import PendingProducts from "./PendingProducts";
import LatestSuppliers from "./LatestSuppliers";
import LatestProducts from "./LatestProducts";
import LatestRFQs from "./LatestRFQs";
import RecentOrders from "./RecentOrders";
import { useAdminDashboard } from "@/hooks/useDashboard";

export default function DashboardGrid() {
  const { dashboard, loading, error, refresh } = useAdminDashboard();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !dashboard) {
    return <div>{error ?? "Unable to load dashboard."}</div>;
  }

  return (
    <>
      <DashboardHeader />

      <MarketStats statistics={dashboard.statistics} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <PendingProducts
          products={dashboard.pendingProducts}
          onChanged={refresh}
        />
        <LatestSuppliers suppliers={dashboard.latestSuppliers} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <LatestProducts products={dashboard.latestProducts} />
        <LatestRFQs rfqs={dashboard.latestRfqs} />
      </div>

      <div className="mt-6">
        <RecentOrders orders={dashboard.recentOrders} />
      </div>
    </>
  );
}
