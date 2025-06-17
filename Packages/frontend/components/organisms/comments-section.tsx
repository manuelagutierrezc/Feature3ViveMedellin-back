"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import CommentItem from "@/components/molecules/comment-item"
import CommentForm from "@/components/molecules/comment-form"
import Typography from "@/components/atoms/typography"
import { useComments } from "@/context/comments-context"
import { useAuth } from "@/context/auth-context"

export default function CommentsSection() {
  const { comments, visibleComments, showAllComments, toggleShowAllComments } = useComments()
  const { isAuthenticated } = useAuth()

  return (
    <div>
      <Typography variant="h3" color="primary" className="mb-5">
        Comentarios ({comments.length})
      </Typography>

      {isAuthenticated && <CommentForm />}

      <div className="space-y-6 mb-6">
        {visibleComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {comments.length > 3 && (
        <button onClick={toggleShowAllComments} className="text-[#475d5b] flex items-center mb-8 hover:text-[#00473e]">
          {showAllComments ? (
            <>
              Ver menos comentarios
              <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Ver más comentarios ({comments.length - 3} más)
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </button>
      )}

      {!isAuthenticated && (
        <Typography variant="body" color="secondary" className="mb-4 italic">
          Inicia sesión para unirte a la conversación
        </Typography>
      )}
    </div>
  )
}
