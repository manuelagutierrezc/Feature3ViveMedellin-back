// components/molecules/CommentMeta.tsx

import Typography from "@/components/atoms/typography"

interface CommentMetaProps {
  readonly author: {
    readonly name: string
  }
  readonly createdAt: string
  readonly reportCount?: number
}

export default function CommentMeta({ author, createdAt, reportCount }: CommentMetaProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div>
      <Typography variant="body" className="font-medium">
        {author.name}
      </Typography>
      <Typography variant="caption" color="secondary" className="mb-1">
        {formatDate(createdAt)}
      </Typography>
      {reportCount && reportCount > 0 && (
        <Typography variant="caption" className="text-orange-600">
          {reportCount} reporte{reportCount === 1 ? '' : 's'}
        </Typography>
      )}
    </div>
  )
}
