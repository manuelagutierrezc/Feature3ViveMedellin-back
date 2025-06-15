"use client"

import { MessageSquare, AlertTriangle, Edit2, Trash2, Eye, EyeOff } from "lucide-react"
import IconButton from "@/components/atoms/icon-button"
import { useAuth } from "@/context/auth/auth-context"
import type { Comment } from "@/types/comments"

interface CommentActionsProps {
  readonly comment: Comment
  readonly isAuthor: boolean
  readonly hasReported: boolean
  readonly isEditing: boolean
  readonly onReply: () => void
  readonly onReport: () => void
  readonly onEdit: () => void
  readonly onDelete: () => void
  readonly onHide: () => void
  readonly onUnhide: () => void
}

export default function CommentActions({
  comment,
  isAuthor,
  hasReported,
  isEditing,
  onReply,
  onReport,
  onEdit,
  onDelete,
  onHide,
  onUnhide,
}: CommentActionsProps) {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="flex space-x-2">
      <IconButton onClick={onReply} label="Responder comentario" variant="secondary">
        <MessageSquare size={16} />
      </IconButton>

      {!isAuthor && (
        <IconButton
          onClick={onReport}
          label={hasReported ? "Ya reportaste este comentario" : "Reportar comentario"}
          variant={hasReported ? "secondary" : "danger"}
          disabled={hasReported}
        >
          <AlertTriangle size={16} />
        </IconButton>
      )}

      {isAuthor && !isEditing && (
        <>
          <IconButton onClick={onEdit} label="Editar comentario" variant="secondary">
            <Edit2 size={16} />
          </IconButton>
          <IconButton onClick={onDelete} label="Eliminar comentario" variant="danger">
            <Trash2 size={16} />
          </IconButton>

          {comment.isHidden ? (
            <IconButton onClick={onUnhide} label="Mostrar comentario" variant="secondary">
              <Eye size={16} />
            </IconButton>
          ) : (
            comment.reportCount && comment.reportCount > 0 && (
              <IconButton onClick={onHide} label="Ocultar comentario" variant="secondary">
                <EyeOff size={16} />
              </IconButton>
            )
          )}
        </>
      )}
    </div>
  )
}
