import api from "../axios";

import {
  ServerTableQuery,
  ServerTableResponse,
} from "@/types/server-table";

import { ProductListItem } from "@/types/product";

class ProductService {
  /**
   * Product List
   */
  async getAll(
    params?: Partial<Omit<ServerTableQuery, "status">> & {
      status?: string;
    }
  ): Promise<
    ServerTableResponse<ProductListItem>
  > {
    const { data } = await api.get(
      "/v1/admin/products",
      {
        params,
      }
    );

    return {
      items: data.data.products,
      pagination: data.data.pagination,
    };
  }

  /**
   * Single Product
   */
  async get(
    uuid: string
  ) {
    const { data } = await api.get(
      `/v1/admin/products/${uuid}`
    );

    return data.data.product;
  }

    /**
     * Create Product
     */
    async create(payload: FormData) {
        const { data } = await api.post(
            "/v1/admin/products",
            payload,
            {
            headers: {
                "Content-Type":
                "multipart/form-data",
            },
            }
        );

        return data.data.product;
    }

/**
 * Update Product
 */
async update(
    uuid: string,
    payload: FormData
) {

    const { data } =
        await api.post(

            `/v1/admin/products/${uuid}`,

            payload,

            {

                headers: {

                    "Content-Type":
                        "multipart/form-data",

                },

            }

        );

    return data.data.product;

}

  /**
   * Delete
   */
  async delete(
    uuid: string
  ) {
    const { data } = await api.delete(
      `/v1/admin/products/${uuid}`
    );

    return data;
  }

  /**
 * Upload Product Images
 */
async uploadImages(
  uuid: string,
  payload: FormData
) {
  const { data } = await api.post(
    `/v1/admin/products/${uuid}/images`,
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
 * Delete Product Image
 */
async deleteImage(
  productUuid: string,
  imageUuid: string
) {
  const { data } = await api.delete(
    `/v1/admin/products/${productUuid}/images/${imageUuid}`
  );

  return data;
}

/**
 * Set Primary Product Image
 */
async setPrimaryImage(
  productUuid: string,
  imageUuid: string
) {
  const { data } = await api.patch(
    `/v1/admin/products/${productUuid}/images/${imageUuid}/primary`
  );

  return data;
}

/**
 * Reorder Product Images
 */
async reorderImages(
  productUuid: string,
  images: { uuid: string; sort_order: number }[]
) {
  const { data } = await api.patch(
    `/v1/admin/products/${productUuid}/images/reorder`,
    { images }
  );

  return data;
}

/**
 * Upload Variant Images
 */
async uploadVariantImages(
  productUuid: string,
  variantId: number,
  payload: FormData
) {
  const { data } = await api.post(
    `/v1/admin/products/${productUuid}/variants/${variantId}/images`,
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
 * Delete Variant Image
 */
async deleteVariantImage(
  productUuid: string,
  variantId: number,
  imageUuid: string
) {
  const { data } = await api.delete(
    `/v1/admin/products/${productUuid}/variants/${variantId}/images/${imageUuid}`
  );

  return data;
}

/**
 * Set Primary Variant Image
 */
async setPrimaryVariantImage(
  productUuid: string,
  variantId: number,
  imageUuid: string
) {
  const { data } = await api.patch(
    `/v1/admin/products/${productUuid}/variants/${variantId}/images/${imageUuid}/primary`
  );

  return data;
}

/**
 * Create Variant
 */
async createVariant(
  uuid: string,
  payload: any
) {
  const { data } = await api.post(
    `/v1/admin/products/${uuid}/variants`,
    payload
  );

  return data;
}

/**
 * Update Variant
 */
async updateVariant(
  productUuid: string,
  variantId: number,
  payload: any
) {
  const { data } = await api.patch(
    `/v1/admin/products/${productUuid}/variants/${variantId}`,
    payload
  );

  return data;
}

/**
 * Delete Variant
 */
async deleteVariant(
  productUuid: string,
  variantId: number
) {
  const { data } = await api.delete(
    `/v1/admin/products/${productUuid}/variants/${variantId}`
  );

  return data;
}

/**
 * Approve
 */
async approve(uuid: string) {
  const { data } = await api.patch(
    `/v1/admin/products/${uuid}/approve`
  );

  return data;
}

/**
 * Reject
 */
async reject(uuid: string, reason?: string) {
  const { data } = await api.patch(
    `/v1/admin/products/${uuid}/reject`,
    { reason }
  );

  return data;
}

/**
 * Publish
 */
async publish(uuid: string) {
  const { data } = await api.patch(
    `/v1/admin/products/${uuid}/publish`
  );

  return data;
}

/**
 * Archive
 */
async archive(uuid: string) {
  const { data } = await api.patch(
    `/v1/admin/products/${uuid}/archive`
  );

  return data;
}

/**
 * Toggle Featured
 */
async toggleFeatured(uuid: string) {
  const { data } = await api.patch(
    `/v1/admin/products/${uuid}/featured`
  );

  return data;
}

/**
 * Update Stock
 */
async updateStock(uuid: string, stock_quantity: number) {
  const { data } = await api.patch(
    `/v1/admin/products/${uuid}/stock`,
    { stock_quantity }
  );

  return data;
}

/**
 * Submit For Review
 */
async submitForApproval(uuid: string, remarks?: string) {
  const { data } = await api.post(
    `/v1/admin/products/${uuid}/approval/submit`,
    { remarks }
  );

  return data;
}

/**
 * Restore
 */
async restore(uuid: string) {
  const { data } = await api.patch(
    `/v1/admin/products/${uuid}/restore`
  );

  return data;
}

/**
 * Force Delete
 */
async forceDelete(uuid: string) {
  const { data } = await api.delete(
    `/v1/admin/products/${uuid}/force-delete`
  );

  return data;
}

}

export default new ProductService();