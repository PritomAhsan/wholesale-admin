export interface ProductImage {
  id: string;

  // Local file before upload
  file?: File;

  // Preview URL or uploaded image URL
  url: string;

  // Original filename
  name: string;

  // MIME type
  type: string;

  // Size in bytes
  size: number;

  // Gallery
  isPrimary: boolean;

  // Display order
  sortOrder: number;

  // Optional alt text
  alt?: string;
}

export interface ProductMedia {
  images: ProductImage[];
}