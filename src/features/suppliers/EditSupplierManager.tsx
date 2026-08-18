"use client";

import { useEffect, useState } from "react";

import ComponentCard from "@/components/common/ComponentCard";

import supplierService from "@/api/services/supplier.service";
import { Supplier } from "@/types/supplier";

import SupplierForm from "./components/SupplierForm";

interface Props {
  uuid: string;
}

export default function EditSupplierManager({ uuid }: Props) {
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSupplier();
  }, [uuid]);

  const loadSupplier = async () => {
    try {
      setLoading(true);

      const response = await supplierService.get(uuid);

      setSupplier(response);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Supplier not found.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ComponentCard title="Edit Supplier" desc="Loading supplier...">
        <div className="py-12 text-center">Loading...</div>
      </ComponentCard>
    );
  }

  if (error || !supplier) {
    return (
      <ComponentCard title="Edit Supplier" desc="Supplier not found.">
        <div className="py-12 text-center text-red-500">{error}</div>
      </ComponentCard>
    );
  }

  return (
    <ComponentCard title="Edit Supplier" desc="Update supplier information.">
      <SupplierForm supplier={supplier} />
    </ComponentCard>
  );
}
