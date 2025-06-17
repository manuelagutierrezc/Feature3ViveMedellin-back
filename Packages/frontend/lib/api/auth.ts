import axios from 'axios';

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

    // Manually construct the user object for the frontend context
    // The ID will be added in the auth-context from the decoded token
    const user = {
      id: '', // Will be filled from decoded token in auth-context
      userName: userName || 'Usuario', // Ensure userName is not empty
      email: credentials.email,
    };

    return { token, user: user as User };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Puedes customizar el mensaje según el código de estado
      const msg = error.response?.data?.message ?? error.message;
      throw new Error(`Login failed: ${msg}`);
    }
    throw new Error('Login failed');
  }
};