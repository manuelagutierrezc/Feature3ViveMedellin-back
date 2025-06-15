import type { BackendComment } from "@/lib/api/comments";
import type { Comment } from "@/types/comments";
import type { User } from "@/lib/api/auth";

export function transformComment(
  comment: BackendComment,
  user: User | null
): Comment {
  const authorId = comment.idUsuario.toString();
  const isAuthor = user?.id === authorId;
  const authorName = isAuthor ? user.userName : authorId;

  return {
    id: comment.idComentario.toString(),
    text: comment.contenido,
    author: { id: authorId, name: authorName, initials: authorName[0]?.toUpperCase() ?? "" },
    createdAt: comment.fechaCreacion,
    updatedAt: undefined,
    parentCommentId: comment.comentarioPadreId?.toString() ?? null,
    replies: [],
    reportCount: comment.reporteCuenta,
    isHidden: comment.reporteCuenta >= 3,
    reportedByCurrentUser: false
  };
}

export function updateCommentInTree(
  comments: Comment[],
  fn: (c: Comment) => Comment
): Comment[] {
  return comments.map(c => ({ ...fn(c), replies: updateCommentInTree(c.replies, fn) }));
}

export function addReplyToParent(
  comments: Comment[],
  parentId: string,
  reply: Comment
): Comment[] {
  return comments.map(c =>
    c.id === parentId
      ? { ...c, replies: [...c.replies, reply] }
      : { ...c, replies: addReplyToParent(c.replies, parentId, reply) }
  );
}

export function filterCommentAndReplies(
  comments: Comment[],
  id: string
): Comment[] {
  return comments
    .filter(c => c.id !== id)
    .map(c => ({ ...c, replies: filterCommentAndReplies(c.replies, id) }));
}

export function filterHiddenComments(
  comment: Comment,
  user: User | null
): Comment | null {
  if (comment.isHidden && comment.author.id !== user?.id) return null;
  const replies = comment.replies
    .map(r => filterHiddenComments(r, user))
    .filter((r): r is Comment => r !== null);
  return { ...comment, replies };
}