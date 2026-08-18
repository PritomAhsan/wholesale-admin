"use client";

import ComponentCard from "@/components/common/ComponentCard";

import DealForm from "./components/DealForm";

export default function CreateDealManager() {
  return (
    <ComponentCard title="New Deal" desc="Create a flash discount, bulk price break or clearance run.">
      <DealForm mode="create" />
    </ComponentCard>
  );
}
