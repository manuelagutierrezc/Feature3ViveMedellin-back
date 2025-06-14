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
        <Image src="/logo.png" alt="ViveMedellín Logo" width={240} height={60} className="h-auto" />
      </div>

      <div className="flex items-center gap-5">
        <SearchBar placeholder="Realiza una búsqueda ..." />

        <Button variant="primary" hasDropdown>
          Explorar
        </Button>

        <Button hasDropdown>Actividad</Button>

        {!isAuthenticated ? (
          <>
            <Button>Registro</Button>
            <Link href="/login">
              <Button>Iniciar Sesión</Button>
            </Link>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
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
              <DropdownMenuItem>
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                Configuración
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
