"use client";

import { useServerTable } from "@/hooks/useServerTable";

import ProductService from "@/api/services/product.service";

import { ProductListItem } from "@/types/product";

export default function useProducts() {
  return useServerTable<ProductListItem>({
    fetcher: ProductService.getAll,
  });
}