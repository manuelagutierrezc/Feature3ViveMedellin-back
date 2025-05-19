"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Usuarios de ejemplo
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (email: string, password: string) => {
    // Simulación de login (en un caso real, esto sería una llamada a API)
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const foundUser = users.find((u) => u.email === email)
        if (foundUser) {
          setUser(foundUser)
          localStorage.setItem("user", JSON.stringify(foundUser))
          resolve(true)
        } else {
          resolve(false)
        }
      }, 500)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
