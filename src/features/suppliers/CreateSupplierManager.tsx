"use client";

import ComponentCard from "@/components/common/ComponentCard";

import SupplierForm from "./components/SupplierForm";

export default function CreateSupplierManager() {
  return (
    <ComponentCard
      title="Create Supplier"
      desc="Add a new supplier to the marketplace."
    >
      <SupplierForm />
    </ComponentCard>
  );
}