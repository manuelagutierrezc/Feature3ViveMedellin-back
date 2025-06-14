"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/auth-context";

// Helper para sacar iniciales de un nombre de usuario
function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const initials = getInitials(user.userName);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Sólo iniciales */}
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-700 text-sm font-medium">
            {initials}
          </span>
        </div>

        {/* Nombre de usuario */}
        <span className="text-[#00473e] font-medium text-sm hidden md:block">
          {user.userName}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-medium">{user.userName}</p>
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
  );
}
