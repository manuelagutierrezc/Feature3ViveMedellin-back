"use client"

import type React from "react"

import { useState } from "react"
import Button from "@/components/atoms/Button"
import TextArea from "@/components/atoms/text-area"
import { useAuth } from "@/context/auth-context"
import { useComments } from "@/context/comments-context"

export default function CommentForm() {
  const [text, setText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  const { addComment } = useComments()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !text.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await addComment(text.trim(), null)
      setText("")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) return null

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg border">
      <TextArea
        id="comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        label="Añadir comentario"
        placeholder={`¡Hola ${user.userName && user.userName !== 'Usuario' ? user.userName : 'participante'}! Comparte tu opinión sobre este evento...`}
        required
        rows={3}
        disabled={isSubmitting}
      />
      <div className="mt-3 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {text.length}/1000 caracteres
        </span>
        <Button 
          type="submit" 
          variant="primary" 
          disabled={!text.trim() || isSubmitting}
        >
          {isSubmitting ? "Publicando..." : "Publicar comentario"}
        </Button>
      </div>
    </form>
  )
}
