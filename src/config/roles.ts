export const Roles = {
  OWNER: "owner",
  ADMIN: "admin",
  SUPPLIER: "supplier",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];