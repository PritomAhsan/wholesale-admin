import api from "@/api/axios";

export interface AttributeLookup {
  id: number;
  uuid?: string;
  name: string;
}

export interface AttributeValueLookup {
  id: number;
  uuid?: string;
  attribute_id: number;
  value: string;
}

const AttributeService = {
  async lookup(): Promise<AttributeLookup[]> {
    const { data } = await api.get(
      "/lookups/attributes"
    );

    return data.data;
  },

  async lookupValues(): Promise<AttributeValueLookup[]> {
    const { data } = await api.get(
      "/lookups/attribute-values"
    );

    return data.data;
  },
};

export default AttributeService;