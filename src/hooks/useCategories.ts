"use client";

import { useCallback, useEffect, useState } from "react";

import CategoryService, {
  CategoryQueryParams,
} from "@/api/services/category.service";

import { Category } from "@/types/category";

interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [pagination, setPagination] =
    useState<Pagination>({
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [query, setQuery] =
    useState<CategoryQueryParams>({
      page: 1,
      search: "",
      sort: "created_at",
      order: "desc",
      status: "",
    });

  const load = useCallback(
    async (
      params: CategoryQueryParams
    ) => {
      try {
        setLoading(true);

        const response =
          await CategoryService.getAll(
            params
          );

        setCategories(
          response.categories
        );

        setPagination(
          response.pagination
        );

        setError(null);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load categories."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    load(query);
  }, [query, load]);

  const search = useCallback(
    (search: string) => {
      setQuery((prev) => ({
        ...prev,
        page: 1,
        search,
      }));
    },
    []
  );

  const changePage =
    useCallback(
      (page: number) => {
        setQuery((prev) => ({
          ...prev,
          page,
        }));
      },
      []
    );

  const changeSort =
    useCallback(
      (
        sort: string,
        order:
          | "asc"
          | "desc" = "asc"
      ) => {
        setQuery((prev) => ({
          ...prev,
          sort,
          order,
        }));
      },
      []
    );

  const changeStatus =
    useCallback(
      (
        status:
          | boolean
          | ""
      ) => {
        setQuery((prev) => ({
          ...prev,
          page: 1,
          status,
        }));
      },
      []
    );

  const refresh = useCallback(
    () => {
      load(query);
    },
    [load, query]
  );

  return {
    categories,

    pagination,

    loading,

    error,

    query,

    refresh,

    search,

    changePage,

    changeSort,

    changeStatus,
  };
}