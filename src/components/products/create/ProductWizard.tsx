"use client";

import { useState } from "react";

import ProductWizardStepper from "./ProductWizardStepper";
import BasicInformationStep from "./steps/BasicInformationStep";
import MediaStep from "./steps/MediaStep";

import { ProductFormData } from "@/types/product";

const steps = [
  "Basic Information",
  "Category",
  "Media",
  "Specifications",
  "Shipping",
  "Review",
];

export default function ProductWizard() {
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] =
    useState<ProductFormData>({
      productName: "",
      shortDescription: "",

      categoryId: "",

      brandId: "",

      unitId: "",

      productType: "physical",

      moq: 1,
    });

  const updateField = (
    key: keyof ProductFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previous = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      <ProductWizardStepper
        currentStep={currentStep}
        steps={steps}
      />

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">

        {currentStep === 0 && (
            <BasicInformationStep
                formData={formData}
                updateField={updateField}
            />
        )}

        {currentStep === 2 && (
            <MediaStep />
        )}

      </div>

      <div className="flex justify-between">

        <button
          onClick={previous}
          disabled={currentStep === 0}
          className="rounded-lg border px-5 py-2 disabled:opacity-40"
        >
          Previous
        </button>

        <div className="flex gap-3">

          <button className="rounded-lg border px-5 py-2">
            Save Draft
          </button>

          <button
            onClick={next}
            className="rounded-lg bg-brand-600 px-6 py-2 text-white"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}