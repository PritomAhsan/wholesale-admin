"use client";

import { AppInput } from "@/components/ui/app-input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SlugInput({
  value,
  onChange,
}: Props) {
  return (
    <AppInput
      label="URL Slug"
      placeholder="product-url-slug"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
}