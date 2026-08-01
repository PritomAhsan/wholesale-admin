"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ServerPagination,
  ServerTableQuery,
  ServerTableResponse,
} from "@/types/server-table";

interface UseServerTableProps<T> {
  fetcher: (
    params: ServerTableQuery
  ) => Promise<ServerTableResponse<T>>;

  initialQuery?: Partial<ServerTableQuery>;
}

export function useServerTable<T>({
  fetcher,
  initialQuery = {},
}: UseServerTableProps<T>) {
  const [items, setItems] = useState<T[]>([]);

  const [pagination, setPagination] =
    useState<ServerPagination>({
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0,
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [query, setQuery] =
    useState<ServerTableQuery>({
      page: 1,
      search: "",
      sort: "created_at",
      order: "desc",
      status: "",
      per_page: 15,
      ...initialQuery,
    });

  /**
   * API Loader
   */
  const fetchData = useCallback(
    async (
      currentQuery: ServerTableQuery
    ) => {
      try {
        setLoading(true);

        const response =
          await fetcher(currentQuery);

        setItems(response.items);

        setPagination(
          response.pagination
        );

        setError(null);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load data."
        );
      } finally {
        setLoading(false);
      }
    },
    [fetcher]
  );

  /**
   * Whenever query changes,
   * automatically reload data.
   */
  useEffect(() => {
    fetchData(query);
  }, [query, fetchData]);

  /**
   * Manual Refresh
   */
  const refresh = useCallback(() => {
    fetchData(query);
  }, [fetchData, query]);

  /**
   * Search
   */
  const search = useCallback(
    (value: string) => {
      setQuery((prev) => ({
        ...prev,
        search: value,
        page: 1,
      }));
    },
    []
  );

  /**
   * Pagination
   */
  const changePage =
    useCallback((page: number) => {
      setQuery((prev) => ({
        ...prev,
        page,
      }));
    }, []);

  /**
   * Sorting
   */
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

  /**
   * Status Filter
   */
  const changeStatus =
    useCallback(
      (
        status:
          | boolean
          | ""
      ) => {
        setQuery((prev) => ({
          ...prev,
          status,
          page: 1,
        }));
      },
      []
    );

  /**
   * Per Page
   */
  const changePerPage =
    useCallback(
      (per_page: number) => {
        setQuery((prev) => ({
          ...prev,
          per_page,
          page: 1,
        }));
      },
      []
    );

  /**
   * Reset Filters
   */
  const reset = useCallback(() => {
    setQuery({
      page: 1,
      search: "",
      sort: "created_at",
      order: "desc",
      status: "",
      per_page: 15,
    });
  }, []);

  return {
    items,

    pagination,

    loading,

    error,

    query,

    refresh,

    reset,

    search,

    changePage,

    changeSort,

    changeStatus,

    changePerPage,
  };
}