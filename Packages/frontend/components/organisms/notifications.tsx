"use client"

import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { useNotifications } from "@/context/notifications/notifications-context"
import type { NotificationType } from "@/types/notifications"

const iconMap: Record<NotificationType, React.ElementType> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const colorMap: Record<NotificationType, string> = {
  success: "bg-green-100 text-green-800 border-green-200",
  error: "bg-red-100 text-red-800 border-red-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
}

export default function Notifications() {
  const { notifications, removeNotification } = useNotifications()

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => {
        const Icon = iconMap[notification.type]
        const colorClass = colorMap[notification.type]

        return (
          <div
            key={notification.id}
            className={`${colorClass} p-4 rounded-lg border shadow-lg flex items-start gap-3 animate-slide-in`}
          >
            <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium">{notification.title}</h4>
              {notification.message && (
                <p className="text-sm mt-1 opacity-90">{notification.message}</p>
              )}
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="p-1 rounded hover:bg-black hover:bg-opacity-10 transition-colors"
              aria-label="Cerrar notificación"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
} 