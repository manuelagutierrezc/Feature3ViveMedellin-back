"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import CommentItem from "./comment-item"
import CommentForm from "./comment-form"
import { useComments } from "@/context/comments-context"
import { useAuth } from "@/context/auth-context"

export default function CommentsSection() {
  const { visibleComments, showAllComments, toggleShowAllComments } = useComments()
  const { isAuthenticated } = useAuth()

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#00473e] mb-5">
        Comentarios ({visibleComments.length})
      </h2>

      {/* Lista de comentarios primero */}
      <div className="space-y-6 mb-6">
        {visibleComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {/* Botón de ver más/menos */}
      <button
        onClick={toggleShowAllComments}
        className="text-[#475d5b] flex items-center mb-8 hover:text-[#00473e]"
      >
        {showAllComments ? (
          <>
            Ver menos comentarios
            <ChevronUp className="ml-1 h-4 w-4" />
          </>
        ) : (
          <>
            Ver más comentarios
            <ChevronDown className="ml-1 h-4 w-4" />
          </>
        )}
      </button>

      {/* Formulario o invitación a login al final */}
      {isAuthenticated ? (
        <CommentForm />
      ) : (
        <p className="text-[#475d5b] mb-4 italic">
          Inicia sesión para unirte a la conversación
        </p>
      )}
    </div>
  )
}
