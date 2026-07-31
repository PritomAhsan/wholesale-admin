export interface ProductSEO {
  title: string;
  slug: string;

  description: string;

  keywords: string[];

  canonicalUrl: string;

  index: boolean;

  follow: boolean;
}