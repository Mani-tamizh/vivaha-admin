import { apiClient } from "./client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const authService = {
  login: async (email: string, password: string):Promise<{token: string, user: User}> => {
    try {
      const response = await apiClient.post('/auth/admin/login', { email, password });
      return {
        token: response.data.token,
        user: response.data.user
      };
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Invalid email or password');
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
};
