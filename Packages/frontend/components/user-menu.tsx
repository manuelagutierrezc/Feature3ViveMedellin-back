"use client"

import { useState } from "react"
import { LogOut, UserIcon } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import Image from "next/image"

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
        {user.avatar ? (
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#e2e8f0] flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-[#475d5b]" />
          </div>
        )}
        <span className="text-[#00473e] font-medium text-sm hidden md:block">{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
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
