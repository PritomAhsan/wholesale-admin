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
  page?: number;

  search?: string;

  sort?: string;

  order?: "asc" | "desc";

  status?: boolean | "";

  per_page?: number;
}