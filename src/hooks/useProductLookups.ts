"use client";

import CategoryService from "@/api/services/category.service";
import BrandService from "@/api/services/brand.service";
import UnitService from "@/api/services/unit.service";
import SupplierService from "@/api/services/supplier.service";
import AttributeService from "@/api/services/attribute.service";

import { useLookup } from "@/hooks/useLookup";

export default function useProductLookups() {
  /*
  |--------------------------------------------------------------------------
  | Categories
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Brands
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Units
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Suppliers
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Attributes
  |--------------------------------------------------------------------------
  */

  const {
    options: attributes,
    loading: attributesLoading,
    error: attributesError,
    reload: reloadAttributes,
  } = useLookup({
    cacheKey: "attributes",

    fetcher: () =>
      AttributeService.lookup(),
  });

  /*
  |--------------------------------------------------------------------------
  | Attribute Values
  |--------------------------------------------------------------------------
  */

  const {
  options: attributeValues,
  loading: attributeValuesLoading,
  error: attributeValuesError,
  reload: reloadAttributeValues,
} = useLookup({
  cacheKey: "attribute-values",

  fetcher: () =>
    AttributeService.lookupValues(),

  labelKey: "value",
});

  /*
  |--------------------------------------------------------------------------
  | Group Attribute Values
  |--------------------------------------------------------------------------
  */

  const valueOptions: Record<
    number,
    {
      value: string;
      label: string;
    }[]
  > = {};

  attributeValues.forEach(
    (item: any) => {
      const attributeId =
        Number(item.attribute_id);

      if (!valueOptions[attributeId]) {
        valueOptions[attributeId] = [];
      }

      valueOptions[attributeId].push({
        value: String(item.id),
        label: item.value,
      });
    }
  );

  /*
  |--------------------------------------------------------------------------
  | Return
  |--------------------------------------------------------------------------
  */

  return {
    categories,

    brands,

    units,

    suppliers,

    attributes,

    attributeValues,

    valueOptions,

    loading:
      categoriesLoading ||
      brandsLoading ||
      unitsLoading ||
      suppliersLoading ||
      attributesLoading ||
      attributeValuesLoading,

    errors: {
      categories:
        categoriesError,

      brands:
        brandsError,

      units:
        unitsError,

      suppliers:
        suppliersError,

      attributes:
        attributesError,

      attributeValues:
        attributeValuesError,
    },

    reload: () => {
      reloadCategories();

      reloadBrands();

      reloadUnits();

      reloadSuppliers();

      reloadAttributes();

      reloadAttributeValues();
    },
  };
}