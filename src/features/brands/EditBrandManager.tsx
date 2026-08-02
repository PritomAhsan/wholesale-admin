"use client";

import { useEffect, useState } from "react";

import ComponentCard from "@/components/common/ComponentCard";

import BrandService from "@/api/services/brand.service";

import { Brand } from "@/types/brand";

import BrandForm from "./components/BrandForm";

interface Props {
  uuid: string;
}

export default function EditBrandManager({
  uuid,
}: Props) {
  const [brand, setBrand] =
    useState<Brand | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    loadBrand();
  }, [uuid]);

  const loadBrand = async () => {
    try {
      setLoading(true);

      const response =
        await BrandService.get(uuid);

      setBrand(response);

      setError(null);
    } catch (error) {
      console.error(error);

      setError(
        "Brand not found."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ComponentCard
        title="Edit Brand"
        desc="Loading brand..."
      >
        <div className="py-12 text-center">
          Loading...
        </div>
      </ComponentCard>
    );
  }

  if (error || !brand) {
    return (
      <ComponentCard
        title="Edit Brand"
        desc="Brand not found."
      >
        <div className="py-12 text-center text-red-500">
          {error}
        </div>
      </ComponentCard>
    );
  }

  return (
    <ComponentCard
      title="Edit Brand"
      desc="Update brand information."
    >
      <BrandForm
        mode="edit"
        initialData={brand}
      />
    </ComponentCard>
  );
}