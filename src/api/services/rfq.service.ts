import api from "../axios";

import { ServerTableResponse } from "@/types/server-table";
import { Rfq, RfqStatus } from "@/types/rfq";

class RfqService {
  async getAll(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
  }): Promise<ServerTableResponse<Rfq>> {
    const { data } = await api.get("/v1/admin/rfqs", { params });

    return {
      items: data.data.rfqs,
      pagination: data.data.pagination,
    };
  }

  async get(uuid: string): Promise<Rfq> {
    const { data } = await api.get(`/v1/admin/rfqs/${uuid}`);

    return data.data.rfq;
  }

  async respond(
    uuid: string,
    payload: {
      status: Extract<RfqStatus, "quoted" | "accepted" | "rejected" | "closed">;
      admin_response: string;
    }
  ): Promise<Rfq> {
    const { data } = await api.patch(`/v1/admin/rfqs/${uuid}/respond`, payload);

    return data.data.rfq;
  }
}

export default new RfqService();
