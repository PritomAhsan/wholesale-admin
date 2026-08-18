export interface Customer {
  uuid: string;
  full_name: string;
  email: string;
  phone: string | null;
  status: string;
  orders_count: number;
  created_at: string;
}
