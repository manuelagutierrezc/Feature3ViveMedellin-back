"use client"

import type React from "react"

import { useState } from "react"
import Input from "@/components/atoms/input"
import Button from "@/components/atoms/Button"
import Typography from "@/components/atoms/typography"
import { useAuth } from "@/context/auth-context"

interface LoginFormProps {
  readonly onSuccess: () => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        onSuccess()
      } else {
        setError("Credenciales incorrectas. Intenta con demo@example.com")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Error al iniciar sesión. Intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Correo electrónico"
        placeholder="ejemplo@correo.com"
        required
      />

      <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Contraseña"
        placeholder="••••••••"
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="pt-2">
        <Button type="submit" variant="primary" disabled={isLoading} fullWidth>
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>
      </div>

      <Typography variant="caption" color="secondary" className="text-center">
        Para demo, usa: demo@example.com (cualquier contraseña)
      </Typography>
    </form>
  )
}
