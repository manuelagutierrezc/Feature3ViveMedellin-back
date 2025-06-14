"use client"

import type React from "react"
import { ChevronDown } from "lucide-react"

interface ButtonProps {
  readonly children: React.ReactNode
  readonly variant?: "primary" | "secondary" | "text"
  readonly size?: "sm" | "md" | "lg"
  readonly hasDropdown?: boolean
  readonly onClick?: () => void
  readonly disabled?: boolean
  readonly type?: "button" | "submit" | "reset"
  readonly className?: string
  readonly fullWidth?: boolean
}

export default function Button({
  children,
  variant = "secondary",
  size = "md",
  hasDropdown = false,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  fullWidth = false,
}: ButtonProps) {
  const baseStyles = "font-medium rounded-md flex items-center justify-center transition-all duration-200"

  const variantStyles = {
    primary: "bg-[#faae2b] text-[#00473e] hover:bg-[#f9a61a] hover:shadow-md transform hover:scale-105",
    secondary: "text-[#00473e] hover:text-[#faae2b] hover:bg-gray-50",
    text: "text-[#475d5b] hover:text-[#00473e] hover:bg-gray-50",
  }

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  }

  const widthClass = fullWidth ? "w-full" : ""
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : ""

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
    </button>
  )
}
