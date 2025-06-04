import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
	title: "CrowdFund - Startup Crowdfunding Platform",
	description: "Discover and fund innovative startups on our crowdfunding platform",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${GeistSans.className} antialiased bg-bg`}>
				{children}
			</body>
		</html>
	);
}
