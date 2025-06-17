"use client"

import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import SearchBar from "../molecules/search-bar"
import { useAuth } from "../../context/auth-context"

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="py-5 px-6 flex items-center justify-between border-b border-[#e2e8f0]">
      <div className="flex items-center">
        <Link href="/" className="hover:opacity-80 transition-opacity cursor-pointer">
          <Image src="/logo.png" alt="ViveMedellín Logo" width={240} height={60} className="h-auto" />
        </Link>
      </div>

      <div className="flex items-center gap-5">
        <SearchBar placeholder="Realiza una búsqueda ..." />

        <Button 
          variant="primary" 
          hasDropdown 
          className="hover:bg-yellow-500 hover:opacity-80 transition-all cursor-pointer"
        >
          Explorar
        </Button>

        <Button 
          hasDropdown 
          className="hover:bg-yellow-500 transition-all cursor-pointer"
        >
          Actividad
        </Button>

        {!isAuthenticated ? (
          <>
            <Link href="/register">
              <Button className="hover:bg-yellow-500  transition-all cursor-pointer">
                Registro
              </Button>
            </Link>
            <Link href="/login">
              <Button className="hover:bg-yellow-500  transition-all cursor-pointer">
                Iniciar Sesión
              </Button>
            </Link>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-gray-100 hover:opacity-80 transition-all cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt={user?.userName ?? "Usuario"} />
                  <AvatarFallback>{user?.userName?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 hover:opacity-80 transition-all">
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 hover:opacity-80 transition-all">
                Configuración
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={logout}
                className="cursor-pointer hover:bg-red-50 text-red-600 hover:text-red-700 hover:opacity-80 transition-all"
              >
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
