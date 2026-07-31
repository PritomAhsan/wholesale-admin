"use client";

import { useState } from "react";

import { AppInput } from "@/components/ui/app-input";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function KeywordsInput({
  value,
  onChange,
}: Props) {
  const [keyword, setKeyword] =
    useState("");

  const addKeyword = () => {
    const text = keyword.trim();

    if (!text) return;

    if (value.includes(text)) {
      setKeyword("");
      return;
    }

    onChange([...value, text]);

    setKeyword("");
  };

  const removeKeyword = (
    item: string
  ) => {
    onChange(
      value.filter((x) => x !== item)
    );
  };

  return (
    <div className="space-y-3">
      <AppInput
        label="Meta Keywords"
        placeholder="Press Enter to add"
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addKeyword();
          }
        }}
      />

      <div className="flex flex-wrap gap-2">
        {value.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() =>
              removeKeyword(item)
            }
            className="rounded-full bg-brand-100 px-3 py-1 text-sm text-brand-700"
          >
            {item} ×
          </button>
        ))}
      </div>
    </div>
  );
}