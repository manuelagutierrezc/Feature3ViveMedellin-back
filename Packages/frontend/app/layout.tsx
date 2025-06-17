import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/auth-context"
import { NotificationsProvider } from "@/context/notifications-context"
import Header from "@/components/organisms/header"
import Notifications from "@/components/organisms/notifications"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ViveMedellín - Feria de las Flores",
  description: "Descubre la Feria de las Flores en Medellín, Colombia",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <NotificationsProvider>
            <Header />
            <Notifications />
            {children}
          </NotificationsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
