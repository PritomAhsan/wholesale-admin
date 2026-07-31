"use client";

import ComponentCard from "@/components/common/ComponentCard";

import CategoryToolbar from "./components/CategoryToolbar";
import CategoryTable from "./components/CategoryTable";

export default function CategoryManager() {
  return (
    <ComponentCard
      title="Categories"
      desc="Manage all marketplace categories."
    >
      <CategoryToolbar />

      <CategoryTable />
    </ComponentCard>
  );
}