import api from "../axios";

import { ServerTableQuery, ServerTableResponse } from "@/types/server-table";
import { NewsletterSubscriber } from "@/types/newsletter";

class NewsletterService {
  async getAll(
    params?: Partial<ServerTableQuery>
  ): Promise<ServerTableResponse<NewsletterSubscriber>> {
    const { data } = await api.get("/v1/admin/newsletter-subscribers", {
      params: { search: params?.search, page: params?.page, per_page: params?.per_page },
    });

    return {
      items: data.data.subscribers,
      pagination: data.data.pagination,
    };
  }
}

export default new NewsletterService();
