"use client";

import { Toast, ToastProvider } from "@/components/Toast";
import { Toaster } from "@/components/Toaster";
import { useToast } from "@/lib/useToast";
import { RiShareLine } from "@remixicon/react";

export default function ShareButton() {
	const { toast } = useToast();
	return (
		<>
			<Toaster />
			<button
				className="p-2 hover:bg-text-secondary/10 rounded-lg transition-colors"
				onClick={() => {
					navigator.clipboard.writeText(
						window.location.href
					);
					toast({
						title: "Success",
						description:
							"Link copied to clipboard!",
						variant: "success",
						duration: 20000,
					});
				}}
			>
				<RiShareLine className="size-6" />
			</button>
		</>
	);
}
