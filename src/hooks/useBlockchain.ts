import { useState, useCallback } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { blockchainAPI, DirectBlockchainService, CreateCampaignData, TransactionResult } from '@/lib/api/blockchain';
import { ethers } from 'ethers';

export function useBlockchain() {
  const { provider, signer, account, isConnected } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const directService = provider && signer ? new DirectBlockchainService(provider, signer) : null;

  const createCampaign = useCallback(async (campaignData: CreateCampaignData): Promise<TransactionResult> => {
    if (!isConnected || !account) {
      return { success: false, message: 'Wallet not connected' };
    }

    setLoading(true);
    setError(null);

    try {
      const result = await blockchainAPI.createCampaign(campaignData);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create campaign';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [isConnected, account]);

  const contributeToCampaign = useCallback(async (campaignAddress: string, amount: string): Promise<TransactionResult> => {
    if (!isConnected || !account || !directService) {
      return { success: false, message: 'Wallet not connected' };
    }

    setLoading(true);
    setError(null);

    try {
      // Send transaction directly
      const tx = await directService.contributeToCampaign(campaignAddress, amount);
      
      // Wait for transaction to be mined
      const receipt = await tx.wait();
      
      if (receipt?.status === 1) {
        // Confirm with backend
        const confirmResult = await blockchainAPI.confirmContribution(
          tx.hash,
          campaignAddress,
          ethers.parseEther(amount).toString()
        );
        
        return {
          success: true,
          txHash: tx.hash,
          message: 'Contribution successful',
        };
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to contribute';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [isConnected, account, directService]);

  const getCampaignInfo = useCallback(async (campaignAddress: string) => {
    if (!directService) {
      throw new Error('Blockchain service not available');
    }

    try {
      return await directService.getCampaignInfo(campaignAddress);
    } catch (error) {
      console.error('Failed to get campaign info:', error);
      throw error;
    }
  }, [directService]);

  const getUserContribution = useCallback(async (campaignAddress: string): Promise<string> => {
    if (!directService || !account) {
      return '0';
    }

    try {
      return await directService.getUserContribution(campaignAddress, account);
    } catch (error) {
      console.error('Failed to get user contribution:', error);
      return '0';
    }
  }, [directService, account]);

  const getCampaignProgress = useCallback(async (campaignAddress: string): Promise<number> => {
    if (!directService) {
      return 0;
    }

    try {
      return await directService.getCampaignProgress(campaignAddress);
    } catch (error) {
      console.error('Failed to get campaign progress:', error);
      return 0;
    }
  }, [directService]);

  const getCampaignMilestones = useCallback(async (campaignAddress: string) => {
    if (!directService) {
      return [];
    }

    try {
      return await directService.getCampaignMilestones(campaignAddress);
    } catch (error) {
      console.error('Failed to get campaign milestones:', error);
      return [];
    }
  }, [directService]);

  const syncCampaign = useCallback(async (campaignAddress: string): Promise<TransactionResult> => {
    setLoading(true);
    setError(null);

    try {
      const result = await blockchainAPI.syncCampaign(campaignAddress);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sync campaign';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const getTransactionHistory = useCallback(async (campaignId?: string) => {
    try {
      return await blockchainAPI.getTransactionHistory(campaignId, account || undefined);
    } catch (error) {
      console.error('Failed to get transaction history:', error);
      return [];
    }
  }, [account]);

  return {
    // State
    loading,
    error,
    isConnected,
    account,
    
    // Actions
    createCampaign,
    contributeToCampaign,
    getCampaignInfo,
    getUserContribution,
    getCampaignProgress,
    getCampaignMilestones,
    syncCampaign,
    getTransactionHistory,
    
    // Utils
    clearError: () => setError(null),
  };
}
