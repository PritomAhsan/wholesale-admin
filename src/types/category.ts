export interface Category {
  id: number; 
  
  uuid: string;

  parent_id: string | null;

  parent_name: string | null;

  name: string;

  slug: string;

  description: string | null;

  image: string | null;

  icon: string | null;

  sort_order: number;

  status: boolean;

  children_count: number;

  created_at: string;
}

export interface CategoryPagination {
  current_page: number;

  last_page: number;

  per_page: number;

  total: number;
}

export interface CategoryListResponse {
  categories: Category[];

  pagination: CategoryPagination;
}