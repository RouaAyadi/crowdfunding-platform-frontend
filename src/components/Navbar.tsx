'use client';

import Link from 'next/link';
import { RiSearchLine, RiNotificationLine, RiUserLine, RiMenuLine } from '@remixicon/react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-card shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/home" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold text-text-primary">CrowdFund</span>
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiSearchLine className="h-5 w-5 text-text-secondary" />
              </div>
              <input
                type="text"
                placeholder="Search campaigns, startups..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-text-secondary focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/home" className="text-text-primary hover:text-primary font-medium transition-colors">
              Campaigns
            </Link>
            <Link href="/startups" className="text-text-primary hover:text-primary font-medium transition-colors">
              Startups
            </Link>
            <Link href="/about" className="text-text-primary hover:text-primary font-medium transition-colors">
              About
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search icon for mobile */}
            <button className="md:hidden p-2 text-text-secondary hover:text-primary">
              <RiSearchLine className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <button className="p-2 text-text-secondary hover:text-primary relative">
              <RiNotificationLine className="h-5 w-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
            </button>

            {/* User Profile */}
            <button className="p-2 text-text-secondary hover:text-primary">
              <RiUserLine className="h-5 w-5" />
            </button>

            {/* Start Campaign Button */}
            <Link
              href="/create-campaign"
              className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              Start Campaign
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-text-secondary hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <RiMenuLine className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100">
              <Link
                href="/home"
                className="block px-3 py-2 text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50 rounded-md"
              >
                Campaigns
              </Link>
              <Link
                href="/startups"
                className="block px-3 py-2 text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50 rounded-md"
              >
                Startups
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-text-primary hover:text-primary hover:bg-gray-50 rounded-md"
              >
                About
              </Link>
              <Link
                href="/create-campaign"
                className="block px-3 py-2 text-base font-medium text-white bg-primary hover:bg-blue-700 rounded-md"
              >
                Start Campaign
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
