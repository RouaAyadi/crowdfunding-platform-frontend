import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3300';

const api = axios.create({
  baseURL: `${API_URL}/investors`,
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

export interface InvestorDashboard {
  name: string;
  walletAddress: string;
  totalInvested: number;
  totalCampaigns: number;
  successfulStartups: number;
  investedCampaigns: {
    id: string;
    title: string;
    name: string;
    description: string;
    goalAmount: number;
    amountRaised: number;
    currentState: string;
    tags: string[];
    image: string;
    startupId: string;
    startupName: string;
    endDate: string;
    backers: number;
    daysLeft: number;
  }[];
}

export const investorApi = {
  getDashboard: async (): Promise<InvestorDashboard> => {
    const response = await api.get<InvestorDashboard>('/dashboard');
    return response.data;
  },
}; 