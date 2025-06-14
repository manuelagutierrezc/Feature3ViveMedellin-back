"use client"

import { Menu, X } from "lucide-react"
import NavButton from "@/components/ui/nav-button"

interface MobileMenuProps {
  readonly isOpen: boolean
  readonly toggle: () => void
  readonly close: () => void
}

export function MobileMenuToggle({ toggle }: { readonly toggle: () => void }) {
  return (
    <button onClick={toggle} className="p-2 text-[#00473e] focus:outline-none" aria-label="Toggle menu">
      <Menu size={24} />
    </button>
  )
}

export default function MobileMenu({ isOpen, toggle, close }: MobileMenuProps) {
  return (
    <>
      <div className="md:hidden">
        <MobileMenuToggle toggle={toggle} />
      </div>

      {/* Mobile menu overlay */}
      {isOpen && <div className="fixed inset-0 z-50 bg-black/50" onClick={close} aria-hidden="true" />}

      {/* Mobile menu panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[250px] bg-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold text-[#00473e]">Menú</span>
          <button onClick={close} className="p-2 text-[#00473e] focus:outline-none" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 flex flex-col space-y-4">
          <NavButton variant="primary" hasDropdown onClick={close}>
            Explorar
          </NavButton>
          <NavButton hasDropdown onClick={close}>
            Actividad
          </NavButton>
          <NavButton onClick={close}>Registro</NavButton>
          <NavButton onClick={close}>Iniciar Sesión</NavButton>
        </nav>
      </div>
    </>
  )
}
