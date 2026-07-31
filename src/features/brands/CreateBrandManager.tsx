"use client";

import ComponentCard from "@/components/common/ComponentCard";

import BrandForm from "./components/BrandForm";

export default function CreateBrandManager() {
  return (
    <ComponentCard
      title="Create Brand"
      desc="Add a new marketplace brand."
    >
      <BrandForm />
    </ComponentCard>
  );
}