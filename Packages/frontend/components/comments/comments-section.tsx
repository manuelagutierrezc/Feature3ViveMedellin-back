import CommentCard from "./comment-card"
import NavButton from "@/components/ui/nav-button"
import { ChevronDown } from "lucide-react"

export default function CommentsSection() {
  const comments = [
    {
      id: 1,
      author: "Carlos Esteban",
      content:
        "El año pasado fui al evento y me encantó demasiado, hay gran variedad de oferta gastronómica y las actividades muy entretenidas.",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      id: 2,
      author: "Juan Pablo",
      content:
        "Sin duda alguna es un evento muy destacado de la ciudad, recomiendo ir con buen tiempo de anticipación para conseguir una vista agradable.",
      initials: "JP",
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#00473e] mb-4">Comentarios (4)</h2>

      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            author={comment.author}
            content={comment.content}
            avatar={comment.avatar}
            initials={comment.initials}
          />
        ))}
      </div>

      <button className="text-[#475d5b] flex items-center mb-8">
        Ver más comentarios
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>

      <NavButton variant="primary">Unirme a la conversación</NavButton>
    </div>
  )
}
