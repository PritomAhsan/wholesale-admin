"use client";

import DashboardHeader from "./DashboardHeader";
import MarketStats from "./MarketStats";
import PendingProducts from "./PendingProducts";
import LatestSuppliers from "./LatestSuppliers";
import LatestProducts from "./LatestProducts";
import LatestRFQs from "./LatestRFQs";
import RecentOrders from "./RecentOrders";
import { useDashboard } from "@/hooks/useDashboard";


export default function DashboardGrid() {

  const {
  dashboard,
  loading,
  error,
} = useDashboard();

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>{error}</div>;
}

  return (
    <>
      <DashboardHeader />

      <MarketStats
    statistics={dashboard!.statistics}
/>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <PendingProducts />
        <LatestSuppliers />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <LatestProducts
    products={dashboard!.latestProducts}
/>
        <LatestRFQs />
      </div>

      <div className="mt-6">
        <RecentOrders />
      </div>
    </>
  );
}