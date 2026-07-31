"use client";

interface Props {
  current: number;
  max: number;
}

export default function SEOCharacterCounter({
  current,
  max,
}: Props) {
  const remaining = max - current;

  const color =
    remaining < 0
      ? "text-red-600"
      : remaining < 10
      ? "text-amber-600"
      : "text-gray-500";

  return (
    <p className={`text-xs ${color}`}>
      {current}/{max}
    </p>
  );
}