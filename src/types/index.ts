export interface Campaign {
  id: string;
  title: string;
  name: string;
  description: string;
  goalAmount: number;
  amountRaised: number;
  currentState: 'active' | 'completed' | 'failed' | 'draft';
  tags: string[];
  image: string;
  startupId: string;
  startupName: string;
  endDate: string;
  backers: number;
  daysLeft: number;
}

export interface StartupReview {
  id: string;
  investorName: string;
  investorAvatar: string;
  rating: number;
  comment: string;
  date: string;
  investmentAmount: number;
}

export interface Startup {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  field: string;
  description: string;
  longDescription: string;
  motives: string[];
  foundedYear: number;
  location: string;
  teamSize: number;
  website: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  totalRaised: number;
  activeCampaigns: number;
  completedCampaigns: number;
  averageRating: number;
  totalReviews: number;
  reviews: StartupReview[];
  keyMetrics: {
    label: string;
    value: string;
  }[];
  milestones: {
    title: string;
    description: string;
    date: string;
    completed: boolean;
  }[];
}
