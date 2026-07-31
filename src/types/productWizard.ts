export interface ProductBasicInfo {
  productName: string;
  slug: string;
  shortDescription: string;
  description: string;
  productType: string;
  condition: string;
  sku: string
}

export interface ProductCategoryInfo {
  // Categories
  categoryId: number | null;
  subCategoryId: number | null;
  childCategoryId: number | null;

  // Brand
  brandId: number | null;

  // Manufacturer
  manufacturer: string;

  // Collection
  collection: string;

  // Tags
  tags: string[];

  // Country
  countryOfOrigin: string;

  // Customs
  hsCode: string;

  // Industry
  industry: string;

  // Certifications
  certifications: string[];
}

export interface ProductPriceTier {
  id: string;

  minQuantity: number;

  maxQuantity: number;

  price: number;
}

export interface ProductPricingInfo {
  currency: string;

  sellingPrice: number;

  comparePrice: number;

  costPrice: number;

  minimumOrder: number;

  allowWholesalePricing: boolean;

  priceTiers: ProductPriceTier[];
  incoterm?: string;
samplePrice?: number;
sampleAvailable?: boolean;
negotiable?: boolean;
rfqOnly?: boolean;
}

export interface ProductVariantAttribute {
  id: string;
  name: string;
  values: string[];
}

export interface ProductVariantItem {
  id: string;

  sku: string;

  title: string;

  attributes: Record<string, string>;

  price: number;

  comparePrice: number;

  costPrice: number;

  quantity: number;

  weight: number;

  barcode: string;

  image: string | null;

  active: boolean;
}

export interface ProductVariantInfo {
  enabled: boolean;

  attributes: ProductVariantAttribute[];

  items: ProductVariantItem[];

  autoGenerateSku: boolean;
}

export interface ProductInventoryInfo {
  sku: string;

  quantity: number;

  reservedQuantity: number;

  availableQuantity: number;

  incomingQuantity: number;

  lowStockThreshold: number;

  trackInventory: boolean;

  allowBackorders: boolean;

  continueSellingWhenOutOfStock: boolean;
}

export interface ProductWarehouseInfo {
  id: string;

  warehouseId: number | null;

  warehouseName: string;

  quantity: number;

  reservedQuantity: number;

  availableQuantity: number;

  isPrimary: boolean;
}

export interface ProductWarehouseManagement {
  warehouses: ProductWarehouseInfo[];
}

export interface ProductShippingInfo {
  weight: number;

  weightUnit: "kg" | "g" | "lb";

  length: number;

  width: number;

  height: number;

  dimensionUnit: "cm" | "m" | "inch";

  volumetricWeight: number;

  productionLeadTime: number;

dispatchTime: number;

leadTimeUnit: "days" | "weeks";

readyToShip: boolean;

domesticShipping: boolean;

internationalShipping: boolean;

pickupAvailable: boolean;

freeShipping: boolean;

shippingNotes: string;
}

export interface ProductImage {
  id: string;

  file?: File;

  url: string;

  name: string;

  size: number;

  type: string;

  isPrimary: boolean;

  sortOrder: number;
}

export interface ProductMedia {
  images: ProductImage[];
}

export interface ProductSeoInfo {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

export interface ProductWizardData {
  basic: ProductBasicInfo;
  category: ProductCategoryInfo;
  pricing: ProductPricingInfo;
  variants: ProductVariantInfo;
  inventory: ProductInventoryInfo;

  warehouse: ProductWarehouseManagement;

  shipping: ProductShippingInfo;
  media: ProductMedia;
  seo: ProductSeoInfo;
}