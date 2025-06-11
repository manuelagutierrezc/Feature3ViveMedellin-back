"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react"
import type { User } from "@/context/auth-context"

export type Comment = {
  id: string
  text: string
  author: User
  createdAt: string
  updatedAt?: string
}

type CommentsContextType = {
  comments: Comment[]
  visibleComments: Comment[]
  showAllComments: boolean
  toggleShowAllComments: () => void
  addComment: (text: string, author: User) => void
  editComment: (id: string, text: string) => void
  deleteComment: (id: string) => void
}

const CommentsContext = createContext<CommentsContextType | undefined>(undefined)

export function CommentsProvider({ children }: { readonly children: React.ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [showAllComments, setShowAllComments] = useState(false)

  // Cargar comentarios del localStorage al iniciar
  useEffect(() => {
    const storedComments = localStorage.getItem("comments")
    if (storedComments) {
      setComments(JSON.parse(storedComments))
    } else {
      // Comentarios iniciales de ejemplo
      const initialComments: Comment[] = [
        {
          id: "1",
          text: "El año pasado fui al evento y me encantó demasiado, hay gran variedad de oferta gastronómica y las actividades muy entretenidas.",
          author: {
            id: "1",
            name: "Carlos Esteban",
            email: "carlos@example.com",
            initials: "CE"
          },
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 días atrás
        },
        {
          id: "2",
          text: "Sin duda alguna es un evento muy destacado de la ciudad, recomiendo ir con buen tiempo de anticipación para conseguir una vista agradable.",
          author: {
            id: "2",
            name: "Juan Pablo",
            email: "juan@example.com",
            initials: "JP",
          },
          createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 día atrás
        },
      ]
      setComments(initialComments)
      localStorage.setItem("comments", JSON.stringify(initialComments))
    }
  }, [])

  // Guardar comentarios en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments))
  }, [comments])

  // Mostrar solo los 2 comentarios más recientes o todos
  const visibleComments = useMemo(() => {
    // Se crea una copia para no mutar el estado original
    const sortedComments = [...comments].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    return showAllComments ? sortedComments : sortedComments.slice(0, 2)
  }, [comments, showAllComments])

  const toggleShowAllComments = useCallback(() => {
    setShowAllComments((prev) => !prev)
  }, [])

  const addComment = useCallback((text: string, author: User) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      text,
      author,
      createdAt: new Date().toISOString(),
    }
    setComments((prevComments) => [...prevComments, newComment])
  }, [])

  const editComment = useCallback((id: string, text: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              text,
              updatedAt: new Date().toISOString(),
            }
          : comment,
      ),
    )
  }, [])

  const deleteComment = useCallback((id: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id),
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
    }),
    [comments, visibleComments, showAllComments, toggleShowAllComments, addComment, editComment, deleteComment],
  )

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  )
}

export function useComments() {
  const context = useContext(CommentsContext)
  if (context === undefined) {
    throw new Error("useComments must be used within a CommentsProvider")
  }
  return context
}
