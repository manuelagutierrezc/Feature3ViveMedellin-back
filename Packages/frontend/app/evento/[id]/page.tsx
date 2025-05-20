"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import LoginModal from "@/components/auth/login-modal";
import CommentsSection from "@/components/comments/comments-section";
import UserMenu from "@/components/user-menu";

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#f2f7f5]">
      {/* HEADER */}
      <header className="bg-[#f2f7f5] py-5 px-6 flex items-center justify-between border-b border-[#e2e8f0]">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="ViveMedellín Logo"
            width={180}
            height={48}
          />
        </div>

        <div className="flex items-center gap-5">
          {/* Buscador */}
          <div className="relative">
            <input
              type="text"
              placeholder="Realiza una búsqueda ..."
              className="w-[300px] pl-10 pr-4 py-2 rounded-md border border-[#e2e8f0] text-sm focus:outline-none"
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Botones de navegación */}
          <button className="bg-[#faae2b] text-[#00473e] font-medium px-4 py-2 rounded-md flex items-center text-sm transition-all duration-300 transform hover:bg-[#00473e] hover:text-white hover:scale-105">
            Explorar <ChevronDown className="ml-1 h-4 w-4" />
          </button>

          <button className="text-[#00473e] font-medium text-sm hover:text-white hover:bg-[#00473e] px-4 py-2 rounded transition-transform duration-300 transform hover:scale-105">
            <span className="flex items-center gap-1">
              Actividad <ChevronDown className="h-4 w-4" />
            </span>
          </button>

          <button className="text-[#00473e] font-medium text-sm hover:text-white hover:bg-[#00473e] px-4 py-2 rounded transition-transform duration-300 transform hover:scale-105">
            Registro
          </button>

          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-[#00473e] font-medium text-sm transition-all duration-300 transform hover:text-[#faae2b] hover:scale-105"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* ========== COLUMNA IZQUIERDA: TEXTO ========== */}
          <div className="order-2 md:order-1">
            <h1 className="text-[42px] font-bold text-[#00473e] mb-4 leading-tight">
              Feria de las Flores
            </h1>
            <p className="text-[#00473e] text-lg mb-6 leading-relaxed">
              La ciudad de Medellín se pinta de colores para celebrar el
              patrimonio inmaterial silletero y las tradiciones antioqueñas que
              cautivan desde 1957 a turistas y locales.
            </p>
            <p className="text-[#475d5b] mb-8 leading-relaxed">
              Celebración anual de la ciudad de Medellín que se constituye como
              un ícono raizal, cultural e histórico realizada durante el mes de
              agosto. Ofrece una amplia diversidad de eventos y espectáculos que
              giran alrededor de la cultura paisa.
            </p>
            <p className="text-[#475d5b] mb-4 leading-relaxed">
              Algunas actividades de la Feria de las Flores incluyen:
            </p>
            <ul className="list-disc pl-8 mb-8 space-y-3 text-[#475d5b]">
              <li>
                Desfile de Silleteros: Más de 500 silletas se exponen a lo largo
                de la avenida Guayabal.
              </li>
              <li>
                Desfile de Autos Clásicos y Antiguos: Más de 200 autos
                emblemáticos de la historia nacional y mundial.
              </li>
              <li>
                Festival Nacional de la Trova: Humor antioqueño con más de 220
                trovadores en competencia.
              </li>
            </ul>

            {/* Sección de Comentarios */}
            <div className="mb-6">
              <CommentsSection />

              {!isAuthenticated && (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="mt-4 bg-[#faae2b] text-[#00473e] font-semibold px-6 py-3 rounded-md shadow-md hover:bg-[#ffd166] hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Unirme a la conversación
                </button>
              )}
            </div>
          </div>

          {/* ========== COLUMNA DERECHA: IMÁGENES ========== */}
          <div className="order-1 md:order-2 space-y-8">
            {/* Tarjeta principal */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
              <Image
                src="/test.png"
                alt="Silletero en la Feria de las Flores"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="py-6 px-8 text-center">
                <p className="text-lg font-semibold text-[#00473e] mb-4">
                  📅 Fecha: 1 al 10 de agosto del 2025
                </p>
                <button className="bg-[#00473e] text-white px-5 py-2 rounded-lg hover:bg-[#faae2b] transition-colors duration-200 shadow-md hover:shadow-lg">
                  Ver más
                </button>
              </div>
            </div>

            {/* Eventos Similares */}
            <div>
              <h2 className="text-3xl font-bold text-[#00473e] mb-6">
                Eventos Similares
              </h2>
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Image
                  src="/test2.png"
                  alt="Feria del libro y la cultura"
                  width={600}
                  height={300}
                  className="w-full h-[300px] object-cover"
                />
                <div className="py-6 px-8 text-center">
                  <p className="text-lg font-semibold text-[#00473e] leading-relaxed">
                    📚 Feria del libro y la cultura: <br /> Del 11 al 20 de
                    septiembre del 2025
                  </p>
                  <button className="mt-4 bg-[#00473e] text-white px-5 py-2 rounded-lg hover:bg-[#faae2b] transition-colors duration-200 shadow-md hover:shadow-lg">
                    Ver más
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Login */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}
