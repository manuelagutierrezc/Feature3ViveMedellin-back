"use client"

//import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { useAuth } from "@/context/auth-context"
import { CommentsProvider } from "@/context/comments-context"
import CommentsSection from "@/components/organisms/comments-section"

export default function EventoPage() {
  
  const { isAuthenticated } = useAuth()

  return (
    <CommentsProvider>
      <div className="min-h-screen bg-[#f2f7f5]">
        {/* Main Content */}
        <main className="max-w-[1400px] mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Contenido Principal - Izquierda */}
            <div className="flex-1 lg:w-2/3">
              <h1 className="text-[42px] font-bold text-[#00473e] mb-6 leading-tight">Feria de las Flores</h1>

              <p className="text-[#00473e] text-lg mb-6 leading-relaxed">
                La ciudad de Medellín se pinta de colores para celebrar el patrimonio inmaterial silletero y las
                tradiciones antioqueñas que cautivan desde 1957 a turistas y locales.
              </p>

              <p className="text-[#475d5b] mb-8 leading-relaxed">
                Celebración anual de la ciudad de Medellín que se constituye como un ícono raizal, cultural e histórico
                realizada durante el mes de agosto. Ofrece una amplia diversidad de eventos y espectáculos que giran
                alrededor de la cultura paisa.
              </p>

              <p className="text-[#475d5b] mb-4 leading-relaxed">
                Algunas actividades de la Feria de las Flores incluyen:
              </p>

              <ul className="list-disc pl-8 mb-10 space-y-4 text-[#475d5b]">
                <li className="leading-relaxed">
                  Desfile de Silleteros: Más de 500 silletas se exponen al público a lo largo de la avenida Guayabal.
                </li>
                <li className="leading-relaxed">
                  Desfile de Autos Clásicos y Antiguos: Más de 200 autos emblemáticos de las historia nacional y
                  mundial.
                </li>
                <li className="leading-relaxed">
                  Festival Nacional de la Trova: Espacio donde el humor de los antioqueños se hace presente y reúne en
                  competencia a más de 220 trovadores.
                </li>
              </ul>

              <CommentsSection />

              {!isAuthenticated && (
                <Link
                  href="/login"
                  className="bg-[#faae2b] text-[#00473e] font-medium px-6 py-3 rounded-md hover:bg-[#f9a61a] hover:shadow-lg transition-all duration-200 transform hover:scale-105 inline-block"
                >
                  Unirme a la conversación
                </Link>
              )}
            </div>

            {/* Sidebar - Derecha */}
            <div className="lg:w-1/3 lg:max-w-[350px] space-y-6">
              {/* Imagen principal del evento */}
              <div className="rounded-2xl overflow-hidden bg-[#3498db] hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <Image
                  src="/test.png"
                  alt="Silletero en la Feria de las Flores"
                  width={350}
                  height={220}
                  className="w-full h-auto object-cover"
                />
                <div className="py-3 px-4 text-center">
                  <p className="text-lg font-medium text-white">📅 Fecha: 1 al 10 de agosto del 2025</p>
                  <button className="mt-2 bg-white text-[#3498db] px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200">
                    Ver más
                  </button>
                </div>
              </div>

              {/* Eventos similares */}
              <div>
                <h2 className="text-2xl font-bold text-[#00473e] mb-4">Eventos Similares</h2>

                <div className="rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  <Image
                    src="/test2.png"
                    alt="Feria del libro y la cultura"
                    width={350}
                    height={180}
                    className="w-full h-auto object-cover"
                  />
                  <div className="py-3 px-4 text-center bg-white">
                    <p className="text-lg font-medium text-[#00473e] mb-2">
                      📚 Feria del libro y la cultura
                    </p>
                    <p className="text-sm text-[#475d5b] mb-2">
                      Del 11 al 20 de septiembre del 2025
                    </p>
                    <button className="bg-[#faae2b] text-[#00473e] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#f9a61a] transition-colors duration-200">
                      Más información
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </CommentsProvider>
  )
}
