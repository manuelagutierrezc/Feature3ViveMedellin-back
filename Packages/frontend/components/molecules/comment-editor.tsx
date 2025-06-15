// components/molecules/CommentEditor.tsx

import { useState } from "react"
import TextArea from "@/components/atoms/text-area"
import IconButton from "@/components/atoms/icon-button"
import { X, Check } from "lucide-react"

interface CommentEditorProps {
  readonly initialText: string
  readonly onSave: (text: string) => void
  readonly onCancel: () => void
}

export default function CommentEditor({ initialText, onSave, onCancel }: CommentEditorProps) {
  const [text, setText] = useState(initialText)

  const handleSave = () => {
    const trimmed = text.trim()
    if (trimmed) onSave(trimmed)
  }

  return (
    <div>
      <TextArea
        id="comment-editor"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="mb-2"
      />
      <div className="flex justify-end space-x-2">
        <IconButton onClick={onCancel} label="Cancelar edición" variant="secondary">
          <X size={16} className="mr-1" /> Cancelar
        </IconButton>
        <IconButton onClick={handleSave} label="Guardar cambios" variant="primary">
          <Check size={16} className="mr-1" /> Guardar
        </IconButton>
      </div>
    </div>
  )
}
