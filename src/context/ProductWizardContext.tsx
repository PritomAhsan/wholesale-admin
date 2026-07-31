"use client";
import type { ProductSEO } from "@/components/products/create/wizard/steps/seo/seoTypes";
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
  ProductMedia,
  // ProductSEO,
  ProductWarehouseManagement,
} from "@/types/productWizard";

const initialProduct: ProductWizardData = {
  basic: {
    productName: "",
    slug: "",
    shortDescription: "",
    description: "",
    productType: "physical",
    condition: "new",
    sku: "",
    status: "draft",
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

  reservedQuantity: 0,

  availableQuantity: 0,

  incomingQuantity: 0,

  lowStockThreshold: 10,

  trackInventory: true,

  allowBackorders: false,

  continueSellingWhenOutOfStock: false,
},

warehouse: {
  warehouses: [],
},

shipping: {
  weight: 0,
  weightUnit: "kg",

  length: 0,
  width: 0,
  height: 0,

  dimensionUnit: "cm",

  volumetricWeight: 0,

  productionLeadTime: 7,

  dispatchTime: 2,

  leadTimeUnit: "days",

  readyToShip: false,

  domesticShipping: true,

  internationalShipping: true,

  pickupAvailable: false,

  freeShipping: false,

  shippingNotes: "",
},

media: {
  images: [],
},

seo: {
  title: "",

  slug: "",

  description: "",

  keywords: [],

  canonicalUrl: "",

  index: true,

  follow: true,
},
};

interface ProductWizardContextValue {
  product: ProductWizardData;

  updateProduct(data: Partial<ProductWizardData>): void;

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

  updateWarehouse: (
  data: Partial<ProductWarehouseManagement>
) => void;

  updateShipping: (
    data: Partial<ProductShippingInfo>
  ) => void;

  updateMedia: (
    data: Partial<ProductMedia>
  ) => void;

  updateSEO: (
    data: Partial<ProductSEO>
  ) => void;

  resetProduct: () => void;

  setPrimaryImage(id: string): void;

deleteImage(id: string): void;
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

    const updateProduct = (
  data: Partial<ProductWizardData>
) => {
  setProduct((prev) => ({
    ...prev,
    ...data,
  }));
};

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
  setProduct((prev) => {
    const inventory = {
      ...prev.inventory,
      ...data,
    };

    inventory.availableQuantity = Math.max(
      0,
      inventory.quantity - inventory.reservedQuantity
    );

    return {
      ...prev,
      inventory,
    };
  });
};

const updateWarehouse = (
  data: Partial<ProductWarehouseManagement>
) => {
  setProduct((prev) => ({
    ...prev,
    warehouse: {
      ...prev.warehouse,
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
  data: Partial<ProductMedia>
) => {
  setProduct((prev) => ({
    ...prev,
    media: {
      ...prev.media,
      ...data,
    },
  }));
};

const setPrimaryImage = (id: string) => {
  setProduct((prev) => ({
    ...prev,
    media: {
      ...prev.media,
      images: prev.media.images.map((image) => ({
        ...image,
        isPrimary: image.id === id,
      })),
    },
  }));
};

const deleteImage = (id: string) => {
  setProduct((prev) => {
    const images = prev.media.images
      .filter((image) => image.id !== id)
      .map((image, index) => ({
        ...image,
        sortOrder: index,
      }));

    if (
      images.length > 0 &&
      !images.some((image) => image.isPrimary)
    ) {
      images[0].isPrimary = true;
    }

    return {
      ...prev,
      media: {
        ...prev.media,
        images,
      },
    };
  });
};

const updateSEO = (
  data: Partial<ProductSEO>
) => {
  setProduct((previous) => ({
    ...previous,

    seo: {
      ...previous.seo,

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
      updateProduct,
      setProduct,
      updateBasic,
      updateCategory,
      updatePricing,
      updateVariants,
      updateInventory,
      updateWarehouse,
      updateShipping,
      updateMedia,
      updateSEO,
      resetProduct,
      setPrimaryImage,
deleteImage,
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