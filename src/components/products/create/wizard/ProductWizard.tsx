"use client";

import { useState } from "react";

import { ProductWizardProvider } from "@/context/ProductWizardContext";

import WizardStepper from "./WizardStepper";
import WizardFooter from "./WizardFooter";

import StepBasic from "./steps/StepBasic";
import StepCategory from "./steps/StepCategory";
import StepPricing from "./steps/StepPricing";
import StepVariants from "./steps/StepVariants";
import StepInventory from "./steps/StepInventory";
import StepShipping from "./steps/StepShipping";
import StepMedia from "./steps/StepMedia";
// import StepSEO from "./steps/StepSEO";
// import StepReview from "./steps/StepReview";

const wizardSteps = [
  StepBasic,
  StepCategory,
  StepPricing,
  StepVariants,
  StepInventory,
  StepShipping,
  StepMedia,
//   StepSEO,
//   StepReview,
];

export default function ProductWizard() {
  return (
    <ProductWizardProvider>
      <WizardContent />
    </ProductWizardProvider>
  );
}

function WizardContent() {
  const [currentStep, setCurrentStep] = useState(0);

  const CurrentStepComponent =
    wizardSteps[currentStep];

  const nextStep = () => {
    if (currentStep >= wizardSteps.length - 1)
      return;

    setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    if (currentStep <= 0) return;

    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="space-y-8">

      <WizardStepper
        current={currentStep}
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

        <CurrentStepComponent />

      </div>

      <WizardFooter
        current={currentStep}
        total={wizardSteps.length}
        onNext={nextStep}
        onBack={previousStep}
      />

    </div>
  );
}