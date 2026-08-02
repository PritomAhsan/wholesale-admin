"use client";

import ComponentCard from "@/components/common/ComponentCard";

import { useServerTable } from "@/hooks/useServerTable";

import BrandService from "@/api/services/brand.service";

import { Brand } from "@/types/brand";

import BrandToolbar from "./components/BrandToolbar";
import BrandTable from "./components/BrandTable";

export default function BrandManager() {
  const table = useServerTable<Brand>({
    fetcher: BrandService.getAll,
  });

  return (
    <ComponentCard
      title="Brands"
      desc="Manage all marketplace brands."
    >
      <BrandToolbar
  onSearch={table.search}
  onStatusChange={table.changeStatus}
  onSortChange={table.changeSort}
  onPerPageChange={table.changePerPage}
  onRefresh={table.refresh}
  onReset={table.reset}
/>

      <BrandTable
        brands={table.items}
        pagination={table.pagination}
        loading={table.loading}
        error={table.error}
        onRefresh={table.refresh}
        onPageChange={table.changePage}
      />
    </ComponentCard>
  );
}