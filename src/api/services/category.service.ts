import api from "../axios";

export interface CategoryQueryParams {
  page?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  status?: boolean | "";
}

class CategoryService {
  /**
   * Category List
   */
  async getAll(params?: CategoryQueryParams) {
    const { data } = await api.get(
      "/v1/admin/categories",
      {
        params,
      }
    );

    return data.data;
  }

  /**
   * Single Category
   */
  async get(uuid: string) {
    const { data } = await api.get(
      `/v1/admin/categories/${uuid}`
    );

    return data.data.category;
  }

  /**
   * Create Category
   */
  async create(payload: FormData) {
    const { data } = await api.post(
      "/v1/admin/categories",
      payload,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return data;
  }

  /**
   * Update Category
   */
  async update(
    uuid: string,
    payload: FormData
  ) {
    const { data } = await api.post(
      `/v1/admin/categories/${uuid}?_method=PUT`,
      payload,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return data;
  }

  /**
   * Delete Category
   */
  async delete(uuid: string) {
    const { data } = await api.delete(
      `/v1/admin/categories/${uuid}`
    );

    return data;
  }
}

export default new CategoryService();