import { Roles } from "@/types/roles";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  walletAddress: string | null;
  role: Roles | null;
  loading: boolean;
  error: string | null;
}

export interface LoginDto {
  walletAddress: string;
  signature: string;
  nonce: string;
}

export interface RegisterDto {
  walletAddress: string;
  role: Roles;
  investorData?: {
    name: string;
    nickname: string;
  };
  startupData?: {
    name: string;
    location: string;
    website: string;
    bio: string;
    mission: string[];
  };
}

export interface AuthResponse {
  token: string;
  user: {
    walletAddress: string;
    role: Roles;
  };
} 