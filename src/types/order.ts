export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export type SellerOrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  uuid: string;
  product: { uuid: string; slug: string } | null;
  product_name: string;
  product_sku: string | null;
  product_image: string | null;
  unit_price: string;
  quantity: number;
  line_total: string;
}

export interface SellerOrder {
  uuid: string;
  seller_order_number: string;
  supplier: {
    uuid: string;
    display_name: string;
    company_name?: string;
  } | null;
  status: SellerOrderStatus;
  subtotal: string;
  tracking_number: string | null;
  shipping_carrier: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  cancelled_at: string | null;
  order?: {
    order_number: string;
    placed_at: string;
    shipping: {
      name: string;
      phone: string;
      address: string;
      city: string;
      country: string;
      postal_code: string | null;
    };
  };
  items?: OrderItem[];
}

export interface Order {
  uuid: string;
  order_number: string;
  status: OrderStatus;
  cancellation_reason: string | null;
  cancelled_at: string | null;
  can_cancel: boolean;
  subtotal: string;
  total: string;
  currency: string;
  shipping: {
    name: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postal_code: string | null;
    // Live rate the buyer picked at checkout (Phase 18) — distinct from
    // SellerOrder.shipping_carrier, which is the tracking carrier admin
    // enters once a seller order actually ships.
    cost: string | null;
    carrier: string | null;
    service: string | null;
  };
  notes: string | null;
  placed_at: string;
  buyer?: {
    uuid: string;
    full_name: string;
    email: string;
    phone: string | null;
  };
  seller_orders: SellerOrder[];
}
