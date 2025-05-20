import React from "react";

import Image from "next/image";

export default function Inicio() {
  return (
    <div className="min-h-screen bg-white p-6 font-sans ">
      {/* Header */}
      <header className=" items-center mb-6">
        <div className="flex items-center gap-2 justify-between">
          <Image src="/logo.png" alt="Logo" width={266} height={48} />

          <input
            type="text"
            placeholder="🔍 Realice una búsqueda ..."
            className="border px-3 py-1 rounded-md text-sm max-w-5x100"
          />
          <div className="flex items-center gap-4">
            <button className="px-4 py-1 border rounded-md bg-white hover:bg-gray-100 text-sm">
              Explorar ▾
            </button>
            <button className="px-4 py-1 border rounded-md bg-white text-sm font-semibold">
              Actividad ▾
            </button>
            <button className="px-4 py-1 border rounded-md bg-white hover:bg-gray-100 text-sm">
              Perfil
            </button>
            <button className="px-4 py-1 border rounded-md bg-yellow-400 text-sm font-semibold">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Título principal */}
      <h2 className="text-2xl font-bold text-green-900 mb-4">
        ¡Descubre actividades locales!
      </h2>

      <div className="grid grid-cols-12 gap-6">
        {/* Sugerencias */}
        <div className="col-span-8">
          <h3 className="text-lg font-semibold mb-3">Sugerencias para ti</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-[#072A2D] text-white rounded-md p-2">
                <div className="h-24 bg-gray-300 mb-2 rounded-md" />
                <p className="text-sm font-semibold">Conoce este nuevo lugar</p>
                <p className="text-xs">Ubicación</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comunidad */}
        <div className="col-span-4">
          <h3 className="text-lg font-semibold mb-3">
            Explora nuestra comunidad
          </h3>
          <div className="space-y-3">
            <div className="bg-gray-100 p-3 rounded-md text-sm">
              <span className="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
              Usuario1 comentó:
            </div>
            <div className="bg-gray-100 p-3 rounded-md text-sm">
              <span className="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
              Usuario2 dio una reseña de Lugar1:
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-sm px-4 py-1 rounded font-semibold">
              Ver más
            </button>
          </div>
        </div>
      </div>

      {/* Comentarios de lugares */}
      <section className="mt-8">
        <h3 className="text-lg font-semibold mb-4">
          Interactúa y opina sobre diferentes lugares
        </h3>

        <div className="bg-gray-100 p-4 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gray-300" />
            <div>
              <h4 className="text-lg font-bold">Lugar1</h4>
              <p className="text-sm text-gray-500">
                +100 personas han comentado
              </p>
            </div>
          </div>
          <button className="mt-3 md:mt-0 bg-white border rounded-md px-4 py-1 hover:bg-gray-100 text-sm">
            Comentar
          </button>
        </div>

        {/* Opiniones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border p-3 rounded-md text-sm">
            <p className="font-bold">Usuario3</p>
            <p>"Muy buen ambiente"</p>
          </div>
          <div className="bg-white border p-3 rounded-md text-sm">
            <p className="font-bold">Usuario4</p>
            <p>"Tranquilo y seguro"</p>
          </div>
          <div className="bg-white border p-3 rounded-md text-sm">
            <p className="font-bold">Usuario5</p>
            <p>"Ideal para la familia"</p>
          </div>
          <div className="bg-white border p-3 rounded-md text-sm">
            <p className="font-bold">Usuario6</p>
            <p>"Es fácil llegar al lugar"</p>
          </div>
        </div>

        <div className="mt-4">
          <button className="bg-white border px-4 py-1 rounded-md hover:bg-gray-100 text-sm">
            Ver más lugares
          </button>
        </div>
      </section>
    </div>
  );
}
