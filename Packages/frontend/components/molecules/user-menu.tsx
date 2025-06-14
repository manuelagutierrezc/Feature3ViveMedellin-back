"use client"

import { useState } from "react"
import { LogOut } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import Avatar from "@/components/atoms/avatar"
import Typography from "@/components/atoms/typography"

export default function UserMenu() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  if (!user) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar src={user.avatar} alt={user.name} initials={user.initials} size="sm" />
        <span className="text-[#00473e] font-medium text-sm hidden md:block">{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-2 border-b">
            <Typography variant="body" className="font-medium">
              {user.name}
            </Typography>
            <Typography variant="caption" color="secondary">
              {user.email}
            </Typography>
          </div>
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut size={16} className="mr-2" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}
