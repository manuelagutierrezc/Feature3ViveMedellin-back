"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react"
import { getComments, createComment, deleteComment as apiDeleteComment, reportComment as apiReportComment, type BackendComment } from "@/lib/api/comments"
import { useAuth } from "@/context/auth-context"
import { useNotifications } from "@/context/notifications-context"
import type { User } from "@/lib/api/auth"

// Frontend-specific comment structure
export type Comment = {
  id: string
  text: string
  author: {
    id: string
    name: string
    initials: string
    avatar?: string
  }
  createdAt: string
  updatedAt?: string
  parentCommentId: string | null
  replies: Comment[]
  reportCount?: number
  isHidden?: boolean
  reportedByCurrentUser?: boolean
}

type CommentsContextType = {
  comments: Comment[]
  visibleComments: Comment[]
  showAllComments: boolean
  toggleShowAllComments: () => void
  addComment: (text: string, parentCommentId: string | null) => Promise<void>
  editComment: (id: string, text: string) => void
  deleteComment: (id: string) => void
  reportComment: (id: string) => void
  hideComment: (id: string) => void
  unhideComment: (id: string) => void
}

const CommentsContext = createContext<CommentsContextType | undefined>(undefined)

// Helper to transform backend comments to frontend format
const transformComment = (comment: BackendComment, loggedInUser: User | null): Comment => {
  const authorId = comment.idUsuario.toString()
  
  // Check if this comment belongs to the logged-in user
  const isLoggedInUserComment = loggedInUser && loggedInUser.id === authorId
  
  // Si es el usuario logueado, muestra su nombre, si no, muestra el idUsuario
  const authorName = isLoggedInUserComment 
    ? loggedInUser.userName 
    : authorId

  return {
    id: comment.idComentario.toString(),
    text: comment.contenido,
    author: {
      id: authorId,
      name: authorName,
      initials: authorName[0]?.toUpperCase() ?? "",
    },
    createdAt: comment.fechaCreacion,
    parentCommentId: comment.comentarioPadreId?.toString() ?? null,
    replies: [], // Replies will be structured separately
    reportCount: comment.reporteCuenta,
    isHidden: comment.reporteCuenta >= 3,
    reportedByCurrentUser: false, // Por defecto, el usuario actual no ha reportado
  }
}

const updateCommentInTree = (comments: Comment[], updateFn: (comment: Comment) => Comment): Comment[] => {
  return comments.map(comment => ({
    ...updateFn(comment),
    replies: comment.replies.length > 0 ? updateCommentInTree(comment.replies, updateFn) : []
  }))
}

const addReplyToParent = (comments: Comment[], parentId: string, newReply: Comment): Comment[] => {
  return comments.map(comment => {
    if (comment.id === parentId) {
      return { ...comment, replies: [...comment.replies, newReply] }
    }
    if (comment.replies.length > 0) {
      return { ...comment, replies: addReplyToParent(comment.replies, parentId, newReply) }
    }
    return comment
  })
}

const filterCommentAndReplies = (comments: Comment[], commentId: string): Comment[] => {
  return comments
    .filter(comment => comment.id !== commentId)
    .map(comment => ({
      ...comment,
      replies: filterCommentAndReplies(comment.replies, commentId)
    }))
}

export function CommentsProvider({ children }: { readonly children: React.ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [showAllComments, setShowAllComments] = useState(false)
  const { user } = useAuth()
  const { addNotification } = useNotifications()

  // Calculate visible comments based on showAllComments state
  const visibleComments = useMemo(() => {
    // Filter out hidden comments unless the user is the author
    const filterHidden = (comment: Comment): Comment | null => {
      if (comment.isHidden && comment.author.id !== user?.id) {
        return null
      }
      
      // Process replies recursively
      const filteredReplies = comment.replies
        .map(filterHidden)
        .filter((reply): reply is Comment => reply !== null)
      
      return {
        ...comment,
        replies: filteredReplies
      }
    }
    
    const filteredComments = comments
      .map(filterHidden)
      .filter((comment): comment is Comment => comment !== null)
    
    if (showAllComments) {
      return filteredComments
    }
    // Show only first 3 comments when collapsed
    return filteredComments.slice(0, 3)
  }, [comments, showAllComments, user?.id])

  const toggleShowAllComments = useCallback(() => {
    setShowAllComments(prev => !prev)
  }, [])

  useEffect(() => {
    const fetchAndStructureComments = async () => {
      try {
        const backendComments = await getComments()
        
        const commentMap = new Map<string, Comment>()
        const rootComments: Comment[] = []

        // First pass: transform and map all comments
        backendComments.forEach((comment) => {
          const transformedComment = transformComment(comment, user)
          commentMap.set(comment.idComentario.toString(), transformedComment)
        })

        // Second pass: build the hierarchy
        commentMap.forEach((comment) => {
          if (comment.parentCommentId && commentMap.has(comment.parentCommentId)) {
            const parent = commentMap.get(comment.parentCommentId)
            parent?.replies.push(comment)
          } else {
            rootComments.push(comment)
          }
        })

        const sortedComments = [...rootComments].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setComments(sortedComments)
      } catch (error) {
        console.error("Error fetching comments:", error)
        addNotification({
          type: "error",
          title: "Error",
          message: "No se pudieron cargar los comentarios",
          duration: 5000
        })
        setComments([])
      }
    }

    fetchAndStructureComments()
  }, [user, addNotification])

  const addComment = useCallback(
    async (text: string, parentCommentId: string | null) => {
      if (!user) {
        console.error("User must be logged in to comment")
        alert("Debes iniciar sesión para comentar")
        return
      }
      try {
        const newBackendComment = await createComment({
          content: text,
          parentCommentId: parentCommentId ? parseInt(parentCommentId, 10) : null,
        })
        
        const newComment = transformComment(newBackendComment, user)

        setComments(prevComments => {
          if (newComment.parentCommentId) {
            return addReplyToParent(prevComments, newComment.parentCommentId, newComment)
          }
          return [newComment, ...prevComments]
        })

        addNotification({
          type: "success",
          title: "Comentario publicado",
          message: parentCommentId ? "Tu respuesta se ha publicado correctamente" : "Tu comentario se ha publicado correctamente",
          duration: 3000
        })
      } catch (error) {
        console.error("Failed to post comment:", error)
        addNotification({
          type: "error",
          title: "Error al publicar",
          message: "No se pudo publicar el comentario. Por favor, intenta de nuevo.",
          duration: 5000
        })
      }
    },
    [user, addNotification],
  )

  const editComment = useCallback((id: string, text: string) => {
    if (!user) {
      console.error("User must be logged in to edit comment")
      return
    }
    
    setComments(prevComments => 
      updateCommentInTree(prevComments, comment => {
        if (comment.id === id && comment.author.id === user.id) {
          return { ...comment, text, updatedAt: new Date().toISOString() }
        }
        return comment
      })
    )

    addNotification({
      type: "success",
      title: "Comentario actualizado",
      message: "Tu comentario se ha editado correctamente",
      duration: 3000
    })
  }, [user, addNotification])

  const deleteComment = useCallback(async (id: string) => {
    if (!user) {
      console.error("User must be logged in to delete comment")
      alert("Debes iniciar sesión para eliminar comentarios")
      return
    }
    
    try {
      await apiDeleteComment(parseInt(id, 10))
      setComments(prevComments => filterCommentAndReplies(prevComments, id))
      
      addNotification({
        type: "success",
        title: "Comentario eliminado",
        message: "El comentario se ha eliminado correctamente",
        duration: 3000
      })
    } catch (error) {
      console.error("Failed to delete comment:", error)
      addNotification({
        type: "error",
        title: "Error al eliminar",
        message: "No se pudo eliminar el comentario. Asegúrate de ser el autor.",
        duration: 5000
      })
    }
  }, [user, addNotification])

  const reportComment = useCallback(async (id: string) => {
    if (!user) {
      console.error("User must be logged in to report comment")
      alert("Debes iniciar sesión para reportar comentarios")
      return
    }

    try {
      await apiReportComment(parseInt(id, 10))
      
      setComments(prevComments => 
        updateCommentInTree(prevComments, comment => {
          if (comment.id === id) {
            const newReportCount = (comment.reportCount ?? 0) + 1
            return { 
              ...comment, 
              reportedByCurrentUser: true,
              reportCount: newReportCount,
              isHidden: newReportCount >= 3
            }
          }
          return comment
        })
      )

      addNotification({
        type: "warning",
        title: "Comentario reportado",
        message: "Gracias por reportar el comentario. Lo revisaremos pronto.",
        duration: 4000
      })
    } catch (error) {
      console.error("Failed to report comment:", error)
      addNotification({
        type: "error",
        title: "Error al reportar",
        message: "No se pudo reportar el comentario. Por favor, intenta de nuevo.",
        duration: 5000
      })
    }
  }, [user, addNotification])

  const hideComment = useCallback((id: string) => {
    setComments(prevComments => 
      updateCommentInTree(prevComments, comment => {
        if (comment.id === id) {
          return { ...comment, isHidden: true }
        }
        return comment
      })
    )
  }, [])

  const unhideComment = useCallback((id: string) => {
    setComments(prevComments => 
      updateCommentInTree(prevComments, comment => {
        if (comment.id === id) {
          return { ...comment, isHidden: false }
        }
        return comment
      })
    )
  }, [])

  const value = useMemo(
    () => ({
      comments,
      visibleComments,
      showAllComments,
      toggleShowAllComments,
      addComment,
      editComment,
      deleteComment,
      reportComment,
      hideComment,
      unhideComment,
    }),
    [comments, visibleComments, showAllComments, toggleShowAllComments, addComment, editComment, deleteComment, reportComment, hideComment, unhideComment],
  )

  return <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>
}

export function useComments() {
  const context = useContext(CommentsContext)
  if (context === undefined) {
    throw new Error("useComments must be used within a CommentsProvider")
  }
  return context
}
