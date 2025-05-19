"use client"
import { useState } from "react";
import axios from "axios";
import { setCookie } from "cookies-next";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token } = response.data;
      setCookie("jwt", token, { maxAge: 60 * 60 * 24 }); // Store JWT in cookies for 1 day
      // Redirect to a protected route or dashboard
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <img src="/logo.png" alt="Vive Medellín" className="h-16 mb-6" />

      {/* titulo */}
      <h1 className="text-3xl font-bold text-green-900 text-center mb-2">
        Inicia sesion en nuestra comunidad
      </h1>

      {/* Subtítulo */}
      <p className="text-lg text-gray-700 text-center mb-6">
        Ingresa con tu correo y contraseña
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        {/* input del correo */}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* Input de la coontraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Boton de continuar */}
        <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold py-2 rounded-md mb-6">
          Continuar
        </button>
      </form>

      {/* Linea */}
      <div className="flex items-center w-full max-w-md mb-6">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-4 text-gray-500 text-sm">O BIEN</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Boton de Google */}
      <button className="w-full max-w-md flex items-center justify-center border border-gray-400 py-2 rounded-md mb-4 hover:bg-gray-100">
        <img src="" alt="Google" className="h-5 w-5 mr-2" />
        Iniciar sesion con Google
      </button>

      {/* Boton de Facebook */}
      <button className="w-full max-w-md flex items-center justify-center border border-gray-400 py-2 rounded-md mb-6 hover:bg-gray-100">
        <img src="" alt="Facebook" className="h-5 w-5 mr-2" />
        Iniciar sesion con Facebook
      </button>

      {/* Ya tienes cuenta */}
      <p className="text-sm text-gray-600">
        ¿No tienes cuenta?{" "}
        <a href="/registro" className="text-green-800 font-semibold underline">
          Registrate aquí
        </a>
      </p>
    </div>
  );
}

