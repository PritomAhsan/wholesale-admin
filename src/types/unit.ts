export interface Unit {
  uuid: string;
  name: string;
  code: string;
  symbol: string | null;
  description: string | null;
  sort_order: number;
  status: boolean;
  created_at: string;
  updated_at: string;
}
