import axios from 'axios';
import { LoginDto, RegisterDto, AuthResponse } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3300';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
);

export const authApi = {
  getNonce: async (walletAddress: string, role: string) => {
    const response = await api.get(`/auth/nonce?walletAddress=${walletAddress}&role=${role}`);
    return response.data;
  },

  register: async (data: RegisterDto) => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginDto) => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
}; 