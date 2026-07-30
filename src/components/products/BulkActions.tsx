"use client";

export default function BulkActions() {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">

      <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800">
        <option>Bulk Actions</option>
        <option>Approve</option>
        <option>Reject</option>
        <option>Publish</option>
        <option>Unpublish</option>
        <option>Delete</option>
      </select>

      <button className="rounded-lg bg-brand-600 px-5 py-2 text-white hover:bg-brand-700">
        Apply
      </button>

    </div>
  );
}