"use client"

import type React from "react"

import { useState } from "react"
import Button from "@/components/atoms/Button"
import TextArea from "@/components/atoms/text-area"
import { useAuth } from "@/context/auth-context"
import { useComments } from "@/context/comments-context"

export default function CommentForm() {
  const [text, setText] = useState("")
  const { user } = useAuth()
  const { addComment } = useComments()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !text.trim()) return

    await addComment(text.trim(), null)
    setText("")
  }

  if (!user) return null

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <TextArea
        id="comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        label="Añadir comentario"
        placeholder="Escribe tu comentario aquí..."
        required
      />
      <div className="mt-3">
        <Button type="submit" variant="primary" disabled={!text.trim()}>
          Publicar comentario
        </Button>
      </div>
    </form>
  )
}
