import api from "../axios";

import { ServerTableResponse } from "@/types/server-table";
import { SellerOrder, SellerOrderStatus } from "@/types/order";

class SupplierOrderService {
  async getAll(params?: {
    page?: number;
    per_page?: number;
    status?: string;
  }): Promise<ServerTableResponse<SellerOrder>> {
    const { data } = await api.get("/v1/supplier/orders", { params });

    return {
      items: data.data.orders,
      pagination: data.data.pagination,
    };
  }

  async get(uuid: string): Promise<SellerOrder> {
    const { data } = await api.get(`/v1/supplier/orders/${uuid}`);

    return data.data.order;
  }

  async updateStatus(
    uuid: string,
    payload: {
      status: Extract<SellerOrderStatus, "processing" | "shipped" | "delivered">;
      tracking_number?: string;
      shipping_carrier?: string;
    }
  ): Promise<SellerOrder> {
    const { data } = await api.patch(
      `/v1/supplier/orders/${uuid}/status`,
      payload
    );

    return data.data.order;
  }
}

export default new SupplierOrderService();
