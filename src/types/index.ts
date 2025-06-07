export interface Campaign {
  _id: string;
  id: string;
  title: string;
  name?: string;
  description: string;
  targetAmount: number; // Backend uses targetAmount
  goalAmount: number; // Frontend compatibility
  currentAmount: number; // Backend uses currentAmount
  amountRaised: number; // Frontend compatibility
  status: 'active' | 'completed' | 'failed' | 'draft' | 'funded';
  currentState: 'active' | 'completed' | 'failed' | 'draft' | 'funded'; // Frontend compatibility
  tags: string[];
  image: string;
  address: string; // Blockchain wallet address
  startup: string | Startup; // Can be populated or just ID
  startupId: string;
  startupName: string;
  startDate: string;
  endDate: string;
  backers: number;
  daysLeft: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  author: string | Investor;
  text: string;
  isEdited: boolean;
  editedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Investor {
  _id: string;
  walletAddress: string;
  nickname?: string;
  role: 'investor';
  investments: string[];
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
  _id: string;
  id: string;
  walletAddress: string;
  role: 'startup';
  name: string;
  location: string;
  firstFundedDate?: string;
  website?: string;
  logoUrl?: string;
  logo?: string; // Frontend compatibility
  coverImage?: string;
  field?: string;
  bio: string;
  description?: string; // Frontend compatibility
  longDescription?: string;
  missionGoals: string[];
  motives?: string[]; // Frontend compatibility
  foundedYear?: number;
  teamSize?: number;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  campaigns: string[];
  reviews: StartupReview[];
  totalRaised?: number;
  activeCampaigns?: number;
  completedCampaigns?: number;
  averageRating?: number;
  totalReviews?: number;
  keyMetrics?: {
    label: string;
    value: string;
  }[];
  milestones?: {
    title: string;
    description: string;
    date: string;
    completed: boolean;
  }[];
  createdAt: string;
  updatedAt: string;
}
