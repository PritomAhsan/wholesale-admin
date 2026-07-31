"use client";

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export default function DimensionInput({
  label,
  value,
  onChange,
}: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        type="number"
        min={0}
        step="0.01"
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
        className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
      />
    </div>
  );
}