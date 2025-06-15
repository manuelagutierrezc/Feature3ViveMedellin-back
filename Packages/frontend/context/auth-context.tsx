"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { loginUser, type LoginRequest, type User } from "@/lib/api/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (creds: LoginRequest) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Guardar usuario en localStorage (solo en cliente)
const saveUserToStorage = (user: User) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  }
};

// Obtener usuario de localStorage (solo en cliente)
const getUserFromStorage = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error getting user from storage:', error);
    return null;
  }
};

// Leer JWT desde cookie
const getTokenFromCookies = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  const match = /(^| )jwt=([^;]+)/.exec(document.cookie);
  return match ? match[2] : null;
};

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si hay un token y obtener el usuario
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getTokenFromCookies();
        const storedUser = getUserFromStorage();

        if (!token) {
          console.log("🔐 No hay token en cookies");
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Verificar que el token sea válido
        const decodedToken = jwtDecode<{
          userId?: number | string;
          sub?: string;
          exp?: number;
        }>(token);

        // Verificar si el token ha expirado
        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          console.log("⏰ Token expirado");
          logout();
          return;
        }

        const userId = decodedToken.userId?.toString() ?? decodedToken.sub;
        if (!userId) {
          throw new Error('No user ID in token');
        }

        // Configurar token globalmente
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Si tenemos un usuario almacenado con el mismo ID, usarlo
        if (storedUser && storedUser.id === userId) {
          setUser(storedUser);
          console.log("✅ Usuario restaurado desde storage:", storedUser);
        } else {
          // Si no, necesitamos obtener la información del usuario
          // Por ahora usaremos la información del storage si existe
          console.warn("⚠️ No se encontró información del usuario");
          logout();
        }
      } catch (err) {
        console.error("⛔ Error de autenticación:", err);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Función de login
  const login = async (credentials: LoginRequest) => {
    try {
      console.log("🔵 Intentando iniciar sesión con:", credentials.email);
      const { token, user: userFromLogin } = await loginUser(credentials);
      
      // Guardar en cookie (httpOnly sería mejor, pero requiere cambios en el backend)
      document.cookie = `jwt=${token};path=/;max-age=${60 * 60 * 24 * 7};SameSite=Lax`; // 7 días
      
      // Configurar token globalmente
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Guardar usuario en estado y storage
      setUser(userFromLogin);
      saveUserToStorage(userFromLogin);

      console.log("✅ Login correcto, usuario:", userFromLogin);
    } catch (error) {
      console.error("⛔ Error en login:", error);
      throw error;
    }
  };

  // Función de logout
  const logout = () => {
    if (typeof window !== 'undefined') {
      document.cookie = "jwt=;path=/;max-age=0;SameSite=Lax";
      localStorage.removeItem('user');
    }
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    console.log("👋 Sesión cerrada");
  };

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
      isLoading,
    }),
    [user, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
}
