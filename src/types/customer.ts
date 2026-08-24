import { Order } from "./order";

export interface Customer {
  uuid: string;
  full_name: string;
  email: string;
  phone: string | null;
  status: string;
  orders_count: number;
  created_at: string;
}

export interface CustomerDetailResponse {
  customer: Customer;
  orders: Order[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
