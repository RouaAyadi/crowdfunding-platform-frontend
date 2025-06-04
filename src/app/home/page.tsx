'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CampaignCard from '@/components/CampaignCard';
import { Campaign } from '@/types';
import { RiFilterLine, RiGridLine, RiMenuLine } from '@remixicon/react';

// Mock data for campaigns
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Revolutionary AI-Powered Healthcare Assistant',
    name: 'HealthAI Pro',
    description: 'An innovative AI assistant that helps doctors diagnose diseases faster and more accurately using machine learning algorithms.',
    goalAmount: 500000,
    amountRaised: 325000,
    currentState: 'active',
    tags: ['AI', 'Healthcare', 'Technology', 'Machine Learning'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    startupId: '1',
    startupName: 'MedTech Innovations',
    endDate: '2024-03-15',
    backers: 1250,
    daysLeft: 45,
  },
  {
    id: '2',
    title: 'Sustainable Energy Storage Solution',
    name: 'EcoCell Battery',
    description: 'Next-generation battery technology that provides 3x longer life and 100% recyclable materials for a sustainable future.',
    goalAmount: 750000,
    amountRaised: 680000,
    currentState: 'active',
    tags: ['Clean Energy', 'Sustainability', 'Battery Tech'],
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop',
    startupId: '2',
    startupName: 'GreenPower Labs',
    endDate: '2024-02-28',
    backers: 890,
    daysLeft: 28,
  },
  {
    id: '3',
    title: 'Smart Urban Farming Platform',
    name: 'CityGrow',
    description: 'Automated vertical farming system that allows anyone to grow fresh produce in urban environments with minimal space.',
    goalAmount: 300000,
    amountRaised: 180000,
    currentState: 'active',
    tags: ['Agriculture', 'IoT', 'Sustainability', 'Urban'],
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    startupId: '3',
    startupName: 'Urban Harvest',
    endDate: '2024-04-10',
    backers: 567,
    daysLeft: 62,
  },
  {
    id: '4',
    title: 'Blockchain-Based Supply Chain Tracker',
    name: 'ChainTrace',
    description: 'Transparent supply chain tracking using blockchain technology to ensure product authenticity and ethical sourcing.',
    goalAmount: 400000,
    amountRaised: 420000,
    currentState: 'completed',
    tags: ['Blockchain', 'Supply Chain', 'Transparency'],
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop',
    startupId: '4',
    startupName: 'BlockTrace Solutions',
    endDate: '2024-01-15',
    backers: 1100,
    daysLeft: 0,
  },
  {
    id: '5',
    title: 'Mental Health Support App',
    name: 'MindCare',
    description: 'AI-powered mental health companion that provides personalized therapy sessions and mood tracking.',
    goalAmount: 250000,
    amountRaised: 95000,
    currentState: 'active',
    tags: ['Mental Health', 'AI', 'Wellness', 'Mobile App'],
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
    startupId: '5',
    startupName: 'Wellness Tech',
    endDate: '2024-05-20',
    backers: 234,
    daysLeft: 85,
  },
  {
    id: '6',
    title: 'Ocean Plastic Recycling Robot',
    name: 'OceanBot',
    description: 'Autonomous underwater robot that collects plastic waste from oceans and converts it into useful materials.',
    goalAmount: 1000000,
    amountRaised: 450000,
    currentState: 'active',
    tags: ['Environment', 'Robotics', 'Ocean Cleanup'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
    startupId: '6',
    startupName: 'Ocean Robotics',
    endDate: '2024-06-30',
    backers: 789,
    daysLeft: 120,
  },
];

// Utility function to format numbers consistently
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export default function HomePage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMounted, setIsMounted] = useState(false);

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
              {isMounted ? `$${formatNumber(totalRaised)}` : '$---'}
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