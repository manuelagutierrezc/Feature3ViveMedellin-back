"use client"

import { useState } from "react"
import type { Comment } from "@/types/comments"
import { useAuth } from "@/context/auth/auth-context"
import { useComments } from "@/context/comments/comments-context"
import Avatar from "@/components/atoms/avatar"

import CommentBody from "./comment-body"
import CommentEditor from "./comment-editor"
import CommentActions from "./comment-actions"
import CommentMeta from "./comment-meta"
import ReplyBox from "./replybox"


type CommentItemProps = {
  readonly comment: Comment;
  readonly depth?: number;
};

export default function CommentItem({ comment, depth = 0 }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const { user } = useAuth()
  const { editComment, deleteComment, addComment, reportComment, hideComment, unhideComment } = useComments()

  const isAuthor = user?.id?.toString() === comment.author.id?.toString()
  const hasReported = comment.reportedByCurrentUser ?? false
  const isHiddenForViewer = comment.isHidden && !isAuthor

  const handleEdit = (text: string) => {
    editComment(comment.id, text)
    setIsEditing(false)
  }

  const handleReply = async (text: string) => {
    await addComment(text, comment.id)
    setIsReplying(false)
  }

  return (
    <div className={`flex items-start gap-4 ${isHiddenForViewer ? 'opacity-50' : ''}`}>
      <Avatar src={comment.author.avatar} alt={comment.author.name} initials={comment.author.initials} />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <CommentMeta
            author={comment.author}
            createdAt={comment.createdAt}
            reportCount={comment.reportCount}
          />
          <CommentActions
            comment={comment}
            isAuthor={isAuthor}
            hasReported={hasReported}
            isEditing={isEditing}
            onReply={() => setIsReplying(!isReplying)}
            onReport={() => reportComment(comment.id)}
            onEdit={() => setIsEditing(true)}
            onDelete={() => deleteComment(comment.id)}
            onHide={() => hideComment(comment.id)}
            onUnhide={() => unhideComment(comment.id)}
          />
        </div>

        {isEditing ? (
          <CommentEditor
            initialText={comment.text}
            onCancel={() => setIsEditing(false)}
            onSave={handleEdit}
          />
        ) : (
          <CommentBody
            text={comment.text}
            isHidden={comment.isHidden ?? false}
            isAuthor={isAuthor}
          />
        )}

        {isReplying && (
          <ReplyBox
            onCancel={() => setIsReplying(false)}
            onReply={handleReply}
          />
        )}

        {comment.replies?.map(reply => (
          <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
        ))}
      </div>
    </div>
  )
}

