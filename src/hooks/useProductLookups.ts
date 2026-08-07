"use client";

import CategoryService from "@/api/services/category.service";
import BrandService from "@/api/services/brand.service";
import UnitService from "@/api/services/unit.service";
import SupplierService from "@/api/services/supplier.service";

import { useLookup } from "@/hooks/useLookup";

export default function useProductLookups() {
  const {
    options: categories,
    loading: categoriesLoading,
    error: categoriesError,
    reload: reloadCategories,
  } = useLookup({
    cacheKey: "categories",

    fetcher: () =>
        CategoryService.lookup(),
});

  const {
    options: brands,
    loading: brandsLoading,
    error: brandsError,
    reload: reloadBrands,
  } = useLookup({
    cacheKey: "brands",

    fetcher: () =>
        BrandService.lookup(),
});

  const {
    options: units,
    loading: unitsLoading,
    error: unitsError,
    reload: reloadUnits,
  } = useLookup({
    cacheKey: "units",

    fetcher: () =>
        UnitService.lookup(),
});

  const {
    options: suppliers,
    loading: suppliersLoading,
    error: suppliersError,
    reload: reloadSuppliers,
  } = useLookup({
    cacheKey: "suppliers",

    fetcher: () =>
        SupplierService.lookup(),

    labelKey: "company_name",
});

  return {
    categories,
    brands,
    units,
    suppliers,

    loading:
      categoriesLoading ||
      brandsLoading ||
      unitsLoading ||
      suppliersLoading,

    errors: {
      categories: categoriesError,
      brands: brandsError,
      units: unitsError,
      suppliers: suppliersError,
    },

    reload: () => {
      reloadCategories();
      reloadBrands();
      reloadUnits();
      reloadSuppliers();
    },
  };
}