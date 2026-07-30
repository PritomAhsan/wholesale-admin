"use client";

import { PRODUCT_STEPS } from "./wizardSteps";

type Props = {
  current: number;
};

export default function WizardStepper({
  current,
}: Props) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {PRODUCT_STEPS.map((step, index) => {
        const active = current === index;
        const completed = index < current;

        return (
          <div
            key={step}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 transition ${
              active
                ? "border-brand-600 bg-brand-600 text-white"
                : completed
                ? "border-green-600 bg-green-50 text-green-700"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-700">
              {completed ? "✓" : index + 1}
            </div>

            <span className="font-medium">
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}