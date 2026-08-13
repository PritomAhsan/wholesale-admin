import api from "../axios";

import {
  ServerTableResponse,
} from "@/types/server-table";

import { Supplier } from "@/types/supplier";

class SupplierService {
  /**
   * Supplier Lookup
   */
  async lookup() {
    const { data } = await api.get(
      "/lookups/suppliers"
    );

    return data.data;
  }

  /**
   * Supplier List (admin)
   */
  async getAll(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
  }): Promise<ServerTableResponse<Supplier>> {
    const { data } = await api.get(
      "/v1/admin/suppliers",
      { params }
    );

    return {
      items: data.data.suppliers,
      pagination: data.data.pagination,
    };
  }

  /**
   * Approve
   */
  async approve(uuid: string) {
    const { data } = await api.post(
      `/v1/admin/suppliers/${uuid}/approve`
    );

    return data;
  }

  /**
   * Reject
   */
  async reject(uuid: string) {
    const { data } = await api.post(
      `/v1/admin/suppliers/${uuid}/reject`
    );

    return data;
  }
}

export default new SupplierService();
