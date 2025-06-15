import type { Comment } from "../../types/comments";

export enum ActionType {
  Set = "SET",
  Add = "ADD",
  Edit = "EDIT",
  Delete = "DELETE",
  Report = "REPORT",
  Hide = "HIDE",
  Unhide = "UNHIDE"
}

export interface SetAction {
  type: ActionType.Set;
  payload: Comment[];
}

export interface AddAction {
  type: ActionType.Add;
  payload: Comment;
}

export interface EditAction {
  type: ActionType.Edit;
  id: string;
  text: string;
}

export interface DeleteAction {
  type: ActionType.Delete;
  id: string;
}

export interface ReportAction {
  type: ActionType.Report;
  id: string;
}

export interface HideAction {
  type: ActionType.Hide;
  id: string;
}

export interface UnhideAction {
  type: ActionType.Unhide;
  id: string;
}

export type CommentAction =
  | SetAction
  | AddAction
  | EditAction
  | DeleteAction
  | ReportAction
  | HideAction
  | UnhideAction; 