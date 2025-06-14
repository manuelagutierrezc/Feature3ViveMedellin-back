"use client"

import { X } from "lucide-react"
import LoginForm from "@/components/molecules/login-form"
import Typography from "@/components/atoms/typography"
import IconButton from "@/components/atoms/icon-button"

interface LoginModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <div className="absolute top-4 right-4">
          <IconButton onClick={onClose} label="Cerrar">
            <X size={20} />
          </IconButton>
        </div>

        <Typography variant="h3" color="primary" className="mb-6">
          Iniciar Sesión
        </Typography>

        <LoginForm onSuccess={onClose} />
      </div>
    </div>
  )
}
