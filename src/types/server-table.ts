export interface ServerPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ServerTableResponse<T> {
  items: T[];
  pagination: ServerPagination;
}

export interface ServerTableQuery {
  page: number;

  per_page: number;

  search: string;

  sort: string;

  order: "asc" | "desc";

  status: boolean | "";

  supplier_id?: number;

  brand_id?: number;

  featured?: boolean;

  stock?: string;

  min_price?: number;

  max_price?: number;
}