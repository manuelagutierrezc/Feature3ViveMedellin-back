"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit2, Trash2, X, Check } from "lucide-react"
import type { Comment } from "@/context/comments-context"
import { useAuth } from "@/context/auth-context"
import { useComments } from "@/context/comments-context"

interface CommentItemProps {
  comment: Comment
}

export default function CommentItem({ comment }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(comment.text)
  const { user } = useAuth()
  const { editComment, deleteComment } = useComments()

  const isAuthor = user?.id === comment.author.id

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

  return (
    <div className="flex items-start gap-4">
      {comment.author.avatar ? (
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={comment.author.avatar}
            alt={comment.author.name}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-full bg-[#e2e8f0] flex items-center justify-center flex-shrink-0">
          <span className="text-[#475d5b] font-medium">{comment.author.initials}</span>
        </div>
      )}

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium">{comment.author.name}:</p>
            <p className="text-xs text-[#6b7280] mb-1">{formatDate(comment.createdAt)}</p>
          </div>

          {isAuthor && !isEditing && (
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-[#475d5b] hover:text-[#00473e]"
                aria-label="Editar comentario"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => deleteComment(comment.id)}
                className="text-[#475d5b] hover:text-red-500"
                aria-label="Eliminar comentario"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#faae2b] mb-2"
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <button onClick={handleCancel} className="text-[#475d5b] hover:text-[#00473e] flex items-center">
                <X size={16} className="mr-1" /> Cancelar
              </button>
              <button onClick={handleEdit} className="text-[#475d5b] hover:text-green-500 flex items-center">
                <Check size={16} className="mr-1" /> Guardar
              </button>
            </div>
          </div>
        ) : (
          <p className="text-[#475d5b] leading-relaxed">{comment.text}</p>
        )}
      </div>
    </div>
  )
}
