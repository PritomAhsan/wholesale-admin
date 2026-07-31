"use client";

interface Props {
  label: string;
  description?: string;
  value: number;
  min?: number;
  onChange: (value: number) => void;
}

export default function InventoryNumberInput({
  label,
  description,
  value,
  min = 0,
  onChange,
}: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      {description && (
        <p className="mb-3 text-sm text-gray-500">
          {description}
        </p>
      )}

      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900"
      />
    </div>
  );
}