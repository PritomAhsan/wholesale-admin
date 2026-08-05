"use client";

import { useState } from "react";

import ProductService from "@/api/services/product.service";

export default function useCreateProduct() {
  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] =
    useState<Record<string, string[]>>(
      {}
    );

  const create = async (
    payload: FormData
  ) => {
    try {
      setLoading(true);

      setErrors({});

      return await ProductService.create(
        payload
      );
    } catch (error: any) {
      if (
        error.response?.status === 422
      ) {
        setErrors(
          error.response.data.errors ??
            {}
        );
      }

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    errors,

    create,
  };
}