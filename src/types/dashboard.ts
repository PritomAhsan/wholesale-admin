export interface DashboardStatistics {
  totalProducts: number;
  totalCategories: number;
  totalBrands: number;
  totalSuppliers: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  pendingProducts: number;
}

export interface DashboardProduct {
  id: number;
  name: string;
  supplier: string;
  price: number;
  status: string;
  image?: string;
}

export interface DashboardSupplier {
  id: number;
  companyName: string;
  country: string;
  status: string;
  logo?: string;
}

export interface DashboardRFQ {
  id: number;
  title: string;
  buyer: string;
  quantity: number;
  status: string;
}

export interface DashboardOrder {
  id: number;
  orderNumber: string;
  customer: string;
  total: number;
  status: string;
}

export interface DashboardResponse {
  statistics: DashboardStatistics;
  latestProducts: DashboardProduct[];
  latestSuppliers: DashboardSupplier[];
  latestRFQs: DashboardRFQ[];
  recentOrders: DashboardOrder[];
}