"use client"

import type React from "react"
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react"

export type User = {
  id: string
  name: string
  email: string
  avatar?: string
  initials?: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Usuarios de ejemplo movidos fuera del componente para evitar recreación
const users: User[] = [
  {
    id: "1",
    name: "Carlos Esteban",
    email: "carlos@example.com",
    initials: "CE",
  },
  {
    id: "2",
    name: "Juan Pablo",
    email: "juan@example.com",
    initials: "JP",
  },
  {
    id: "3",
    name: "Usuario Demo",
    email: "demo@example.com",
    initials: "UD",
  },
]

export function AuthProvider({ children }: { readonly children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = useCallback(async (email: string, password: string) => {
    // Simulación de login con retardo, refactorizado para ser más plano
    await new Promise((resolve) => setTimeout(resolve, 500))

    const foundUser = users.find((u) => u.email === email)
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("user", JSON.stringify(foundUser))
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("user")
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
