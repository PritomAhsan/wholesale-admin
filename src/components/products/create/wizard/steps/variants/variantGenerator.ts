import { ProductVariantAttribute, ProductVariantItem } from "@/types/productWizard";

export function generateVariantCombinations(
  attributes: ProductVariantAttribute[]
): ProductVariantItem[] {
  if (!attributes.length) return [];

  const activeAttributes = attributes.filter(
    (attribute) => attribute.values.length > 0
  );

  if (!activeAttributes.length) return [];

  const combinations: Record<string, string>[] = [];

  const build = (
    index: number,
    current: Record<string, string>
  ) => {
    if (index === activeAttributes.length) {
      combinations.push({ ...current });
      return;
    }

    const attribute = activeAttributes[index];

    attribute.values.forEach((value) => {
      build(index + 1, {
        ...current,
        [attribute.name]: value,
      });
    });
  };

  build(0, {});

  return combinations.map((attributes, index) => {
    const title = Object.values(attributes).join(" / ");

    return {
      id: crypto.randomUUID(),

      sku: `SKU-${index + 1}`,

      title,

      attributes,

      price: 0,

      comparePrice: 0,

      costPrice: 0,

      quantity: 0,

      weight: 0,

      barcode: "",

      image: null,

      active: true,
    };
  });
}