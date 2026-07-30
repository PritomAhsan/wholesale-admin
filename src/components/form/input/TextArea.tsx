import React from "react";

interface TextAreaProps {
  value?: string;

  defaultValue?: string;

  onChange?: (
    value: string
  ) => void;

  placeholder?: string;

  rows?: number;

  className?: string;

  disabled?: boolean;

  error?: boolean;

  hint?: string;

  maxLength?: number;
}

export default function TextArea({
  value,

  defaultValue,

  onChange,

  placeholder = "",

  rows = 5,

  className = "",

  disabled = false,

  error = false,

  hint,

  maxLength,
}: TextAreaProps) {
  return (
    <div className="space-y-1">
      <textarea
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        onChange={(e) =>
          onChange?.(e.target.value)
        }
        className={`w-full rounded-lg border px-4 py-3 text-sm transition
        ${
          error
            ? "border-red-500"
            : "border-gray-300 dark:border-gray-700"
        }
        bg-transparent
        dark:bg-gray-900
        dark:text-white
        focus:border-brand-500
        focus:outline-none
        ${className}`}
      />

      {hint && (
        <p
          className={`text-xs ${
            error
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
}