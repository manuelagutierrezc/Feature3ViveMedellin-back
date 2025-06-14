"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import type { LoginRequest } from "@/lib/api/auth";
import type { AxiosError } from "axios";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

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
      router.push("/evento/1");
    } catch (err: unknown) {
      const axiosErr = err as AxiosError;
      console.error("⛔ Error en login:", axiosErr);
      setError(axiosErr.response?.data?.message ?? "Error al iniciar sesión. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#f2f7f5]">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-[#00473e]">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#475d5b] mb-1">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#faae2b]"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#475d5b] mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#faae2b]"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#faae2b] text-[#00473e] font-medium rounded-md hover:bg-[#f9a61a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
