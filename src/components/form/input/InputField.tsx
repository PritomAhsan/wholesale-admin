import React, { FC } from "react";

interface InputProps {
  type?:
    | "text"
    | "number"
    | "email"
    | "password"
    | "date"
    | "time"
    | string;

  id?: string;
  name?: string;

  placeholder?: string;

  value?: string | number;

  defaultValue?: string | number;

  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  className?: string;

  min?: string;

  max?: string;

  step?: number;

  disabled?: boolean;

  success?: boolean;

  error?: boolean;

  hint?: string;

  autoComplete?: string;

  required?: boolean;

  readOnly?: boolean;

  maxLength?: number;
}

const InputField: FC<InputProps> = ({
  type = "text",

  id,

  name,

  placeholder,

  value,

  defaultValue,

  onChange,

  className = "",

  min,

  max,

  step,

  disabled = false,

  success = false,

  error = false,

  hint,

  autoComplete,

  required = false,

  readOnly = false,

  maxLength,
}) => {
  let inputClasses =
    "h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 transition";

  if (disabled) {
    inputClasses +=
      " text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
  } else if (error) {
    inputClasses +=
      " text-error-700 border-error-500 focus:ring-error-500/10 dark:border-error-500";
  } else if (success) {
    inputClasses +=
      " text-success-700 border-success-400 focus:ring-success-500/10";
  } else {
    inputClasses +=
      " bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white";
  }

  return (
    <div className="space-y-1">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete={autoComplete}
        required={required}
        maxLength={maxLength}
        className={`${inputClasses} ${className}`}
      />

      {hint && (
        <p
          className={`text-xs ${
            error
              ? "text-red-500"
              : success
              ? "text-green-500"
              : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default InputField;