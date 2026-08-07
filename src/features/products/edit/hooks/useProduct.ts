"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import ProductService
from "@/api/services/product.service";

export default function useProduct(
  uuid: string
) {

  const [
    product,
    setProduct,
  ] = useState<any>(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null
  );

  const load =
    useCallback(async () => {

      try {

        setLoading(true);

        const response =
          await ProductService.get(
            uuid
          );

        setProduct(response);

        setError(null);

      } catch (e) {

        console.error(e);

        setError(
          "Unable to load product."
        );

      } finally {

        setLoading(false);

      }

    }, [uuid]);

  useEffect(() => {

    load();

  }, [load]);

  return {

    product,

    loading,

    error,

    reload: load,

  };

}