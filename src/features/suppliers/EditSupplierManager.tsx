"use client";

import ComponentCard from "@/components/common/ComponentCard";

import SupplierForm from "./components/SupplierForm";
import { suppliers } from "./data/suppliers";

export default function EditSupplierManager() {
  // Temporary mock data.
  // Phase 9 will load the supplier by ID from the API.
  const supplier = suppliers[0];

  return (
    <ComponentCard
      title="Edit Supplier"
      desc="Update supplier information."
    >
      <SupplierForm
        mode="edit"
        initialData={supplier}
      />
    </ComponentCard>
  );
}