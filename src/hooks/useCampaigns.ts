import { useState, useEffect } from 'react';
import { Campaign } from '@/types';
import { campaignAPI, CampaignQueryParams, CampaignsResponse } from '@/lib/api/campaigns';

export function useCampaigns(params: CampaignQueryParams = {}) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 0,
  });

  const fetchCampaigns = async (queryParams: CampaignQueryParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response: CampaignsResponse = await campaignAPI.getCampaigns({
        ...params,
        ...queryParams,
      });
      
      setCampaigns(response.campaigns);
      setPagination({
        total: response.total,
        page: response.page,
        totalPages: response.totalPages,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const refetch = (newParams?: CampaignQueryParams) => {
    fetchCampaigns(newParams);
  };

  return {
    campaigns,
    loading,
    error,
    pagination,
    refetch,
  };
}

export function useCampaign(id: string) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaign = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await campaignAPI.getCampaign(id);
      setCampaign(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch campaign');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCampaign();
    }
  }, [id]);

  const refetch = () => {
    fetchCampaign();
  };

  const addComment = async (text: string) => {
    try {
      const updatedCampaign = await campaignAPI.addComment(id, text);
      setCampaign(updatedCampaign);
      return updatedCampaign;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add comment');
    }
  };

  const updateComment = async (commentId: string, text: string) => {
    try {
      const updatedCampaign = await campaignAPI.updateComment(id, commentId, text);
      setCampaign(updatedCampaign);
      return updatedCampaign;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update comment');
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      const updatedCampaign = await campaignAPI.deleteComment(id, commentId);
      setCampaign(updatedCampaign);
      return updatedCampaign;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete comment');
    }
  };

  return {
    campaign,
    loading,
    error,
    refetch,
    addComment,
    updateComment,
    deleteComment,
  };
}
