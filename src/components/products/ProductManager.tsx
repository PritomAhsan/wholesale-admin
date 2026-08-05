"use client";

import ComponentCard from "@/components/common/ComponentCard";

import ProductToolbar from "./ProductToolbar";
import ProductTable from "./ProductTable";

import useProducts from "../../hooks/useProducts";

export default function ProductManager() {
  const products = useProducts();

  return (
    <ComponentCard
      title="Products"
      desc="Manage all marketplace products."
    >
      <ProductToolbar
        onSearch={products.search}
        onStatusChange={products.changeStatus}
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