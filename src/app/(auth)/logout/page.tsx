"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RiLoader4Line } from "@remixicon/react";

export default function LogoutPage() {
	const router = useRouter();

	useEffect(() => {
		// Simulate logout process
		const timeout = setTimeout(() => {
			router.push("/login");
		}, 1500);

		return () => clearTimeout(timeout);
	}, [router]);

	return (
		<div className="text-center space-y-4">
			<RiLoader4Line className="size-12 mx-auto animate-spin text-primary" />
			<h2 className="text-xl font-medium">Logging out...</h2>
			<p className="text-text-secondary">Disconnecting your wallet</p>
		</div>
	);
} 