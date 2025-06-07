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
    const token = localStorage.getItem('token');
    
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
      _id: backendStartup._id,
      id: backendStartup._id,
      walletAddress: backendStartup.walletAddress,
      role: backendStartup.role,
      name: backendStartup.name,
      location: backendStartup.location,
      firstFundedDate: backendStartup.firstFundedDate,
      website: backendStartup.website,
      logoUrl: backendStartup.logoUrl,
      logo: backendStartup.logoUrl || backendStartup.logo, // Frontend compatibility
      coverImage: backendStartup.coverImage || '/placeholder-startup-cover.jpg',
      field: backendStartup.field,
      bio: backendStartup.bio,
      description: backendStartup.bio, // Frontend compatibility
      longDescription: backendStartup.longDescription || backendStartup.bio,
      missionGoals: backendStartup.missionGoals || [],
      motives: backendStartup.missionGoals || [], // Frontend compatibility
      foundedYear: backendStartup.foundedYear,
      teamSize: backendStartup.teamSize,
      socialLinks: backendStartup.socialLinks || {},
      campaigns: backendStartup.campaigns || [],
      reviews: (backendStartup.reviews || []).map((review: any) => ({
        id: review._id,
        investorName: review.reviewer?.name || 'Anonymous',
        investorAvatar: review.reviewer?.avatar || '/placeholder-avatar.jpg',
        rating: review.rating,
        comment: review.content,
        date: new Date(review.createdAt || Date.now()).toISOString().split('T')[0],
        investmentAmount: review.investmentAmount || 0,
      })),
      totalRaised: backendStartup.totalRaised || 0,
      activeCampaigns: backendStartup.activeCampaigns || 0,
      completedCampaigns: backendStartup.completedCampaigns || 0,
      averageRating: backendStartup.averageRating || 0,
      totalReviews: backendStartup.reviews?.length || 0,
      keyMetrics: backendStartup.keyMetrics || [],
      milestones: (backendStartup.milestones || []).map((milestone: any) => ({
        title: milestone.title,
        description: milestone.description,
        date: new Date(milestone.date).toISOString().split('T')[0],
        completed: milestone.completed,
      })),
      createdAt: backendStartup.createdAt,
      updatedAt: backendStartup.updatedAt,
    };
  }
}

export const startupAPI = new StartupAPI();
