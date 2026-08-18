"use client";

import { useEffect, useState } from "react";

import ComponentCard from "@/components/common/ComponentCard";

import dealService from "@/api/services/deal.service";
import { Deal } from "@/types/deal";

import DealForm from "./components/DealForm";

interface Props {
  uuid: string;
}

export default function EditDealManager({ uuid }: Props) {
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dealService
      .get(uuid)
      .then((data) => {
        setDeal(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Deal not found.");
      })
      .finally(() => setLoading(false));
  }, [uuid]);

  if (loading) {
    return (
      <ComponentCard title="Edit Deal" desc="Loading deal...">
        <div className="py-12 text-center">Loading...</div>
      </ComponentCard>
    );
  }

  if (error || !deal) {
    return (
      <ComponentCard title="Edit Deal" desc="Deal not found.">
        <div className="py-12 text-center text-red-500">{error}</div>
      </ComponentCard>
    );
  }

  return (
    <ComponentCard title="Edit Deal" desc="Update deal details.">
      <DealForm mode="edit" uuid={uuid} initialData={deal} />
    </ComponentCard>
  );
}
