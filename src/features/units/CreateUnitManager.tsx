"use client";

import ComponentCard from "@/components/common/ComponentCard";

import UnitForm from "./components/UnitForm";

export default function CreateUnitManager() {
  return (
    <ComponentCard title="Create Unit" desc="Add a new measurement unit.">
      <UnitForm />
    </ComponentCard>
  );
}
