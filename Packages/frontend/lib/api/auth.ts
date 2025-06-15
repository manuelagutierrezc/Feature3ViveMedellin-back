import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = '/api';

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export const registerUser = async (userData: RegisterRequest) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
    throw new Error('Registration failed');
  }
}; 

// This interface now matches the backend response
export interface BackendLoginResponse {
  token: string;
  userName: string;
}

export interface User {
  id: string;
  userName: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}


export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post<BackendLoginResponse>(`${API_URL}/auth/login`, credentials);
    const { token, userName } = response.data;

    // Decodificar el token para obtener el userId
    const decodedToken = jwtDecode<{
      userId?: number | string;
      sub?: string;
    }>(token);

    const userId = decodedToken.userId?.toString() ?? decodedToken.sub ?? '';

    // Construir el objeto user completo
    const user: User = {
      id: userId,
      userName,
      email: credentials.email,
    };

    return { token, user };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg = error.response?.data?.message ?? error.message;
      throw new Error(`Login failed: ${msg}`);
    }
    throw new Error('Login failed');
  }
};

export const getUserById = async (userId: string): Promise<User> => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    if (!response.data?.userName) {
      throw new Error(`No user data found for ID ${userId}`);
    }
    return {
      id: userId,
      userName: response.data.userName,
      email: response.data.email ?? ''
    };
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw error; // Re-lanzamos el error en lugar de retornar un usuario genérico
  }
};

// Función para obtener múltiples usuarios por sus IDs
export const getUsersByIds = async (userIds: string[]): Promise<{ [key: string]: User }> => {
  try {
    const uniqueIds = [...new Set(userIds)]; // Eliminar duplicados
    const results = await Promise.allSettled(uniqueIds.map(id => getUserById(id)));
    
    // Filtrar solo los resultados exitosos
    return results.reduce((acc, result, index) => {
      if (result.status === 'fulfilled') {
        acc[uniqueIds[index]] = result.value;
      }
      return acc;
    }, {} as { [key: string]: User });
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Re-lanzamos el error
  }
};