"use client"

import type React from "react"

interface InputProps {
  readonly id: string
  readonly type?: string
  readonly value: string
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  readonly placeholder?: string
  readonly label?: string
  readonly required?: boolean
  readonly className?: string
  readonly error?: string
}

export default function Input({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  label,
  required = false,
  className = "",
  error,
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-[#475d5b] mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#faae2b] ${
          error ? "border-red-500" : ""
        } ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
