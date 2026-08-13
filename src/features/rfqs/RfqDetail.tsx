"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Paperclip } from "lucide-react";

import ComponentCard from "@/components/common/ComponentCard";
import Select from "@/components/form/Select";
import TextArea from "@/components/form/input/TextArea";
import Button from "@/components/ui/button/Button";

import RfqService from "@/api/services/rfq.service";
import { Rfq, RfqStatus } from "@/types/rfq";

import RfqStatusBadge from "./components/RfqStatusBadge";

interface Props {
  uuid: string;
}

const RESPONSE_STATUS_OPTIONS: {
  value: Extract<RfqStatus, "quoted" | "accepted" | "rejected" | "closed">;
  label: string;
}[] = [
  { value: "quoted", label: "Quoted" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "closed", label: "Closed" },
];

export default function RfqDetail({ uuid }: Props) {
  const [rfq, setRfq] = useState<Rfq | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [status, setStatus] = useState<string>("quoted");
  const [response, setResponse] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await RfqService.get(uuid);
      setRfq(data);
      setResponse(data.admin_response ?? "");
      if (data.status !== "pending") {
        setStatus(data.status);
      }
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Unable to load RFQ.");
    } finally {
      setLoading(false);
    }
  }, [uuid]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSend() {
    if (!response.trim()) {
      alert("Please write a response before sending.");
      return;
    }

    setSaving(true);

    try {
      const updated = await RfqService.respond(uuid, {
        status: status as Extract<
          RfqStatus,
          "quoted" | "accepted" | "rejected" | "closed"
        >,
        admin_response: response,
      });

      setRfq(updated);
    } catch (err) {
      console.error(err);
      alert("Failed to send response.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <ComponentCard title="RFQ Details" desc="">
      <Link
        href="/rfqs"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-400"
      >
        <ArrowLeft size={16} />
        Back to RFQs
      </Link>

      {loading && (
        <p className="py-10 text-center text-gray-400">Loading RFQ...</p>
      )}

      {!loading && error && (
        <p className="py-10 text-center text-error-500">{error}</p>
      )}

      {!loading && !error && rfq && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
                  {rfq.product_name}
                </h2>
                <p className="text-sm text-gray-500">
                  Submitted {new Date(rfq.created_at).toLocaleString()}
                </p>
              </div>

              <RfqStatusBadge status={rfq.status} />
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Buyer
                </h3>
                <p className="font-medium text-gray-800 dark:text-white/90">
                  {rfq.contact_name}
                </p>
                <p className="text-sm text-gray-500">{rfq.contact_email}</p>
                {rfq.contact_phone && (
                  <p className="text-sm text-gray-500">{rfq.contact_phone}</p>
                )}
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Requirements
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Quantity: {rfq.quantity} {rfq.unit}
                  <br />
                  {rfq.budget && (
                    <>
                      Budget: ${rfq.budget}
                      <br />
                    </>
                  )}
                  Destination: {rfq.destination_country}
                  <br />
                  {rfq.required_delivery_date && (
                    <>
                      Needed by:{" "}
                      {new Date(rfq.required_delivery_date).toLocaleDateString()}
                      <br />
                    </>
                  )}
                  {rfq.preferred_supplier_name && (
                    <>Preferred supplier: {rfq.preferred_supplier_name}</>
                  )}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-6 dark:border-gray-800">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Message
              </h3>
              <p className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                {rfq.message}
              </p>

              {rfq.attachment_url && (
                <a
                  href={rfq.attachment_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm text-brand-600 hover:underline"
                >
                  <Paperclip className="h-4 w-4" />
                  View attachment
                </a>
              )}
            </div>

            {rfq.admin_response && (
              <div className="mt-6 rounded-xl bg-gray-50 p-4 dark:bg-white/5">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Previous Response
                </h3>
                <p className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                  {rfq.admin_response}
                </p>
                {rfq.responded_at && (
                  <p className="mt-2 text-xs text-gray-400">
                    Sent {new Date(rfq.responded_at).toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-white/90">
              Respond to Buyer
            </h3>

            <div className="grid gap-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Outcome
                </label>
                <Select
                  value={status}
                  options={RESPONSE_STATUS_OPTIONS}
                  onChange={setStatus}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Response
                </label>
                <TextArea
                  value={response}
                  onChange={setResponse}
                  rows={6}
                  placeholder="Price, MOQ, lead time, shipping terms, etc."
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button onClick={handleSend} disabled={saving}>
                {saving ? "Sending..." : "Send Response"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </ComponentCard>
  );
}
