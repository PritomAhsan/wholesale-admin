"use client";

interface InventorySwitchProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export default function InventorySwitch({
  label,
  description,
  checked,
  onChange,
}: InventorySwitchProps) {
  return (
    <div className="flex items-start justify-between rounded-xl border border-gray-200 p-4 dark:border-gray-700">
      <div className="pr-4">
        <h4 className="font-medium">
          {label}
        </h4>

        {description && (
          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        )}
      </div>

      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) =>
            onChange(e.target.checked)
          }
        />

        <div className="h-6 w-11 rounded-full bg-gray-300 transition peer-checked:bg-brand-600 peer-focus:ring-2 peer-focus:ring-brand-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-5" />
      </label>
    </div>
  );
}