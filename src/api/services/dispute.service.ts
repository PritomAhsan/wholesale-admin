import api from "../axios";

import { ServerTableResponse } from "@/types/server-table";
import { Dispute } from "@/types/dispute";

class DisputeService {
  async getAll(
    params?: { page?: number; per_page?: number; status?: string }
  ): Promise<ServerTableResponse<Dispute>> {
    const { data } = await api.get("/v1/admin/disputes", {
      params: {
        page: params?.page,
        per_page: params?.per_page,
        status: params?.status,
      },
    });

    return {
      items: data.data.disputes,
      pagination: data.data.pagination,
    };
  }

  async get(uuid: string): Promise<Dispute> {
    const { data } = await api.get(`/v1/admin/disputes/${uuid}`);
    return data.data.dispute;
  }

  async resolve(
    uuid: string,
    payload: { resolution: string; resolution_amount?: number; resolution_note?: string }
  ): Promise<Dispute> {
    const { data } = await api.patch(`/v1/admin/disputes/${uuid}/resolve`, payload);
    return data.data.dispute;
  }
}

export default new DisputeService();
