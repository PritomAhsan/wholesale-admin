"use client";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function ProductFilters({
  search,
  setSearch,
}: Props) {
  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="grid gap-4 lg:grid-cols-5">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
        />

        <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-800">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Machinery</option>
        </select>

        <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-800">
          <option>All Status</option>
          <option>Draft</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
          <option>Published</option>
        </select>

        <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-800">
          <option>All Suppliers</option>
          <option>ABC Trading</option>
          <option>Global Tech</option>
        </select>

        <button className="rounded-lg bg-brand-600 py-2 font-medium text-white hover:bg-brand-700">
          Filter
        </button>

      </div>
    </div>
  );
}