'use client';

import { useState, useEffect } from 'react';
import { useStartups } from '@/hooks/useStartups';
import { Startup } from '@/types';
import StartupCard from '@/components/StartupCard';
import Navbar from '@/components/Navbar';
import { 
  RiSearchLine, 
  RiGridLine, 
  RiMenuLine, 
  RiFilterLine,
  RiMapPinLine,
  RiCalendarLine,
  RiTeamLine
} from '@remixicon/react';

export default function StartupsPage() {
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [selectedField, setSelectedField] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'founded' | 'totalRaised' | 'rating'>('name');
  const [isMounted, setIsMounted] = useState(false);

  // Fetch startups from API
  const { startups, loading, error, refetch } = useStartups({
    limit: 50,
  });
  console.log(startups);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter and sort startups
  useEffect(() => {
    if (!startups) return;

    let filtered = [...startups];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(startup =>
        startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.field.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply field filter
    if (selectedField !== 'all') {
      filtered = filtered.filter(startup => startup.field === selectedField);
    }

    // Apply location filter
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(startup => startup.location === selectedLocation);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'founded':
          return b.foundedYear - a.foundedYear;
        case 'totalRaised':
          return (b.totalRaised || 0) - (a.totalRaised || 0);
        case 'rating':
          return (b.averageRating || 0) - (a.averageRating || 0);
        default:
          return 0;
      }
    });

    setFilteredStartups(filtered);
  }, [startups, searchTerm, selectedField, selectedLocation, sortBy]);

  // Get unique fields and locations for filters
  const uniqueFields = Array.from(new Set(startups?.map(s => s.field) || []));
  const uniqueLocations = Array.from(new Set(startups?.map(s => s.location) || []));

  if (loading) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar />
        <div className="flex items-center justify-center h-64 pt-16">
          <div className="text-text-secondary">Loading startups...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-64 pt-16">
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
      
      <main className="pt-16">
        {/* Header */}
        <div className="bg-card border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Discover Startups
                </h1>
                <p className="text-text-secondary">
                  Explore innovative startups and their funding campaigns
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="text-sm text-text-secondary">
                  {isMounted && (
                    <>
                      Showing {filteredStartups.length} of {startups?.length || 0} startups
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary h-5 w-5" />
              <input
                type="text"
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Field Filter */}
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Fields</option>
                {uniqueFields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>

              {/* Location Filter */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Locations</option>
                {uniqueLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="founded">Sort by Founded Year</option>
                <option value="totalRaised">Sort by Total Raised</option>
                <option value="rating">Sort by Rating</option>
              </select>

              {/* View Mode */}
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

          {/* Startups Grid */}
          {isMounted && (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredStartups.map((startup, index) => (
                <StartupCard
                  key={startup.id || index}
                  startup={startup}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {isMounted && filteredStartups.length === 0 && (
            <div className="text-center py-12">
              <div className="text-text-secondary text-lg mb-4">
                No startups found matching your criteria
              </div>
              <button
                onClick={() => {
                  setSelectedField('all');
                  setSelectedLocation('all');
                  setSearchTerm('');
                }}
                className="text-primary hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}



