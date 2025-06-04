import { ProgressBar } from "@/components/ProgressBar";
import {
	RiCalendarLine,
	RiFileTextLine,
	RiFocus2Line,
	RiThumbUpLine,
	RiUserLine,
	RiShareLine,
	RiBookmarkLine,
} from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import FundingProgress from "./components/FundingProgress";
import CampaignDetails from "./components/CampaignDetails";
import Comments from "./components/Comments";
import InvestCard from "./components/InvestCard";
import { headers } from "next/headers";
import ShareButton from "./components/ShareButton";
export default async function Campaign({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	// const campaign = await getCampaign(id);
	// mock data for campaign
	const campaign = {
		id: "1",
		startupName: "Startup Name",
		startupId: "5",
		name: "Revolutionary Blockchain Solution for Supply Chain",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus velit velit, quis fermentum elit interdum eu. Quisque est diam, imperdiet eu mattis quis, aliquet ac nulla. Nam eu quam vel velit porta blandit nec eget mi. Aliquam semper quam ante, mattis condimentum sem dignissim sit amet. Donec interdum consectetur nisl elementum condimentum.",
		logo: "/default-startup-logo.svg",
		progress: 45,
		fundingGoal: 100,
		objective: "Buy 30 servers",
		startDate: new Date(2025, 5, 25),
		endDate: new Date(2025, 7, 2),
		investors: 128,
		minimumInvestment: 0.05,
		rating: 4.5,
		status: "Active",
	};
	return (
		<main className="bg-bg min-h-screen w-full text-text-primary">
			{/* Hero Section */}
			<div className="bg-card border-b border-text-secondary/20">
				<div className="max-w-7xl mx-auto p-6">
					<div className="flex items-center justify-between mb-4">
						<div className="space-y-2">
							<div className="flex items-center gap-4">
								<Image
									src="/default-startup-logo.svg"
									alt="Startup Logo"
									width={
										36
									}
									height={
										36
									}
								/>
								<h4 className="font-medium text-xl text-text-secondary">
									{
										campaign.startupName
									}
								</h4>
							</div>
							<h1 className="text-3xl font-bold">
								{campaign.name}
							</h1>
						</div>
						<div className="flex items-center gap-3">
							<ShareButton />
							{/* <button className="p-2 hover:bg-text-secondary/10 rounded-lg transition-colors">
								<RiBookmarkLine className="size-6" />
							</button> */}
							<span className="rounded-lg bg-primary/10 text-primary px-4 py-2 text-lg font-medium">
								{
									campaign.status
								}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto p-6">
				<div className="grid grid-cols-[1fr_400px] gap-8">
					<aside className="space-y-8">
						<FundingProgress
							goal={
								campaign.fundingGoal
							}
							investors={
								campaign.investors
							}
							progress={
								campaign.progress
							}
							daysLeft={Math.round(
								(campaign.endDate.getTime() -
									new Date().getTime()) /
									(1000 *
										60 *
										60 *
										24)
							)}
							minInvestment={
								campaign.minimumInvestment
							}
						/>
						<CampaignDetails
							description={
								campaign.description
							}
							startDate={
								campaign.startDate
							}
							endDate={
								campaign.endDate
							}
							objective={
								campaign.objective
							}
							rating={campaign.rating}
							startupId={
								campaign.startupId
							}
						/>
						<Comments />
					</aside>
					<aside>
						<InvestCard />
					</aside>
				</div>
			</div>
		</main>
	);
}
