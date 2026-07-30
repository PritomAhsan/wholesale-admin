"use client";

import { useState } from "react";

import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";

import Input from "@/components/form/input/InputField";
import TagInput from "@/components/products/inputs/TagInput";

import { useProductWizard } from "@/context/ProductWizardContext";

export default function StepCategory() {
  const { product, updateCategory } = useProductWizard();

  const [tags, setTags] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      <ComponentCard
        title="Category & Brand"
        desc="Organize your product correctly so buyers can discover it easily."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Label>Category</Label>

            <Select
              defaultValue={
                product.category.categoryId
                  ? String(product.category.categoryId)
                  : ""
              }
              placeholder="Select Category"
              options={[
                { value: "1", label: "Electronics" },
                { value: "2", label: "Machinery" },
                { value: "3", label: "Fashion" },
                { value: "4", label: "Furniture" },
              ]}
              onChange={(value) =>
                updateCategory({
                  categoryId: Number(value),
                })
              }
            />
          </div>

          <div>
            <Label>Sub Category</Label>

            <Select
              defaultValue={
                product.category.subCategoryId
                  ? String(product.category.subCategoryId)
                  : ""
              }
              placeholder="Select Sub Category"
              options={[
                { value: "11", label: "Mobile Phones" },
                { value: "12", label: "Laptops" },
                { value: "13", label: "Accessories" },
              ]}
              onChange={(value) =>
                updateCategory({
                  subCategoryId: Number(value),
                })
              }
            />
          </div>

          <div>
            <Label>Brand</Label>

            <Select
              defaultValue={
                product.category.brandId
                  ? String(product.category.brandId)
                  : ""
              }
              placeholder="Select Brand"
              options={[
                { value: "1", label: "Apple" },
                { value: "2", label: "Samsung" },
                { value: "3", label: "Dell" },
                { value: "4", label: "HP" },
              ]}
              onChange={(value) =>
                updateCategory({
                  brandId: Number(value),
                })
              }
            />
          </div>

          <div>
            <Label>Manufacturer</Label>

            <Input
              placeholder="Manufacturer Name"
            />
          </div>

          <div>
            <Label>Country of Origin</Label>

            <Input
              placeholder="China, Bangladesh..."
            />
          </div>

          <div>
            <Label>HS Code</Label>

            <Input
              placeholder="Optional HS Code"
            />
          </div>
        </div>

        <div className="pt-6 border-t mt-6">
          <TagInput
            label="Product Tags"
            values={tags}
            onChange={setTags}
            placeholder="Add search keywords..."
          />
        </div>
      </ComponentCard>
    </div>
  );
}