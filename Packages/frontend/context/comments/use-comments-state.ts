// /context/comments/useCommentsState.ts
import { useState, useEffect, useMemo, useReducer } from "react";
import { getComments } from "../../lib/api/comments";
import { transformComment, filterHiddenComments } from "../../utils/comments-helpers";
import { commentsReducer, initialState } from "./comments-reducer";
import type { User } from "../../lib/api/auth";
import type { Comment } from "../../types/comments";
import { ActionType } from "./comments-types";

export function useCommentsState(user: User | null, notify: (msg: string) => void) {
  const [showAllComments, setShowAllComments] = useState(false);
  const [comments, dispatch] = useReducer(commentsReducer, initialState);

  const visibleComments = useMemo(() => {
    const filtered = comments
      .map((c: Comment) => filterHiddenComments(c, user))
      .filter((c: Comment | null): c is Comment => c !== null);
    return showAllComments ? filtered : filtered.slice(0, 3);
  }, [comments, showAllComments, user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backend = await getComments();
        const transformed = backend.map(c => transformComment(c, user));
        const map = new Map(transformed.map(c => [c.id, c]));
        const roots: Comment[] = [];

        for (const c of map.values()) {
          if (c.parentCommentId && map.has(c.parentCommentId)) {
            map.get(c.parentCommentId)!.replies.push(c);
          } else {
            roots.push(c);
          }
        }

        roots.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        dispatch({ type: ActionType.Set, payload: roots });
      } catch {
        notify("Error al cargar los comentarios");
      }
    };

    fetchData();
  }, [user, notify]);

  return {
    comments,
    visibleComments,
    showAllComments,
    toggleShowAllComments: () => setShowAllComments(prev => !prev),
    dispatch,
  };
}
