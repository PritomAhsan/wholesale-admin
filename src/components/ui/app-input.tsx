import React from "react";

import Label from "@/components/form/Label";

interface AppInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  error?: boolean;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  className = "",
  hint,
  error = false,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && <Label>{label}</Label>}

      <input
        {...props}
        className={`h-11 w-full rounded-lg border appearance-none bg-transparent px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 transition ${
          error
            ? "text-error-700 border-error-500 focus:ring-error-500/10 dark:border-error-500"
            : "text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        } ${className}`}
      />

      {hint && (
        <p className={`text-xs ${error ? "text-red-500" : "text-gray-500"}`}>
          {hint}
        </p>
      )}
    </div>
  );
};
