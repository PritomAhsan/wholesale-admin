"use client";

import Image from "next/image";

import {
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import Label from "@/components/form/Label";
import Select from "@/components/form/Select";

import {
  ProductAttributeRow,
} from "./AttributesCard";

interface Option {
  value: string;
  label: string;
}
export interface ProductVariantImage {
  uuid: string;
  image?: string;
  image_url: string;
  is_primary: boolean;
  sort_order: number;
}

export interface LocalVariantImage {
  file: File;
  preview: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  id?: number;
  uuid?: string;

  sku: string;
  barcode: string;

  cost_price: string;
  selling_price: string;
  compare_at_price: string;
  wholesale_price: string;

  stock_quantity: string;
  low_stock_quantity: string;

  min_order_quantity: string;
  max_order_quantity: string;

  is_default: boolean;
  is_active: boolean;

  attributes: {
    attribute_id: number | null;
    attribute_value_id: number | null;
  }[];

  images?: ProductVariantImage[];

  localImages?: LocalVariantImage[];
}

interface Props {
  variants?: ProductVariant[];

  onChange?: (
    variants: ProductVariant[]
  ) => void;

  productAttributes?: ProductAttributeRow[];

  attributeOptions?: Option[];

  valueOptions?: Record<
    number,
    Option[]
  >;

  productUuid?: string;
}

export default function VariantsCard({
  variants = [],
  onChange,
  productAttributes = [],
  attributeOptions = [],
  valueOptions = {},
  productUuid,
}: Props) {
  const addVariant = () => {
    onChange?.([
      ...variants,
      {
        sku: "",

        barcode: "",

        cost_price: "",

        selling_price: "",

        compare_at_price: "",

        wholesale_price: "",

        stock_quantity: "0",

        low_stock_quantity: "5",

        min_order_quantity: "1",

        max_order_quantity: "",

        is_default: variants.length === 0,

        is_active: true,

        attributes: [],
      },
    ]);
  };

  const updateVariant = <
    K extends keyof ProductVariant
  >(
    index: number,
    field: K,
    value: ProductVariant[K]
  ) => {
    const updated = [...variants];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange?.(updated);
  };

  const updateVariantAttribute = (
    variantIndex: number,
    attributeIndex: number,
    field:
      | "attribute_id"
      | "attribute_value_id",
    value: number | null
  ) => {
    const updated = [...variants];

    const currentVariant =
      updated[variantIndex];

    const currentAttributes =
      currentVariant.attributes ?? [];

    const nextAttributes = [
      ...currentAttributes,
    ];

    nextAttributes[attributeIndex] = {
      ...nextAttributes[attributeIndex],
      [field]: value,
    };

    if (field === "attribute_id") {
      nextAttributes[attributeIndex] = {
        attribute_id: value,
        attribute_value_id: null,
      };
    }

    updated[variantIndex] = {
      ...currentVariant,
      attributes: nextAttributes,
    };

    onChange?.(updated);
  };

  const addVariantAttribute = (
    variantIndex: number
  ) => {
    const updated = [...variants];

    updated[variantIndex] = {
      ...updated[variantIndex],
      attributes: [
        ...(updated[variantIndex].attributes ??
          []),
        {
          attribute_id: null,
          attribute_value_id: null,
        },
      ],
    };

    onChange?.(updated);
  };

  const removeVariantAttribute = (
    variantIndex: number,
    attributeIndex: number
  ) => {
    const updated = [...variants];

    updated[variantIndex] = {
      ...updated[variantIndex],
      attributes:
        updated[variantIndex].attributes.filter(
          (_, index) =>
            index !== attributeIndex
        ),
    };

    onChange?.(updated);
  };

  const handleVariantImageFiles = (
    variantIndex: number,
    files: FileList | null
  ) => {
    if (!files) {
      return;
    }

    const variant = variants[variantIndex];

    const currentImages =
      variant.localImages ?? [];

    const selectedFiles =
      Array.from(files);

    const newImages: LocalVariantImage[] =
      selectedFiles.map(
        (file, fileIndex) => ({
          file,

          preview:
            URL.createObjectURL(file),

          isPrimary:
            (variant.images?.length ?? 0) === 0 &&
            currentImages.length === 0 &&
            fileIndex === 0,
        })
      );

    const updated = [...variants];

    updated[variantIndex] = {
      ...variant,

      localImages: [
        ...currentImages,
        ...newImages,
      ],
    };

    onChange?.(updated);

    // This variant already exists on the server — upload right
    // away instead of waiting for the parent form's Save, matching
    // how delete/set-primary already behave for persisted images.
    // For a variant that doesn't have an id yet (still being
    // drafted), the files stay staged in localImages and are sent
    // once CreateProductManager creates the variant and calls
    // uploadPendingVariantImages().
    if (variant.id) {
      uploadVariantImages(variantIndex);
    }
  };

  const removeLocalVariantImage = (
    variantIndex: number,
    imageIndex: number
  ) => {
    const updated = [...variants];

    const variant =
      updated[variantIndex];

    const images =
      variant.localImages ?? [];

    const removed =
      images[imageIndex];

    if (removed) {
      URL.revokeObjectURL(
        removed.preview
      );
    }

    const nextImages =
      images.filter(
        (_, index) =>
          index !== imageIndex
      );

    updated[variantIndex] = {
      ...variant,

      localImages: nextImages,
    };

    onChange?.(updated);
  };

  const setLocalVariantImagePrimary = (
    variantIndex: number,
    imageIndex: number
  ) => {
    const updated = [...variants];

    const variant =
      updated[variantIndex];

    const images =
      variant.localImages ?? [];

    updated[variantIndex] = {
      ...variant,

      localImages: images.map(
        (image, index) => ({
          ...image,
          isPrimary:
            index === imageIndex,
        })
      ),
    };

    onChange?.(updated);
  };

  const deleteExistingVariantImage =
  async (
    variantIndex: number,
    image: ProductVariantImage
  ) => {
    const variant =
      variants[variantIndex];

    if (!variant.id) {
      return;
    }

    if (!productUuid) {
      return;
    }

    try {
      await ProductService.deleteVariantImage(
        productUuid,
        variant.id,
        image.uuid
      );

      const updated = [...variants];

      updated[variantIndex] = {
        ...variant,

        images: (
          variant.images ?? []
        ).filter(
          (existing) =>
            existing.uuid !== image.uuid
        ),
      };

      onChange?.(updated);

    } catch (error) {
      console.error(
        "Failed to delete variant image:",
        error
      );
    }
  };

    const setExistingVariantImagePrimary =
  async (
    variantIndex: number,
    image: ProductVariantImage
  ) => {
    const variant =
      variants[variantIndex];

    if (!variant.id) {
      return;
    }

    if (!productUuid) {
      return;
    }

    try {
      await ProductService.setPrimaryVariantImage(
        productUuid,
        variant.id,
        image.uuid
      );

      const updated = [...variants];

      updated[variantIndex] = {
        ...variant,

        images: (
          variant.images ?? []
        ).map(
          (existing) => ({
            ...existing,

            is_primary:
              existing.uuid ===
              image.uuid,
          })
        ),
      };

      onChange?.(updated);

    } catch (error) {
      console.error(
        "Failed to set primary variant image:",
        error
      );
    }
  };

  const uploadVariantImages =
  async (
    variantIndex: number
  ) => {
    const variant =
      variants[variantIndex];

    if (!variant.id) {
      return;
    }

    if (!productUuid) {
      return;
    }

    const localImages =
      variant.localImages ?? [];

    if (localImages.length === 0) {
      return;
    }

    try {
      const payload =
        new FormData();

      localImages.forEach(
        (image) => {
          payload.append(
            "images[]",
            image.file
          );
        }
      );

      const response =
        await ProductService.uploadVariantImages(
          productUuid,
          variant.id,
          payload
        );

      const uploadedImages =
        response?.data?.images ??
        response?.images ??
        [];

      const updated = [...variants];

      updated[variantIndex] = {
        ...variant,

        images: [
          ...(variant.images ?? []),
          ...uploadedImages,
        ],

        localImages: [],
      };

      localImages.forEach(
        (image) => {
          URL.revokeObjectURL(
            image.preview
          );
        }
      );

      onChange?.(updated);

    } catch (error) {
      console.error(
        "Failed to upload variant images:",
        error
      );
    }
  };


  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">

        <div>
          <h3 className="text-lg font-semibold">
            Product Variants
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Create multiple variants such as
            Color, Size or Material.
          </p>
        </div>

        <button
          type="button"
          onClick={addVariant}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
        >
          <Plus size={16} />

          Add Variant
        </button>

      </div>

      <div className="p-6">

        {variants.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-sm text-gray-500 dark:border-gray-700">
            No variants added yet.
          </div>
        )}

        {variants.map((variant, index) => (
          <div
            key={index}
            className="mb-6 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-5 py-3 dark:border-gray-700 dark:bg-white/[0.02]">

              <h4 className="font-semibold">
                Variant #{index + 1}
                {variant.id && (
                  <span className="ml-2 rounded-full bg-success-50 px-2 py-0.5 text-xs font-medium text-success-600 dark:bg-success-500/10 dark:text-success-400">
                    Saved
                  </span>
                )}
              </h4>

              <button
                type="button"
                onClick={() =>
                  onChange?.(
                    variants.filter(
                      (_, i) => i !== index
                    )
                  )
                }
                className="text-sm font-medium text-red-500 hover:text-red-600"
              >
                Remove
              </button>

            </div>

            <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-2">

              {/* SKU */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  SKU
                </label>

                <input
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={variant.sku}
                  onChange={(e) =>
                    updateVariant(
                      index,
                      "sku",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* Barcode */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Barcode
                </label>

                <input
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={
                    variant.barcode
                  }
                  onChange={(e) =>
                    updateVariant(
                      index,
                      "barcode",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* Cost */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Cost Price
                </label>

                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={
                    variant.cost_price
                  }
                  onChange={(e) =>
                    updateVariant(
                      index,
                      "cost_price",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* Selling */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Selling Price
                </label>

                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={
                    variant.selling_price
                  }
                  onChange={(e) =>
                    updateVariant(
                      index,
                      "selling_price",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* Wholesale */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Wholesale Price
                </label>

                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={
                    variant.wholesale_price
                  }
                  onChange={(e) =>
                    updateVariant(
                      index,
                      "wholesale_price",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* Compare */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Compare At Price
                </label>

                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={
                    variant.compare_at_price
                  }
                  onChange={(e) =>
                    updateVariant(
                      index,
                      "compare_at_price",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* Stock Quantity */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={variant.stock_quantity}
                  onChange={(e) =>
                    updateVariant(
                      index,
                      "stock_quantity",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* Low Stock */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Low Stock Alert
                </label>

                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={variant.low_stock_quantity}
                  onChange={(e) =>
                    updateVariant(
                      index,
                      "low_stock_quantity",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* MOQ */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Minimum Order Quantity
                </label>

                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={variant.min_order_quantity}
                  onChange={(e) =>
                    updateVariant(
                      index,
                      "min_order_quantity",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* Maximum Order */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Maximum Order Quantity
                </label>

                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-transparent"
                  value={variant.max_order_quantity}
                  onChange={(e) =>
                    updateVariant(
                      index,
                      "max_order_quantity",
                      e.target.value
                    )
                  }
                />
              </div>

            </div>

            {/* Settings */}

            <div className="border-t border-gray-200 px-5 py-4 dark:border-gray-700">

              <div className="flex flex-wrap items-center gap-8">

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    checked={variant.is_default}
                    onChange={(e) => {
                      const updated = variants.map(
                        (variant, i) => ({
                          ...variant,
                          is_default:
                            i === index
                              ? e.target.checked
                              : false,
                        })
                      );

                      onChange?.(updated);
                    }}
                  />

                  <span className="text-sm">
                    Default Variant
                  </span>

                </label>

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    checked={variant.is_active}
                    onChange={(e) =>
                      updateVariant(
                        index,
                        "is_active",
                        e.target.checked
                      )
                    }
                  />

                  <span className="text-sm">
                    Active
                  </span>

                </label>

              </div>

            </div>

            {/* Attributes Placeholder */}

            {/* Variant Attributes */}

            <div className="border-t border-gray-200 bg-gray-50 px-5 py-5 dark:border-gray-700 dark:bg-white/[0.02]">

              <div className="mb-4 flex items-center justify-between">

                <div>
                  <h5 className="font-medium">
                    Variant Attributes
                  </h5>

                  <p className="mt-1 text-sm text-gray-500">
                    Select the attribute values for this variant.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    addVariantAttribute(index)
                  }
                  disabled={
                    productAttributes.length === 0
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-brand-500 px-3 py-2 text-sm font-medium text-brand-600 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-brand-500/10"
                >
                  <Plus size={15} />

                  Add Attribute
                </button>

              </div>

              {productAttributes.length === 0 && (
                <div className="rounded-lg border border-dashed border-gray-300 p-5 text-center text-sm text-gray-500 dark:border-gray-700">
                  Add product attributes first before configuring variant attributes.
                </div>
              )}

              {variant.attributes.length > 0 && (
                <div className="space-y-4">

                  {variant.attributes.map(
                    (variantAttribute, attributeIndex) => {

                      /*
                      |--------------------------------------------------------------------------
                      | Only attributes assigned to the product
                      |--------------------------------------------------------------------------
                      */

                      const availableAttributes =
                        productAttributes
                          .map(
                            (productAttribute) =>
                              attributeOptions.find(
                                (option) =>
                                  Number(option.value) ===
                                  productAttribute.attribute_id
                              )
                          )
                          .filter(
                            (
                              option
                            ): option is Option =>
                              Boolean(option)
                          );

                      /*
                      |--------------------------------------------------------------------------
                      | Values for selected attribute
                      |--------------------------------------------------------------------------
                      */

                      const availableValues =
                        variantAttribute.attribute_id
                          ? (
                            valueOptions[
                            variantAttribute
                              .attribute_id
                            ] ?? []
                          )
                          : [];

                      return (
                        <div
                          key={attributeIndex}
                          className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900 lg:grid-cols-[1fr_1fr_auto]"
                        >

                          {/* Attribute */}

                          <div>
                            <Label>
                              Attribute
                            </Label>

                            <Select
                              placeholder="Select Attribute"
                              options={[
                                {
                                  value: "",
                                  label:
                                    "Select Attribute",
                                },
                                ...availableAttributes,
                              ]}
                              value={
                                variantAttribute
                                  .attribute_id
                                  ? String(
                                    variantAttribute
                                      .attribute_id
                                  )
                                  : ""
                              }
                              onChange={(value) =>
                                updateVariantAttribute(
                                  index,
                                  attributeIndex,
                                  "attribute_id",
                                  value
                                    ? Number(value)
                                    : null
                                )
                              }
                            />
                          </div>

                          {/* Value */}

                          <div>
                            <Label>
                              Value
                            </Label>

                            <Select
                              placeholder="Select Value"
                              options={[
                                {
                                  value: "",
                                  label:
                                    "Select Value",
                                },
                                ...availableValues,
                              ]}
                              value={
                                variantAttribute
                                  .attribute_value_id
                                  ? String(
                                    variantAttribute
                                      .attribute_value_id
                                  )
                                  : ""
                              }
                              onChange={(value) =>
                                updateVariantAttribute(
                                  index,
                                  attributeIndex,
                                  "attribute_value_id",
                                  value
                                    ? Number(value)
                                    : null
                                )
                              }
                            />
                          </div>

                          {/* Remove */}

                          <div className="flex items-end">

                            <button
                              type="button"
                              onClick={() =>
                                removeVariantAttribute(
                                  index,
                                  attributeIndex
                                )
                              }
                              className="rounded-lg p-3 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                            >
                              <Trash2 size={18} />
                            </button>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>
              )}

            </div>

            {/* Variant Images */}

<div className="border-t border-gray-200 bg-gray-50 px-5 py-5 dark:border-gray-700 dark:bg-white/[0.02]">

  <div className="mb-4">
    <h5 className="font-medium">
      Variant Images
    </h5>

    <p className="mt-1 text-sm text-gray-500">
      Upload images specific to this variant.
    </p>
  </div>

  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 transition hover:border-brand-500 dark:border-gray-700">

    <Upload
      size={32}
      className="mb-2 text-gray-400"
    />

    <p className="font-medium">
      Click to upload
    </p>

    <p className="mt-1 text-xs text-gray-500">
      JPG, PNG, WEBP — max 5 MB each
    </p>

    <input
      hidden
      multiple
      type="file"
      accept="image/jpeg,image/png,image/webp"
      onChange={(event) =>
        handleVariantImageFiles(
          index,
          event.target.files
        )
      }
    />

  </label>

  {/* Existing Images */}

  {variant.images &&
    variant.images.length > 0 && (
      <div className="mt-6">

        <p className="mb-3 text-sm font-medium">
          Existing Images
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

          {variant.images.map(
            (image) => (
              <div
                key={image.uuid}
                className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700"
              >

                <div className="relative aspect-square">

                  <Image
                    src={
                      image.image_url
                    }
                    alt="Variant image"
                    fill
                    unoptimized
                    className="object-cover"
                  />

                </div>

                {image.is_primary && (
                  <span className="absolute left-2 top-2 rounded-full bg-brand-500 px-2 py-1 text-xs font-medium text-white">
                    Primary
                  </span>
                )}

                <button
                  type="button"
                  onClick={() =>
                    deleteExistingVariantImage(
                      index,
                      image
                    )
                  }
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <X size={15} />
                </button>

                {!image.is_primary && (
                  <button
                    type="button"
                    onClick={() =>
                      setExistingVariantImagePrimary(
                        index,
                        image
                      )
                    }
                    className="absolute bottom-2 left-2 right-2 rounded-lg bg-white/90 px-3 py-2 text-xs font-medium opacity-0 transition hover:bg-white group-hover:opacity-100 dark:bg-gray-900/90 dark:hover:bg-gray-900"
                  >
                    Set Primary
                  </button>
                )}

              </div>
            )
          )}

        </div>

      </div>
    )}

  {/* New Local Images */}

  {variant.localImages &&
    variant.localImages.length > 0 && (
      <div className="mt-6">

        <p className="mb-3 text-sm font-medium">
          New Images
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

          {variant.localImages.map(
            (image, imageIndex) => (
              <div
                key={image.preview}
                className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700"
              >

                <div className="relative aspect-square">

                  <Image
                    src={image.preview}
                    alt="New variant image"
                    fill
                    unoptimized
                    className="object-cover"
                  />

                </div>

                {image.isPrimary && (
                  <span className="absolute left-2 top-2 rounded-full bg-brand-500 px-2 py-1 text-xs font-medium text-white">
                    Primary
                  </span>
                )}

                <button
                  type="button"
                  onClick={() =>
                    removeLocalVariantImage(
                      index,
                      imageIndex
                    )
                  }
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <X size={15} />
                </button>

                {!image.isPrimary && (
                  <button
                    type="button"
                    onClick={() =>
                      setLocalVariantImagePrimary(
                        index,
                        imageIndex
                      )
                    }
                    className="absolute bottom-2 left-2 right-2 rounded-lg bg-white/90 px-3 py-2 text-xs font-medium opacity-0 transition hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900"
                  >
                    Set Primary
                  </button>
                )}

              </div>
            )
          )}

        </div>

      </div>
    )}

</div>

          </div>
        ))}

      </div>

    </div>
  );
}