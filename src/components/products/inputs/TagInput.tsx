"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  label?: string;
  placeholder?: string;
  values: string[];
  onChange: (values: string[]) => void;
  maxTags?: number;
}

export default function TagInput({
  label,
  placeholder = "Press Enter to add...",
  values,
  onChange,
  maxTags = 30,
}: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const value = input.trim();

    if (!value) return;

    if (values.includes(value)) {
      setInput("");
      return;
    }

    if (values.length >= maxTags) return;

    onChange([...values, value]);

    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(values.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div className="rounded-xl border border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-900">
        <div className="flex flex-wrap gap-2 mb-2">
          {values.map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 px-3 py-1 text-sm"
            >
              {tag}

              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 hover:text-red-500"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        <input
          value={input}
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }

            if (e.key === "," || e.key === "Tab") {
              e.preventDefault();
              addTag();
            }
          }}
          className="w-full bg-transparent outline-none text-sm py-2"
        />
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Press <b>Enter</b>, <b>Tab</b>, or <b>,</b> to add tags.
      </p>
    </div>
  );
}