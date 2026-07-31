"use client";

import { useEffect } from "react";

import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Switch from "@/components/form/switch/Switch";
import TagInput from "@/components/products/inputs/TagInput";

import { useProductWizard } from "@/context/ProductWizardContext";
import { generateSlug } from "./seoHelpers";

export default function SEOForm() {
  const { product, updateSEO } = useProductWizard();

  useEffect(() => {
    if (!product.seo.slug && product.basic.productName) {
      updateSEO({
        slug: generateSlug(product.basic.productName),
      });
    }
  }, [product.basic.productName]);

  return (
    <ComponentCard
      title="Search Engine Optimization"
      desc="Improve search visibility for this product."
    >
      <div className="space-y-6">
        {/* SEO Title */}
        <div>
          <Label>SEO Title</Label>

          <InputField
            value={product.seo.title}
            maxLength={60}
            placeholder="SEO Title"
            onChange={(e) =>
              updateSEO({ title: e.target.value })
            }
          />

          <p className="mt-1 text-right text-xs text-gray-500">
            {product.seo.title.length}/60
          </p>
        </div>

        {/* Meta Description */}
        <div>
          <Label>Meta Description</Label>

          <TextArea
            value={product.seo.description}
            rows={4}
            maxLength={160}
            placeholder="Meta Description"
            onChange={(value) =>
              updateSEO({ description: value })
            }
          />

          <p className="mt-1 text-right text-xs text-gray-500">
            {product.seo.description.length}/160
          </p>
        </div>

        {/* Slug */}
        <div>
          <Label>URL Slug</Label>

          <InputField
            value={product.seo.slug}
            placeholder="product-url"
            onChange={(e) =>
              updateSEO({ slug: e.target.value })
            }
          />
        </div>

        {/* Keywords */}
        <TagInput
          label="Meta Keywords"
          values={product.seo.keywords}
          onChange={(values) =>
            updateSEO({ keywords: values })
          }
        />

        {/* Canonical URL */}
        <div>
          <Label>Canonical URL</Label>

          <InputField
            value={product.seo.canonicalUrl}
            placeholder="https://example.com/product"
            onChange={(e) =>
              updateSEO({
                canonicalUrl: e.target.value,
              })
            }
          />
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <Switch
            label="Allow Search Engine Indexing"
            defaultChecked={product.seo.index}
            onChange={(checked) =>
              updateSEO({ index: checked })
            }
          />

          <Switch
            label="Follow Links"
            defaultChecked={product.seo.follow}
            onChange={(checked) =>
              updateSEO({ follow: checked })
            }
          />
        </div>
      </div>
    </ComponentCard>
  );
}