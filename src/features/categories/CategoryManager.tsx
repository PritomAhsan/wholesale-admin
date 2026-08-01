"use client";

import ComponentCard from "@/components/common/ComponentCard";

import { useServerTable } from "@/hooks/useServerTable";

import CategoryService from "@/api/services/category.service";

import { Category } from "@/types/category";

import CategoryToolbar from "./components/CategoryToolbar";
import CategoryTable from "./components/CategoryTable";

export default function CategoryManager() {
  const table =
    useServerTable<Category>({
      fetcher: CategoryService.getAll,
    });

  return (
    <ComponentCard
      title="Categories"
      desc="Manage all marketplace categories."
    >
      <CategoryToolbar
  onSearch={table.search}
  onStatusChange={table.changeStatus}
  onSortChange={table.changeSort}
  onPerPageChange={table.changePerPage}
  onRefresh={table.refresh}
  onReset={table.reset}
/>

      <CategoryTable
        categories={table.items}
        pagination={
          table.pagination
        }
        loading={table.loading}
        error={table.error}
        onRefresh={table.refresh}
        onPageChange={
          table.changePage
        }
      />
    </ComponentCard>
  );
}