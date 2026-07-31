"use client";

import ComponentCard from "@/components/common/ComponentCard";

import BrandForm from "./components/BrandForm";
import { brands } from "./data/brands";

export default function EditBrandManager() {
  // Temporary
  // Phase 9 will load the brand by ID from the API
  const brand = brands[0];

  return (
    <ComponentCard
      title="Edit Brand"
      desc="Update brand information."
    >
      <BrandForm
        mode="edit"
        initialData={brand}
      />
    </ComponentCard>
  );
}