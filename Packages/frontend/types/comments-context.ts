import type { Comment } from "./comments";

export type CommentsContextType = {
  comments: Comment[];
  visibleComments: Comment[];
  showAllComments: boolean;
  toggleShowAllComments: () => void;
  addComment: (text: string, parentCommentId: string | null) => Promise<void>;
  editComment: (id: string, text: string) => void;
  deleteComment: (id: string) => void;
  reportComment: (id: string) => void;
  hideComment: (id: string) => void;
  unhideComment: (id: string) => void;
};