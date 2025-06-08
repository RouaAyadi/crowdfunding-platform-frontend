import { ethers } from 'ethers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Contract ABIs
export const CAMPAIGN_FACTORY_ABI = [
  "function createCampaign(address startup, string title, string description, uint256 goal, uint256 duration, string[] milestoneDescriptions, uint256[] milestoneAmounts) returns (address)",
  "function getDeployedCampaigns() view returns (address[])",
  "function getCampaignSummary(address campaign) view returns (address startup, string title, uint256 goal, uint256 totalRaised, uint256 deadline, uint8 state, uint256 contributorsCount, uint256 progress)",
  "event CampaignCreated(address indexed campaignAddress, address indexed startup, string title, uint256 goal, uint256 deadline, uint256 timestamp)"
];

export const CAMPAIGN_ABI = [
  "function contribute() payable",
  "function getRefund()",
  "function completeMilestone(uint256 milestoneIndex)",
  "function withdrawMilestoneFunds(uint256 milestoneIndex)",
  "function getCampaignInfo() view returns (address startup, string title, string description, uint256 goal, uint256 deadline, uint256 totalRaised, uint8 state, uint256 contributorsCount)",
  "function getProgress() view returns (uint256)",
  "function contributions(address) view returns (uint256)",
  "function getMilestone(uint256 index) view returns (tuple(string description, uint256 amount, bool completed, bool fundsReleased, uint256 completedAt))",
  "function getMilestonesCount() view returns (uint256)",
  "event ContributionMade(address indexed contributor, uint256 amount, uint256 totalRaised)",
  "event MilestoneCompleted(uint256 indexed milestoneIndex, uint256 amount)",
  "event FundsWithdrawn(uint256 amount, uint256 milestoneIndex)",
  "event RefundIssued(address indexed contributor, uint256 amount)"
];

export interface CreateCampaignData {
  startup: string;
  title: string;
  description: string;
  goal: string;
  duration: number;
  milestoneDescriptions: string[];
  milestoneAmounts: string[];
}

export interface ContributionData {
  campaignAddress: string;
  amount: string;
}

export interface TransactionResult {
  success: boolean;
  txHash?: string;
  contractAddress?: string;
  message: string;
  error?: string;
}

class BlockchainAPI {
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

    const response = await fetch(`${API_BASE_URL}/blockchain${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Create campaign on blockchain
  async createCampaign(campaignData: CreateCampaignData): Promise<TransactionResult> {
    try {
      const response = await this.request('/campaigns/create', {
        method: 'POST',
        body: JSON.stringify(campaignData),
      });
      
      return {
        success: response.success,
        txHash: response.txHash,
        contractAddress: response.contractAddress,
        message: response.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create campaign',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Prepare contribution transaction
  async prepareCampaignContribution(campaignAddress: string, amount: string): Promise<any> {
    try {
      const response = await this.request(`/campaigns/${campaignAddress}/contribute`, {
        method: 'POST',
        body: JSON.stringify({ amount }),
      });
      
      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to prepare contribution');
    }
  }

  // Confirm contribution after transaction is sent
  async confirmContribution(txHash: string, campaignAddress: string, amount: string): Promise<TransactionResult> {
    try {
      const response = await this.request('/transactions/contribution/confirm', {
        method: 'POST',
        body: JSON.stringify({
          txHash,
          campaignAddress,
          amount,
        }),
      });
      
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to confirm contribution',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Sync campaign from blockchain
  async syncCampaign(campaignAddress: string): Promise<TransactionResult> {
    try {
      const response = await this.request(`/campaigns/${campaignAddress}/sync`, {
        method: 'POST',
      });
      
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to sync campaign',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Get transaction history
  async getTransactionHistory(campaignId?: string, address?: string): Promise<any[]> {
    try {
      const params = new URLSearchParams();
      if (campaignId) params.append('campaignId', campaignId);
      if (address) params.append('address', address);
      
      const queryString = params.toString();
      const endpoint = `/transactions${queryString ? `?${queryString}` : ''}`;
      
      const response = await this.request(endpoint);
      return response.transactions || [];
    } catch (error) {
      console.error('Failed to get transaction history:', error);
      return [];
    }
  }

  // Get network info
  async getNetworkInfo(): Promise<any> {
    try {
      const response = await this.request('/network-info');
      return response.network;
    } catch (error) {
      console.error('Failed to get network info:', error);
      return null;
    }
  }

  // Get campaign contract info
  async getCampaignContract(campaignAddress: string): Promise<any> {
    try {
      const response = await this.request(`/campaigns/${campaignAddress}/contract`);
      return response;
    } catch (error) {
      console.error('Failed to get campaign contract info:', error);
      return null;
    }
  }
}

// Direct blockchain interactions (for frontend-only operations)
export class DirectBlockchainService {
  private provider: ethers.BrowserProvider;
  private signer: ethers.JsonRpcSigner;

  constructor(provider: ethers.BrowserProvider, signer: ethers.JsonRpcSigner) {
    this.provider = provider;
    this.signer = signer;
  }

  // Contribute to campaign directly
  async contributeToCampaign(campaignAddress: string, amount: string): Promise<ethers.TransactionResponse> {
    const campaignContract = new ethers.Contract(campaignAddress, CAMPAIGN_ABI, this.signer);
    
    const tx = await campaignContract.contribute({
      value: ethers.parseEther(amount),
    });
    
    return tx;
  }

  // Get campaign info directly from blockchain
  async getCampaignInfo(campaignAddress: string): Promise<any> {
    const campaignContract = new ethers.Contract(campaignAddress, CAMPAIGN_ABI, this.provider);
    
    const [startup, title, description, goal, deadline, totalRaised, state, contributorsCount] = 
      await campaignContract.getCampaignInfo();
    
    return {
      startup,
      title,
      description,
      goal: ethers.formatEther(goal),
      deadline: deadline.toString(),
      totalRaised: ethers.formatEther(totalRaised),
      state: state.toString(),
      contributorsCount: contributorsCount.toString(),
    };
  }

  // Get user's contribution to a campaign
  async getUserContribution(campaignAddress: string, userAddress: string): Promise<string> {
    const campaignContract = new ethers.Contract(campaignAddress, CAMPAIGN_ABI, this.provider);
    const contribution = await campaignContract.contributions(userAddress);
    return ethers.formatEther(contribution);
  }

  // Get campaign progress
  async getCampaignProgress(campaignAddress: string): Promise<number> {
    const campaignContract = new ethers.Contract(campaignAddress, CAMPAIGN_ABI, this.provider);
    const progress = await campaignContract.getProgress();
    return Number(progress);
  }

  // Get campaign milestones
  async getCampaignMilestones(campaignAddress: string): Promise<any[]> {
    const campaignContract = new ethers.Contract(campaignAddress, CAMPAIGN_ABI, this.provider);
    const milestonesCount = await campaignContract.getMilestonesCount();
    
    const milestones = [];
    for (let i = 0; i < milestonesCount; i++) {
      const milestone = await campaignContract.getMilestone(i);
      milestones.push({
        description: milestone.description,
        amount: ethers.formatEther(milestone.amount),
        completed: milestone.completed,
        fundsReleased: milestone.fundsReleased,
        completedAt: milestone.completedAt.toString(),
      });
    }
    
    return milestones;
  }
}

export const blockchainAPI = new BlockchainAPI();
