export interface GenerateSkuOptions {
  prefix: string;
  separator?: string;
}

export function generateSku(
  attributes: Record<string, string>,
  index: number,
  options: GenerateSkuOptions
) {
  const separator = options.separator ?? "-";

  const values = Object.values(attributes).map((value) =>
    value
      .trim()
      .replace(/\s+/g, "")
      .substring(0, 3)
      .toUpperCase()
  );

  return [
    options.prefix.toUpperCase(),
    ...values,
    String(index + 1).padStart(3, "0"),
  ].join(separator);
}

export function generateAllSkus<
  T extends {
    attributes: Record<string, string>;
    sku: string;
  }
>(
  variants: T[],
  options: GenerateSkuOptions
): T[] {
  const used = new Set<string>();

  return variants.map((variant, index) => {
    let sku = generateSku(
      variant.attributes,
      index,
      options
    );

    while (used.has(sku)) {
      sku += "-1";
    }

    used.add(sku);

    return {
      ...variant,
      sku,
    };
  });
}