// components/molecules/CommentBody.tsx

import Typography from "@/components/atoms/typography"

interface CommentBodyProps {
  readonly text: string
  readonly isHidden: boolean
  readonly isAuthor: boolean
}

export default function CommentBody({ text, isHidden, isAuthor }: CommentBodyProps) {
  if (isHidden && !isAuthor) {
    return (
      <Typography variant="body" color="secondary" className="italic">
        [Este comentario ha sido ocultado por múltiples reportes]
      </Typography>
    )
  }

  return (
    <Typography variant="body" color="secondary">
      {text}
    </Typography>
  )
}
