"use client";

import ComponentCard from "@/components/common/ComponentCard";

import { useServerTable } from "@/hooks/useServerTable";

import UnitService from "@/api/services/unit.service";

import { Unit } from "@/types/unit";

import UnitToolbar from "./components/UnitToolbar";
import UnitTable from "./components/UnitTable";

export default function UnitManager() {
  const table = useServerTable<Unit>({
    fetcher: UnitService.getAll,
  });

  return (
    <ComponentCard
      title="Units"
      desc="Manage measurement units used by products (kg, pcs, box, etc)."
    >
      <UnitToolbar
        onSearch={table.search}
        onStatusChange={table.changeStatus}
        onSortChange={table.changeSort}
        onPerPageChange={table.changePerPage}
        onRefresh={table.refresh}
        onReset={table.reset}
      />

      <UnitTable
        units={table.items}
        pagination={table.pagination}
        loading={table.loading}
        error={table.error}
        onRefresh={table.refresh}
        onPageChange={table.changePage}
      />
    </ComponentCard>
  );
}
