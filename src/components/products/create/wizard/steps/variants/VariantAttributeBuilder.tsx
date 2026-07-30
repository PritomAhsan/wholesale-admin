"use client";

import { useProductWizard } from "@/context/ProductWizardContext";

import ComponentCard from "@/components/common/ComponentCard";

import Button from "@/components/ui/button/Button";

import VariantAttributeCard from "./VariantAttributeCard";

import { nanoid } from "nanoid";

export default function VariantAttributeBuilder() {
  const { product, updateVariants } = useProductWizard();

  const addAttribute = () => {
    updateVariants({
      attributes: [
        ...product.variants.attributes,
        {
          id: nanoid(),
          name: "",
          values: [],
        },
      ],
    });
  };

  return (
    <ComponentCard
      title="Variant Attributes"
      desc="Build attributes that define your product variations."
    >
      <div className="space-y-5">

        {product.variants.attributes.map((attribute) => (
          <VariantAttributeCard
            key={attribute.id}
            attribute={attribute}
          />
        ))}

        <Button
          onClick={addAttribute}
        >
          + Add Attribute
        </Button>

      </div>
    </ComponentCard>
  );
}