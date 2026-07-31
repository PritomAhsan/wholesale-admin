export function generateSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function titleScore(title: string) {
  if (!title.length) return 0;

  if (title.length >= 50 && title.length <= 60) return 100;

  if (title.length >= 40) return 80;

  return 50;
}

export function descriptionScore(description: string) {
  if (!description.length) return 0;

  if (
    description.length >= 140 &&
    description.length <= 160
  ) {
    return 100;
  }

  if (description.length >= 100) {
    return 80;
  }

  return 50;
}