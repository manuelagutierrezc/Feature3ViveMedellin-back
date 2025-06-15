import type { User } from "@/lib/api/auth";

export const saveUserToStorage = (user: User) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  }
};

export const getUserFromStorage = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error getting user from storage:', error);
    return null;
  }
};

export const getTokenFromCookies = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  const match = /(^| )jwt=([^;]+)/.exec(document.cookie);
  return match ? match[2] : null;
};

export const setAuthToken = (token: string) => {
  document.cookie = `jwt=${token};path=/;max-age=${60 * 60 * 24 * 7};SameSite=Lax`; // 7 días
};

export const removeAuthToken = () => {
  document.cookie = "jwt=;path=/;max-age=0;SameSite=Lax";
}; 