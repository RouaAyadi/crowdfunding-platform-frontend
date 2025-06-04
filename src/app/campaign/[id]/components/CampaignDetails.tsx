import {
	RiCalendarLine,
	RiFocus2Line,
	RiUserLine,
	RiThumbUpLine,
	RiFileTextLine,
} from "@remixicon/react";
import Link from "next/link";

export default function CampaignDetails({
	description,
	startDate,
	endDate,
	objective,
	rating,
	startupId,
}: {
	description: string;
	startDate: Date;
	endDate: Date;
	objective: string;
	rating: number;
	startupId: string;
}) {
	const format = (date: Date) =>
		date.toLocaleString("en-US", {
			month: "short",
			day: "numeric",
		});
	const startupInfo: InfoRowParams[] = [
		{
			content: `${format(startDate)} - ${format(endDate)}`,
			children: <RiCalendarLine />,
		},
		{ content: objective, children: <RiFocus2Line /> },
		{
			content: "Startup Info",
			link: `/startup/${startupId}`,
			children: <RiUserLine />,
		},
		{ content: `${rating} stars`, children: <RiThumbUpLine /> },
		{
			content: "Legal Documents",
			link: `/startup/${startupId}/legal`,
			children: <RiFileTextLine />,
		},
	];

	return (
		<div className="space-y-4">
			<h6 className="text-xl">Campaign Overview</h6>
			<p className="text-pretty text-text-secondary">
				{description}
			</p>
			<div className="space-y-3">
				{startupInfo.map((info, index) => (
					<InfoRow data={info} key={index} />
				))}
			</div>
		</div>
	);
}

type InfoRowParams = {
	content: string;
	link?: string;
	children: React.ReactNode;
};

const InfoRow = ({ data }: { data: InfoRowParams }) => {
	const { content, link, children } = data;
	return (
		<div className="flex items-center gap-4">
			<i className="text-text-secondary size-6">{children}</i>
			<Link
				href={link ?? "#"}
				className={
					link
						? "hover:text-primary underline underline-offset-4 cursor-pointer"
						: "cursor-default"
				}
			>
				{content}
			</Link>
		</div>
	);
};
