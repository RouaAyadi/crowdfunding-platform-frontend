import { Startup } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3300';

export interface StartupQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  field?: string;
  location?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface StartupsResponse {
  startups: Startup[];
  total: number;
  page: number;
  totalPages: number;
}

class StartupAPI {
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

    const response = await fetch(`${API_BASE_URL}/startups${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getStartups(params: StartupQueryParams = {}): Promise<StartupsResponse> {
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
      startups: response.startups || response, // Handle different response formats
    };
  }

  async getStartup(id: string): Promise<Startup> {
    const response = await this.request(`/${id}`);
    return this.transformStartupForFrontend(response);
  }

  async getStartupByWallet(walletAddress: string): Promise<Startup> {
    const response = await this.request(`/wallet/${walletAddress}`);
    return this.transformStartupForFrontend(response);
  }

  async getStartupDashboard(id: string): Promise<any> {
    return this.request(`/${id}/dashboard`);
  }

  async getStartupCampaigns(id: string): Promise<any> {
    return this.request(`/${id}/campaigns`);
  }

  private transformStartupForFrontend(backendStartup: any): Startup {
    return {
      _id: backendStartup._id || backendStartup.id,
      id: backendStartup.id || backendStartup._id,
      walletAddress: backendStartup.walletAddress,
      role: 'startup' as const,
      name: backendStartup.name,
      location: backendStartup.location,
      firstFundedDate: backendStartup.firstFundedDate,
      website: backendStartup.website,
      logoUrl: backendStartup.logo,
      logo: backendStartup.logo, // Frontend compatibility
      coverImage: backendStartup.coverImage || '/placeholder-startup-cover.jpg',
      field: backendStartup.field,
      bio: backendStartup.description, // Backend uses 'description' field
      description: backendStartup.description, // Frontend compatibility
      longDescription: backendStartup.longDescription || backendStartup.description,
      missionGoals: backendStartup.motives || [], // Backend uses 'motives' field
      motives: backendStartup.motives || [], // Frontend compatibility
      foundedYear: backendStartup.foundedYear,
      teamSize: backendStartup.teamSize,
      socialLinks: backendStartup.socialLinks || {},
      campaigns: (backendStartup.campaigns || []).map((campaign: any) => campaign._id || campaign.id || campaign),
      reviews: (backendStartup.reviews || []).map((review: any) => ({
        id: review._id || review.id,
        investorName: review.reviewer?.name || 'Anonymous',
        investorAvatar: review.reviewer?.avatar || '/placeholder-avatar.jpg',
        rating: review.rating || 0,
        comment: review.content || '',
        date: review.createdAt ? new Date(review.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        investmentAmount: review.investmentAmount || 0,
      })),
      totalRaised: backendStartup.totalFundsRaised || 0, // Backend uses 'totalFundsRaised'
      activeCampaigns: backendStartup.activeCampaigns || 0,
      completedCampaigns: backendStartup.completedCampaigns || 0,
      averageRating: backendStartup.averageRating || 0,
      totalReviews: backendStartup.totalReviews || (backendStartup.reviews?.length) || 0,
      keyMetrics: backendStartup.keyMetrics || [],
      milestones: (backendStartup.milestones || []).map((milestone: any) => ({
        title: milestone.title,
        description: milestone.description,
        date: milestone.date ? new Date(milestone.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        completed: milestone.completed || false,
      })),
      createdAt: backendStartup.createdAt || new Date().toISOString(),
      updatedAt: backendStartup.updatedAt || new Date().toISOString(),
    };
  }
}

export const startupAPI = new StartupAPI();
