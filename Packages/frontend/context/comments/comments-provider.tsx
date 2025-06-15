// /context/comments/CommentsProvider.tsx
"use client";
import { CommentsContext } from "./comments-context";
import { useAuth } from "../auth/auth-context";
import { useNotifications } from "../notifications/notifications-context";
import { useCommentsState } from "./use-comments-state";
import { useCommentsActions } from "./use-comments-actions";
import { useMemo } from "react";

export function CommentsProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const state = useCommentsState(user, (msg) =>
    addNotification({ type: "error", title: "Error", message: msg, duration: 5000 })
  );
  const actions = useCommentsActions(user, state.dispatch, (msg) =>
    addNotification({ type: "success", title: "Comentario", message: msg, duration: 3000 })
  );

  const value = useMemo(() => ({
    comments: state.comments,
    visibleComments: state.visibleComments,
    showAllComments: state.showAllComments,
    toggleShowAllComments: state.toggleShowAllComments,
    ...actions,
  }), [state.comments, state.visibleComments, state.showAllComments, state.toggleShowAllComments, actions]);

  return <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>;
}
