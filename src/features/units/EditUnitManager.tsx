"use client";

import { useEffect, useState } from "react";

import ComponentCard from "@/components/common/ComponentCard";

import UnitService from "@/api/services/unit.service";

import { Unit } from "@/types/unit";

import UnitForm from "./components/UnitForm";

interface Props {
  uuid: string;
}

export default function EditUnitManager({ uuid }: Props) {
  const [unit, setUnit] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUnit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  const loadUnit = async () => {
    try {
      setLoading(true);

      const response = await UnitService.get(uuid);

      setUnit(response);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Unit not found.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ComponentCard title="Edit Unit" desc="Loading unit...">
        <div className="py-12 text-center">Loading...</div>
      </ComponentCard>
    );
  }

  if (error || !unit) {
    return (
      <ComponentCard title="Edit Unit" desc="Unit not found.">
        <div className="py-12 text-center text-red-500">{error}</div>
      </ComponentCard>
    );
  }

  return (
    <ComponentCard title="Edit Unit" desc="Update unit information.">
      <UnitForm mode="edit" initialData={unit} />
    </ComponentCard>
  );
}
