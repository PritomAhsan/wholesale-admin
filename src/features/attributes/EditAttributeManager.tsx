"use client";

import { useEffect, useState } from "react";

import ComponentCard from "@/components/common/ComponentCard";

import AttributeService from "@/api/services/attribute.service";

import { Attribute } from "@/types/attribute";

import AttributeForm from "./components/AttributeForm";

interface Props {
  uuid: string;
}

export default function EditAttributeManager({ uuid }: Props) {
  const [attribute, setAttribute] = useState<Attribute | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAttribute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  const loadAttribute = async () => {
    try {
      setLoading(true);

      const response = await AttributeService.get(uuid);

      setAttribute(response);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Attribute not found.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ComponentCard title="Edit Attribute" desc="Loading attribute...">
        <div className="py-12 text-center">Loading...</div>
      </ComponentCard>
    );
  }

  if (error || !attribute) {
    return (
      <ComponentCard title="Edit Attribute" desc="Attribute not found.">
        <div className="py-12 text-center text-red-500">{error}</div>
      </ComponentCard>
    );
  }

  return (
    <ComponentCard
      title="Edit Attribute"
      desc="Update attribute information."
    >
      <AttributeForm mode="edit" initialData={attribute} />
    </ComponentCard>
  );
}
