export type Comment = {
  id: string;
  text: string;
  author: { id: string; name: string; initials: string; avatar?: string };
  createdAt: string;
  updatedAt?: string;
  parentCommentId: string | null;
  replies: Comment[];
  reportCount?: number;
  isHidden?: boolean;
  reportedByCurrentUser?: boolean;
};