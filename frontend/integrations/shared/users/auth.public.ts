// src/integrations/types/auth.public.ts
import type { UserRoleName } from './users';

export interface AuthUser {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  email_verified: number | boolean;
  is_active: number | boolean;
  role: UserRoleName;
}

export interface AuthTokenResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
}

export interface AuthStatusResponse {
  authenticated: boolean;
  is_admin: boolean;
  user?: {
    id: string;
    email: string | null;
    role: UserRoleName;
  };
}

export interface AuthMeResponse {
  user: {
    id: string;
    email: string | null;
    role: UserRoleName;
  };
}

export interface PasswordResetRequestResponse {
  success: boolean;
  message?: string;
  token?: string;
}

export interface PasswordResetConfirmResponse {
  success: boolean;
  message: string;
}

export interface AuthTokenRefreshResponse {
  access_token: string;
  token_type: string;
}

export interface AuthSignupBody {
  email: string;
  password: string;
  full_name?: string;
  phone?: string;
  options?: {
    data?: Record<string, unknown>;
  };
}

export interface AuthTokenBody {
  email: string;
  password: string;
  grant_type?: 'password';
}

export interface AuthUpdateBody {
  email?: string;
  password?: string;
}

export interface PasswordResetRequestBody {
  email: string;
}

export interface PasswordResetConfirmBody {
  token: string;
  password: string;
}
