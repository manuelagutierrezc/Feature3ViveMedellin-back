import type { User } from "@/lib/api/auth";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (creds: LoginRequest) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface DecodedToken {
  userId?: number | string;
  sub?: string;
  exp?: number;
} 