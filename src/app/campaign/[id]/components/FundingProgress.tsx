import { ProgressBar } from "@/components/ProgressBar";
import { RiTimeLine, RiUserStarLine } from "@remixicon/react";

export default function FundingProgress({
	progress,
	goal,
	daysLeft,
	investors,
	minInvestment,
}: {
	progress: number;
	goal: number;
	daysLeft: number;
	investors: number;
	minInvestment: number;
}) {
	return (
		<div className="bg-card rounded-xl border border-text-secondary/20 p-6 space-y-6">
			<div>
				<div className="flex items-center justify-between font-medium text-2xl mb-2">
					<p>{progress} ETH</p>
					<p className="text-text-secondary">
						{goal} ETH
					</p>
				</div>
				<ProgressBar
					value={progress}
					max={goal}
					className="h-3 rounded-full"
				/>
				<div className="flex items-center justify-between text-text-secondary font-medium mt-2">
					<p>
						{Math.round(
							(progress / goal) * 100
						)}
						% funded
					</p>
					<p className="flex items-center gap-1">
						<RiTimeLine className="size-5" />
						{daysLeft} days left
					</p>
				</div>
			</div>

			<div className="flex items-center justify-between pt-4 border-t border-text-secondary/20">
				<div className="space-y-1">
					<p className="text-text-secondary">
						Raised from
					</p>
					<p className="text-xl font-medium flex items-center gap-1">
						<RiUserStarLine className="size-5 text-primary" />
						{investors} investors
					</p>
				</div>
				<div className="space-y-1 text-right">
					<p className="text-text-secondary">
						Minimum investment
					</p>
					<p className="text-xl font-medium">
						{minInvestment} ETH
					</p>
				</div>
			</div>
		</div>
	);
}
