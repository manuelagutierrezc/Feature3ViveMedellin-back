"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react"
import { getComments, createComment, deleteComment as apiDeleteComment, type BackendComment } from "@/lib/api/comments"
import { useAuth } from "@/context/auth-context"
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
}

type CommentsContextType = {
  comments: Comment[]
  visibleComments: Comment[]
  showAllComments: boolean
  toggleShowAllComments: () => void
  addComment: (text: string, parentCommentId: string | null) => Promise<void>
  editComment: (id: string, text: string) => void
  deleteComment: (id: string) => void
}

const CommentsContext = createContext<CommentsContextType | undefined>(undefined)

// Helper to transform backend comments to frontend format
const transformComment = (comment: BackendComment, users: { [key: string]: User | undefined }, loggedInUser: User | null): Comment => {
  const authorId = comment.idUsuario.toString()
  
  // Check if this comment belongs to the logged-in user
  const isLoggedInUserComment = loggedInUser && loggedInUser.id === authorId
  
  // If it's the logged-in user's comment, use their name
  // Otherwise, try to find in users map or use generic name
  const authorName = isLoggedInUserComment 
    ? loggedInUser.userName 
    : (users[authorId]?.userName ?? "Usuario")

  return {
    id: comment.idComentario.toString(),
    text: comment.contenido,
    author: {
      id: authorId,
      name: authorName,
      initials: authorName
        .split(" ")
        .map((n: string) => n[0])
        .join(""),
    },
    createdAt: comment.fechaCreacion,
    parentCommentId: comment.comentarioPadreId?.toString() || null,
    replies: [], // Replies will be structured separately
  }
}

export function CommentsProvider({ children }: { readonly children: React.ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [showAllComments, setShowAllComments] = useState(false)
  const { user } = useAuth()

  // Calculate visible comments based on showAllComments state
  const visibleComments = useMemo(() => {
    if (showAllComments) {
      return comments
    }
    // Show only first 3 comments when collapsed
    return comments.slice(0, 3)
  }, [comments, showAllComments])

  const toggleShowAllComments = useCallback(() => {
    setShowAllComments(prev => !prev)
  }, [])

  useEffect(() => {
    const fetchAndStructureComments = async () => {
      try {
        const backendComments = await getComments()
        const commentMap = new Map<string, Comment>()
        const rootComments: Comment[] = []

        // Create a users map with the logged-in user if available
        const users: { [key: string]: User } = {}
        if (user) {
          users[user.id] = user
        }

        // First pass: transform and map all comments
        backendComments.forEach((comment) => {
          const transformedComment = transformComment(comment, users, user)
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

        setComments(rootComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
      } catch (error) {
        console.error("Error fetching comments:", error)
        // Set empty array on error
        setComments([])
      }
    }

    fetchAndStructureComments()
  }, [user])

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
        
        // Transform the new comment with the logged-in user info
        // Pass the user in the users map to ensure correct name mapping
        const users = { [user.id]: user }
        const newComment = transformComment(newBackendComment, users, user)

        setComments((prevComments) => {
          const newComments = [...prevComments]
          if (newComment.parentCommentId) {
            // Find parent and add reply
            const findAndAddReply = (comments: Comment[]): Comment[] => {
              return comments.map((c) => {
                if (c.id === newComment.parentCommentId) {
                  return { ...c, replies: [...c.replies, newComment] }
                }
                if (c.replies.length > 0) {
                  return { ...c, replies: findAndAddReply(c.replies) }
                }
                return c
              })
            }
            return findAndAddReply(newComments)
          } else {
            // Add root comment
            return [newComment, ...newComments]
          }
        })
      } catch (error) {
        console.error("Failed to post comment:", error)
        alert("Error al publicar el comentario. Por favor, intenta de nuevo.")
      }
    },
    [user],
  )

  const editComment = useCallback((id: string, text: string) => {
    if (!user) {
      console.error("User must be logged in to edit comment")
      return
    }
    
    // Since the backend doesn't have an edit endpoint, we'll update locally
    // In a real implementation, you would call an API endpoint here
    setComments((prevComments) => {
      const updateComment = (comments: Comment[]): Comment[] => {
        return comments.map((c) => {
          if (c.id === id && c.author.id === user.id) {
            return { ...c, text, updatedAt: new Date().toISOString() }
          }
          if (c.replies.length > 0) {
            return { ...c, replies: updateComment(c.replies) }
          }
          return c
        })
      }
      return updateComment(prevComments)
    })
  }, [user])

  const deleteComment = useCallback(async (id: string) => {
    if (!user) {
      console.error("User must be logged in to delete comment")
      alert("Debes iniciar sesión para eliminar comentarios")
      return
    }
    
    try {
      await apiDeleteComment(parseInt(id, 10))
      setComments((prevComments) => {
        const filterReplies = (comments: Comment[]): Comment[] => {
          return comments.filter((c) => c.id !== id).map((c) => ({ ...c, replies: filterReplies(c.replies) }))
        }
        return filterReplies(prevComments)
      })
    } catch (error) {
      console.error("Failed to delete comment:", error)
      alert("Error al eliminar el comentario. Asegúrate de que eres el autor del comentario.")
    }
  }, [user])

  const value = useMemo(
    () => ({
      comments,
      visibleComments,
      showAllComments,
      toggleShowAllComments,
      addComment,
      editComment,
      deleteComment,
    }),
    [comments, visibleComments, showAllComments, toggleShowAllComments, addComment, editComment, deleteComment],
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
