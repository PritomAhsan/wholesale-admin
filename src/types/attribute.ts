export interface AttributeCategory {
  id: number;
  name: string;
}

export interface Attribute {
  uuid: string;
  category?: AttributeCategory | null;
  name: string;
  slug: string;
  type: "text" | "number" | "select" | "multiselect" | "boolean";
  is_filterable: boolean;
  is_required: boolean;
  status: boolean;
  sort_order: number;
  values_count: number;
  created_at: string;
  updated_at: string;
}

export interface AttributeValueSummary {
  uuid: string;
  name: string;
}

export interface AttributeValue {
  uuid: string;
  attribute: AttributeValueSummary;
  value: string;
  sort_order: number;
  status: boolean;
  created_at: string;
}
