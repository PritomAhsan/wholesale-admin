export interface ProductSupplier {
  uuid: string;
  company_name: string;
}

export interface ProductBrand {
  uuid: string;
  name: string;
}

export interface ProductCategory {
  id: number;
  uuid: string;
  name: string;
  slug: string;
}

export interface ProductListItem {
  uuid: string;

  name: string;

  slug: string;

  sku: string;

  status: string;

  status_label: string;

  featured: boolean;

  selling_price: string;

  formatted_price: string;

  supplier: ProductSupplier | null;

  brand: ProductBrand | null;

  categories: ProductCategory[];

  stock: number;

  variants_count: number;

  primary_image: string | null;

  approval_count: number;

  is_publishable: boolean;

  created_at: string;

  last_updated: string;
}

export interface ProductPagination {
  current_page: number;

  last_page: number;

  per_page: number;

  total: number;

  from: number | null;

  to: number | null;

  has_more_pages: boolean;
}

export interface ProductFilters {
  search: string | null;

  status: string | null;

  supplier_id: number | null;

  brand_id: number | null;

  featured: boolean | null;

  stock: string | null;

  min_price: number | null;

  max_price: number | null;

  sort_by: string;

  sort_direction: "asc" | "desc";
}

export interface ProductListResponse {
  products: ProductListItem[];

  pagination: ProductPagination;

  filters: ProductFilters;
}