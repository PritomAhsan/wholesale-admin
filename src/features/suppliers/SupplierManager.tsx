"use client";

import ComponentCard from "@/components/common/ComponentCard";

import SupplierToolbar from "./components/SupplierToolbar";
import SupplierTable from "./components/SupplierTable";

export default function SupplierManager() {
  return (
    <ComponentCard
      title="Suppliers"
      desc="Manage marketplace suppliers."
    >
      <SupplierToolbar />

      <SupplierTable />
    </ComponentCard>
  );
}