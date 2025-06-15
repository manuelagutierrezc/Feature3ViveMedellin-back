'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, RegisterRequest } from '@/lib/api/auth';
import { useNotifications } from '@/context/notifications/notifications-context';
import { AxiosError } from 'axios';
import Image from "next/image";
import { Facebook, Chrome } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const { addNotification } = useNotifications();
  const [formData, setFormData] = useState<RegisterRequest>({
    userName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerUser(formData);
      
      addNotification({
        type: 'success',
        title: '¡Registro exitoso!',
        message: 'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
        duration: 4000
      });
      
      router.push('/login');
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response?.data?.message ?? 'Error al registrar usuario';
      setError(errorMessage);
      
      addNotification({
        type: 'error',
        title: 'Error en el registro',
        message: errorMessage,
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
        Únete a nuestra comunidad
      </h1>

      {/* Subtítulo */}
      <p className="text-lg text-gray-700 text-center mb-6">
        Completa tus datos para registrarte
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        {/* input del nombre de usuario */}
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          placeholder="Nombre de usuario"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        {/* input del correo */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        {/* input de la contraseña */}
        <input
          type="password"
          name="password"
          value={formData.password}
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
          {loading ? 'Registrando...' : 'Continuar'}
        </button>
      </form>

       {/* Ya tienes cuenta */}
       <p className="text-sm text-gray-600 text-center mt-4">
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" className="text-green-800 font-semibold underline">
          Iniciar sesión aquí
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
        Registrarme con Google
      </button>

      {/* Boton de Facebook */}
      <button className="w-full max-w-md flex items-center justify-center border border-gray-400 py-2 rounded-md mb-6 hover:bg-gray-100">
        <Facebook className="w-5 h-5 mr-2 text-blue-600" />
        Registrarme con Facebook
      </button>

     
    </div>
  );
} 