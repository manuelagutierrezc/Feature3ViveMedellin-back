"use client"

import { createContext, useContext } from "react"
import type { NotificationsContextType } from "@/types/notifications"
import { useNotificationsState } from "./use-notifications-state"

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { readonly children: React.ReactNode }) {
  const notificationsState = useNotificationsState()

  return (
    <NotificationsContext.Provider value={notificationsState}>
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
} 