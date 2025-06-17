"use client"

import { ChevronDown, ChevronUp, RefreshCw } from "lucide-react"
import CommentItem from "@/components/molecules/comment-item"
import CommentForm from "@/components/molecules/comment-form"
import Typography from "@/components/atoms/typography"
import Button from "@/components/atoms/Button"
import { useComments } from "@/context/comments-context"
import { useAuth } from "@/context/auth-context"
import { useState } from "react"

export default function CommentsSection() {
  const { comments, visibleComments, showAllComments, toggleShowAllComments, refreshComments } = useComments()
  const { isAuthenticated } = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refreshComments()
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <Typography variant="h3" color="primary">
          Comentarios ({comments.length})
        </Typography>
        
        <Button 
          onClick={handleRefresh} 
          variant="secondary" 
          size="sm"
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Actualizando...' : 'Refrescar'}
        </Button>
      </div>

      {isAuthenticated && <CommentForm />}

      {comments.length === 0 ? (
        <div className="text-center py-8">
          <Typography variant="body" color="secondary" className="mb-4">
            {isAuthenticated 
              ? "¡Sé el primero en comentar! Comparte tu opinión sobre este evento." 
              : "Aún no hay comentarios. Inicia sesión para participar en la conversación."
            }
          </Typography>
        </div>
      ) : (
        <>
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
        </>
      )}

      {!isAuthenticated && (
        <Typography variant="body" color="secondary" className="mb-4 italic text-center">
          Inicia sesión para unirte a la conversación y compartir tus comentarios
        </Typography>
      )}
    </div>
  )
}
