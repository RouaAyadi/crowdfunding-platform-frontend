"use client";
import { RiWallet3Line } from "@remixicon/react";
import { useAuth } from "@/contexts/AuthContext";

export default function ConnectWalletButton() {
	const { walletAddress, connectWallet } = useAuth();

	const handleConnect = async () => {
		try {
			await connectWallet();
		} catch (error) {
			// Error is already handled in the auth context
			console.error(error);
		}
	};

	return (
		<button
			onClick={handleConnect}
			className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors"
		>
			<RiWallet3Line className="size-5" />
			{walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
		</button>
	);
} 