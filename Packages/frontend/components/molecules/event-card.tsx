import Image from "next/image"
import Typography from "@/components/atoms/typography"

interface EventCardProps {
  readonly title: string
  readonly date: string
  readonly image: string
}

export default function EventCard({ title, date, image }: EventCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
      <Image src={image || "/placeholder.svg"} alt={title} width={400} height={200} className="w-full h-auto object-cover" />
      <div className="py-3 px-4 text-center bg-white">
        <Typography variant="h4" color="primary" className="mb-2">
          📚 {title}
        </Typography>
        <Typography variant="body" color="secondary" className="mb-2">
          {date}
        </Typography>
        <button className="bg-[#faae2b] text-[#00473e] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#f9a61a] transition-colors duration-200">
          Más información
        </button>
      </div>
    </div>
  )
}
