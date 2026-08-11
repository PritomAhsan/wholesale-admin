"use client";

import ComponentCard from "@/components/common/ComponentCard";

import { useServerTable } from "@/hooks/useServerTable";

import AttributeService from "@/api/services/attribute.service";

import { Attribute } from "@/types/attribute";

import AttributeToolbar from "./components/AttributeToolbar";
import AttributeTable from "./components/AttributeTable";

export default function AttributeManager() {
  const table = useServerTable<Attribute>({
    fetcher: AttributeService.getAll,
  });

  return (
    <ComponentCard
      title="Attributes"
      desc="Manage product attributes like Color, Size, and Material."
    >
      <AttributeToolbar
        onSearch={table.search}
        onSortChange={table.changeSort}
        onPerPageChange={table.changePerPage}
        onRefresh={table.refresh}
        onReset={table.reset}
      />

      <AttributeTable
        attributes={table.items}
        pagination={table.pagination}
        loading={table.loading}
        error={table.error}
        onRefresh={table.refresh}
        onPageChange={table.changePage}
      />
    </ComponentCard>
  );
}
