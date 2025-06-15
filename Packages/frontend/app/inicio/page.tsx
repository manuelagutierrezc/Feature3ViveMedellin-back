"use client";

import Image from "next/image";

export default function InicioPage() {
  return (
    <div className="min-h-screen bg-[#f2f7f5]">
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
    </div>
  );
}
