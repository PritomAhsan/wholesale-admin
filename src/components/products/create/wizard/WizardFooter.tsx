"use client";

type Props = {
  current: number;
  total: number;
  onNext: () => void;
  onBack: () => void;
};

export default function WizardFooter({
  current,
  total,
  onNext,
  onBack,
}: Props) {
  return (
    <div className="mt-10 flex justify-between border-t pt-6">
      <button
        disabled={current === 0}
        onClick={onBack}
        className="rounded-lg border px-6 py-3 disabled:opacity-40"
      >
        Previous
      </button>

      <button
        onClick={onNext}
        className="rounded-lg bg-brand-600 px-8 py-3 text-white"
      >
        {current === total - 1
          ? "Publish Product"
          : "Continue"}
      </button>
    </div>
  );
}