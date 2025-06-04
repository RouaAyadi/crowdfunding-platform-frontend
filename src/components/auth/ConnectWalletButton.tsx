"use client";
import { RiWallet3Line } from "@remixicon/react";

export default function ConnectWalletButton() {
	return (
		<button
			onClick={() => console.log("Connect wallet")}
			className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors"
		>
			<RiWallet3Line className="size-5" />
			Connect Wallet
		</button>
	);
} 