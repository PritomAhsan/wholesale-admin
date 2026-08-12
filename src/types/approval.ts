export type ProductStatusValue =
  | "draft"
  | "pending"
  | "approved"
  | "rejected"
  | "published"
  | "unpublished"
  | "archived";

export interface PendingProduct {
  uuid: string;
  name: string;
  sku: string;
  status: ProductStatusValue;
  supplier?: {
    uuid: string;
    name: string;
  } | null;
  images?: {
    uuid: string;
    image_url: string;
    is_primary: boolean;
  }[];
  created_at: string;
}

export interface ApprovalStatistics {
  pending: number;
  approved: number;
  published: number;
  rejected: number;
  draft: number;
  archived: number;
}

export interface ApprovalTimelineEntry {
  uuid: string;
  action: string;
  decision: string | null;
  status_before: string | null;
  status_after: string | null;
  reviewer: {
    id: string | null;
    name: string | null;
  };
  remarks: string | null;
  reviewed_at: string | null;
}

export interface StatusHistoryEntry {
  uuid: string;
  action: string;
  status_before: string | null;
  status_after: string | null;
  remarks: string | null;
  performed_by: {
    uuid: string | null;
    name: string | null;
  };
  performed_at: string | null;
}
