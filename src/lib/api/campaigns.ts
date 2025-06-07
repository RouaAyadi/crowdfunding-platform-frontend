import { Campaign, Comment } from '@/types';
import { transformCampaignForFrontend } from '../campaignUtils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3300';

export interface CreateCampaignData {
  title: string;
  description: string;
  startup: string;
  targetAmount: number;
  startDate: string;
  endDate: string;
  address: string;
  image?: string;
  tags?: string[];
}

export interface UpdateCampaignData {
  title?: string;
  description?: string;
  targetAmount?: number;
  startDate?: string;
  endDate?: string;
  address?: string;
  image?: string;
  tags?: string[];
  status?: string;
  currentAmount?: number;
  backers?: number;
}

export interface CampaignQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  startup?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  tags?: string;
}

export interface CampaignsResponse {
  campaigns: Campaign[];
  total: number;
  page: number;
  totalPages: number;
}

class CampaignAPI {
  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('auth-token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${API_BASE_URL}/campaigns${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getCampaigns(params: CampaignQueryParams = {}): Promise<CampaignsResponse> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = queryString ? `?${queryString}` : '';
    
    const response = await this.request(endpoint);
    
    return {
      ...response,
      campaigns: response.campaigns.map(transformCampaignForFrontend),
    };
  }

  async getCampaign(id: string): Promise<Campaign> {
    const response = await this.request(`/${id}`);
    return transformCampaignForFrontend(response);
  }

  async getCampaignStats(id: string): Promise<any> {
    return this.request(`/${id}/stats`);
  }

  async createCampaign(data: CreateCampaignData): Promise<Campaign> {
    const response = await this.request('', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return transformCampaignForFrontend(response);
  }

  async updateCampaign(id: string, data: UpdateCampaignData): Promise<Campaign> {
    const response = await this.request(`/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return transformCampaignForFrontend(response);
  }

  async deleteCampaign(id: string): Promise<void> {
    await this.request(`/${id}`, {
      method: 'DELETE',
    });
  }

  async addComment(campaignId: string, text: string): Promise<Campaign> {
    const response = await this.request(`/${campaignId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
    return transformCampaignForFrontend(response);
  }

  async updateComment(campaignId: string, commentId: string, text: string): Promise<Campaign> {
    const response = await this.request(`/${campaignId}/comments/${commentId}`, {
      method: 'PATCH',
      body: JSON.stringify({ text }),
    });
    return transformCampaignForFrontend(response);
  }

  async deleteComment(campaignId: string, commentId: string): Promise<Campaign> {
    const response = await this.request(`/${campaignId}/comments/${commentId}`, {
      method: 'DELETE',
    });
    return transformCampaignForFrontend(response);
  }

  async updateCampaignAmount(campaignId: string, amount: number): Promise<Campaign> {
    const response = await this.request(`/${campaignId}/amount`, {
      method: 'PATCH',
      body: JSON.stringify({ amount }),
    });
    return transformCampaignForFrontend(response);
  }
}

export const campaignAPI = new CampaignAPI();
