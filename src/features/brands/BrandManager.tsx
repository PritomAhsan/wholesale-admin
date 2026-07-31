"use client";

import ComponentCard from "@/components/common/ComponentCard";

import BrandToolbar from "./components/BrandToolbar";
import BrandTable from "./components/BrandTable";

export default function BrandManager() {
  return (
    <ComponentCard
      title="Brands"
      desc="Manage all marketplace brands."
    >
      <BrandToolbar />

      <BrandTable />
    </ComponentCard>
  );
}