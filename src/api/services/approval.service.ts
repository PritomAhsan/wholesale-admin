import api from "../axios";

import {
  ApprovalStatistics,
  ApprovalTimelineEntry,
  PendingProduct,
  StatusHistoryEntry,
} from "@/types/approval";

import { ServerPagination } from "@/types/server-table";

class ApprovalService {
  /*
  |--------------------------------------------------------------------------
  | Approval queue
  |--------------------------------------------------------------------------
  */

  async pending(
    params?: { page?: number; per_page?: number }
  ): Promise<{ items: PendingProduct[]; pagination: ServerPagination }> {
    const { data } = await api.get(
      "/v1/admin/products/approval/pending",
      { params }
    );

    return {
      items: data.data.products,
      pagination: data.data.pagination,
    };
  }

  async statistics(): Promise<ApprovalStatistics> {
    const { data } = await api.get(
      "/v1/admin/products/approval/statistics"
    );

    return data.data.statistics;
  }

  /**
   * Supplier submits a product for review.
   */
  async submit(productUuid: string, remarks?: string) {
    const { data } = await api.post(
      `/v1/admin/products/${productUuid}/approval/submit`,
      { remarks }
    );

    return data;
  }

  async approve(productUuid: string, remarks?: string) {
    const { data } = await api.post(
      `/v1/admin/products/${productUuid}/approval/approve`,
      { remarks }
    );

    return data;
  }

  async reject(productUuid: string, remarks: string) {
    const { data } = await api.post(
      `/v1/admin/products/${productUuid}/approval/reject`,
      { remarks }
    );

    return data;
  }

  async approvalHistory(
    productUuid: string
  ): Promise<ApprovalTimelineEntry[]> {
    const { data } = await api.get(
      `/v1/admin/products/${productUuid}/approval/history`
    );

    return data.data.history;
  }

  async timeline(productUuid: string): Promise<ApprovalTimelineEntry[]> {
    const { data } = await api.get(
      `/v1/admin/products/${productUuid}/approval/timeline`
    );

    return data.data.timeline;
  }

  async supplierHistory(
    supplierUuid: string
  ): Promise<ApprovalTimelineEntry[]> {
    const { data } = await api.get(
      `/v1/admin/products/suppliers/${supplierUuid}/approval/history`
    );

    return data.data.history;
  }

  /*
  |--------------------------------------------------------------------------
  | Publish / status workflow
  |--------------------------------------------------------------------------
  */

  async publish(productUuid: string, remarks?: string) {
    const { data } = await api.post(
      `/v1/admin/products/${productUuid}/status/publish`,
      { remarks }
    );

    return data;
  }

  async unpublish(productUuid: string, remarks: string) {
    const { data } = await api.post(
      `/v1/admin/products/${productUuid}/status/unpublish`,
      { remarks }
    );

    return data;
  }

  async archive(productUuid: string, remarks: string) {
    const { data } = await api.post(
      `/v1/admin/products/${productUuid}/status/archive`,
      { remarks }
    );

    return data;
  }

  async restoreStatus(productUuid: string, remarks?: string) {
    const { data } = await api.post(
      `/v1/admin/products/${productUuid}/status/restore`,
      { remarks }
    );

    return data;
  }

  async statusHistory(
    productUuid: string
  ): Promise<StatusHistoryEntry[]> {
    const { data } = await api.get(
      `/v1/admin/products/${productUuid}/status/history`
    );

    return data.data.history;
  }
}

export default new ApprovalService();
