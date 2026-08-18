import api from "../axios";

import { ServerTableResponse } from "@/types/server-table";
import { Deal, DealAlertSubscription } from "@/types/deal";

interface DealQuery {
  page?: number;
  per_page?: number;
  type?: string;
  status?: string;
}

export interface DealPayload {
  product_id: number;
  type: string;
  title: string;
  description?: string;
  discount_percent?: number;
  discount_price?: number;
  min_quantity?: number;
  starts_at?: string;
  ends_at?: string;
  status?: string;
}

class DealService {
  async getAll(
    params?: DealQuery
  ): Promise<ServerTableResponse<Deal>> {
    const { data } = await api.get("/v1/admin/deals", {
      params: {
        page: params?.page,
        per_page: params?.per_page,
        type: params?.type,
        status: params?.status,
      },
    });

    return {
      items: data.data.deals,
      pagination: data.data.pagination,
    };
  }

  async get(uuid: string): Promise<Deal> {
    const { data } = await api.get(`/v1/admin/deals/${uuid}`);
    return data.data.deal;
  }

  async create(payload: DealPayload) {
    const { data } = await api.post("/v1/admin/deals", payload);
    return data;
  }

  async update(uuid: string, payload: DealPayload) {
    const { data } = await api.put(`/v1/admin/deals/${uuid}`, payload);
    return data;
  }

  async delete(uuid: string) {
    const { data } = await api.delete(`/v1/admin/deals/${uuid}`);
    return data;
  }

  async getAlertSubscriptions(
    params?: { page?: number; per_page?: number }
  ): Promise<ServerTableResponse<DealAlertSubscription>> {
    const { data } = await api.get("/v1/admin/deals/alert-subscriptions", {
      params: { page: params?.page, per_page: params?.per_page },
    });

    return {
      items: data.data.subscriptions,
      pagination: data.data.pagination,
    };
  }

  async lookupProducts(): Promise<{ id: number; uuid: string; name: string }[]> {
    const { data } = await api.get("/lookups/products");
    return data.data;
  }
}

export default new DealService();
