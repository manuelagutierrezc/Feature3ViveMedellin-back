import { useState, useCallback } from "react"
import type { Notification } from "@/types/notifications"

export function useNotificationsState() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp">) => {
    const id = crypto.randomUUID()
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

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  }
} 