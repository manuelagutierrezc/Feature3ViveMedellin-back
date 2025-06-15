import api from './axios';

export interface CreateCommentPayload {
  content: string;
  parentCommentId?: number | null;
}

// I'm assuming the backend comment structure based on the controller
export interface BackendComment {
  idComentario: number;
  contenido: string;
  fechaCreacion: string;
  idUsuario: number;
  comentarioPadreId: number | null;
  reporteCuenta: number;
  // userName is not provided by the comment microservice directly
}

export const createComment = async (payload: CreateCommentPayload) => {
  const { data } = await api.post<BackendComment>('/comentarios/crear', payload);
  return data;
};

export const getComments = async () => {
  // Using 'todos' to fetch all comments and build the hierarchy on the client
  const { data } = await api.get<BackendComment[]>('/comentarios/todos');
  return data;
};

export const getReplies = async (commentId: number) => {
  const { data } = await api.get<BackendComment[]>(`/comentarios/${commentId}/respuestas`);
  return data;
};

export const deleteComment = async (commentId: number) => {
  await api.delete(`/comentarios/${commentId}`);
};

export async function reportComment(commentId: number): Promise<void> {
  const response = await fetch(`/api/comentarios/${commentId}/reportar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to report comment')
  }
} 