import { useCallback, type Dispatch } from "react";
import { createComment, deleteComment as deleteCommentApi, reportComment as reportCommentApi } from "../../lib/api/comments";
import type { User } from "../../lib/api/auth";
import { ActionType, type CommentAction } from "./comments-types";
import { transformComment } from "../../utils/comments-helpers";

export function useCommentsActions(
  user: User | null,
  dispatch: Dispatch<CommentAction>,
  notify: (msg: string) => void
) {
  const addComment = useCallback(async (text: string, parentCommentId: string | null) => {
    if (!user) {
      notify("Debes iniciar sesión para comentar");
      return;
    }

    try {
      const newComment = await createComment({
        content: text,
        parentCommentId: parentCommentId ? parseInt(parentCommentId, 10) : null,
      });
      
      dispatch({ type: ActionType.Add, payload: transformComment(newComment, user) });
      notify(parentCommentId ? "Respuesta publicada" : "Comentario publicado");
    } catch {
      notify("Error al publicar el comentario");
    }
  }, [user, dispatch, notify]);

  const editComment = useCallback((id: string, text: string) => {
    if (!user) {
      notify("Debes iniciar sesión para editar comentarios");
      return;
    }
    dispatch({ type: ActionType.Edit, id, text });
    notify("Comentario actualizado");
  }, [user, dispatch, notify]);

  const deleteCommentAction = useCallback(async (id: string) => {
    if (!user) {
      notify("Debes iniciar sesión para eliminar comentarios");
      return;
    }

    try {
      await deleteCommentApi(parseInt(id, 10));
      dispatch({ type: ActionType.Delete, id });
      notify("Comentario eliminado");
    } catch {
      notify("Error al eliminar el comentario");
    }
  }, [user, dispatch, notify]);

  const reportCommentAction = useCallback(async (id: string) => {
    if (!user) {
      notify("Debes iniciar sesión para reportar comentarios");
      return;
    }

    try {
      await reportCommentApi(parseInt(id, 10));
      dispatch({ type: ActionType.Report, id });
      notify("Comentario reportado");
    } catch {
      notify("Error al reportar el comentario");
    }
  }, [user, dispatch, notify]);

  const hideComment = useCallback((id: string) => {
    dispatch({ type: ActionType.Hide, id });
  }, [dispatch]);

  const unhideComment = useCallback((id: string) => {
    dispatch({ type: ActionType.Unhide, id });
  }, [dispatch]);

  return {
    addComment,
    editComment,
    deleteComment: deleteCommentAction,
    reportComment: reportCommentAction,
    hideComment,
    unhideComment,
  };
}