export interface Brand {
  id: number;

  uuid: string;

  name: string;

  slug: string;

  description: string | null;

  website: string | null;

  logo: string | null;

  featured: boolean;

  status: boolean;

  products_count: number;

  created_at: string;

  updated_at: string;
}