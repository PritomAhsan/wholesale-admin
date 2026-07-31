export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export function validateImage(file: File) {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "Only JPG, PNG and WebP images are allowed.";
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return "Image size must not exceed 5 MB.";
  }

  return null;
}