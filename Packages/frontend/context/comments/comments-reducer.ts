import { ActionType, type CommentAction } from "./comments-types";
import type { Comment } from "../../types/comments";

export const initialState: Comment[] = [];

export function commentsReducer(state: Comment[], action: CommentAction): Comment[] {
  switch (action.type) {
    case ActionType.Set:
      return action.payload;
    case ActionType.Add:
      return [action.payload, ...state];
    case ActionType.Edit:
      return state.map(comment => 
        comment.id === action.id 
          ? { ...comment, text: action.text, updatedAt: new Date().toISOString() }
          : comment
      );
    case ActionType.Delete:
      return state.filter(comment => comment.id !== action.id);
    case ActionType.Report:
      return state.map(comment => 
        comment.id === action.id 
          ? { ...comment, reportCount: (comment.reportCount ?? 0) + 1, isHidden: (comment.reportCount ?? 0) + 1 >= 3 }
          : comment
      );
    case ActionType.Hide:
      return state.map(comment => 
        comment.id === action.id ? { ...comment, isHidden: true } : comment
      );
    case ActionType.Unhide:
      return state.map(comment => 
        comment.id === action.id ? { ...comment, isHidden: false } : comment
      );
    default:
      return state;
  }
} 