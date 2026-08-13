"use client";

import { Search } from "lucide-react";

import InputField from "@/components/form/input/InputField";
import Select from "@/components/form/Select";

interface Props {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function OrderToolbar({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row">
      <div className="relative w-full sm:max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <InputField
          placeholder="Search by order number..."
          className="pl-11"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="w-full sm:w-48">
        <Select
          placeholder="Status"
          value={status}
          options={[
            { value: "", label: "All Status" },
            { value: "pending", label: "Pending" },
            { value: "processing", label: "Processing" },
            { value: "completed", label: "Completed" },
            { value: "cancelled", label: "Cancelled" },
          ]}
          onChange={onStatusChange}
        />
      </div>
    </div>
  );
}
