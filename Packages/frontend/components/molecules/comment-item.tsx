"use client"

import { useState } from "react"
import { Edit2, Trash2, X, Check, MessageSquare } from "lucide-react"
import type { Comment } from "@/context/comments-context"
import { useAuth } from "@/context/auth-context"
import { useComments } from "@/context/comments-context"
import Avatar from "@/components/atoms/avatar"
import Typography from "@/components/atoms/typography"
import TextArea from "@/components/atoms/text-area"
import IconButton from "@/components/atoms/icon-button"
import Button from "@/components/atoms/Button"

interface CommentItemProps {
  readonly comment: Comment
  readonly depth?: number
}

export default function CommentItem({ comment, depth = 0 }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(comment.text)
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState("")
  const { user } = useAuth()
  const { editComment, deleteComment, addComment } = useComments()

  // Ensure both IDs are strings for comparison
  const isAuthor = user && user.id && comment.author.id && (user.id.toString() === comment.author.id.toString())

  const handleEdit = () => {
    if (editText.trim() !== comment.text) {
      editComment(comment.id, editText.trim())
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditText(comment.text)
    setIsEditing(false)
  }

  const handleReply = async () => {
    if (replyText.trim()) {
      await addComment(replyText.trim(), comment.id)
      setReplyText("")
      setIsReplying(false)
    }
  }

  const handleCancelReply = () => {
    setReplyText("")
    setIsReplying(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Limit nesting depth for better UI
  const maxDepth = 3
  const currentDepth = depth < maxDepth ? depth : maxDepth

  // Use predefined margin classes for Tailwind
  const marginClass = currentDepth === 0 ? '' : 
    currentDepth === 1 ? 'ml-8' : 
    currentDepth === 2 ? 'ml-16' : 
    'ml-24'

  return (
    <div className={`flex items-start gap-4 ${marginClass}`}>
      <Avatar src={comment.author.avatar} alt={comment.author.name} initials={comment.author.initials} />

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <Typography variant="body" className="font-medium">
              {comment.author.name}
            </Typography>
            <Typography variant="caption" color="secondary" className="mb-1">
              {formatDate(comment.createdAt)}
            </Typography>
          </div>

          <div className="flex space-x-2">
            {user && (
              <IconButton onClick={() => setIsReplying(!isReplying)} label="Responder comentario" variant="secondary">
                <MessageSquare size={16} />
              </IconButton>
            )}
            {isAuthor && !isEditing && (
              <>
                <IconButton onClick={() => setIsEditing(true)} label="Editar comentario" variant="secondary">
                  <Edit2 size={16} />
                </IconButton>
                <IconButton onClick={() => deleteComment(comment.id)} label="Eliminar comentario" variant="danger">
                  <Trash2 size={16} />
                </IconButton>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          <div>
            <TextArea
              id={`edit-comment-${comment.id}`}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={3}
              className="mb-2"
            />
            <div className="flex justify-end space-x-2">
              <IconButton onClick={handleCancel} label="Cancelar edición" variant="secondary">
                <X size={16} className="mr-1" /> Cancelar
              </IconButton>
              <IconButton onClick={handleEdit} label="Guardar cambios" variant="primary">
                <Check size={16} className="mr-1" /> Guardar
              </IconButton>
            </div>
          </div>
        ) : (
          <Typography variant="body" color="secondary">
            {comment.text}
          </Typography>
        )}

        {isReplying && (
          <div className="mt-4">
            <TextArea
              id={`reply-comment-${comment.id}`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={3}
              placeholder="Escribe tu respuesta..."
              className="mb-2"
            />
            <div className="flex justify-end space-x-2">
              <Button onClick={handleCancelReply} variant="secondary" size="sm">
                Cancelar
              </Button>
              <Button onClick={handleReply} variant="primary" size="sm" disabled={!replyText.trim()}>
                Responder
              </Button>
            </div>
          </div>
        )}

        {/* Render replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} depth={currentDepth + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
