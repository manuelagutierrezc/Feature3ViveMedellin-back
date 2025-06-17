import axios from 'axios';
import { getCookie, deleteCookie } from 'cookies-next';

const api = axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getCookie('jwt');
    if (token && typeof token === 'string') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request URL:', `${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error instanceof Error ? error : new Error(error.message ?? 'Request failed'));
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });

    if (error.response?.status === 401) {
      // Si el token expiró, redirigir al login
      if (error.response.data?.error?.includes('JWT')) {
        deleteCookie('jwt');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error instanceof Error ? error : new Error(error.message ?? 'Unknown error'));
  }
);

export default api; 