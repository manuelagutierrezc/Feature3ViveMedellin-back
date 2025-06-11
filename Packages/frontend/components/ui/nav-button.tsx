'use client'

import type React from "react"
import { ChevronDown } from "lucide-react"

interface NavButtonProps {
  readonly children: React.ReactNode
  readonly variant?: "default" | "primary"
  readonly hasDropdown?: boolean
  readonly onClick?: () => void
}

export default function NavButton({
  children,
  variant = "default",
  hasDropdown = false,
  onClick,
}: NavButtonProps) {
  const baseStyles =
    "font-medium px-4 py-2 rounded-md flex items-center cursor-pointer transition-colors duration-200"

  const variantStyles: Record<string, string> = {
    default: "text-[#00473e] hover:bg-gray-100",
    primary: "bg-[#faae2b] text-[#00473e] hover:bg-[#e6951f]",
  }

  return (
    <button
      type="button"
      className={`${baseStyles} ${variantStyles[variant]}`}
      onClick={onClick}
    >
      {children}
      {hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
    </button>
  )
}
