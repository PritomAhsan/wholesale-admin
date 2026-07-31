"use client";

import ComponentCard from "@/components/common/ComponentCard";

import CategoryForm from "./components/CategoryForm";
import { categories } from "./data/categories";

export default function EditCategoryManager() {
  // Temporary
  // Phase 9 will load by ID from API
  const category = categories[0];

  return (
    <ComponentCard
      title="Edit Category"
      desc="Update category information."
    >
      <CategoryForm
        mode="edit"
        initialData={category}
      />
    </ComponentCard>
  );
}