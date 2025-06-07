"use client";

import { useEffect, useState } from "react";
import { RiBarChartBoxLine, RiMoneyDollarCircleLine, RiRocketLine } from "@remixicon/react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { investorApi } from "@/services/investor";
import type { InvestorDashboard } from "@/services/investor";
import { useToast } from "@/lib/useToast";

const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
};

export default function InvestorDashboard() {
    const [dashboardData, setDashboardData] = useState<InvestorDashboard | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await investorApi.getDashboard();
                setDashboardData(data);
            } catch (error) {
                console.error('Failed to fetch dashboard:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to load dashboard data',
                    variant: 'error',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [toast]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!dashboardData) {
        return <div>Failed to load dashboard data</div>;
    }

    return (
        <>
        <Navbar />
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Profile Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h1 className="text-2xl font-bold mb-4">Welcome back, {dashboardData.name}</h1>
                <p className="text-text-secondary mb-2">Wallet: {dashboardData.walletAddress}</p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                            <RiMoneyDollarCircleLine className="text-primary size-6" />
                            <div>
                                <p className="text-text-secondary">Total Invested</p>
                                <p className="text-xl font-bold">{formatAmount(dashboardData.totalInvested)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                            <RiBarChartBoxLine className="text-primary size-6" />
                            <div>
                                <p className="text-text-secondary">Campaigns</p>
                                <p className="text-xl font-bold">{dashboardData.totalCampaigns}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                            <RiRocketLine className="text-primary size-6" />
                            <div>
                                <p className="text-text-secondary">Successful Startups</p>
                                <p className="text-xl font-bold">{dashboardData.successfulStartups}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Invested Campaigns */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Your Investments</h2>
                <div className="space-y-4">
                    {dashboardData.investedCampaigns.map((campaign) => (
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