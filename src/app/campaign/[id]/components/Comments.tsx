"use client";
import { useState } from "react";
import { RiSendPlaneLine, RiUserLine } from "@remixicon/react";
import { Input } from "@/components/Input";

type Comment = {
	id: number;
	user: string;
	content: string;
	timestamp: string;
};

export default function Comments() {
	const [newComment, setNewComment] = useState("");
	const mockComments: Comment[] = [
		{
			id: 1,
			user: "Investor1",
			content: "Great project! Looking forward to seeing the progress.",
			timestamp: "2 hours ago",
		},
		{
			id: 2,
			user: "CryptoWhale",
			content: "Interesting use case. What's the expected timeline for the facility?",
			timestamp: "1 day ago",
		},
	];

	const handleSubmitComment = () => {
		// send post request to backend
	};

	// get from db
	const isInvestor = true;

	return (
		<div className="space-y-6">
			<h6 className="text-xl font-semibold">Comments</h6>

			<div className="flex flex-col gap-2">
				<div className="flex gap-4">
					<Input
						placeholder="Add a comment..."
						value={newComment}
						onChange={(e) =>
							setNewComment(
								e.target.value
							)
						}
						className="flex-1"
						onKeyDown={(e) =>
							e.key === "Enter" &&
							isInvestor &&
							handleSubmitComment()
						}
						disabled={!isInvestor}
					/>
					<button
						onClick={handleSubmitComment}
						className={`p-3 rounded-lg transition-colors ${
							isInvestor
								? "bg-primary hover:bg-primary/90 text-white"
								: "bg-gray-300 text-gray-500 cursor-not-allowed"
						}`}
						disabled={!isInvestor}
					>
						<RiSendPlaneLine className="size-5" />
					</button>
				</div>

				{!isInvestor && (
					<p className="text-sm text-gray-500">
						Invest to join the conversation.
					</p>
				)}
			</div>

			<div className="space-y-4">
				{mockComments.map((comment) => (
					<div
						key={comment.id}
						className="bg-card rounded-lg p-4 space-y-2 border border-text-secondary/10"
					>
						<div className="flex items-center gap-2">
							<div className="bg-text-secondary/10 p-2 rounded-full">
								<RiUserLine className="size-5 text-text-secondary" />
							</div>
							<div>
								<p className="font-medium">
									{
										comment.user
									}
								</p>
								<p className="text-sm text-text-secondary">
									{
										comment.timestamp
									}
								</p>
							</div>
						</div>
						<p className="text-text-secondary">
							{comment.content}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
