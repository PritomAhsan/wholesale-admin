"use client";

import {
  ProductVariantAttribute,
} from "@/types/productWizard";

import {
  useProductWizard,
} from "@/context/ProductWizardContext";
import VariantValueEditor from "./VariantValueEditor";

import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

interface Props {
  attribute: ProductVariantAttribute;
}

export default function VariantAttributeCard({
  attribute,
}: Props) {
  const { product, updateVariants } =
    useProductWizard();

  const updateAttribute = (
    data: Partial<ProductVariantAttribute>
  ) => {
    updateVariants({
      attributes:
        product.variants.attributes.map((item) =>
          item.id === attribute.id
            ? {
                ...item,
                ...data,
              }
            : item
        ),
    });
  };

  const removeAttribute = () => {
    updateVariants({
      attributes:
        product.variants.attributes.filter(
          (item) =>
            item.id !== attribute.id
        ),
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700 space-y-4">

      <div className="flex flex-col gap-5">

        <div>

          <Input
            placeholder="Attribute Name (Color, Size...)"
            defaultValue={attribute.name}
            onChange={(e) =>
              updateAttribute({
                name: e.target.value,
              })
            }
          />

          <VariantValueEditor
            values={attribute.values}
            onChange={(values) =>
                updateAttribute({
                values,
                })
            }
        />

        </div>

      </div>
      <div className="flex justify-end">

            <Button
                variant="outline"
                onClick={removeAttribute}
            >
                Remove Attribute
            </Button>

        </div>

    </div>
  );
}