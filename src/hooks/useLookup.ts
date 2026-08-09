"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

/*
|--------------------------------------------------------------------------
| Lookup Cache
|--------------------------------------------------------------------------
|
| We keep the original item properties in the cache.
| This is important for lookups such as Attribute Values,
| where we need attribute_id in addition to value/label.
|
*/

const lookupCache = new Map<
  string,
  LookupOption[]
>();

/*
|--------------------------------------------------------------------------
| Lookup Option
|--------------------------------------------------------------------------
|
| Every lookup still has:
|
| value
| label
|
| But we also allow additional properties from the API.
|
| Example Attribute Value:
|
| {
|   value: "1",
|   label: "Black",
|   attribute_id: 1
| }
|
*/

export interface LookupOption {
  value: string;
  label: string;

  [key: string]: any;
}

/*
|--------------------------------------------------------------------------
| Hook Options
|--------------------------------------------------------------------------
*/

interface UseLookupOptions<
  T extends Record<string, any>
> {
  fetcher: () => Promise<T[]>;

  cacheKey: string;

  valueKey?: keyof T;

  labelKey?: keyof T;
}

/*
|--------------------------------------------------------------------------
| useLookup
|--------------------------------------------------------------------------
*/

export function useLookup<
  T extends Record<string, any>
>({
  fetcher,
  cacheKey,
  valueKey = "id" as keyof T,
  labelKey = "name" as keyof T,
}: UseLookupOptions<T>) {

  const [
    options,
    setOptions,
  ] = useState<LookupOption[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  /*
  |--------------------------------------------------------------------------
  | Load Lookup
  |--------------------------------------------------------------------------
  */

  const load = useCallback(
    async () => {

      try {

        setLoading(true);

        setError(null);

        /*
        |--------------------------------------------------------------------------
        | Cache
        |--------------------------------------------------------------------------
        */

        if (
          lookupCache.has(cacheKey)
        ) {

          setOptions(
            lookupCache.get(
              cacheKey
            )!
          );

          return;
        }

        /*
        |--------------------------------------------------------------------------
        | Fetch
        |--------------------------------------------------------------------------
        */

        const items =
          await fetcher();

        /*
        |--------------------------------------------------------------------------
        | Map
        |--------------------------------------------------------------------------
        |
        | IMPORTANT:
        |
        | Spread the original item first.
        |
        | This preserves fields such as:
        |
        | attribute_id
        | uuid
        | etc.
        |
        */

        const mapped: LookupOption[] =
          items.map(
            (item) => ({

              ...item,

              value:
                String(
                  item[valueKey]
                ),

              label:
                String(
                  item[labelKey]
                ),

            })
          );

        /*
        |--------------------------------------------------------------------------
        | Cache
        |--------------------------------------------------------------------------
        */

        lookupCache.set(
          cacheKey,
          mapped
        );

        /*
        |--------------------------------------------------------------------------
        | State
        |--------------------------------------------------------------------------
        */

        setOptions(mapped);

      } catch (error) {

        console.error(
          error
        );

        setError(
          "Failed to load lookup."
        );

      } finally {

        setLoading(false);

      }

    },
    [
      fetcher,
      cacheKey,
      valueKey,
      labelKey,
    ]
  );

  /*
  |--------------------------------------------------------------------------
  | Initial Load
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    load();

  }, [load]);

  /*
  |--------------------------------------------------------------------------
  | Return
  |--------------------------------------------------------------------------
  */

  return {

    options,

    loading,

    error,

    reload: load,

  };
}