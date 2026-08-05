// // import ProductWizard from "@/components/products/create/ProductWizard";
// import ProductWizard from "@/components/products/create/wizard/ProductWizard";

// export default function CreateProductPage() {
//   return (
//     <div className="space-y-6">

//       <div>
//         <h1 className="text-2xl font-bold">
//           Create Product
//         </h1>

//         <p className="text-gray-500">
//           Add a new marketplace product.
//         </p>
//       </div>

//       <ProductWizard />

//     </div>
//   );
// }

import CreateProductManager from "@/features/products/create/CreateProductManager";

export default function CreateProductPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Create Product
        </h1>

        <p className="text-gray-500">
          Add a new marketplace product.
        </p>
      </div>

      <CreateProductManager />

    </div>
  );
}