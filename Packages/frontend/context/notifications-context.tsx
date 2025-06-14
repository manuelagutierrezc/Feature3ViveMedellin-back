"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useMemo } from "react"

export type NotificationType = "success" | "error" | "warning" | "info"

export type Notification = {
  id: string
  type: NotificationType
  title: string
  message?: string
  timestamp: Date
  duration?: number // in milliseconds, if undefined notification persists
}

type NotificationsContextType = {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { readonly children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp">) => {
    const id = `notification-${Date.now()}-${Math.random()}`
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: new Date(),
    }

    setNotifications(prev => [...prev, newNotification])

    // Auto-remove notification after duration
    if (notification.duration) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration)
    }
  }, [removeNotification])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const value = useMemo(() => ({
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  }), [notifications, addNotification, removeNotification, clearAllNotifications])

  return (
    <NotificationsContext.Provider value={value}>
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