"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import LoginModal from "@/components/auth/login-modal";
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
      <main className="max-w-[1200px] mx-auto px-1 py-3">
        <h1 className="text-[35px] font-bold text-[#00473e] mb-4 leading-tight">
          ¡Descubre actividades locales!
        </h1>
        <h2 className="text-lg font-semibold text-[#00473e] mb-4">
          Sugerencias para ti
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Izquierda: Sugerencias ( un grid 2x2) */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            {[
              "/Rectangle4.png",
              "/Rectangle5.png",
              "/Rectangle7.png",
              "/Rectangle8.png",
            ].map((src, index) => (
              <div
                key={src}
                className="flex items-center gap-1 rounded-xl overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Lugar ${index + 1}`}
                  width={110}
                  height={90}
                  className="rounded-md object-cover h-38 w-57"
                />
                <div className="text-sm text-[#00473e]">
                  <p className="font-medium text-center w-40 leading-tight">
                    Conoce este <br /> nuevo lugar
                  </p>
                  <p className="text-xs text-gray-500 w-40 text-center leading-tight">
                    Ubicación
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Derecha: Comunidad */}
          <div className="w-full md:w-1/3  p-4 rounded-xl ">
            <h3 className="text-[#00473e] font-semibold text-base mb-2 text-center">
              Explora nuestra comunidad
            </h3>
            <p className="text-sm text-gray-600 mb-3 text-center">
              Conecta con otros, comparte experiencias.
            </p>

            <div className="space-y-2 mb-4">
              <div className="bg-[#D9D9D9]  rounded-md p-2 text-sm text-gray-800 flex items-center gap-2 w-106 h-20">
                <span className="h-3 w-3 bg-pink-400 rounded-full" /> Usuario1
                comentó:
              </div>
              <div className="bg-[#D9D9D9]  rounded-md p-2 text-sm text-gray-800 flex items-center gap-2 w-106 h-20">
                <span className="h-3 w-3 bg-pink-400 rounded-full" /> Usuario2
                dio una reseña de Lugar1:
              </div>
            </div>

            <button className="bg-[#faae2b] hover:bg-[#e09b21] text-[#00473e] font-medium px-4 py-2 rounded-md transition w-45 h-12">
              Ver más
            </button>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-[#00473e] mb-4">
          <br />
          Interactúa y opina sobre diferentes lugares
        </h2>
        {/* Zona final */}
        <div className="grid grid-cols-4 gap-4">
          <div className=" p-4">
            <div className="flex items-center space-x-4">
              <Image
                src="/Icon1.png"
                alt="Lugar1"
                width={70}
                height={70}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-[#00473e] font-medium">Lugar1</p>
              </div>
            </div>
            <br />
            <div>
              {" "}
              <p className="text-xl text-gray-500">
                +100 personas han comentado
              </p>
            </div>
          </div>
          <div className=" p-4">
            <div className="bg-[#D9D9D9]  rounded-md p-2 text-sm text-gray-800 flex items-center gap-2 w-66 h-20">
              <span className="h-3 w-3 rounded-full" /> Usuario 3: <br /> Muy
              buen ambiente.
            </div>
            <br />
            <div className="bg-[#D9D9D9]  rounded-md p-2 text-sm text-gray-800 flex items-center gap-2 w-66 h-20">
              <span className="h-3 w-3 rounded-full" /> Usuario 4: <br />{" "}
              Tranquilo y seguro.
            </div>
          </div>
          <div className=" p-4">
            <div className="bg-[#D9D9D9]  rounded-md p-2 text-sm text-gray-800 flex items-center gap-2 w-66 h-20">
              <span className="h-3 w-3 rounded-full" /> Usuario 3: <br /> Muy
              buen ambiente.
            </div>
            <br />
            <div className="bg-[#D9D9D9]  rounded-md p-2 text-sm text-gray-800 flex items-center gap-2 w-66 h-20">
              <span className="h-3 w-3 rounded-full" /> Usuario 4: <br />{" "}
              Tranquilo y seguro.
            </div>
          </div>
          <div className=" p-4">
            {" "}
            <br />
            <button className=" text-[#00473e]  shadow-md hover:shadow-lg rounded-md px-4 py-2 font-medium transition duration-200">
              Comentar
            </button>
            <br />
            <br />
            <br />
            <br />
            <button className=" text-[#00473e]  shadow-md hover:shadow-lg rounded-md px-4 py-2 font-medium transition duration-200">
              Ver lugares
            </button>
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
