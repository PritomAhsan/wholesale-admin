import api from "../axios";

import { ServerTableResponse } from "@/types/server-table";
import { ContactMessage, ContactMessageStatus } from "@/types/contact-message";

interface ContactMessageQuery {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
}

class ContactMessageService {
  async getAll(
    params?: ContactMessageQuery
  ): Promise<ServerTableResponse<ContactMessage>> {
    const { data } = await api.get("/v1/admin/contact-messages", {
      params: {
        search: params?.search,
        page: params?.page,
        per_page: params?.per_page,
        status: params?.status,
      },
    });

    return {
      items: data.data.messages,
      pagination: data.data.pagination,
    };
  }

  async updateStatus(uuid: string, status: ContactMessageStatus) {
    const { data } = await api.patch(`/v1/admin/contact-messages/${uuid}/status`, {
      status,
    });

    return data;
  }
}

export default new ContactMessageService();
