import { UserRole } from "@/types/auth";

export function hasRole(
  role: UserRole,
  roles: UserRole[]
) {
  return roles.includes(role);
}