"use client";
import ProductsPageHeader from "@/components/products/ProductsPageHeader";
import ProductFilters from "@/components/products/ProductFilters";
import ProductsTable from "@/components/products/ProductsTable";
import BulkActions from "@/components/products/BulkActions";
import { useState } from "react";

export default function ProductsPage() {
    const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <ProductsPageHeader />

      <ProductFilters
        search={search}
        setSearch={setSearch}
        />

        <BulkActions />

      <ProductsTable />
    </div>
  );
}