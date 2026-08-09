"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import useProductLookups from "../../../hooks/useProductLookups";

import BasicInformationCard from "./sections/BasicInformationCard";
import OrganizationCard from "./sections/OrganizationCard";
import PricingCard from "./sections/PricingCard";
import InventoryCard from "./sections/InventoryCard";
import ShippingCard from "./sections/ShippingCard";
import ProductImagesCard from "./sections/ProductImagesCard";
import AttributesCard, {
  ProductAttributeRow,
} from "./sections/AttributesCard";
import VariantsCard, {
  ProductVariant,
} from "./sections/VariantsCard";
import SeoCard from "./sections/SeoCard";
import PublishCard from "./sections/PublishCard";
import useCreateProduct from "../../../hooks/useCreateProduct";
import useUpdateProduct from "../hooks/useUpdateProduct";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ProductService from "@/api/services/product.service";

export interface ProductFormData {
  name: string;

  slug: string;

  sku: string;

  short_description: string;

  description: string;

  brand_id: number | null;

  supplier_id: number | null;

  unit_id: number | null;

  category_ids: number[];

  cost_price: string;

  selling_price: string;

  compare_at_price: string;

  currency: string;

  wholesale_price: string;

  stock_quantity: string;

  low_stock_quantity: string;

  min_order_quantity: string;

  max_order_quantity: string;

  weight: string;

  length: string;

  width: string;

  height: string;

  featured: boolean;

  is_digital: boolean;

  requires_shipping: boolean;

  meta_title: string;

  meta_description: string;

  meta_keywords: string;

  status: string;
}

const initialState: ProductFormData = {
  name: "",

  slug: "",

  sku: "",

  short_description: "",

  description: "",

  brand_id: null,

  supplier_id: null,

  unit_id: null,

  category_ids: [],

  cost_price: "",

  selling_price: "",

  compare_at_price: "",

  wholesale_price: "",

  currency: "USD",

  stock_quantity: "",

  low_stock_quantity: "",

  min_order_quantity: "1",

  max_order_quantity: "",

  weight: "",

  length: "",

  width: "",

  height: "",

  featured: false,

  is_digital: false,

  requires_shipping: true,

  meta_title: "",

  meta_description: "",

  meta_keywords: "",

  status: "draft",
};

export interface ProductImageFile {
  file: File;
  preview: string;
  isPrimary: boolean;
}

interface Props {
  mode?: "create" | "edit";
  product?: any;
}

export default function CreateProductManager({
  mode = "create",
  product,
}: Props) {
  const router = useRouter();

  const [form, setForm] =
    useState<ProductFormData>(
      initialState
    );

  //   const [loading, setLoading] =
  //     useState(false);

  const {
    loading,
    // errors,
    create,
  } = useCreateProduct();

  const {
    loading: updating,
    update,
  } = useUpdateProduct();

  const [images, setImages] = useState<ProductImageFile[]>([]);

  const [attributes, setAttributes] =
    useState<ProductAttributeRow[]>([]);

  const [variants, setVariants] =
    useState<ProductVariant[]>([]);

  const [
    existingImages,
    setExistingImages,
  ] = useState(product?.images ?? []);

  const [
    deletedImageIds,
    setDeletedImageIds,
  ] = useState<number[]>([]);

  const [
    deletedVariantIds,
    setDeletedVariantIds,
  ] = useState<number[]>([]);

  const handleVariantsChange = (
    next: ProductVariant[]
  ) => {

    // Any existing (persisted) variant present in the old state
    // but missing from the new state was just removed by the user —
    // queue it for deletion on save.
    const removed = variants.filter(
      (existing) =>
        existing.id &&
        !next.some((v) => v.id === existing.id)
    );

    if (removed.length > 0) {

      setDeletedVariantIds((prev) => [
        ...prev,
        ...removed.map((v) => v.id as number),
      ]);

    }

    setVariants(next);

  };

  //   const [errors, setErrors] =
  //     useState<
  //       Record<string, string[]>
  //     >({});

  useEffect(() => {

    if (mode !== "edit") {

      return;
    }

    if (!product) {

      return;
    }

    setForm((prev) => ({

      ...prev,

      name: product.name ?? prev.name,

      slug: product.slug ?? prev.slug,

      sku: product.sku ?? prev.sku,

      supplier_id:
        product.supplier?.id ??
        prev.supplier_id,

      brand_id:
        product.brand?.id ??
        prev.brand_id,

      unit_id:
        product.unit?.id ??
        prev.unit_id,

      category_ids:
        product.categories?.map(
          (category: any) => category.id
        ) ?? prev.category_ids,

      short_description:
        product.short_description ??
        prev.short_description,

      description:
        product.description ??
        prev.description,

      cost_price:
        String(product.cost_price ?? ""),

      selling_price:
        String(product.selling_price ?? ""),

      compare_at_price:
        String(
          product.compare_at_price ?? ""
        ),

      currency:
        product.currency ??
        prev.currency,

      stock_quantity:
        String(
          product.stock_quantity ?? ""
        ),

      min_order_quantity:
        String(
          product.min_order_quantity ?? "1"
        ),

      max_order_quantity:
        String(
          product.max_order_quantity ?? ""
        ),

      weight:
        String(product.weight ?? ""),

      length:
        String(product.length ?? ""),

      width:
        String(product.width ?? ""),

      height:
        String(product.height ?? ""),

      featured:
        product.featured ?? false,

      is_digital:
        product.is_digital ?? false,

      requires_shipping:
        product.requires_shipping ?? true,

      status:
        product.status ??
        prev.status,

      meta_title:
        product.meta_title ??
        prev.meta_title,

      meta_description:
        product.meta_description ??
        prev.meta_description,

      meta_keywords:
        product.meta_keywords ??
        prev.meta_keywords,

    }));

  }, [mode, product]);

  useEffect(() => {
    if (mode !== "edit") return;

    setExistingImages(
      product?.images ?? []
    );

    setDeletedImageIds([]);

    setVariants(
      (product?.variants ?? []).map(
        (v: any): ProductVariant => ({
  id: v.id,

  uuid: v.uuid,

  sku: v.sku ?? "",
  barcode: v.barcode ?? "",

  cost_price:
    String(v.cost_price ?? ""),

  selling_price:
    String(v.selling_price ?? ""),

  compare_at_price:
    String(
      v.compare_at_price ?? ""
    ),

  wholesale_price:
    String(
      v.wholesale_price ?? ""
    ),

  stock_quantity:
    String(
      v.stock_quantity ?? ""
    ),

  low_stock_quantity:
    String(
      v.low_stock_quantity ?? ""
    ),

  min_order_quantity:
    String(
      v.minimum_order_quantity ?? ""
    ),

  max_order_quantity:
    String(
      v.maximum_order_quantity ?? ""
    ),

  is_default:
    !!v.is_default,

  is_active:
    !!v.is_active,

  attributes:
    (v.attributes ?? []).map(
      (a: any) => ({
        attribute_id:
          a.attribute_id,

        attribute_value_id:
          a.attribute_value_id,
      })
    ),

  images:
    (v.images ?? []).map(
      (image: any) => ({
        uuid: image.uuid,

        image:
          image.image,

        image_url:
          image.image_url ??
          image.image,

        is_primary:
          !!image.is_primary,

        sort_order:
          image.sort_order ?? 0,
      })
    ),

  localImages: [],
})
      )
    );

    setDeletedVariantIds([]);

    setAttributes(
      (product?.attributes ?? []).map(
        (a: any): ProductAttributeRow => ({
          attribute_id: a.attribute?.id ?? null,
          attribute_value_id: a.value?.id ?? null,
        })
      )
    );

  }, [mode, product]);

  const updateField = <
    K extends keyof ProductFormData
  >(
    field: K,
    value: ProductFormData[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /*
|--------------------------------------------------------------------------
| Lookups
|--------------------------------------------------------------------------
*/

  const {
  categories,
  brands,
  units,
  suppliers,
  attributes: attributeOptions,
  valueOptions,
  loading: lookupsLoading,
  errors,
} = useProductLookups();

  const buildPayload = () => {
    const payload =
        new FormData();

      /*
      |--------------------------------------------------------------------------
      | Basic
      |--------------------------------------------------------------------------
      */

      payload.append(
        "name",
        form.name
      );

      if (form.slug) {
        payload.append(
          "slug",
          form.slug
        );
      }

      if (form.sku) {
        payload.append(
          "sku",
          form.sku
        );
      }

      payload.append(
        "short_description",
        form.short_description
      );

      payload.append(
        "description",
        form.description
      );

      /*
      |--------------------------------------------------------------------------
      | Relationships
      |--------------------------------------------------------------------------
      */

      payload.append(
        "supplier_id",
        String(form.supplier_id)
      );

      if (form.brand_id) {
        payload.append(
          "brand_id",
          String(form.brand_id)
        );
      }

      if (form.unit_id) {
        payload.append(
          "unit_id",
          String(form.unit_id)
        );
      }

      /*
      |--------------------------------------------------------------------------
      | Categories
      |--------------------------------------------------------------------------
      */

      form.category_ids.forEach(
        (id, index) => {
          payload.append(
            `category_ids[${index}]`,
            String(id)
          );
        }
      );

      /*
      |--------------------------------------------------------------------------
      | Pricing
      |--------------------------------------------------------------------------
      */

      payload.append(
        "cost_price",
        form.cost_price
      );

      payload.append(
        "selling_price",
        form.selling_price
      );

      if (
        form.compare_at_price
      ) {
        payload.append(
          "compare_at_price",
          form.compare_at_price
        );
      }

      payload.append(
        "currency",
        form.currency
      );

      /*
      |--------------------------------------------------------------------------
      | Inventory
      |--------------------------------------------------------------------------
      */

      payload.append(
        "stock_quantity",
        form.stock_quantity
      );

      payload.append(
        "min_order_quantity",
        form.min_order_quantity
      );

      if (
        form.max_order_quantity
      ) {
        payload.append(
          "max_order_quantity",
          form.max_order_quantity
        );
      }

      /*
      |--------------------------------------------------------------------------
      | Dimensions
      |--------------------------------------------------------------------------
      */

      if (form.weight)
        payload.append(
          "weight",
          form.weight
        );

      if (form.length)
        payload.append(
          "length",
          form.length
        );

      if (form.width)
        payload.append(
          "width",
          form.width
        );

      if (form.height)
        payload.append(
          "height",
          form.height
        );

      /*
      |--------------------------------------------------------------------------
      | Flags
      |--------------------------------------------------------------------------
      */

      payload.append(
        "featured",
        form.featured
          ? "1"
          : "0"
      );

      payload.append(
        "is_digital",
        form.is_digital
          ? "1"
          : "0"
      );

      payload.append(
        "requires_shipping",
        form.requires_shipping
          ? "1"
          : "0"
      );

      /*
      |--------------------------------------------------------------------------
      | Status
      |--------------------------------------------------------------------------
      */

      payload.append(
        "status",
        form.status
      );

      /*
      |--------------------------------------------------------------------------
      | SEO
      |--------------------------------------------------------------------------
      */

      if (
        form.meta_title
      ) {
        payload.append(
          "meta_title",
          form.meta_title
        );
      }

      if (
        form.meta_description
      ) {
        payload.append(
          "meta_description",
          form.meta_description
        );
      }

      if (
        form.meta_keywords
      ) {
        payload.append(
          "meta_keywords",
          form.meta_keywords
        );
      }

      /*
      |--------------------------------------------------------------------------
      | Product Attributes
      |--------------------------------------------------------------------------
      */

      attributes.forEach(
        (
          attribute,
          index
        ) => {
          if (
            attribute.attribute_id &&
            attribute.attribute_value_id
          ) {
            payload.append(
              `attributes[${index}][attribute_id]`,
              String(
                attribute.attribute_id
              )
            );

            payload.append(
              `attributes[${index}][attribute_value_id]`,
              String(
                attribute.attribute_value_id
              )
            );
          }
        }
      );

    return payload;
  };

  const saveProduct = async (
      payload: FormData
  ) => {

      if (mode === "create") {

          return await create(payload);

      }

      payload.append("_method", "PUT");

      deletedImageIds.forEach((id) => {

          payload.append(
              "deleted_image_ids[]",
              String(id)
          );

      });

      const primaryImage =
          existingImages.find(
              (img) => img.is_primary
          );

      if (primaryImage) {

          payload.append(
              "primary_image_id",
              String(primaryImage.id)
          );

      }

      images.forEach((image) => {

          payload.append(
              "images[]",
              image.file
          );

          payload.append(
              "image_alt_texts[]",
              ""
          );

      });

      return await update(
          product.uuid,
          payload
      );

  };

  const uploadProductImages =
  async (
      product: Product
  ) => {

      if (
          mode !== "create" ||
          images.length === 0
      ) {
          return;
      }

      const payload =
          new FormData();

      images.forEach((image) => {

          payload.append(
              "images[]",
              image.file
          );

          payload.append(
              "alt_text[]",
              form.name
          );

      });

      await ProductService.uploadImages(
          product.uuid,
          payload
      );

  };

  const saveVariants =
  async (
      product: Product
  ) => {

      for (const variant of variants) {

          const payload = {
              product_id: product.id,

              sku: variant.sku,

              barcode: variant.barcode,

              cost_price:
                variant.cost_price,

              selling_price:
                variant.selling_price,

              compare_at_price:
                variant.compare_at_price,

              wholesale_price:
                variant.wholesale_price,

              stock_quantity:
                variant.stock_quantity,

              low_stock_quantity:
                variant.low_stock_quantity,

              minimum_order_quantity:
                variant.min_order_quantity,

              maximum_order_quantity:
                variant.max_order_quantity,

              is_default:
                variant.is_default,

              is_active:
                variant.is_active,

              attributes:
                variant.attributes,
          };

          console.log("UPDATE VARIANT", {
  productUuid: product.uuid,
  variantId: variant.id,
  variantUuid: variant.uuid,
  payload,
});

          if (variant.id) {

              await ProductService.updateVariant(
                  product.uuid,
                  variant.id,
                  payload
              );

          } else {

              await ProductService.createVariant(
                  product.uuid,
                  payload
              );

          }

      }

      for (const variantId of deletedVariantIds) {

          await ProductService.deleteVariant(
              product.uuid,
              variantId
          );

      }

      setDeletedVariantIds([]);

  };

  const submit = async () => {

    try {

        const payload =
            buildPayload();

        const savedProduct =
            await saveProduct(
                payload
            );

        await uploadProductImages(
            savedProduct
        );

        await saveVariants(
            savedProduct
        );

        toast.success(

            mode === "create"
                ? "Product created successfully."
                : "Product updated successfully."

        );

        router.push(
            `/products/${savedProduct.uuid}/edit`
        );

    } catch (error: any) {

        console.error(error);

        toast.error(

            error.response?.data
                ?.message ??
            "Something went wrong."

        );

    }

  };

  

  return (
    <div className="space-y-6">

      <BasicInformationCard
        form={form}
        // errors={errors}
        onChange={updateField}
      />

      <OrganizationCard
        form={form}
        onChange={updateField}
        categories={categories}
        brands={brands}
        units={units}
        suppliers={suppliers}
        loading={lookupsLoading}
        errors={errors}
      />

      <PricingCard
        form={form}
        onChange={updateField}
      />

      <InventoryCard
        form={form}
        onChange={updateField}
      />

      <ShippingCard
        form={form}
        onChange={updateField}
      />

      <ProductImagesCard
        existingImages={existingImages}
        onExistingImagesChange={
          setExistingImages
        }
        onDeletedImagesChange={
          (ids) =>
            setDeletedImageIds(
              (prev) => [
                ...prev,
                ...ids,
              ]
            )
        }
        images={images}
        onImagesChange={setImages}
      />

      <AttributesCard
  items={attributes}
  attributeOptions={attributeOptions}
  valueOptions={valueOptions}
  onChange={setAttributes}
/>

      <VariantsCard
  variants={variants}
  onChange={setVariants}
  productAttributes={attributes}
  attributeOptions={attributeOptions}
  valueOptions={valueOptions}
  productUuid={product?.uuid}
/>

      <SeoCard
        form={form}
        onChange={updateField}
      />

      <PublishCard
        featured={form.featured}
        status={form.status}
        loading={loading}
        onFeaturedChange={(value) =>
          updateField("featured", value)
        }
        onStatusChange={(value) =>
          updateField("status", value)
        }
        onSubmit={submit}
        onSaveDraft={() =>
          updateField("status", "draft")
        }
        onCancel={() => history.back()}
      />

    </div>
  );
}