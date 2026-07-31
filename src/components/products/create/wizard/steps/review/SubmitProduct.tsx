"use client";

import Button from "@/components/ui/button/Button";
import ComponentCard from "@/components/common/ComponentCard";

import { useProductWizard } from "@/context/ProductWizardContext";

export default function SubmitProduct() {
  const { product } = useProductWizard();

  const handleSubmit = async () => {
    try {
      console.log("Submitting Product", product);

      /*
      API Integration (Next Phase)

      await productApi.create(product);
      */

      alert("Product submitted successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to submit product.");
    }
  };

  return (
    <ComponentCard
      title="Submit Product"
      desc="Review everything before submitting."
    >
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={handleSubmit}
          className="bg-brand-600 hover:bg-brand-700"
        >
          Submit Product
        </Button>
      </div>
    </ComponentCard>
  );
}