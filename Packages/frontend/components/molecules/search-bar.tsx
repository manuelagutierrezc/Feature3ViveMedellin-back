import { Search } from "lucide-react"

interface SearchBarProps {
  readonly placeholder: string
  readonly className?: string
}

export default function SearchBar({ placeholder, className = "" }: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="w-[300px] px-10 py-2 rounded-md border border-[#e2e8f0] focus:outline-none text-sm"
      />
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  )
}
