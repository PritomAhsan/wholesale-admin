"use client";

import ComponentCard from "@/components/common/ComponentCard";

import CategoryToolbar from "./components/CategoryToolbar";
import CategoryTable from "./components/CategoryTable";

import { useCategories } from "@/hooks/useCategories";

export default function CategoryManager() {
  const {
    categories,
    pagination,
    loading,
    error,

    search,
    changeStatus,
    changePage,
    refresh,
  } = useCategories();

  return (
    <ComponentCard
      title="Categories"
      desc="Manage all marketplace categories."
    >
      <CategoryToolbar
        onSearch={search}
        onStatusChange={changeStatus}
      />

      <CategoryTable
        categories={categories}
        pagination={pagination}
        loading={loading}
        error={error}
        onRefresh={refresh}
        onPageChange={changePage}
      />
    </ComponentCard>
  );
}