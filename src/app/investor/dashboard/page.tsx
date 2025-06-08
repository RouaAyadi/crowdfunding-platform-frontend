"use client";

import { RiBarChartBoxLine, RiMoneyDollarCircleLine, RiRocketLine } from "@remixicon/react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Campaign } from "@/types";

// Mock data for the investor
const mockInvestorData = {
    name: "John Smith",
    walletAddress: "0x1234...5678",
    totalInvested: 45000,
    totalCampaigns: 8,
    successfulStartups: 5
};

// Mock data for invested campaigns - using the same structure as the main app
const mockInvestedCampaigns: Campaign[] = [
    {
        _id: "1",
        id: "1",
        title: "Revolutionary AI-Powered Healthcare Assistant",
        name: "HealthAI Pro",
        description: "An innovative AI assistant that helps doctors diagnose diseases faster and more accurately using machine learning algorithms.",
        targetAmount: 500000,
        goalAmount: 500000,
        currentAmount: 325000,
        amountRaised: 325000,
        status: "active",
        currentState: "active",
        tags: ["AI", "Healthcare", "Technology"],
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
        address: "0x1234567890123456789012345678901234567890",
        startup: "startup1",
        startupId: "startup1",
        startupName: "MedTech Innovations",
        startDate: "2024-01-01",
        endDate: "2024-03-15",
        backers: 1250,
        daysLeft: 45,
        comments: [],
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
    },
    {
        _id: "2",
        id: "2",
        title: "Sustainable Energy Storage Solution",
        name: "EcoCell Battery",
        description: "Next-generation battery technology that provides 3x longer life and 100% recyclable materials for a sustainable future.",
        targetAmount: 750000,
        goalAmount: 750000,
        currentAmount: 680000,
        amountRaised: 680000,
        status: "completed",
        currentState: "completed",
        tags: ["Clean Energy", "Sustainability"],
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop",
        address: "0x2345678901234567890123456789012345678901",
        startup: "startup2",
        startupId: "startup2",
        startupName: "GreenPower Labs",
        startDate: "2024-01-01",
        endDate: "2024-02-28",
        backers: 890,
        daysLeft: 0,
        comments: [],
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
    },
    {
        _id: "5",
        id: "5",
        title: "Mental Health Support App",
        name: "MindCare",
        description: "AI-powered mental health companion that provides personalized therapy sessions and mood tracking.",
        targetAmount: 250000,
        goalAmount: 250000,
        currentAmount: 95000,
        amountRaised: 95000,
        status: "active",
        currentState: "active",
        tags: ["Mental Health", "AI", "Wellness"],
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
        address: "0x3456789012345678901234567890123456789012",
        startup: "startup5",
        startupId: "startup5",
        startupName: "Wellness Tech",
        startDate: "2024-01-01",
        endDate: "2024-05-20",
        backers: 234,
        daysLeft: 85,
        comments: [],
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
    }
];

const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
};

export default function InvestorDashboard() {
    return (
        <>
        <Navbar />
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Profile Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h1 className="text-2xl font-bold mb-4">Welcome back, {mockInvestorData.name}</h1>
                <p className="text-text-secondary mb-2">Wallet: {mockInvestorData.walletAddress}</p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                            <RiMoneyDollarCircleLine className="text-primary size-6" />
                            <div>
                                <p className="text-text-secondary">Total Invested</p>
                                <p className="text-xl font-bold">{formatAmount(mockInvestorData.totalInvested)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                            <RiBarChartBoxLine className="text-primary size-6" />
                            <div>
                                <p className="text-text-secondary">Campaigns</p>
                                <p className="text-xl font-bold">{mockInvestorData.totalCampaigns}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                            <RiRocketLine className="text-primary size-6" />
                            <div>
                                <p className="text-text-secondary">Successful Startups</p>
                                <p className="text-xl font-bold">{mockInvestorData.successfulStartups}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Invested Campaigns */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Your Investments</h2>
                <div className="space-y-4">
                    {mockInvestedCampaigns.map((campaign) => (
                        <Link href={`/campaign/${campaign.id}`} key={campaign.id}>
                            <div className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-semibold text-lg">{campaign.title}</h3>
                                        <p className="text-text-secondary text-sm">by {campaign.startupName}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        campaign.currentState === "active" 
                                            ? "bg-blue-100 text-blue-700" 
                                            : campaign.currentState === "completed"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}>
                                        {campaign.currentState.charAt(0).toUpperCase() + campaign.currentState.slice(1)}
                                    </span>
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
                                    <span>{campaign.backers} backers</span>
                                    {campaign.daysLeft > 0 && <span>{campaign.daysLeft} days left</span>}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
} 