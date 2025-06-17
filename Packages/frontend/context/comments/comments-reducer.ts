import { ActionType, type CommentAction } from "./comments-types";
import type { Comment } from "../../types/comments";
import {
  addReplyToParent,
  filterCommentAndReplies,
  updateCommentInTree,
} from "../../utils/comments-helpers";

export const initialState: Comment[] = [];

export function commentsReducer(state: Comment[], action: CommentAction): Comment[] {
  switch (action.type) {
    case ActionType.Set:
      return action.payload;

    case ActionType.Add:
      return action.payload.parentCommentId
        ? addReplyToParent(state, action.payload.parentCommentId, action.payload)
        : [action.payload, ...state];

    case ActionType.Edit:
      return updateCommentInTree(state, (c) =>
        c.id === action.id
          ? { ...c, text: action.text, updatedAt: new Date().toISOString() }
          : c
      );

    case ActionType.Delete:
      return filterCommentAndReplies(state, action.id);

    case ActionType.Report:
      return updateCommentInTree(state, (c) =>
        c.id === action.id
          ? {
              ...c,
              reportCount: (c.reportCount ?? 0) + 1,
              isHidden: (c.reportCount ?? 0) + 1 >= 3,
              reportedByCurrentUser: true,
            }
          : c
      );

    case ActionType.Hide:
      return updateCommentInTree(state, (c) =>
        c.id === action.id ? { ...c, isHidden: true } : c
      );

    case ActionType.Unhide:
      return updateCommentInTree(state, (c) =>
        c.id === action.id ? { ...c, isHidden: false } : c
      );

    default:
      return state;
  }
} 