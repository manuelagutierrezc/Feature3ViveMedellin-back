import api from "./axios";

export interface CreateCommentPayload {
  content: string;
  parentCommentId?: number | null;
}

// Estructuras de datos que el backend expone de acuerdo con CommentController y Comment entity

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

// ---------------------- Peticiones al servicio backend ---------------------- //

/**
 * Crea un comentario o respuesta.
 * La ruta está definida en el API Gateway: /api/comentarios/crear
 */
export const createComment = async (
  payload: CreateCommentPayload
): Promise<BackendComment> => {
  const { data } = await api.post<BackendComment>("comentarios/crear", payload);
  return data;
};

/**
 * Obtiene todos los comentarios (incluyendo respuestas) ordenados por fecha
 * La ruta está definida en el API Gateway: /api/comentarios/todos
 */
export const getComments = async (): Promise<BackendComment[]> => {
  const { data } = await api.get<BackendComment[]>("comentarios/todos");
  return data;
};

/**
 * Elimina un comentario. Solo será aceptado si el usuario autenticado es el autor.
 */
export const deleteComment = async (id: string | number): Promise<void> => {
  await api.delete(`comentarios/${id}`);
};

/**
 * Reporta un comentario. Cuando llegue a 3 reportes el backend lo elimina automáticamente.
 */
export const reportComment = async (id: string | number): Promise<void> => {
  await api.post(`comentarios/${id}/reportar`);
};

// Por ahora no se usa, pero lo dejamos disponible por si se necesitan respuestas aisladas:
export const getReplies = async (
  parentCommentId: number | string
): Promise<BackendComment[]> => {
  const { data } = await api.get<BackendComment[]>(
    `comentarios/${parentCommentId}/respuestas`
  );
  return data;
}; 