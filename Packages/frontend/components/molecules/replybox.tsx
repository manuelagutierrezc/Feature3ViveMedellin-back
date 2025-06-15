// components/molecules/ReplyBox.tsx

import { useState } from "react"
import TextArea from "@/components/atoms/text-area"
import Button from "@/components/atoms/Button"

interface ReplyBoxProps {
  readonly onReply: (text: string) => void
  readonly onCancel: () => void
}

export default function ReplyBox({ onReply, onCancel }: ReplyBoxProps) {
  const [replyText, setReplyText] = useState("")

  const handleSend = () => {
    const trimmed = replyText.trim()
    if (trimmed) {
      onReply(trimmed)
      setReplyText("")
    }
  }

  return (
    <div className="mt-4">
      <TextArea
        id="reply-box"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        rows={3}
        placeholder="Escribe tu respuesta..."
        className="mb-2"
      />
      <div className="flex justify-end space-x-2">
        <Button onClick={onCancel} variant="secondary" size="sm">
          Cancelar
        </Button>
        <Button onClick={handleSend} variant="primary" size="sm" disabled={!replyText.trim()}>
          Responder
        </Button>
      </div>
    </div>
  )
}
