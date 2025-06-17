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

// Simulamos la creación de un comentario localmente
export const createComment = async (payload: CreateCommentPayload): Promise<BackendComment> => {
  // Simulamos un ID único
  const id = Math.floor(Math.random() * 1000000);
  
  return {
    idComentario: id,
    contenido: payload.content,
    fechaCreacion: new Date().toISOString(),
    idUsuario: 1, // ID de usuario por defecto
    comentarioPadreId: payload.parentCommentId ?? null,
    reporteCuenta: 0
  };
};

// Retornamos array vacío para evitar llamadas al backend
export const getComments = async (): Promise<BackendComment[]> => {
  return [];
};

// Retornamos array vacío para evitar llamadas al backend
export const getReplies = async (): Promise<BackendComment[]> => {
  return [];
};

// Simulamos la eliminación de un comentario
export const deleteComment = async (): Promise<void> => {
  // No hacemos nada, solo simulamos la operación
  return;
};

// Simulamos el reporte de un comentario
export const reportComment = async (): Promise<void> => {
  // No hacemos nada, solo simulamos la operación
  return;
}; 