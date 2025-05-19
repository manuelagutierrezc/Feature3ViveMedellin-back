import Image from "next/image"

interface CommentCardProps {
  author: string
  content: string
  avatar?: string
  initials?: string
}

export default function CommentCard({ author, content, avatar, initials }: CommentCardProps) {
  return (
    <div className="flex items-start gap-4">
      {avatar ? (
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image src={avatar} alt={author} width={48} height={48} className="object-cover" />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-full bg-[#e2e8f0] flex items-center justify-center flex-shrink-0">
          <span className="text-[#475d5b] font-medium">{initials}</span>
        </div>
      )
      }

      <div>
        <p className="font-medium">{author}:</p>
        <p className="text-[#475d5b]">{content}</p>
      </div>
    </div>
  )
}
