"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ComponentCard from "@/components/common/ComponentCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AttributeService from "@/api/services/attribute.service";

import { Attribute, AttributeValue } from "@/types/attribute";

import AddAttributeValueForm from "./components/AddAttributeValueForm";
import AttributeValueRow from "./components/AttributeValueRow";

interface Props {
  uuid: string;
}

export default function AttributeValuesManager({ uuid }: Props) {
  const [attribute, setAttribute] = useState<Attribute | null>(null);
  const [values, setValues] = useState<AttributeValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);

      const [attributeResponse, valuesResponse] = await Promise.all([
        AttributeService.get(uuid),
        AttributeService.getValues(uuid, { per_page: 100 }),
      ]);

      setAttribute(attributeResponse);
      setValues(valuesResponse.items);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Attribute not found.");
    } finally {
      setLoading(false);
    }
  }, [uuid]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <ComponentCard title="Attribute Values" desc="Loading...">
        <div className="py-12 text-center">Loading...</div>
      </ComponentCard>
    );
  }

  if (error || !attribute) {
    return (
      <ComponentCard title="Attribute Values" desc="Attribute not found.">
        <div className="py-12 text-center text-red-500">{error}</div>
      </ComponentCard>
    );
  }

  return (
    <ComponentCard
      title={`${attribute.name} — Values`}
      desc={`Manage the selectable values for "${attribute.name}".`}
    >
      <Link
        href="/attributes"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600"
      >
        <ArrowLeft size={16} />
        Back to attributes
      </Link>

      <AddAttributeValueForm attributeUuid={uuid} onAdded={load} />

      {values.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:text-gray-400 dark:border-gray-800 dark:bg-white/[0.03]">
          No values yet. Add the first one above.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Value</TableCell>
                  <TableCell isHeader>Sort Order</TableCell>
                  <TableCell isHeader>Status</TableCell>
                  <TableCell isHeader className="text-right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {values.map((value) => (
                  <AttributeValueRow
                    key={value.uuid}
                    value={value}
                    onChanged={load}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </ComponentCard>
  );
}
