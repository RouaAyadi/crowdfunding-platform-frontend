import Image from "next/image";
import FundingProgress from "./components/FundingProgress";
import CampaignDetails from "./components/CampaignDetails";
import Comments from "./components/Comments";
import InvestCard from "./components/InvestCard";
import ShareButton from "./components/ShareButton";
import { campaignStatus } from "@/lib/enums";
import Navbar from "@/components/Navbar";

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
		status: campaignStatus.Active,
	};

	let statusClassName;
	switch (campaign.status) {
		case campaignStatus.Funded:
			statusClassName = "text-accent bg-accent/10";
			break;
		case campaignStatus.Failed:
			statusClassName = "text-red-600 bg-red-600/10";
			break;
		case campaignStatus.Active:
		default:
			statusClassName = "text-primary bg-primary/10";
	}

	return (
		<div className="min-h-screen bg-bg">
			<Navbar />
			<main className="pt-16"> {/* Add padding-top to account for fixed navbar */}
				{/* Hero Section */}
				<div className="bg-card border-b border-text-secondary/20">
					<div className="max-w-7xl mx-auto px-6 py-8">
						<div className="flex items-center justify-between mb-4">
							<div className="space-y-2">
								<div className="flex items-center gap-4">
									<Image
										src={campaign.logo}
										alt="Startup Logo"
										width={36}
										height={36}
										className="rounded-lg border border-text-secondary/20"
									/>
									<h4 className="font-medium text-xl text-text-secondary">
										{campaign.startupName}
									</h4>
								</div>
								<h1 className="text-3xl font-bold text-text-primary">
									{campaign.name}
								</h1>
							</div>
							<div className="flex items-center gap-3">
								<ShareButton />
								<span
									className={`rounded-lg px-4 py-2 text-lg font-medium cursor-default select-none ${statusClassName}`}
								>
									{campaign.status}
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
								goal={campaign.fundingGoal}
								investors={campaign.investors}
								progress={campaign.progress}
								daysLeft={Math.round(
									(campaign.endDate.getTime() - new Date().getTime()) /
										(1000 * 60 * 60 * 24)
								)}
								minInvestment={campaign.minimumInvestment}
							/>
							<CampaignDetails
								description={campaign.description}
								startDate={campaign.startDate}
								endDate={campaign.endDate}
								objective={campaign.objective}
								rating={campaign.rating}
								startupId={campaign.startupId}
							/>
							<Comments />
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
