"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useComments } from "@/context/comments-context"

export default function CommentForm() {
  const [text, setText] = useState("")
  const { user } = useAuth()
  const { addComment } = useComments()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !text.trim()) return

    addComment(text.trim(), user)
    setText("")
  }

  if (!user) return null

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-3">
        <label htmlFor="comment" className="block text-sm font-medium text-[#475d5b] mb-1">
          Añadir comentario
        </label>
        <textarea
          id="comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#faae2b]"
          rows={3}
          placeholder="Escribe tu comentario aquí..."
          required
        />
      </div>
      <button
        type="submit"
        disabled={!text.trim()}
        className="w-full bg-[#faae2b] text-[#00473e] font-medium py-2 rounded-md hover:bg-[#f9a61a] transition-colors disabled:opacity-70"      >
        Publicar comentario
      </button>
    </form>
  )
}
