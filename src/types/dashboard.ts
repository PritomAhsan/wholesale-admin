export interface AdminDashboardStatistics {
  totalProducts: number;
  pendingProducts: number;
  totalCategories: number;
  totalBrands: number;
  totalSuppliers: number;
  pendingSuppliers: number;
  totalCustomers: number;
  totalOrders: number;
  totalRevenue: number;
  totalRfqs: number;
}

export interface DashboardProduct {
  uuid: string;
  name: string;
  supplier?: string;
  price: string;
  status: string;
  image: string | null;
}

export interface DashboardPendingProduct {
  uuid: string;
  name: string;
  supplier: string | null;
  submitted: string;
}

export interface DashboardSupplier {
  uuid: string;
  companyName: string;
  businessType: string;
  status: string;
}

export interface DashboardRFQ {
  uuid: string;
  productName: string;
  buyer: string;
  quantity: string;
  unit: string;
  status: string;
}

export interface DashboardOrder {
  uuid: string;
  orderNumber?: string;
  sellerOrderNumber?: string;
  buyer?: string;
  shipTo?: string;
  sellerCount?: number;
  total: string;
  status: string;
  placedAt: string;
}

export interface AdminDashboardResponse {
  statistics: AdminDashboardStatistics;
  latestProducts: DashboardProduct[];
  pendingProducts: DashboardPendingProduct[];
  latestSuppliers: DashboardSupplier[];
  latestRfqs: DashboardRFQ[];
  recentOrders: DashboardOrder[];
}

export interface SupplierDashboardStatistics {
  totalProducts: number;
  publishedProducts: number;
  pendingProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
}

export interface SupplierDashboardResponse {
  statistics: SupplierDashboardStatistics;
  latestProducts: DashboardProduct[];
  recentOrders: DashboardOrder[];
}
