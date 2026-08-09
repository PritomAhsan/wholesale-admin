// Must match the Spatie role names seeded in the API
// (see api/database/seeders/RoleSeeder.php).
export const Roles = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  SUPPLIER: "Supplier",
  CUSTOMER: "Customer",
  SUPPORT: "Support",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

// Roles allowed to sign in to this admin panel at all.
// "Customer" is deliberately excluded — that role is for the
// storefront, not this app.
export const ADMIN_PANEL_ROLES: Role[] = [
  Roles.SUPER_ADMIN,
  Roles.ADMIN,
  Roles.SUPPLIER,
];
