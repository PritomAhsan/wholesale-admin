import api from "../axios";

import {
  AdminDashboardResponse,
  SupplierDashboardResponse,
} from "@/types/dashboard";

class DashboardService {
  async getAdminDashboard(): Promise<AdminDashboardResponse> {
    const { data } = await api.get("/v1/admin/dashboard");

    return data.data;
  }

  async getSupplierDashboard(): Promise<SupplierDashboardResponse> {
    const { data } = await api.get("/v1/supplier/dashboard");

    return data.data;
  }
}

export default new DashboardService();
