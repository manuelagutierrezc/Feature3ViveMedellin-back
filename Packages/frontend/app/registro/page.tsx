import React from "react";
import Image from "next/image";
export default function Register() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <Image
        src="/logo.png"
        alt="Vive Medellín"
        width={180}
        height={48}
        className="h-auto w-auto mb-6"
      />

      {/* titulo */}
      <h1 className="text-3xl font-bold text-green-900 text-center mb-2">
        Únete a nuestra comunidad
      </h1>

      {/* Subtítulo */}
      <p className="text-lg text-gray-700 text-center mb-6">
        Primero, ingresa tu correo electrónico
      </p>

      {/* input del correo */}
      <input
        type="email"
        placeholder="Correo electrónico"
        className="w-full max-w-md px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      {/* Boton de continuar */}
      <button className="w-full max-w-md bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold py-2 rounded-md mb-6">
        Continuar
      </button>

      {/* linea */}
      <div className="flex items-center w-full max-w-md mb-6">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-4 text-gray-500 text-sm">O BIEN</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Boton de Google */}
      <button className="w-full max-w-md flex items-center justify-center border border-gray-400 py-2 rounded-md mb-4 hover:bg-gray-100">
        <Image
          src="/google-icon.svg"
          alt="Google"
          width={20}
          height={20}
          className="mr-2"
        />{" "}
        Registrarme con Google
      </button>

      {/* Boton de Facebook */}
      <button className="w-full max-w-md flex items-center justify-center border border-gray-400 py-2 rounded-md mb-6 hover:bg-gray-100">
        <Image
          src="/facebook-icon.svg"
          alt="Facebook"
          width={20}
          height={20}
          className="mr-2"
        />{" "}
        Registrarme con Facebook
      </button>

      {/* Ya tienes cuenta */}
      <p className="text-sm text-gray-600">
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" className="text-green-800 font-semibold underline">
          Iniciar sesión aquí
        </a>
      </p>
    </div>
  );
}
