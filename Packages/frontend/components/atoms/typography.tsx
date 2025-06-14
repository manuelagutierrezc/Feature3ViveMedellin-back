import type React from "react"

interface TypographyProps {
  readonly children: React.ReactNode
  readonly variant: "h1" | "h2" | "h3" | "h4" | "body" | "body-large" | "caption"
  readonly className?: string
  readonly color?: "primary" | "secondary" | "white"
}

export default function Typography({ children, variant, className = "", color = "primary" }: TypographyProps) {
  const colorClasses = {
    primary: "text-[#00473e]",
    secondary: "text-[#475d5b]",
    white: "text-white",
  }

  const variantClasses = {
    h1: "text-[42px] font-bold leading-tight",
    h2: "text-3xl font-bold",
    h3: "text-2xl font-bold",
    h4: "text-xl font-medium",
    "body-large": "text-lg leading-relaxed",
    body: "leading-relaxed",
    caption: "text-sm",
  }

  const Component = variant.startsWith("h") ? (variant as "h1" | "h2" | "h3" | "h4") : "p"

  return <Component className={`${variantClasses[variant]} ${colorClasses[color]} ${className}`}>{children}</Component>
}
