"use client";

import { useState } from "react";

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

export default function CreateProductManager() {
    const router = useRouter();
    
  const [form, setForm] =
    useState<ProductFormData>(
      initialState
    );

//   const [loading, setLoading] =
//     useState(false);

const {
  loading,
  errors,
  create,
} = useCreateProduct();

    const [images, setImages] = useState<ProductImageFile[]>([]);

    const [attributes, setAttributes] =
  useState<ProductAttributeRow[]>([]);

  const [variants, setVariants] =
  useState<ProductVariant[]>([]);

//   const [errors, setErrors] =
//     useState<
//       Record<string, string[]>
//     >({});

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

  const submit = async () => {
  try {
    const payload = new FormData();

    /*
    |--------------------------------------------------------------------------
    | Basic
    |--------------------------------------------------------------------------
    */

    payload.append("name", form.name);
    payload.append("slug", form.slug);
    payload.append("sku", form.sku);
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

    form.category_ids.forEach((id, index) => {
      payload.append(
        `category_ids[${index}]`,
        String(id)
      );
    });

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

    if (form.compare_at_price) {
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

    if (form.max_order_quantity) {
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
      payload.append("weight", form.weight);

    if (form.length)
      payload.append("length", form.length);

    if (form.width)
      payload.append("width", form.width);

    if (form.height)
      payload.append("height", form.height);

    /*
    |--------------------------------------------------------------------------
    | Flags
    |--------------------------------------------------------------------------
    */

    payload.append(
      "featured",
      form.featured ? "1" : "0"
    );

    payload.append(
      "is_digital",
      form.is_digital ? "1" : "0"
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

    if (form.meta_title) {
      payload.append(
        "meta_title",
        form.meta_title
      );
    }

    if (form.meta_description) {
      payload.append(
        "meta_description",
        form.meta_description
      );
    }

    if (form.meta_keywords) {
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
      (attribute, index) => {
        if (
          attribute.attribute_id &&
          attribute.attribute_value_id
        ) {
          payload.append(
            `attributes[${index}][attribute_id]`,
            String(attribute.attribute_id)
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

    const product =
  await create(payload);

/*
|--------------------------------------------------------------------------
| Upload Images
|--------------------------------------------------------------------------
*/

if (images.length > 0) {
  const imagePayload =
    new FormData();

  images.forEach((image) => {
    imagePayload.append(
      "images[]",
      image.file
    );

    imagePayload.append(
      "alt_text[]",
      form.name
    );
  });

  await ProductService.uploadImages(
    product.uuid,
    imagePayload
  );
}

/*
|--------------------------------------------------------------------------
| Create Variants
|--------------------------------------------------------------------------
*/

for (const variant of variants) {
  await ProductService.createVariant(
    product.uuid,
    variant
  );
}

toast.success(
  "Product created successfully."
);

/*
|--------------------------------------------------------------------------
| Redirect
|--------------------------------------------------------------------------
*/

router.push(
  `/products/${product.uuid}/edit`
);

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="space-y-6">

      <BasicInformationCard
        form={form}
        errors={errors}
        onChange={updateField}
      />

      <OrganizationCard
        form={form}
        onChange={updateField}
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
  images={images}
  onImagesChange={setImages}
/>

      <AttributesCard
  items={attributes}
  onChange={setAttributes}
/>

      <VariantsCard
  variants={variants}
  onChange={setVariants}
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