export type UserRole =
  | "owner"
  | "admin"
  | "supplier";

export interface AuthUser {
  id: number;

  name: string;

  email: string;

  role: UserRole;

  avatar?: string;
}

export interface AuthState {
  user: AuthUser | null;

  token: string | null;

  authenticated: boolean;

  loading: boolean;
}