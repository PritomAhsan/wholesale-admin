import CreateProductManager from "@/features/products/create/CreateProductManager";

export default function CreateProductPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
          Create Product
        </h1>

        <p className="text-gray-500 dark:text-gray-400">
          Add a new marketplace product.
        </p>
      </div>

      <CreateProductManager />

    </div>
  );
}
