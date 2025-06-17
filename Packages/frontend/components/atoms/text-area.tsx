"use client"

import type React from "react"

interface TextAreaProps {
  readonly id: string
  readonly value: string
  readonly onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  readonly placeholder?: string
  readonly label?: string
  readonly required?: boolean
  readonly rows?: number
  readonly className?: string
  readonly error?: string
  readonly disabled?: boolean
}

export default function TextArea({
  id,
  value,
  onChange,
  placeholder,
  label,
  required = false,
  rows = 3,
  className = "",
  error,
  disabled,
}: TextAreaProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-[#475d5b] mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#faae2b] ${
          error ? "border-red-500" : ""
        } ${className}`}
        disabled={disabled}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
