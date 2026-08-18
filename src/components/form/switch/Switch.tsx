"use client";

import React from "react";

interface SwitchProps {
  label?: string;

  checked?: boolean;

  defaultChecked?: boolean;

  disabled?: boolean;

  onChange?: (checked: boolean) => void;

  color?: "blue" | "gray";
}

export default function Switch({
  label = "",

  checked,

  defaultChecked = false,

  disabled = false,

  onChange,

  color = "blue",
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;

    if (!isControlled) setInternalChecked(!currentChecked);

    onChange?.(!currentChecked);
  };

  const switchColors =
    color === "blue"
      ? {
          background: currentChecked
            ? "bg-brand-500"
            : "bg-gray-200 dark:bg-white/10",

          knob: currentChecked
            ? "translate-x-full bg-white"
            : "translate-x-0 bg-white",
        }
      : {
          background: currentChecked
            ? "bg-gray-800"
            : "bg-gray-200 dark:bg-white/10",

          knob: currentChecked
            ? "translate-x-full bg-white"
            : "translate-x-0 bg-white",
        };

  return (
    <label
      className={`flex cursor-pointer select-none items-center gap-3 text-sm font-medium ${
        disabled
          ? "text-gray-400"
          : "text-gray-700 dark:text-gray-400"
      }`}
      onClick={handleToggle}
    >
      <div className="relative">
        <div
          className={`block h-6 w-11 rounded-full transition ${
            disabled
              ? "pointer-events-none bg-gray-100 dark:bg-gray-800"
              : switchColors.background
          }`}
        />

        <div
          className={`absolute left-0.5 top-0.5 h-5 w-5 transform rounded-full shadow-theme-sm transition ${switchColors.knob}`}
        />
      </div>

      {label}
    </label>
  );
}