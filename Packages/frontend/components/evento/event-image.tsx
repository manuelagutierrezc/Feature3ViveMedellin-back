import Image from "next/image"

export default function EventImage() {
  return (
    <div className="rounded-3xl overflow-hidden bg-[#00473e]">
      <Image
        src="/test.png"
        alt="Silletero en la Feria de las Flores"
        width={600}
        height={400}
        className="w-full h-auto"
      />
      <div className="p-2 text-center">
        <p className="text-xl font-medium text-white">Fecha: 1 al 10 de agosto del 2025</p>
      </div>
    </div>
  )
}
