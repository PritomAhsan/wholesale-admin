"use client";

import DashboardHeader from "./DashboardHeader";
import MarketStats from "./MarketStats";
import PendingProducts from "./PendingProducts";
import LatestSuppliers from "./LatestSuppliers";
import LatestProducts from "./LatestProducts";
import LatestRFQs from "./LatestRFQs";
import RecentOrders from "./RecentOrders";

export default function DashboardGrid() {
  return (
    <>
      <DashboardHeader />

      <MarketStats />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <PendingProducts />
        <LatestSuppliers />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <LatestProducts />
        <LatestRFQs />
      </div>

      <div className="mt-6">
        <RecentOrders />
      </div>
    </>
  );
}