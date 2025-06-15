export type NotificationType = "success" | "error" | "warning" | "info"

export type Notification = {
  id: string
  type: NotificationType
  title: string
  message?: string
  timestamp: Date
  duration?: number // in milliseconds, if undefined notification persists
}

export type NotificationsContextType = {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
} 