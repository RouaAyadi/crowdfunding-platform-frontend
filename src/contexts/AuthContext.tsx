"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import { useToast } from '@/lib/useToast';
import { authApi } from '@/services/api';
import { AuthState, LoginDto, RegisterDto } from '@/types/auth';
import { Roles } from '@/types/roles';

interface AuthContextType extends AuthState {
  connectWallet: () => Promise<string>;
  register: (data: Omit<RegisterDto, 'walletAddress'>) => Promise<void>;
  login: () => Promise<void>;
  logout: () => void;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  walletAddress: null,
  role: null,
  loading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('token');
    const walletAddress = localStorage.getItem('walletAddress');
    const role = localStorage.getItem('role') as Roles | null;

    if (token && walletAddress && role) {
      setState({
        isAuthenticated: true,
        token,
        walletAddress,
        role,
        loading: false,
        error: null,
      });
    } else {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to continue');
      }

      // Request account access
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setState(prev => ({
        ...prev,
        walletAddress: address,
        error: null,
      }));

      return address;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to connect wallet';
      setState(prev => ({ ...prev, error: message }));
      toast({
        title: 'Error',
        description: message,
        variant: 'error',
      });
      throw error;
    }
  };

  const register = async (data: Omit<RegisterDto, 'walletAddress'>) => {
    try {
      const walletAddress = await connectWallet();
      const registerData: RegisterDto = {
        ...data,
        walletAddress,
      };

      const response = await authApi.register(registerData);
      
      // Store auth data
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('walletAddress', response.user.walletAddress);
      localStorage.setItem('role', response.user.role);

      setState({
        isAuthenticated: true,
        token: response.access_token,
        walletAddress: response.user.walletAddress,
        role: response.user.role,
        loading: false,
        error: null,
      });

      toast({
        title: 'Success',
        description: 'Registration successful!',
        variant: 'success',
      });

      router.push('/home');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      setState(prev => ({ ...prev, error: message }));
      toast({
        title: 'Error',
        description: message,
        variant: 'error',
      });
      throw error;
    }
  };

  const login = async () => {
    try {
      const walletAddress = await connectWallet();
      const { role } = state;
      
      if (!role) {
        throw new Error('Please select a role');
      }

      // Get nonce
      const { nonce } = await authApi.getNonce(walletAddress, role);

      // Sign nonce
      const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(nonce);

      // Login with signature
      const loginData: LoginDto = {
        walletAddress,
        signature,
        role,
      };

      const response = await authApi.login(loginData);

      // Store auth data
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('walletAddress', response.user.walletAddress);
      localStorage.setItem('role', response.user.role);

      setState({
        isAuthenticated: true,
        token: response.access_token,
        walletAddress: response.user.walletAddress,
        role: response.user.role,
        loading: false,
        error: null,
      });

      toast({
        title: 'Success',
        description: 'Login successful!',
        variant: 'success',
      });

      router.push('/home');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setState(prev => ({ ...prev, error: message }));
      toast({
        title: 'Error',
        description: message,
        variant: 'error',
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('role');

    setState(initialState);
    router.push('/login');

    toast({
      title: 'Success',
      description: 'Logged out successfully',
      variant: 'success',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        connectWallet,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 