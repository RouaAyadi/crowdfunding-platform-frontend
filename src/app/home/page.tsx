'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CampaignCard from '@/components/CampaignCard';
import { Campaign } from '@/types';
import { RiFilterLine, RiGridLine, RiMenuLine } from '@remixicon/react';
import { useCampaigns } from '@/hooks/useCampaigns';
import { formatCampaignAmount } from '@/lib/campaignUtils';

// Utility function to format numbers consistently
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export default function HomePage() {
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Fetch campaigns from API
  const { campaigns, loading, error, refetch } = useCampaigns({
    limit: 50, // Get more campaigns for better filtering
  });

  // Prevent hydration mismatch by only rendering dynamic content after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let filtered = campaigns;

    // Filter by status
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(campaign => campaign.currentState === selectedFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(campaign =>
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.startupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredCampaigns(filtered);
  }, [campaigns, selectedFilter, searchTerm]);

  const filterOptions = [
    { value: 'all', label: 'All Campaigns', count: campaigns.length },
    { value: 'active', label: 'Active', count: campaigns.filter(c => c.currentState === 'active').length },
    { value: 'completed', label: 'Completed', count: campaigns.filter(c => c.currentState === 'completed').length },
    { value: 'failed', label: 'Failed', count: campaigns.filter(c => c.currentState === 'failed').length },
  ];

  // Calculate stats
  const totalRaised = campaigns.reduce((sum, c) => sum + c.amountRaised, 0);
  const totalBackers = campaigns.reduce((sum, c) => sum + c.backers, 0);
  const successfulCampaigns = campaigns.filter(c => c.currentState === 'completed').length;

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-text-secondary">Loading campaigns...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Discover Innovative Startups
          </h1>
          <p className="text-text-secondary text-lg">
            Support the next generation of groundbreaking companies and technologies
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-lg p-6 border border-gray-100">
            <div className="text-2xl font-bold text-text-primary">
              {isMounted ? campaigns.length : '---'}
            </div>
            <div className="text-text-secondary">Active Campaigns</div>
          </div>
          <div className="bg-card rounded-lg p-6 border border-gray-100">
            <div className="text-2xl font-bold text-text-primary">
              {isMounted ? formatCampaignAmount(totalRaised) : '$---'}
            </div>
            <div className="text-text-secondary">Total Raised</div>
          </div>
          <div className="bg-card rounded-lg p-6 border border-gray-100">
            <div className="text-2xl font-bold text-text-primary">
              {isMounted ? formatNumber(totalBackers) : '---'}
            </div>
            <div className="text-text-secondary">Total Backers</div>
          </div>
          <div className="bg-card rounded-lg p-6 border border-gray-100">
            <div className="text-2xl font-bold text-text-primary">
              {isMounted ? successfulCampaigns : '---'}
            </div>
            <div className="text-text-secondary">Successful Campaigns</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedFilter(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === option.value
                    ? 'bg-primary text-white'
                    : 'bg-card text-text-primary hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-card text-text-secondary hover:bg-gray-50'}`}
              >
                <RiGridLine className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-card text-text-secondary hover:bg-gray-50'}`}
              >
                <RiMenuLine className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        {isMounted && (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {isMounted && filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <div className="text-text-secondary text-lg mb-4">
              No campaigns found matching your criteria
            </div>
            <button
              onClick={() => {
                setSelectedFilter('all');
                setSearchTerm('');
              }}
              className="text-primary hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}