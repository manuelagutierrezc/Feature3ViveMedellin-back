"use client";

import { createContext, useContext, useMemo } from "react";
import { useAuthState } from "./use-auth-state";
import type { AuthContextType } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const authState = useAuthState();

  const value = useMemo(
    () => ({
      user: authState.user,
      isAuthenticated: authState.isAuthenticated,
      login: authState.login,
      logout: authState.logout,
      isLoading: authState.isLoading,
    }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
} 