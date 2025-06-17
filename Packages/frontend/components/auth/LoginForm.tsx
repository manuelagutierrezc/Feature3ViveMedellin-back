"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useNotifications } from "@/context/notifications-context";
import type { LoginRequest } from "@/lib/api/auth";
import type { AxiosError } from "axios";
import Image from "next/image";
import { Facebook, Chrome } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { addNotification } = useNotifications();

  const [form, setForm] = useState<LoginRequest>({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.email || !form.password) {
      setError("Completa todos los campos");
      setLoading(false);
      return;
    }

    try {
      await login(form);
      console.log("✅ Login exitoso en el formulario, redirigiendo...");
      
      addNotification({
        type: "success",
        title: "¡Bienvenido!",
        message: "Has iniciado sesión correctamente",
        duration: 3000
      });
      
      router.push("/evento/1");
    } catch (err: unknown) {
      const axiosErr = err as AxiosError;
      console.error("⛔ Error en login:", axiosErr);
      const errorMessage = axiosErr.response?.data?.message ?? "Error al iniciar sesión. Por favor, intenta de nuevo.";
      setError(errorMessage);
      
      addNotification({
        type: "error",
        title: "Error al iniciar sesión",
        message: errorMessage,
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

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
        ¡Bienvenido de nuevo!
      </h1>

      {/* Subtítulo */}
      <p className="text-lg text-gray-700 text-center mb-6">
        Ingresa tus credenciales para continuar
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        {/* input del correo */}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        {/* input de la contraseña */}
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Boton de continuar */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>

      <p className="text-sm text-gray-600 text-center mt-4">
        ¿Aún no tienes una cuenta?{" "}
        <a href="/register" className="text-green-800 font-semibold underline">
          Regístrate aquí
        </a>
      </p>

      {/* linea */}
      <div className="flex items-center w-full max-w-md my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-4 text-gray-500 text-sm">O BIEN</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      

      {/* Boton de Google */}
      <button className="w-full max-w-md flex items-center justify-center border border-gray-400 py-2 rounded-md mb-4 hover:bg-gray-100">
        <Chrome className="w-5 h-5 mr-2" />
        Iniciar sesión con Google
      </button>

      {/* Boton de Facebook */}
      <button className="w-full max-w-md flex items-center justify-center border border-gray-400 py-2 rounded-md mb-6 hover:bg-gray-100">
        <Facebook className="w-5 h-5 mr-2 text-blue-600" />
        Iniciar sesión con Facebook
      </button>

      {/* No tienes cuenta */}
      
    </div>
  );
}
