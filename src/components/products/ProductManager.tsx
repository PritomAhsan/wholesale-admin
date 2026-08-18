"use client";

import { useCallback, useState } from "react";

import ComponentCard from "@/components/common/ComponentCard";

import ProductToolbar from "./ProductToolbar";
import ProductTable from "./ProductTable";

import { useServerTable } from "@/hooks/useServerTable";
import { ServerTableQuery } from "@/types/server-table";
import ProductService from "@/api/services/product.service";
import { ProductListItem } from "@/types/product";

export default function ProductManager() {
  const [status, setStatus] = useState("");

  const fetcher = useCallback(
    (params: ServerTableQuery) =>
      ProductService.getAll({
        page: params.page,
        per_page: params.per_page,
        search: params.search,
        sort: params.sort,
        order: params.order,
        status,
      }),
    [status]
  );

  const products = useServerTable<ProductListItem>({ fetcher });

  return (
    <ComponentCard
      title="Products"
      desc="Manage all marketplace products."
    >
      <ProductToolbar
        onSearch={products.search}
        onStatusChange={setStatus}
      />

      <ProductTable
        items={products.items}
        loading={products.loading}
        pagination={products.pagination}
        onPageChange={products.changePage}
        refresh={products.refresh}
      />
    </ComponentCard>
  );
}
