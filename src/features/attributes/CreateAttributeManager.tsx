"use client";

import ComponentCard from "@/components/common/ComponentCard";

import AttributeForm from "./components/AttributeForm";

export default function CreateAttributeManager() {
  return (
    <ComponentCard
      title="Create Attribute"
      desc="Add a new product attribute."
    >
      <AttributeForm />
    </ComponentCard>
  );
}
