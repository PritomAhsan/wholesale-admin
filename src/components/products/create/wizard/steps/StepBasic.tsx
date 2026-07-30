"use client";

import { useMemo } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Select from "@/components/form/Select";
import { useProductWizard } from "@/context/ProductWizardContext";

export default function StepBasic() {
  const { product, updateBasic } = useProductWizard();
  const basic = product.basic;

  const slug = useMemo(
    () =>
      basic.productName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    [basic.productName]
  );

  const update = (k: keyof typeof basic, v: any) => {
    if (k === "productName") {
      updateBasic({ productName: v, slug: v.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"-") });
    } else {
      updateBasic({ [k]: v } as any);
    }
  };

  return (
    <div className="space-y-6">
      <ComponentCard
        title="Basic Product Information"
        desc="Core information about your marketplace product."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <Label>Product Name</Label>
            <InputField
              placeholder="Premium Wireless Headphones"
              defaultValue={basic.productName}
              onChange={(e)=>update("productName",e.target.value)}
            />
          </div>

          <div>
            <Label>Slug</Label>
            <InputField
              defaultValue={slug}
              disabled
              hint="Automatically generated from product name."
            />
          </div>

          <div className="lg:col-span-2">
            <Label>Short Description</Label>
            <TextArea
              rows={3}
              value={basic.shortDescription}
              onChange={(v)=>update("shortDescription",v)}
              hint={`${basic.shortDescription.length}/250 characters`}
            />
          </div>

          <div className="lg:col-span-2">
            <Label>Full Description</Label>
            <TextArea
              rows={8}
              value={basic.description}
              onChange={(v)=>update("description",v)}
            />
          </div>

          <div>
            <Label>Product Type</Label>
            <Select
              defaultValue={basic.productType}
              onChange={(v)=>update("productType",v)}
              options={[
                {value:"physical",label:"Physical Product"},
                {value:"digital",label:"Digital Product"},
                {value:"service",label:"Service"},
              ]}
            />
          </div>

          <div>
            <Label>Condition</Label>
            <Select
              defaultValue={basic.condition}
              onChange={(v)=>update("condition",v)}
              options={[
                {value:"new",label:"New"},
                {value:"used",label:"Used"},
                {value:"refurbished",label:"Refurbished"},
              ]}
            />
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}