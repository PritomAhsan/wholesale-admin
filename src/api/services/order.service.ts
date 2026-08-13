import api from "../axios";

import { ServerTableResponse } from "@/types/server-table";
import { Order, SellerOrderStatus } from "@/types/order";

class OrderService {
  async getAll(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
  }): Promise<ServerTableResponse<Order>> {
    const { data } = await api.get("/v1/admin/orders", { params });

    return {
      items: data.data.orders,
      pagination: data.data.pagination,
    };
  }

  async get(uuid: string): Promise<Order> {
    const { data } = await api.get(`/v1/admin/orders/${uuid}`);

    return data.data.order;
  }

  async updateSellerOrderStatus(
    uuid: string,
    payload: {
      status: SellerOrderStatus;
      tracking_number?: string;
      shipping_carrier?: string;
    }
  ): Promise<Order> {
    const { data } = await api.patch(
      `/v1/admin/seller-orders/${uuid}/status`,
      payload
    );

    return data.data.order;
  }
}

export default new OrderService();
