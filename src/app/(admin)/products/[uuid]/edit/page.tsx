import EditProductManager from "@/features/products/edit/EditProductManager";

interface Props {
  params: Promise<{
    uuid: string;
  }>;
}

export default async function EditProductPage({
  params,
}: Props) {
  const { uuid } = await params;

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
          Edit Product
        </h1>

        <p className="text-gray-500 dark:text-gray-400">
          Update marketplace product.
        </p>

      </div>

      <EditProductManager
        uuid={uuid}
      />

    </div>
  );
}