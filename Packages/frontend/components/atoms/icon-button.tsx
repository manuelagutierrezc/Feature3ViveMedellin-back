"use client"

import type React from "react"

interface IconButtonProps {
  readonly children: React.ReactNode
  readonly onClick?: () => void
  readonly label: string
  readonly variant?: "primary" | "secondary" | "danger"
  readonly size?: "sm" | "md" | "lg"
  readonly disabled?: boolean
}

export default function IconButton({
  children,
  onClick,
  label,
  variant = "secondary",
  size = "md",
  disabled = false,
}: IconButtonProps) {
  const sizeClasses = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3",
  }

  const variantClasses = {
    primary: "text-[#00473e] hover:text-[#faae2b]",
    secondary: "text-[#475d5b] hover:text-[#00473e]",
    danger: "text-[#475d5b] hover:text-red-500",
  }

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} ${variantClasses[variant]} disabled:opacity-50`}
      aria-label={label}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
