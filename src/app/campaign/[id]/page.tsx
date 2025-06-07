"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import FundingProgress from "./components/FundingProgress";
import CampaignDetails from "./components/CampaignDetails";
import Comments from "./components/Comments";
import InvestCard from "./components/InvestCard";
import ShareButton from "./components/ShareButton";
import { campaignStatus } from "@/lib/enums";
import Navbar from "@/components/Navbar";
import { useCampaign } from "@/hooks/useCampaigns";
import { calculateCampaignProgress } from "@/lib/campaignUtils";

export default function Campaign() {
	const params = useParams();
	const { campaign, loading, error, refetch } = useCampaign(
		params.id as string
	);

	// Show loading state
	if (loading) {
		return (
			<div className="min-h-screen bg-bg">
				<Navbar />
				<div className="flex items-center justify-center h-64">
					<div className="text-text-secondary">
						Loading campaign...
					</div>
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
					<div className="text-red-500 mb-4">
						Error: {error}
					</div>
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
	if (!campaign) {
		return (
			<div className="min-h-screen bg-bg">
				<Navbar />
				<div className="flex items-center justify-center h-64">
					<div className="text-text-secondary">
						Campaign not found
					</div>
				</div>
			</div>
		);
	}

	// Calculate campaign progress and days left
	const { progressPercentage, daysLeft } =
		calculateCampaignProgress(campaign);

	let statusClassName;
	switch (campaign.status) {
		case "funded":
			statusClassName = "text-accent bg-accent/10";
			break;
		case "failed":
			statusClassName = "text-red-600 bg-red-600/10";
			break;
		case "active":
		default:
			statusClassName = "text-primary bg-primary/10";
	}

	return (
		<div className="min-h-screen bg-bg">
			<Navbar />
			<main className="pt-16">
				{" "}
				{/* Add padding-top to account for fixed navbar */}
				{/* Hero Section */}
				<div className="bg-card border-b border-text-secondary/20">
					<div className="max-w-7xl mx-auto px-6 py-8">
						<div className="flex items-center justify-between mb-4">
							<div className="space-y-2">
								<div className="flex items-center gap-4">
									<Image
										src={
											campaign.image ||
											"/default-startup-logo.svg"
										}
										alt="Campaign Image"
										width={
											36
										}
										height={
											36
										}
										className="rounded-lg border border-text-secondary/20"
									/>
									<h4 className="font-medium text-xl text-text-secondary">
										{
											campaign.startupName
										}
									</h4>
								</div>
								<h1 className="text-3xl font-bold text-text-primary">
									{campaign.title ||
										campaign.name}
								</h1>
							</div>
							<div className="flex items-center gap-3">
								<ShareButton />
								<span
									className={`rounded-lg px-4 py-2 text-lg font-medium cursor-default select-none ${statusClassName}`}
								>
									{
										campaign.status
									}
								</span>
							</div>
						</div>
					</div>
				</div>
				{/* Main Content */}
				<div className="max-w-7xl mx-auto px-6 py-8">
					<div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
						<aside className="space-y-8">
							<FundingProgress
								goal={
									campaign.targetAmount ||
									campaign.goalAmount
								}
								investors={
									campaign.backers
								}
								progress={
									campaign.amountRaised ||
									campaign.currentAmount
								}
								daysLeft={
									daysLeft
								}
								minInvestment={
									0.05
								} // TODO: Add minimum investment to backend
							/>
							<CampaignDetails
								description={
									campaign.description
								}
								startDate={
									new Date(
										campaign.startDate
									)
								}
								endDate={
									new Date(
										campaign.endDate
									)
								}
								objective={
									campaign.description
								} // TODO: Add objective field to backend
								rating={4.5} // TODO: Add rating calculation to backend
								startupId={
									campaign.startupId
								}
							/>
							<Comments 
								comments={campaign.comments || []} 
								campaignId={campaign.id} 
							/>
						</aside>
						<aside className="lg:relative">
							<div className="lg:sticky lg:top-24">
								<InvestCard />
							</div>
						</aside>
					</div>
				</div>
			</main>
		</div>
	);
}
