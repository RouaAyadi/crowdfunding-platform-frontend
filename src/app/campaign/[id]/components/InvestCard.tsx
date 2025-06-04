"use client";
import { Input } from "@/components/Input";
import { useState } from "react";
import { RiWalletLine, RiInformationLine } from "@remixicon/react";

export default function InvestCard() {
	const [investAmount, setInvestAmount] = useState(0);
	
	return (
		<div className="bg-card rounded-xl border border-text-secondary/20 shadow-lg p-6 space-y-4 sticky top-6">
			<h6 className="text-2xl font-semibold">Invest Now</h6>
			
			<div className="space-y-4">
				<div className="flex items-center gap-2 text-text-secondary">
					<RiInformationLine className="size-5" />
					<p className="text-sm">Minimum investment: 0.05 ETH</p>
				</div>
				
				<Input
					placeholder="Amount in ETH"
					type="number"
					min={0.05}
					step={0.005}
					value={investAmount}
					onChange={(e) => setInvestAmount(+e.target.value)}
					className="w-full"
				/>
			</div>
			
			<button 
				className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors"
				onClick={() => console.log("Invest", investAmount)}
			>
				<RiWalletLine className="size-5" />
				Invest
			</button>
			{/*switch wallet */}
			<hr className="border-text-secondary/20" />
			<div className="space-y-2 text-text-secondary">
				<p className="text-sm truncate">Connected as: <span className="truncate">0x1234567890123456789012345678901234567890</span></p>
				<button className="w-full gap-2 bg-white text-primary font-medium">Switch Wallet</button>
			</div>
			
			<div className="text-sm text-text-secondary space-y-2">
				<p className="flex items-center gap-1">
					<RiInformationLine className="size-4" />
					Your funds will be held in escrow
				</p>
				<p>By investing, you agree to our terms and conditions</p>
			</div>
		</div>
	);
}
