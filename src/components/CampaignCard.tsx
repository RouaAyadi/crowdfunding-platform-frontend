'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Campaign } from '@/types';
import { RiTimeLine, RiGroupLine, RiMapPinLine } from '@remixicon/react';
import { useState, useEffect } from 'react';

interface CampaignCardProps {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const progressPercentage = Math.min((campaign.amountRaised / campaign.goalAmount) * 100, 100);
  
  const getStateColor = (state: Campaign['currentState']) => {
    switch (state) {
      case 'active':
        return 'bg-accent text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      case 'failed':
        return 'bg-red-500 text-white';
      case 'draft':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      const millions = Math.round((amount / 1000000) * 10) / 10;
      return `$${millions}M`;
    } else if (amount >= 1000) {
      const thousands = Math.round(amount / 1000);
      return `$${thousands}K`;
    }
    return `$${new Intl.NumberFormat('en-US').format(amount)}`;
  };

  const formatPercentage = (percentage: number) => {
    return Math.round(percentage);
  };

  const handleStartupClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle startup navigation programmatically if needed
    window.location.href = `/startup/${campaign.startupId}`;
  };

  return (
    <Link href={`/campaign/${campaign.id}`}>
      <div className="bg-card rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
        {/* Campaign Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={campaign.image}
            alt={campaign.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStateColor(campaign.currentState)}`}>
              {campaign.currentState.charAt(0).toUpperCase() + campaign.currentState.slice(1)}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs font-medium">
              {campaign.daysLeft} days left
            </span>
          </div>
        </div>

        {/* Campaign Content */}
        <div className="p-6">
          {/* Startup Info */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {campaign.startupName.charAt(0)}
              </span>
            </div>
            <button 
              onClick={handleStartupClick}
              className="text-sm text-text-secondary hover:text-primary transition-colors text-left"
            >
              {campaign.startupName}
            </button>
          </div>

          {/* Campaign Title */}
          <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {campaign.title}
          </h3>

          {/* Campaign Description */}
          <p className="text-text-secondary text-sm mb-4 line-clamp-3">
            {campaign.description}
          </p>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-text-primary">
                {isMounted ? formatAmount(campaign.amountRaised) : '$---'} raised
              </span>
              <span className="text-sm text-text-secondary">
                {isMounted ? `${formatPercentage(progressPercentage)}%` : '---%'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: isMounted ? `${progressPercentage}%` : '0%' }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-text-secondary">
                Goal: {isMounted ? formatAmount(campaign.goalAmount) : '$---'}
              </span>
              <div className="flex items-center space-x-1">
                <RiGroupLine className="h-3 w-3 text-text-secondary" />
                <span className="text-xs text-text-secondary">
                  {isMounted ? new Intl.NumberFormat('en-US').format(campaign.backers) : '---'} backers
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {campaign.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-text-secondary text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {campaign.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-text-secondary text-xs rounded-full">
                +{campaign.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-1">
              <RiTimeLine className="h-4 w-4 text-text-secondary" />
              <span className="text-sm text-text-secondary">
                {campaign.daysLeft} days left
              </span>
            </div>
            <button className="text-primary text-sm font-medium hover:text-blue-700 transition-colors">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}