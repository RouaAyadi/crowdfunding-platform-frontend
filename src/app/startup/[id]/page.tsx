'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Startup, StartupReview } from '@/types';
import { useStartup } from '@/hooks/useStartups';
import { formatCampaignAmount } from '@/lib/campaignUtils';
import { 
  RiStarFill, 
  RiStarLine, 
  RiMapPinLine, 
  RiGlobalLine, 
  RiLinkedinFill, 
  RiTwitterFill, 
  RiFacebookFill,
  RiTeamLine,
  RiCalendarLine,
  RiTrophyLine,
  RiCheckLine,
  RiTimeLine
} from '@remixicon/react';



export default function StartupProfilePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'milestones'>('overview');

  // Fetch startup data from API
  const { startup, loading, error, refetch } = useStartup(params.id as string);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-text-secondary">Loading startup...</div>
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

  // Show not found state
  if (!startup) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-text-secondary">Startup not found</div>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i}>
        {i < Math.floor(rating) ? (
          <RiStarFill className="h-4 w-4 text-yellow-400" />
        ) : (
          <RiStarLine className="h-4 w-4 text-gray-300" />
        )}
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      
      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <Image
          src={startup.coverImage || "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop"}
          alt={startup.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Startup Header */}
        <div className="relative -mt-20 mb-8">
          <div className="bg-card rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
              {/* Logo */}
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={startup.logo || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop"}
                    alt={startup.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-text-primary mb-2">{startup.name}</h1>
                    <p className="text-lg text-text-secondary mb-3">{startup.field}</p>
                    <p className="text-text-primary mb-4">{startup.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <RiMapPinLine className="h-4 w-4" />
                        <span>{startup.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RiCalendarLine className="h-4 w-4" />
                        <span>Founded {startup.foundedYear}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RiTeamLine className="h-4 w-4" />
                        <span>{startup.teamSize} employees</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3 mt-4 md:mt-0">
                    <Link
                      href={`/startup/${startup.id}/invest`}
                      className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                    >
                      Invest Now
                    </Link>
                    {startup.website && (
                      <Link
                        href={startup.website}
                        target="_blank"
                        className="px-6 py-3 border border-gray-300 text-text-primary rounded-lg font-medium hover:bg-gray-50 transition-colors text-center flex items-center justify-center space-x-2"
                      >
                        <RiGlobalLine className="h-4 w-4" />
                        <span>Visit Website</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'reviews', label: `Reviews (${startup.totalReviews})` },
                { key: 'milestones', label: 'Milestones' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Long Description */}
                <div className="bg-card rounded-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold text-text-primary mb-4">About {startup.name}</h3>
                  <p className="text-text-secondary leading-relaxed">{startup.longDescription}</p>
                </div>

                {/* Motives */}
                {startup.motives && startup.motives.length > 0 && (
                  <div className="bg-card rounded-lg p-6 border border-gray-100">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">Our Mission & Goals</h3>
                    <ul className="space-y-3">
                      {startup.motives.map((motive, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <RiCheckLine className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-text-secondary">{motive}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Metrics */}
                {startup.keyMetrics && startup.keyMetrics.length > 0 && (
                  <div className="bg-card rounded-lg p-6 border border-gray-100">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">Key Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {startup.keyMetrics.map((metric, index) => (
                        <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{metric.value}</div>
                          <div className="text-sm text-text-secondary">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {startup.reviews.map((review) => (
                  <div key={review.id} className="bg-card rounded-lg p-6 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={review.investorAvatar}
                        alt={review.investorName}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-text-primary">{review.investorName}</h4>
                            <div className="flex items-center space-x-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-text-secondary">{review.date}</div>
                            <div className="text-sm font-medium text-accent">
                              ${review.investmentAmount.toLocaleString()} invested
                            </div>
                          </div>
                        </div>
                        <p className="text-text-secondary">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'milestones' && (
              <div className="space-y-4">
                {startup.milestones?.map((milestone, index) => (
                  <div key={index} className="bg-card rounded-lg p-6 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        milestone.completed ? 'bg-accent' : 'bg-gray-300'
                      }`}>
                        {milestone.completed ? (
                          <RiCheckLine className="h-4 w-4 text-white" />
                        ) : (
                          <RiTimeLine className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-text-primary">{milestone.title}</h4>
                          <span className="text-sm text-text-secondary">{milestone.date}</span>
                        </div>
                        <p className="text-text-secondary">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-card rounded-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Company Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Total Raised</span>
                  <span className="font-semibold text-text-primary">
                    {formatCampaignAmount(startup.totalRaised || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Active Campaigns</span>
                  <span className="font-semibold text-text-primary">{startup.activeCampaigns}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Completed Campaigns</span>
                  <span className="font-semibold text-text-primary">{startup.completedCampaigns}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Average Rating</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-text-primary">{startup.averageRating || 0}</span>
                    <div className="flex">{renderStars(startup.averageRating || 0)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card rounded-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Connect</h3>
              <div className="space-y-3">
                {startup.socialLinks?.linkedin && (
                  <Link
                    href={startup.socialLinks.linkedin}
                    target="_blank"
                    className="flex items-center space-x-3 text-text-secondary hover:text-primary transition-colors"
                  >
                    <RiLinkedinFill className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </Link>
                )}
                {startup.socialLinks?.twitter && (
                  <Link
                    href={startup.socialLinks.twitter}
                    target="_blank"
                    className="flex items-center space-x-3 text-text-secondary hover:text-primary transition-colors"
                  >
                    <RiTwitterFill className="h-5 w-5" />
                    <span>Twitter</span>
                  </Link>
                )}
                {startup.socialLinks?.facebook && (
                  <Link
                    href={startup.socialLinks.facebook}
                    target="_blank"
                    className="flex items-center space-x-3 text-text-secondary hover:text-primary transition-colors"
                  >
                    <RiFacebookFill className="h-5 w-5" />
                    <span>Facebook</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
