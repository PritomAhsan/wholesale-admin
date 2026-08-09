export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  uuid: string;
  first_name: string;
  last_name: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  status: string;
  email_verified_at: string | null;
  last_login_at: string | null;
  created_at: string;
  roles: string[];
  permissions: string[];
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}
