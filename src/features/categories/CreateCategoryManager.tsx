"use client";

import ComponentCard from "@/components/common/ComponentCard";

import CategoryForm from "./components/CategoryForm";

export default function CreateCategoryManager() {
  return (
    <ComponentCard
      title="Create Category"
      desc="Add a new product category."
    >
      <CategoryForm />
    </ComponentCard>
  );
}