// /context/comments/CommentsContext.ts
import { createContext, useContext } from "react";
import type { Comment } from "../../types/comments";

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

export const CommentsContext = createContext<CommentsContextType | undefined>(undefined);

export function useComments() {
  const context = useContext(CommentsContext);
  if (!context) throw new Error("useComments must be used within a CommentsProvider");
  return context;
}
