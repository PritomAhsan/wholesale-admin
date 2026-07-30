export interface ProductBasicInfo {
  productName: string;
  slug: string;
  shortDescription: string;
  description: string;
  productType: string;
  condition: string;
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
  trackInventory: boolean;
}

export interface ProductShippingInfo {
  weight: number;
  length: number;
  width: number;
  height: number;
}

export interface ProductMediaInfo {
  images: string[];
  videos: string[];
  documents: string[];
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
  shipping: ProductShippingInfo;
  media: ProductMediaInfo;
  seo: ProductSeoInfo;
}