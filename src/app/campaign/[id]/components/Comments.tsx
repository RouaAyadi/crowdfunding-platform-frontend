"use client";
import { useState } from "react";
import { RiSendPlaneLine, RiUserLine } from "@remixicon/react";
import { Input } from "@/components/Input";
import { Comment as CommentType, Investor } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { Roles } from "@/types/roles";
import { campaignAPI } from "@/lib/api/campaigns";

interface CommentsProps {
	comments: CommentType[];
	campaignId: string;
}

export default function Comments({ comments, campaignId }: CommentsProps) {
	const [newComment, setNewComment] = useState("");
	const { isAuthenticated, role } = useAuth();
	
	const isInvestor = isAuthenticated && role === Roles.INVESTOR;

	const handleSubmitComment = async () => {
		if (!newComment.trim() || !isInvestor) return;

		try {
			const response = await campaignAPI.addComment(campaignId, newComment);

			// Clear the input after successful submission
			setNewComment("");
			// You might want to trigger a refetch of the campaign data here
			// or implement optimistic updates
		} catch (error) {
			console.error('Error posting comment:', error);
		}
	};

	return (
		<div className="space-y-6">
			<h6 className="text-xl font-semibold">Comments</h6>

			<div className="flex flex-col gap-2">
				<div className="flex gap-4">
					<Input
						placeholder={isAuthenticated 
							? isInvestor 
								? "Add a comment..." 
								: "Only investors can comment"
							: "Please connect your wallet to comment"}
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

				{!isAuthenticated && (
					<p className="text-sm text-gray-500">
						Connect your wallet to join the conversation.
					</p>
				)}
				{isAuthenticated && !isInvestor && (
					<p className="text-sm text-gray-500">
						Only investors can comment on campaigns.
					</p>
				)}
			</div>

			<div className="space-y-4">
				{comments.map((comment) => (
					<div
						key={comment._id}
						className="bg-card rounded-lg p-4 space-y-2 border border-text-secondary/10"
					>
						<div className="flex items-center gap-2">
							<div className="bg-text-secondary/10 p-2 rounded-full">
								<RiUserLine className="size-5 text-text-secondary" />
							</div>
							<div>
								<p className="font-medium">
									{typeof comment.author === 'string' 
										? comment.author 
										: comment.author.nickname || comment.author.walletAddress}
								</p>
								<p className="text-sm text-text-secondary">
									{new Date(comment.createdAt).toLocaleDateString(undefined, {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
										hour: '2-digit',
										minute: '2-digit'
									})}
									{comment.isEdited && ' (edited)'}
								</p>
							</div>
						</div>
						<p className="text-text-secondary">
							{comment.text}
						</p>
					</div>
				))}

				{comments.length === 0 && (
					<p className="text-center text-text-secondary py-4">
						No comments yet. Be the first to comment!
					</p>
				)}
			</div>
		</div>
	);
}
