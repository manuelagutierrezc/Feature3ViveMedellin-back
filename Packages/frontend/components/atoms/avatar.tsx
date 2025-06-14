import Image from "next/image"

interface AvatarProps {
  readonly src?: string
  readonly alt: string
  readonly initials?: string
  readonly size?: "sm" | "md" | "lg"
}

export default function Avatar({ src, alt, initials, size = "md" }: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
  }

  if (src) {
    const imageSizes = { sm: 32, md: 48, lg: 64 }
    const imageSize = imageSizes[size]
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden flex-shrink-0`}>
        <Image
          src={src}
          alt={alt}
          width={imageSize}
          height={imageSize}
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-[#e2e8f0] flex items-center justify-center flex-shrink-0`}>
      <span className="text-[#475d5b] font-medium">{initials}</span>
    </div>
  )
}
