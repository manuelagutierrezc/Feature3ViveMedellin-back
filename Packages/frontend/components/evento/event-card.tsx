import Image from "next/image"

interface EventCardProps {
  title: string
  date: string
  image: string
}

export default function EventCard({ title, date, image }: EventCardProps) {
  return (
    <div className="rounded-3xl overflow-hidden">
      <Image src={image || "/placeholder.svg"} alt={title} width={400} height={200} className="w-full h-auto" />
      <div className="p-4 text-center bg-white">
        <p className="text-xl font-medium text-[#00473e]">
          {title}: {date}
        </p>
      </div>
    </div>
  )
}
