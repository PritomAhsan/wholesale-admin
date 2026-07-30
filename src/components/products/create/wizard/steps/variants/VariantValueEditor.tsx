"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";

interface Props {
  values: string[];
  onChange: (values: string[]) => void;
}

export default function VariantValueEditor({
  values,
  onChange,
}: Props) {
  const [value, setValue] = useState("");

  const addValue = () => {
    const trimmed = value.trim();

    if (!trimmed) return;

    if (values.includes(trimmed)) return;

    onChange([...values, trimmed]);

    setValue("");
  };

  const removeValue = (item: string) => {
    onChange(values.filter((v) => v !== item));
  };

  return (
    <div className="space-y-5">

      <div className="flex gap-3">

        <Input
          placeholder="Example: Red"
          defaultValue=""
          onChange={(e) => setValue(e.target.value)}
        />

        <Button onClick={addValue}>
          Add
        </Button>

      </div>

      <div className="flex flex-wrap gap-3">

        {values.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => removeValue(item)}
            className="rounded-full bg-brand-50 border border-brand-200 px-4 py-2 text-sm hover:bg-red-100 transition"
          >
            {item} ✕
          </button>
        ))}

      </div>

    </div>
  );
}