"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

import {
  ProductWizardData,
  ProductBasicInfo,
  ProductCategoryInfo,
  ProductPricingInfo,
  ProductVariantInfo,
  ProductInventoryInfo,
  ProductShippingInfo,
  ProductMediaInfo,
  ProductSeoInfo,
} from "@/types/productWizard";

const initialProduct: ProductWizardData = {
  basic: {
    productName: "",
    slug: "",
    shortDescription: "",
    description: "",
    productType: "physical",
    condition: "new",
  },

  category: {
  categoryId: null,
  subCategoryId: null,
  childCategoryId: null,

  brandId: null,

  manufacturer: "",

  collection: "",

  tags: [],

  countryOfOrigin: "",

  hsCode: "",

  industry: "",

  certifications: [],
},

 pricing: {
  currency: "USD",

  sellingPrice: 0,

  comparePrice: 0,

  costPrice: 0,

  minimumOrder: 1,

  allowWholesalePricing: false,

  priceTiers: [],
  incoterm: "FOB",
samplePrice: 0,
sampleAvailable: false,
negotiable: false,
rfqOnly: false,
},

variants: {
  enabled: false,

  attributes: [],

  items: [],

  autoGenerateSku: true,
},

  inventory: {
    sku: "",
    quantity: 0,
    trackInventory: true,
  },

  shipping: {
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
  },

  media: {
    images: [],
    videos: [],
    documents: [],
  },

  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  },
};

interface ProductWizardContextValue {
  product: ProductWizardData;

  setProduct: React.Dispatch<
    React.SetStateAction<ProductWizardData>
  >;

  updateBasic: (
    data: Partial<ProductBasicInfo>
  ) => void;

  updateCategory: (
    data: Partial<ProductCategoryInfo>
  ) => void;

  updatePricing: (
    data: Partial<ProductPricingInfo>
  ) => void;

  updateVariants: (
    data: Partial<ProductVariantInfo>
  ) => void;

  updateInventory: (
    data: Partial<ProductInventoryInfo>
  ) => void;

  updateShipping: (
    data: Partial<ProductShippingInfo>
  ) => void;

  updateMedia: (
    data: Partial<ProductMediaInfo>
  ) => void;

  updateSeo: (
    data: Partial<ProductSeoInfo>
  ) => void;

  resetProduct: () => void;
}

const ProductWizardContext =
  createContext<ProductWizardContextValue | null>(
    null
  );

export function ProductWizardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [product, setProduct] =
    useState<ProductWizardData>(initialProduct);

  const updateBasic = (
    data: Partial<ProductBasicInfo>
  ) => {
    setProduct((prev) => ({
      ...prev,
      basic: {
        ...prev.basic,
        ...data,
      },
    }));
  };

  const updateCategory = (
    data: Partial<ProductCategoryInfo>
  ) => {
    setProduct((prev) => ({
      ...prev,
      category: {
        ...prev.category,
        ...data,
      },
    }));
  };

  const updatePricing = (
    data: Partial<ProductPricingInfo>
  ) => {
    setProduct((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        ...data,
      },
    }));
  };

  const updateVariants = (
    data: Partial<ProductVariantInfo>
  ) => {
    setProduct((prev) => ({
      ...prev,
      variants: {
        ...prev.variants,
        ...data,
      },
    }));
  };

  const updateInventory = (
    data: Partial<ProductInventoryInfo>
  ) => {
    setProduct((prev) => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        ...data,
      },
    }));
  };

  const updateShipping = (
    data: Partial<ProductShippingInfo>
  ) => {
    setProduct((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        ...data,
      },
    }));
  };

  const updateMedia = (
    data: Partial<ProductMediaInfo>
  ) => {
    setProduct((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        ...data,
      },
    }));
  };

  const updateSeo = (
    data: Partial<ProductSeoInfo>
  ) => {
    setProduct((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        ...data,
      },
    }));
  };

  const resetProduct = () => {
    setProduct(initialProduct);
  };

  const value = useMemo(
    () => ({
      product,
      setProduct,
      updateBasic,
      updateCategory,
      updatePricing,
      updateVariants,
      updateInventory,
      updateShipping,
      updateMedia,
      updateSeo,
      resetProduct,
    }),
    [product]
  );

  return (
    <ProductWizardContext.Provider value={value}>
      {children}
    </ProductWizardContext.Provider>
  );
}

export function useProductWizard() {
  const context = useContext(
    ProductWizardContext
  );

  if (!context) {
    throw new Error(
      "useProductWizard must be used inside ProductWizardProvider."
    );
  }

  return context;
}