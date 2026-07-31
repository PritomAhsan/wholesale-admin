"use client";

import ComponentCard from "@/components/common/ComponentCard";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function ReviewSection({
  title,
  children,
}: Props) {
  return (
    <ComponentCard title={title}>
      <div className="space-y-3">
        {children}
      </div>
    </ComponentCard>
  );
}