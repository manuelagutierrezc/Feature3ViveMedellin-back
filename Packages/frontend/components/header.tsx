'use client'
import Image from "next/image"
import SearchBar from "@/components/ui/search-bar"
import NavButton from "@/components/ui/nav-button"
import Link from 'next/link'

export default function Header() {
  return (
    <header className="container bg-primary mx-auto py-4 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Image src="/logo.png" alt="ViveMedellín Logo" width={240} height={60} className="h-auto" />
      </div>

      <div className="flex items-center gap-4">
        <SearchBar placeholder="Realiza una búsqueda ..." />

        <Link href="/explorar">
          <NavButton variant="primary" hasDropdown>
            Explorar
          </NavButton>
        </Link>

        <Link href="/actividad">
          <NavButton hasDropdown>Actividad</NavButton>
        </Link>

        <Link href="/registro">
          <NavButton>Registro</NavButton>
        </Link>

        <Link href="/iniciar-sesion">
          <NavButton>Iniciar Sesión</NavButton>
        </Link>
      </div>

     
    </header>
  )
}
