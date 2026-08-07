"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

const lookupCache = new Map<
  string,
  LookupOption[]
>();

export interface LookupOption {
  value: string;
  label: string;
}

interface UseLookupOptions<T> {
  fetcher: () => Promise<T[]>;

  valueKey?: keyof T;

  labelKey?: keyof T;
}

interface UseLookupOptions<T> {
  fetcher: () => Promise<T[]>;

  cacheKey: string;

  valueKey?: keyof T;

  labelKey?: keyof T;
}

export function useLookup<
  T extends Record<string, any>
>({
  fetcher,
  cacheKey,
  valueKey = "id" as keyof T,
  labelKey = "name" as keyof T,
}: UseLookupOptions<T>) {
  const [options, setOptions] =
    useState<LookupOption[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const load =
    useCallback(async () => {
      try {
        setLoading(true);

        if (lookupCache.has(cacheKey)) {
        setOptions(
            lookupCache.get(cacheKey)!
        );

        setLoading(false);

        return;
        }

        const items =
        await fetcher();

        const mapped = items.map(
        (item) => ({
            value: String(item[valueKey]),
            label: String(item[labelKey]),
        })
        );

        lookupCache.set(
        cacheKey,
        mapped
        );

        setOptions(mapped);

        setError(null);
      } catch (error) {
        console.error(error);

        setError(
          "Failed to load lookup."
        );
      } finally {
        setLoading(false);
      }
    }, [
      fetcher,
      valueKey,
      labelKey,
    ]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    options,

    loading,

    error,

    reload: load,
  };
}