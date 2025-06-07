'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Startup } from '@/types';
import { formatCampaignAmount } from '@/lib/campaignUtils';
import { RiMapPinLine, RiTeamLine, RiCalendarLine, RiStarFill, RiGlobalLine } from '@remixicon/react';

interface StartupCardProps {
  startup: Startup;
}

export default function StartupCard({ startup }: StartupCardProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getFieldColor = (field: string) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-800',
      'Healthcare': 'bg-green-100 text-green-800',
      'Finance': 'bg-purple-100 text-purple-800',
      'Education': 'bg-yellow-100 text-yellow-800',
      'E-commerce': 'bg-pink-100 text-pink-800',
      'Gaming': 'bg-indigo-100 text-indigo-800',
      'AI/ML': 'bg-cyan-100 text-cyan-800',
      'Blockchain': 'bg-orange-100 text-orange-800',
    };
    return colors[field as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <RiStarFill key={i} className="h-4 w-4 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <RiStarFill className="h-4 w-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <RiStarFill className="h-4 w-4 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <RiStarFill key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <Link href={`/startup/${startup.id}`}>
      <div className="bg-card rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={startup.coverImage || '/placeholder-startup-cover.jpg'}
            alt={startup.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFieldColor(startup.field)}`}>
              {startup.field}
            </span>
          </div>
          {startup.website && (
            <div className="absolute top-3 right-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                <RiGlobalLine className="h-4 w-4 text-text-secondary" />
              </div>
            </div>
          )}
        </div>

        {/* Startup Content */}
        <div className="p-6">
          {/* Startup Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src={startup.logo || '/default-startup-logo.svg'}
                  alt={`${startup.name} logo`}
                  width={40}
                  height={40}
                  className="rounded-lg border border-gray-200"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                  {startup.name}
                </h3>
                <div className="flex items-center text-sm text-text-secondary">
                  <RiMapPinLine className="h-4 w-4 mr-1" />
                  {startup.location}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-text-secondary text-sm mb-4 line-clamp-3">
            {startup.bio || startup.description}
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-sm text-text-secondary">
              <RiTeamLine className="h-4 w-4 mr-2" />
              <span>{startup.teamSize} members</span>
            </div>
            <div className="flex items-center text-sm text-text-secondary">
              <RiCalendarLine className="h-4 w-4 mr-2" />
              <span>Founded {startup.foundedYear}</span>
            </div>
          </div>

          {/* Rating and Reviews */}
          {isMounted && startup.averageRating > 0 && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {renderStars(startup.averageRating)}
                </div>
                <span className="text-sm text-text-secondary">
                  ({startup.totalReviews} reviews)
                </span>
              </div>
            </div>
          )}

          {/* Funding Info */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-text-secondary">Total Raised</div>
                <div className="text-lg font-semibold text-text-primary">
                  {formatCampaignAmount(startup.totalRaised || 0)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-text-secondary">Campaigns</div>
                <div className="text-lg font-semibold text-text-primary">
                  {startup.activeCampaigns || 0}
                </div>
              </div>
            </div>
          </div>

          {/* Mission Goals Preview */}
          {(startup.missionGoals || startup.motives) && (startup.missionGoals?.length > 0 || startup.motives?.length > 0) && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-sm text-text-secondary mb-2">Mission Goals</div>
              <div className="flex flex-wrap gap-1">
                {(startup.missionGoals || startup.motives || []).slice(0, 2).map((goal, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {goal}
                  </span>
                ))}
                {(startup.missionGoals || startup.motives || []).length > 2 && (
                  <span className="inline-block px-2 py-1 bg-gray-100 text-text-secondary text-xs rounded-full">
                    +{(startup.missionGoals || startup.motives || []).length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
