"use client";

import { useState } from "react";
import { Campaign, Startup } from "@/types";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { 
    RiAddLine, 
    RiBarChartBoxLine, 
    RiMoneyDollarCircleLine, 
    RiRocketLine,
    RiMapPinLine,
    RiTeamLine,
    RiCalendarLine,
    RiCheckLine,
    RiTimeLine,
    RiGlobalLine,
    RiLinkedinFill,
    RiTwitterFill,
    RiFacebookFill
} from "@remixicon/react";

// Mock data for the startup
const mockStartupData: Startup = {
    id: "1",
    name: "TechVision Labs",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&h=400&fit=crop",
    field: "Blockchain Technology",
    description: "Building next-generation blockchain solutions for enterprise",
    longDescription: "TechVision Labs is pioneering the development of enterprise-grade blockchain solutions that bridge the gap between traditional systems and Web3 technology. Our team of experienced developers and blockchain experts are creating innovative solutions that enable businesses to leverage the power of decentralized systems while maintaining the security and reliability they need.",
    motives: [
        "Develop enterprise-ready blockchain solutions",
        "Bridge traditional finance with DeFi",
        "Create secure and scalable smart contract platforms",
        "Enable seamless Web3 integration for businesses"
    ],
    foundedYear: 2022,
    location: "Berlin, Germany",
    teamSize: 15,
    website: "https://techvision-labs.com",
    socialLinks: {
        linkedin: "https://linkedin.com/company/techvision-labs",
        twitter: "https://twitter.com/techvision_labs",
        facebook: "https://facebook.com/techvisionlabs"
    },
    totalRaised: 850,
    activeCampaigns: 2,
    completedCampaigns: 1,
    averageRating: 4.5,
    totalReviews: 45,
    reviews: [],
    keyMetrics: [
        { label: "Monthly Growth", value: "40%" },
        { label: "Active Users", value: "2.5K" },
        { label: "Partnerships", value: "12" },
        { label: "Success Rate", value: "92%" }
    ],
    milestones: [
        {
            title: "Beta Launch",
            description: "Successfully launched beta version of our main product",
            date: "2024-01-15",
            completed: true
        },
        {
            title: "Strategic Partnership",
            description: "Partnered with major enterprise blockchain provider",
            date: "2024-02-01",
            completed: true
        },
        {
            title: "Platform Upgrade",
            description: "Major platform upgrade with new features",
            date: "2024-04-01",
            completed: false
        },
        {
            title: "International Expansion",
            description: "Expand operations to Asian markets",
            date: "2024-06-30",
            completed: false
        }
    ]
};

// Mock data for startup's campaigns
const mockStartupCampaigns: Campaign[] = [
    {
        id: "1",
        title: "AI-Powered Data Analytics Platform",
        name: "DataSense AI",
        description: "Enterprise-grade data analytics platform powered by artificial intelligence for real-time insights.",
        goalAmount: 300,
        amountRaised: 195,
        currentState: "active",
        tags: ["AI", "Data Analytics", "Enterprise"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        startupId: "1",
        startupName: mockStartupData.name,
        endDate: "2024-05-15",
        backers: 180,
        daysLeft: 45
    },
    {
        id: "2",
        title: "Cloud Security Solution",
        name: "SecureCloud",
        description: "Next-generation cloud security platform with zero-trust architecture.",
        goalAmount: 500,
        amountRaised: 500,
        currentState: "completed",
        tags: ["Security", "Cloud", "Enterprise"],
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop",
        startupId: "1",
        startupName: mockStartupData.name,
        endDate: "2023-12-31",
        backers: 270,
        daysLeft: 0
    },
    {
        id: "3",
        title: "Edge Computing Infrastructure",
        name: "EdgeNet",
        description: "Distributed edge computing infrastructure for low-latency applications.",
        goalAmount: 700,
        amountRaised: 155,
        currentState: "active",
        tags: ["Infrastructure", "Edge Computing"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
        startupId: "1",
        startupName: mockStartupData.name,
        endDate: "2024-06-30",
        backers: 89,
        daysLeft: 90
    }
];

const formatAmount = (amount: number) => {
    if (amount >= 1000) {
        return `${(amount / 1000).toFixed(1)}K ETH`;
    }
    return `${amount} ETH`;
};

export default function StartupDashboard() {
    const [selectedTab, setSelectedTab] = useState<'active' | 'completed' | 'draft'>('active');

    const filteredCampaigns = mockStartupCampaigns.filter(campaign => {
        if (selectedTab === 'active') return campaign.currentState === 'active';
        if (selectedTab === 'completed') return campaign.currentState === 'completed';
        return campaign.currentState === 'draft';
    });

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Profile Overview */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-start gap-6">
                        {/* Logo and Basic Info */}
                        <div className="flex-shrink-0">
                            <Image
                                src={mockStartupData.logo}
                                alt={mockStartupData.name}
                                width={80}
                                height={80}
                                className="rounded-lg border border-gray-200"
                            />
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-bold mb-1">{mockStartupData.name}</h1>
                                    <p className="text-text-secondary mb-2">{mockStartupData.field}</p>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                                        <div className="flex items-center gap-1">
                                            <RiMapPinLine className="size-4" />
                                            <span>{mockStartupData.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <RiTeamLine className="size-4" />
                                            <span>{mockStartupData.teamSize} team members</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <RiCalendarLine className="size-4" />
                                            <span>Founded {mockStartupData.foundedYear}</span>
                                        </div>
                                    </div>
                                </div>
                                <Link 
                                    href="/startup/campaign/new" 
                                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    <RiAddLine className="size-5" />
                                    Launch New Campaign
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                                <RiMoneyDollarCircleLine className="text-primary size-6" />
                                <div>
                                    <p className="text-text-secondary">Total Raised</p>
                                    <p className="text-xl font-bold">{formatAmount(mockStartupData.totalRaised)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                                <RiBarChartBoxLine className="text-primary size-6" />
                                <div>
                                    <p className="text-text-secondary">Active Investors</p>
                                    <p className="text-xl font-bold">{mockStartupData.totalReviews}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                                <RiRocketLine className="text-primary size-6" />
                                <div>
                                    <p className="text-text-secondary">Total Campaigns</p>
                                    <p className="text-xl font-bold">{mockStartupData.activeCampaigns + mockStartupData.completedCampaigns}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                                <RiRocketLine className="text-primary size-6" />
                                <div>
                                    <p className="text-text-secondary">Avg. Rating</p>
                                    <p className="text-xl font-bold">{mockStartupData.averageRating}/5.0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Company Overview and Key Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Company Overview */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold mb-4">Company Overview</h2>
                            <p className="text-text-secondary mb-6">{mockStartupData.longDescription}</p>
                            
                            <h3 className="font-semibold mb-3">Our Goals</h3>
                            <ul className="space-y-2">
                                {mockStartupData.motives.map((motive, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <RiCheckLine className="size-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-text-secondary">{motive}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Milestones */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold mb-6">Milestones</h2>
                            <div className="space-y-4">
                                {mockStartupData.milestones.map((milestone, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            milestone.completed ? 'bg-primary' : 'bg-gray-200'
                                        }`}>
                                            {milestone.completed ? (
                                                <RiCheckLine className="size-4 text-white" />
                                            ) : (
                                                <RiTimeLine className="size-4 text-gray-500" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold">{milestone.title}</h3>
                                                <span className="text-sm text-text-secondary">
                                                    {milestone.date}
                                                </span>
                                            </div>
                                            <p className="text-text-secondary">{milestone.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Key Metrics and Links */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold mb-4">Key Metrics</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {mockStartupData.keyMetrics.map((metric, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                                        <p className="text-2xl font-bold text-primary">{metric.value}</p>
                                        <p className="text-sm text-text-secondary">{metric.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                            <div className="space-y-3">
                                <Link
                                    href={mockStartupData.website}
                                    target="_blank"
                                    className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
                                >
                                    <RiGlobalLine className="size-5" />
                                    <span>Website</span>
                                </Link>
                                {mockStartupData.socialLinks.linkedin && (
                                    <Link
                                        href={mockStartupData.socialLinks.linkedin}
                                        target="_blank"
                                        className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
                                    >
                                        <RiLinkedinFill className="size-5" />
                                        <span>LinkedIn</span>
                                    </Link>
                                )}
                                {mockStartupData.socialLinks.twitter && (
                                    <Link
                                        href={mockStartupData.socialLinks.twitter}
                                        target="_blank"
                                        className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
                                    >
                                        <RiTwitterFill className="size-5" />
                                        <span>Twitter</span>
                                    </Link>
                                )}
                                {mockStartupData.socialLinks.facebook && (
                                    <Link
                                        href={mockStartupData.socialLinks.facebook}
                                        target="_blank"
                                        className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
                                    >
                                        <RiFacebookFill className="size-5" />
                                        <span>Facebook</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Campaign Management */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold mb-6">Campaign Management</h2>
                    
                    {/* Tabs */}
                    <div className="flex gap-4 mb-6 border-b">
                        <button
                            onClick={() => setSelectedTab('active')}
                            className={`pb-2 px-2 ${
                                selectedTab === 'active'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-text-secondary'
                            }`}
                        >
                            Active Campaigns
                        </button>
                        <button
                            onClick={() => setSelectedTab('completed')}
                            className={`pb-2 px-2 ${
                                selectedTab === 'completed'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-text-secondary'
                            }`}
                        >
                            Completed
                        </button>
                        <button
                            onClick={() => setSelectedTab('draft')}
                            className={`pb-2 px-2 ${
                                selectedTab === 'draft'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-text-secondary'
                            }`}
                        >
                            Drafts
                        </button>
                    </div>

                    {/* Campaigns List */}
                    <div className="space-y-4">
                        {filteredCampaigns.map((campaign) => (
                            <div key={campaign.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-semibold text-lg">{campaign.title}</h3>
                                        <div className="flex gap-2 mt-1">
                                            {campaign.tags.map((tag, index) => (
                                                <span key={index} className="text-xs bg-gray-100 text-text-secondary px-2 py-1 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/campaign/${campaign.id}`}
                                            className="text-primary hover:text-primary/90 font-medium"
                                        >
                                            View Campaign
                                        </Link>
                                        <Link
                                            href={`/startup/campaign/${campaign.id}/edit`}
                                            className="text-text-secondary hover:text-text-primary font-medium"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="font-medium">{formatAmount(campaign.amountRaised)}</p>
                                    <div className="w-48 bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-primary h-2 rounded-full" 
                                            style={{ width: `${Math.min((campaign.amountRaised / campaign.goalAmount) * 100, 100)}%` }}
                                        />
                                    </div>
                                    <p className="text-text-secondary">
                                        {Math.min(Math.round((campaign.amountRaised / campaign.goalAmount) * 100), 100)}%
                                    </p>
                                </div>
                                <div className="mt-3 flex justify-between text-sm text-text-secondary">
                                    <span>Goal: {formatAmount(campaign.goalAmount)}</span>
                                    <span>{campaign.backers} investors</span>
                                    {campaign.daysLeft > 0 && <span>{campaign.daysLeft} days left</span>}
                                </div>
                            </div>
                        ))}

                        {filteredCampaigns.length === 0 && (
                            <div className="text-center py-8 text-text-secondary">
                                No campaigns found in this category
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
} 