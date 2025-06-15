import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { loginUser } from "@/lib/api/auth";
import { getTokenFromCookies, getUserFromStorage, saveUserToStorage, setAuthToken, removeAuthToken } from "@/utils/auth-helpers";
import type { LoginRequest, DecodedToken } from "@/types/auth";
import type { User } from "@/lib/api/auth";

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

        const decodedToken = jwtDecode<DecodedToken>(token);

        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          console.log("⏰ Token expirado");
          handleLogout();
          return;
        }

        const userId = decodedToken.userId?.toString() ?? decodedToken.sub;
        if (!userId) {
          throw new Error('No user ID in token');
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        if (storedUser && storedUser.id === userId) {
          setUser(storedUser);
          console.log("✅ Usuario restaurado desde storage:", storedUser);
        } else {
          console.warn("⚠️ No se encontró información del usuario");
          handleLogout();
        }
      } catch (err) {
        console.error("⛔ Error de autenticación:", err);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleLogin = async (credentials: LoginRequest) => {
    try {
      console.log("🔵 Intentando iniciar sesión con:", credentials.email);
      const { token, user: userFromLogin } = await loginUser(credentials);
      
      setAuthToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(userFromLogin);
      saveUserToStorage(userFromLogin);

      console.log("✅ Login correcto, usuario:", userFromLogin);
    } catch (error) {
      console.error("⛔ Error en login:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      removeAuthToken();
      localStorage.removeItem('user');
    }
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    console.log("👋 Sesión cerrada");
  };

  return {
    user,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!user,
  };
} 