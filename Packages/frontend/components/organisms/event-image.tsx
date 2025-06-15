"use client"
import Image from "next/image"
import Typography from "@/components/atoms/typography"

export default function EventImage() {
  return (
    <div className="rounded-2xl overflow-hidden bg-[#3498db] hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
      <Image
        src="/test.png"
        alt="Silletero en la Feria de las Flores"
        width={400}
        height={250}
        className="w-full h-auto object-cover"
      />
      <div className="py-3 px-4 text-center">
        <Typography variant="h4" color="white" className="mb-2">
          📅 Fecha: 1 al 10 de agosto del 2025
        </Typography>
        <button className="bg-white text-[#3498db] px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200">
          Ver más
        </button>
      </div>
    </div>
  )
}
