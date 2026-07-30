type Props = {
  currentStep: number;
  steps: string[];
};

export default function ProductWizardStepper({
  currentStep,
  steps,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">

      <div className="flex flex-wrap items-center gap-4">

        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-center"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                index <= currentStep
                  ? "bg-brand-600 text-white"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {index + 1}
            </div>

            <span className="ml-3 mr-5 text-sm font-medium">
              {step}
            </span>

            {index !== steps.length - 1 && (
              <div className="h-[2px] w-10 bg-gray-300" />
            )}
          </div>
        ))}

      </div>

    </div>
  );
}