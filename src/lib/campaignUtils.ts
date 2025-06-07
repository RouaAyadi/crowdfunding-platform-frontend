import { Campaign } from '@/types';

export function transformCampaignForFrontend(backendCampaign: any): Campaign {
  const now = new Date();
  const endDate = new Date(backendCampaign.endDate);
  const startDate = new Date(backendCampaign.startDate);
  
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  return {
    _id: backendCampaign._id,
    id: backendCampaign._id,
    title: backendCampaign.title,
    name: backendCampaign.title, // Frontend compatibility
    description: backendCampaign.description,
    targetAmount: backendCampaign.targetAmount,
    goalAmount: backendCampaign.targetAmount, // Frontend compatibility
    currentAmount: backendCampaign.currentAmount,
    amountRaised: backendCampaign.currentAmount, // Frontend compatibility
    status: backendCampaign.status,
    currentState: backendCampaign.status, // Frontend compatibility
    tags: backendCampaign.tags || [],
    image: backendCampaign.image || '/placeholder-campaign.jpg',
    address: backendCampaign.address,
    startup: backendCampaign.startup,
    startupId: typeof backendCampaign.startup === 'object' ? backendCampaign.startup._id : backendCampaign.startup,
    startupName: typeof backendCampaign.startup === 'object' ? backendCampaign.startup.name : 'Unknown Startup',
    startDate: backendCampaign.startDate,
    endDate: backendCampaign.endDate,
    backers: backendCampaign.backers || 0,
    daysLeft,
    comments: backendCampaign.comments || [],
    createdAt: backendCampaign.createdAt,
    updatedAt: backendCampaign.updatedAt,
  };
}

export function calculateCampaignProgress(campaign: Campaign): {
  progressPercentage: number;
  isCompleted: boolean;
  isFailed: boolean;
  isActive: boolean;
} {
  const progressPercentage = Math.min((campaign.currentAmount / campaign.targetAmount) * 100, 100);
  const isCompleted = campaign.status === 'completed' || campaign.status === 'funded';
  const isFailed = campaign.status === 'failed';
  const isActive = campaign.status === 'active';

  return {
    progressPercentage: Math.round(progressPercentage * 100) / 100,
    isCompleted,
    isFailed,
    isActive,
  };
}

export function formatCampaignAmount(amount: number): string {
  if (amount >= 1000000) {
    const millions = Math.round((amount / 1000000) * 10) / 10;
    return `$${millions}M`;
  } else if (amount >= 1000) {
    const thousands = Math.round(amount / 1000);
    return `$${thousands}K`;
  }
  return `$${new Intl.NumberFormat('en-US').format(amount)}`;
}

export function getCampaignStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return 'bg-accent text-white';
    case 'completed':
    case 'funded':
      return 'bg-green-500 text-white';
    case 'failed':
      return 'bg-red-500 text-white';
    case 'draft':
      return 'bg-gray-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}
